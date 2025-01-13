// @flow strict
import { educations } from "@/utils/data/educations";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import lottieFile from '../../../assets/lottie/study.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/dynamic-glow-card";

function Education() {
  return (
    <div id="education" className="relative z-50 border-t my-16 lg:my-32 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-8 lg:py-10">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Educations
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-3/4 h-3/4 transform transition-all duration-500 hover:scale-110">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-8">
              {
                educations.map(education => (
                  <GlowCard key={education.id} identifier={`education-${education.id}`}>
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
                          {education.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-8 px-4 py-6">
                        <div className="text-violet-500 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-125">
                          <BsPersonWorkspace size={36} />
                        </div>
                        <div className="transform transition-all duration-300 group-hover:translate-x-2">
                          <p className="text-base sm:text-xl mb-2 font-medium uppercase text-white group-hover:text-[#16f2b3]">
                            {education.title}
                          </p>
                          <p className="text-sm sm:text-base text-gray-300 group-hover:text-white">
                            {education.institution}
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

export default Education;