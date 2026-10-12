import React, { useMemo, memo, useRef, useEffect, useCallback } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// Stable init callback for ParticlesProvider
const initParticles = async (engine) => {
  await loadSlim(engine);
};

const ParticlesBackground = memo(() => {
  const containerRef = useRef(null);

  const particlesLoaded = useCallback(async (container) => {
    containerRef.current = container;
  }, []);

  // Listen for clicks strictly within the home section
  useEffect(() => {
    const homeSection = document.getElementById("home");
    if (!homeSection) return;

    const handleHomeClick = (e) => {
      // 1. If clicked on interactive elements (buttons, links, inputs, 3D card canvas), do NOT push particles
      if (
        e.target.closest(
          'button, a, input, textarea, select, [role="button"], .interactive-element, .lanyard-wrapper'
        )
      ) {
        return;
      }

      // 2. Click was on the home section background or whitespace: push 3 particles!
      const container = containerRef.current;
      if (container && container.particles) {
        const canvas = container.canvas?.domElement;
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          const pxRatio = container.retina?.pixelRatio || 1;
          const x = (e.clientX - rect.left) * pxRatio;
          const y = (e.clientY - rect.top) * pxRatio;
          container.particles.push(3, { x, y });
        }
      }
    };

    homeSection.addEventListener("click", handleHomeClick);
    return () => {
      homeSection.removeEventListener("click", handleHomeClick);
    };
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false, zIndex: 0 },
      background: {
        color: { value: "transparent" },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          onClick: {
            enable: false, // Disabled here so tsparticles does NOT attach global window listeners
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 200,
            links: {
              opacity: 0.6,
              color: "#00B4D8",
            },
          },
          push: {
            quantity: 3,
          },
        },
      },
      particles: {
        color: {
          value: "#00B4D8",
        },
        links: {
          color: "#00B4D8",
          distance: 140,
          enable: true,
          opacity: 0.25,
          width: 1.2,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1.0,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 900,
          },
          value: 150,
        },
        opacity: {
          value: 0.5,
          animation: {
            enable: true,
            speed: 0.6,
            minimumValue: 0.2,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1.2, max: 3 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto z-0">
      <ParticlesProvider init={initParticles}>
        <Particles
          id="tsparticles"
          options={options}
          particlesLoaded={particlesLoaded}
          className="absolute inset-0 w-full h-full"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        />
      </ParticlesProvider>
    </div>
  );
});

ParticlesBackground.displayName = "ParticlesBackground";

export default ParticlesBackground;
