// @flow strict

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import experience from '../../../assets/lottie/code.json';
import AnimationLottie from "../../helper/animation-lottie";
import dynamic from 'next/dynamic';
const GlowCard = dynamic(() => import('../../helper/glow-card'), {
  loading: () => <div>Loading...</div>,
});

function Experience() {
  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b] mx-4 sm:mx-8 lg:mx-12">
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
            Experiences
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex justify-center items-start">
            <div className="w-full h-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-8">
              {
                experiences.map(experience => (
                  <GlowCard key={experience.id} identifier={`experience-${experience.id}`}>
                    <div className="p-4 relative bg-[#0F0C41] rounded-lg transform transition-all duration-300 hover:scale-105 hover:rotate-1 hover:shadow-xl hover:bg-[#1a1443] group">
                      <Image
                        src="/blur-23.svg"
                        alt="Hero"
                        width={1080}
                        height={200}
                        className="absolute bottom-0 opacity-80"
                      />
                      <div className="flex justify-center mb-4">
                        <p className="text-xs sm:text-sm text-[#16f2b3] bg-[#1a1443] px-4 py-1 rounded-full transform transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0F0C41]">
                          {experience.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-8 px-4 py-6">
                        <div className="text-violet-500 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-125">
                          <BsPersonWorkspace size={36} />
                        </div>
                        <div className="transform transition-all duration-300 group-hover:translate-x-2">
                          <p className="text-base sm:text-xl mb-2 font-medium uppercase text-white group-hover:text-[#16f2b3]">
                            {experience.title}
                          </p>
                          <p className="text-sm sm:text-base text-gray-300 group-hover:text-white">
                            {experience.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;