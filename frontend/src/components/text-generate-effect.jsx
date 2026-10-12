import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "../lib/utils";

const TextGenerateEffect = ({
  words,
  className,
  filter = false,
  duration = 0.4,
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: duration,
        delay: stagger(0.08),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="text-white/80 opacity-0"
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="mt-2">
        <div className="text-white/80 text-base sm:text-lg leading-relaxed sm:text-center md:text-center lg:text-left font-normal">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};

export default TextGenerateEffect;
