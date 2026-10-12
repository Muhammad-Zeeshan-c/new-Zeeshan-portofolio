import React from 'react';

const Skills = () => {
  const skillsList = ['React', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'LangChain', 'Hugging Face'];

  return (
    <div className="flex flex-row flex-wrap gap-2.5 mt-6 justify-center md:justify-start w-full">
      {skillsList.map((skill) => (
        <div
          key={skill}
          className="px-4 py-2 text-xs sm:text-sm text-white/90 font-medium transition-all duration-300 ease-in-out border rounded-full border-white/10 bg-white/[0.04] hover:bg-[#00B4D8]/10 hover:border-[#00B4D8]/50 hover:text-[#00B4D8] cursor-default"
        >
          {skill}
        </div>
      ))}
    </div>
  );
};

export default Skills;
