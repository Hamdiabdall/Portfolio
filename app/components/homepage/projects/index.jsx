'use client';

import { projects } from "@/utils/data/projects";
import { BsArrowRight } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const GlowCard = dynamic(() => import('../../helper/glow-card'), {
  loading: () => (
    <div className="animate-pulse bg-gray-200 rounded-lg p-6 h-64"></div>
  ),
  ssr: false
});

// Function to get tag color based on technology
const getTagColor = (tag) => {
  const colors = {
    'React': 'bg-blue-500 text-white',
    'Next.js': 'bg-black text-white',
    'JavaScript': 'bg-yellow-400 text-black',
    'CSS': 'bg-purple-500 text-white',
    'Tailwind CSS': 'bg-cyan-500 text-white',
    'Node.js': 'bg-green-500 text-white',
    'API Integration': 'bg-red-500 text-white',
    'Animation': 'bg-pink-500 text-white',
    'Responsive Design': 'bg-indigo-500 text-white',
  };
  return colors[tag] || 'bg-gray-500 text-white';
};

const Projects = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-64"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div id="projects" className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center pt-10 lg:pt-20">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Projects</h2>
        <p className="text-gray-600 text-center max-w-2xl mb-12">
          Here are some of my recent projects that showcase my skills and experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <GlowCard>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getTagColor(tag)} transition-transform hover:scale-105`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mt-6">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors duration-200"
                    >
                      <FaGithub className="text-xl" /> 
                      <span className="font-medium">Code</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors duration-200"
                    >
                      <HiOutlineExternalLink className="text-xl" /> 
                      <span className="font-medium">Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </GlowCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;