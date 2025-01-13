import Image from 'next/image';
import Link from 'next/link';
import { FaCode, FaPlay } from 'react-icons/fa';

const SingleProject = ({ project }) => {
  const { name, image, demo, code, description, tags } = project;
  const placeholder = '/project.png';
  const timestamp = new Date().getTime();

  return (
    <div className='group relative w-full h-[32rem] overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F0C41] to-[#1a1443] p-[2px] hover:from-violet-600 hover:to-pink-500'>
      <div className='absolute inset-0 h-full w-full bg-[#0F0C41] rounded-2xl p-2'>
        <div className='relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-black/90 to-black/70 p-4'>
          {/* Project Title */}
          <h2 className='text-[#EFF3F4] font-bold text-2xl mb-4 text-center bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent transform transition-all duration-300 hover:scale-105'>
            {name}
          </h2>

          {/* Project Image */}
          <div className="relative aspect-[16/9] w-full mb-4 overflow-hidden rounded-lg">
            <div className="relative w-full h-full transform transition-all duration-300 group-hover:scale-105">
              <Image
                key={`${image?.src}?t=${timestamp}`}
                src={image ? `${image.src}?t=${timestamp}` : placeholder}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center"
                priority
                unoptimized
              />
              {/* Overlay with description */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                <p className="text-white text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {description}
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {tags && tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-[#1a1443] text-violet-300 transform transition-all duration-300 hover:scale-110 hover:bg-violet-600 hover:text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6">
            {demo && (
              <Link
                href={demo}
                target='_blank'
                className="relative group/btn flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-500 text-white px-4 py-2 rounded-full transform transition-all duration-300 hover:scale-110"
              >
                <span className="text-sm font-medium">Demo</span>
                <FaPlay className="text-sm transform transition-all duration-300 group-hover/btn:rotate-90" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 opacity-50 blur-sm transition-all duration-300 group-hover/btn:opacity-100" />
              </Link>
            )}
            
            {code && (
              <Link
                href={code}
                target='_blank'
                className="relative group/btn flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-500 text-white px-4 py-2 rounded-full transform transition-all duration-300 hover:scale-110"
              >
                <span className="text-sm font-medium">Code</span>
                <FaCode className="text-sm transform transition-all duration-300 group-hover/btn:rotate-12" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 opacity-50 blur-sm transition-all duration-300 group-hover/btn:opacity-100" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;