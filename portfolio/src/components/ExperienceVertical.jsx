import { motion } from "framer-motion";
import experiences from "../data/experience.json"; // adjust path if needed

export default function ExperienceVertical() {
  const gridCols =
    experiences.length === 1
      ? "grid-cols-1 place-items-center"
      : "md:grid-cols-2";

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
        Experience
      </h2>
      <div className={`grid gap-8 ${gridCols}`}>
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {exp.role}
                <span className="text-blue-500 font-normal">
                  {" "}
                  @ {exp.company}
                </span>
              </h3>
              <span className="text-xs text-gray-400">{exp.year}</span>
            </div>
            <p className="text-gray-600 mb-3">{exp.description}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {exp.tech.map((t, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
