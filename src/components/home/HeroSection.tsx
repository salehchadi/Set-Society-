import { motion } from "motion/react";
import { IMAGES } from "../../assets/constants";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  // Animation variants
  const leftPanel = {
    animate: {
      x: ["-100%", "0%", "0%", "-35%"],
    },
  };

  const rightPanel = {
    animate: {
      x: ["100%", "0%", "0%", "35%"],
    },
  };

  const zipperPull = {
    animate: {
      y: ["100vh", "0vh", "0vh", "35vh"],
    },
  };

  const transitionConfig = {
    duration: 3.5,
    times: [0, 0.4, 0.6, 1], // 0 -> 40% (close), 40% -> 60% (pause), 60% -> 100% (open half)
    ease: "easeInOut",
  };

  return (
    <section className="relative h-[90vh] min-h-[700px] overflow-hidden bg-surface-container-low">
      {/* Background Image (coming soong) */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={IMAGES.hero}
          alt="Coming Soon"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      {/* Zipper Left Panel */}
      <motion.div
        variants={leftPanel}
        animate="animate"
        transition={transitionConfig}
        className="absolute left-0 top-0 w-1/2 h-full bg-[#0a0a0a] z-20 border-r border-[#222]"
        style={{ originX: 0 }}
      />

      {/* Zipper Right Panel */}
      <motion.div
        variants={rightPanel}
        animate="animate"
        transition={transitionConfig}
        className="absolute right-0 top-0 w-1/2 h-full bg-[#0a0a0a] z-20 border-l border-[#222]"
        style={{ originX: 1 }}
      />

      {/* Zipper Pull (Head) */}
      <motion.div
        variants={zipperPull}
        animate="animate"
        transition={transitionConfig}
        className="absolute left-1/2 top-0 -translate-x-1/2 z-30 flex flex-col items-center"
      >
        <div className="w-5 h-8 bg-zinc-400 rounded-sm shadow-[0_4px_10px_rgba(0,0,0,0.5)] border border-zinc-300 relative flex items-center justify-center">
          {/* Internal detail of zipper */}
          <div className="w-1 h-4 bg-zinc-600 rounded-full" />
        </div>
        {/* Zipper Tab */}
        <motion.div 
           initial={{ rotateX: 0 }}
           animate={{ rotateX: [0, -30, 0, 30] }}
           transition={{ duration: 3.5, times: [0, 0.4, 0.6, 1] }}
           className="w-3 h-10 bg-zinc-500 rounded-b-md shadow-lg -mt-1 origin-top border border-zinc-400"
        />
      </motion.div>

      {/* Content (Button) fading in after animation */}
      <div className="absolute inset-0 flex flex-col justify-end items-center p-8 md:p-16 z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.8 }}
          className="pointer-events-auto"
        >
          <Button
            className="!bg-white !text-black hover:!bg-gray-200 uppercase tracking-widest text-sm py-4 px-10 shadow-xl"
            onClick={() => navigate("/products")}
          >
            Shop Collection
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
