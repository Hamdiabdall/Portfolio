// @flow strict
import { blogs } from "@/utils/data/blogs";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";

function BlogSection() {
  return (
    <div id="blog" className="relative z-50 border-t my-16 lg:my-32 border-[#25213b]">
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
            Blog
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-8">
        {blogs.map((blog) => (
          <Link 
            href={blog.link} 
            key={blog.id}
            target="_blank"
            className="group"
          >
            <div className="bg-[#0F0C41] rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:rotate-1 hover:shadow-xl">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transform transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C41] to-transparent opacity-50" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#16f2b3] text-sm mb-4">
                  <FaCalendarAlt size={14} />
                  <span>{blog.date}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#16f2b3] transition-colors duration-300">
                  {blog.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {blog.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-[#1a1443] text-violet-300 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center text-violet-400 group-hover:text-[#16f2b3] transition-colors duration-300">
                  <span className="mr-2">Lire plus</span>
                  <BsArrowRight className="transform transition-all duration-300 group-hover:translate-x-2" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BlogSection; 