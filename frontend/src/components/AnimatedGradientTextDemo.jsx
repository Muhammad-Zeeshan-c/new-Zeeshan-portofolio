import { cn } from "../lib/utils";
import { AnimatedGradientText } from "./animate-gradient-text";
import { ChevronRight } from "lucide-react";

export function AnimatedGradientTextDemo() {
  return (
    <div className="group relative inline-flex items-center justify-center rounded-full px-4 py-1.5 bg-white/[0.04] border border-white/10 hover:border-[#00B4D8]/40 transition-all duration-300">
      <span
        className={cn(
          "absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#00B4D8]/20 via-[#66d0ef]/20 to-[#00B4D8]/20 bg-[length:200%_100%] animate-gradient p-[1px]"
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />
      <span className="mr-1.5 text-xs">✨</span>
      <AnimatedGradientText
        className="text-xs sm:text-sm font-medium"
        colorFrom="#00B4D8"
        colorTo="#66d0ef"
      >
        Innovation For the Future
      </AnimatedGradientText>
      <ChevronRight
        className="ml-1 size-3.5 text-[#00B4D8] transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
      />
    </div>
  );
}