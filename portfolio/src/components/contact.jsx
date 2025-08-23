import React from 'react';
import { Mail, Github, Linkedin, FileText } from 'lucide-react';

export default function ContactMe() {
  return (
    <footer className="bg-white/5 backdrop-blur-md text-white px-4 py-6 mt-16">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Message Section */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-1">Let’s get in touch</h3>
          <p className="text-sm text-gray-300">
            Reach out for collaborations, opportunities, or just to say hi!
          </p>
        </div>

        {/* Icons Section */}
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a
            href="mailto:your.ayushpc025@gmail.com"
            className="hover:text-blue-400 transition"
            title="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://github.com/Ayush16Mishra"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
            title="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/ayush-mishra-839348291/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
            title="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          {/* Resume Open in New Tab */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition"
            title="View Resume"
          >
            <FileText size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
