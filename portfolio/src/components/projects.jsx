import React, { useState, useEffect, useCallback } from 'react';
import { X, ExternalLink } from 'lucide-react';
import projectsData from '../data/projects.json';

export default function MyProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  // Close modal on ESC
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, handleKeyDown]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className="relative p-6">
      {/* Inline animations and custom scrollbar styles */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0 }
            to { opacity: 1 }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0 }
            to { transform: translateY(0); opacity: 1 }
          }
          @keyframes fadeOut {
            from { opacity: 1 }
            to { opacity: 0 }
          }
          @keyframes slideDown {
            from { transform: translateY(0); opacity: 1 }
            to { transform: translateY(20px); opacity: 0 }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }
          .animate-slideUp {
            animation: slideUp 0.4s ease-out forwards;
          }
          .animate-fadeOut {
            animation: fadeOut 0.3s ease-in forwards;
          }
          .animate-slideDown {
            animation: slideDown 0.4s ease-in forwards;
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <h2 className="text-3xl font-bold mb-6 text-white">My Projects</h2>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="bg-white/10 backdrop-blur-md text-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02]"
            onClick={() => setSelectedProject(project)}
          >
            <img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-48"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-300 mt-1 line-clamp-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 ${
            isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
          }`}
        >
          <div
            className={`bg-gray-900/95 text-white rounded-2xl shadow-2xl w-[95vw] h-[90vh] relative overflow-y-auto border border-gray-700 no-scrollbar ${
              isClosing ? 'animate-slideDown' : 'animate-slideUp'
            }`}
          >
            {/* Floating Close Button */}
            <button
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-20 backdrop-blur-md transition-all"
              onClick={handleClose}
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="w-full aspect-[16/9] overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-3xl font-bold mb-2">{selectedProject.title}</h3>
              <p className="mt-2 whitespace-pre-line text-gray-300">{selectedProject.fullDescription}</p>

              {/* Tech Stack */}
              {selectedProject.technologies && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-white/10 text-white text-xs font-medium px-2 py-1 rounded-full border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Links */}
              <div className="mt-6 flex gap-4 flex-wrap">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-400 hover:underline"
                  >
                    GitHub <ExternalLink size={16} />
                  </a>
                )}
                {selectedProject.website && (
                  <a
                    href={selectedProject.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-green-400 hover:underline"
                  >
                    Live Site <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
