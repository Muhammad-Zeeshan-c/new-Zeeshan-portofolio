// vite.config.js
import { defineConfig } from "file:///E:/portfolio%20zz/new-Zeeshan-portofolio/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///E:/portfolio%20zz/new-Zeeshan-portofolio/frontend/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - React & friends
          "react-vendor": ["react", "react-dom"],
          // Animation libraries
          "motion-vendor": ["framer-motion", "motion", "gsap"],
          // Three.js core
          "three-core": ["three"],
          // React Three Fiber ecosystem (sangat berat!)
          "r3f-vendor": [
            "@react-three/fiber",
            "@react-three/drei",
            "@react-three/rapier"
          ],
          // Spline (berat juga!)
          "spline-vendor": [
            "@splinetool/react-spline",
            "@splinetool/runtime"
          ],
          // Icons & UI
          "ui-vendor": [
            "react-icons",
            "lucide-react",
            "clsx",
            "tailwind-merge"
          ],
          // Mesh utilities
          "mesh-vendor": ["meshline"]
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1e3,
    // Optimize minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        // Remove console.log di production
        drop_debugger: true
      }
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "three",
      "@splinetool/react-spline",
      "@splinetool/runtime"
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxwb3J0Zm9saW8genpcXFxcbmV3LVplZXNoYW4tcG9ydG9mb2xpb1xcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxccG9ydGZvbGlvIHp6XFxcXG5ldy1aZWVzaGFuLXBvcnRvZm9saW9cXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3BvcnRmb2xpbyUyMHp6L25ldy1aZWVzaGFuLXBvcnRvZm9saW8vZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXHJcblxyXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAgICAgICAvLyBWZW5kb3IgY2h1bmtzIC0gUmVhY3QgJiBmcmllbmRzXHJcbiAgICAgICAgICAncmVhY3QtdmVuZG9yJzogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gQW5pbWF0aW9uIGxpYnJhcmllc1xyXG4gICAgICAgICAgJ21vdGlvbi12ZW5kb3InOiBbJ2ZyYW1lci1tb3Rpb24nLCAnbW90aW9uJywgJ2dzYXAnXSxcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gVGhyZWUuanMgY29yZVxyXG4gICAgICAgICAgJ3RocmVlLWNvcmUnOiBbJ3RocmVlJ10sXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIFJlYWN0IFRocmVlIEZpYmVyIGVjb3N5c3RlbSAoc2FuZ2F0IGJlcmF0ISlcclxuICAgICAgICAgICdyM2YtdmVuZG9yJzogW1xyXG4gICAgICAgICAgICAnQHJlYWN0LXRocmVlL2ZpYmVyJyxcclxuICAgICAgICAgICAgJ0ByZWFjdC10aHJlZS9kcmVpJyxcclxuICAgICAgICAgICAgJ0ByZWFjdC10aHJlZS9yYXBpZXInLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gU3BsaW5lIChiZXJhdCBqdWdhISlcclxuICAgICAgICAgICdzcGxpbmUtdmVuZG9yJzogW1xyXG4gICAgICAgICAgICAnQHNwbGluZXRvb2wvcmVhY3Qtc3BsaW5lJyxcclxuICAgICAgICAgICAgJ0BzcGxpbmV0b29sL3J1bnRpbWUnLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gSWNvbnMgJiBVSVxyXG4gICAgICAgICAgJ3VpLXZlbmRvcic6IFtcclxuICAgICAgICAgICAgJ3JlYWN0LWljb25zJyxcclxuICAgICAgICAgICAgJ2x1Y2lkZS1yZWFjdCcsXHJcbiAgICAgICAgICAgICdjbHN4JyxcclxuICAgICAgICAgICAgJ3RhaWx3aW5kLW1lcmdlJyxcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIE1lc2ggdXRpbGl0aWVzXHJcbiAgICAgICAgICAnbWVzaC12ZW5kb3InOiBbJ21lc2hsaW5lJ10sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvLyBJbmNyZWFzZSBjaHVuayBzaXplIHdhcm5pbmcgbGltaXRcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcclxuICAgIFxyXG4gICAgLy8gT3B0aW1pemUgbWluaWZpY2F0aW9uXHJcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxyXG4gICAgdGVyc2VyT3B0aW9uczoge1xyXG4gICAgICBjb21wcmVzczoge1xyXG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSwgLy8gUmVtb3ZlIGNvbnNvbGUubG9nIGRpIHByb2R1Y3Rpb25cclxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIFxyXG4gIC8vIE9wdGltaXplIGRlcGVuZGVuY2llc1xyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgaW5jbHVkZTogW1xyXG4gICAgICAncmVhY3QnLFxyXG4gICAgICAncmVhY3QtZG9tJyxcclxuICAgICAgJ2ZyYW1lci1tb3Rpb24nLFxyXG4gICAgICAndGhyZWUnLFxyXG4gICAgICAnQHNwbGluZXRvb2wvcmVhY3Qtc3BsaW5lJyxcclxuICAgICAgJ0BzcGxpbmV0b29sL3J1bnRpbWUnLFxyXG4gICAgXSxcclxuICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlVLFNBQVMsb0JBQW9CO0FBQ3RXLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBO0FBQUEsVUFFWixnQkFBZ0IsQ0FBQyxTQUFTLFdBQVc7QUFBQTtBQUFBLFVBR3JDLGlCQUFpQixDQUFDLGlCQUFpQixVQUFVLE1BQU07QUFBQTtBQUFBLFVBR25ELGNBQWMsQ0FBQyxPQUFPO0FBQUE7QUFBQSxVQUd0QixjQUFjO0FBQUEsWUFDWjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBO0FBQUEsVUFHQSxpQkFBaUI7QUFBQSxZQUNmO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQTtBQUFBLFVBR0EsYUFBYTtBQUFBLFlBQ1g7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUE7QUFBQSxVQUdBLGVBQWUsQ0FBQyxVQUFVO0FBQUEsUUFDNUI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSx1QkFBdUI7QUFBQTtBQUFBLElBR3ZCLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSLGNBQWM7QUFBQTtBQUFBLFFBQ2QsZUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBR0EsY0FBYztBQUFBLElBQ1osU0FBUztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
