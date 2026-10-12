import React, { useMemo, memo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// Stable init callback for ParticlesProvider
const initParticles = async (engine) => {
  await loadSlim(engine);
};

const ParticlesBackground = memo(() => {
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
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            // Distance (in px) within which particles connect to mouse pointer
            distance: 200,
            links: {
              opacity: 0.6,
              color: "#00B4D8",
            },
          },
          push: {
            // Number of new particles spawned when clicked
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
          // Maximum distance between two particles to form a connecting line
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
          // Movement speed of the particles
          speed: 1.0,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            // Area in px for particle density calculation
            area: 900,
          },
          // Base quantity of particles generated
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
          // Size range (min and max radius in px)
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
