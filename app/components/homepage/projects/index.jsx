'use client';

import { projects } from "@/utils/data/projects";
import Image from "next/image";
import SingleProject from "./single-project";

function Projects() {
  return (
    <div id="projects" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b] mx-4 sm:mx-8 lg:mx-12">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-8 lg:py-12">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Featured Projects
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12 py-8">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="transform transition-all duration-300 hover:-translate-y-2"
          >
            <SingleProject project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;