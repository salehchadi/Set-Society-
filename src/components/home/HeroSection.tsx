import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import { IMAGES } from "../../assets/constants";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll within this 200vh section to drive the animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate the V-opening coordinates based on scroll progress
  // Fully closed (0%): The V is collapsed at the top (0,0)
  // Fully open (100%): The V top corners reach 50% height, and the V bottom point (zipper pull) reaches 82% height.
  // This matches the angle of the jacket in 'coming soon.jpg'
  const valTopY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const valY = useTransform(scrollYProgress, [0, 1], [0, 83]);

  // clipPath covers everything EXCEPT the V-opening.
  // Starts as a full rectangle (0 0, 50 0, 100 0, 100 100, 0 100)
  // Opens to (0 48%, 50 83%, 100 48%, 100 100%, 0 100%)
  const clipPath = useMotionTemplate`polygon(0% ${valTopY}%, 50% ${valY}%, 100% ${valTopY}%, 100% 100%, 0% 100%)`;

  // Position the zipper pull exactly at the bottom of the V
  const zipperTop = useMotionTemplate`${valY}%`;

  // Button opacity fades in towards the end of the scroll
  const buttonOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-[#05070A]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Background Image (coming soon image with the actual zipper teeth and text) */}
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Coming Soon"
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Dynamic Dark Overlay (Acts as the unzipping jacket) */}
        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 bg-[#05070A] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] z-20"
        >
          {/* Add a subtle internal shadow along the edges of the cut */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_50%,rgba(0,0,0,0.5)_100%)]" />
        </motion.div>

        {/* Zipper Pull (Head) overlaying the clip-path vertex */}
        <motion.div
          style={{ top: zipperTop }}
          className="absolute left-1/2 -translate-x-1/2 z-30 flex flex-col items-center -translate-y-[10%]"
        >
          <div className="w-6 h-9 bg-zinc-300 rounded-sm shadow-[0_4px_15px_rgba(0,0,0,0.8)] border-2 border-zinc-500 relative flex items-center justify-center">
            {/* Internal detail of zipper */}
            <div className="w-1.5 h-5 bg-zinc-700 rounded-full" />
          </div>
          {/* Zipper Tab hanging down */}
          <motion.div 
             style={{
                rotateX: useTransform(scrollYProgress, [0, 1], [0, 25])
             }}
             className="w-3.5 h-12 bg-[#9ca3af] rounded-b-md shadow-2xl -mt-1 origin-top border border-zinc-400 z-40"
          />
        </motion.div>

        {/* Content (Button) fading in after zipper is mostly open */}
        <div className="absolute inset-0 flex flex-col justify-end items-center p-8 md:p-16 z-50 pointer-events-none">
          <motion.div style={{ opacity: buttonOpacity }} className="pointer-events-auto">
            <Button
              className="!bg-white !text-black hover:!bg-gray-200 uppercase tracking-widest text-sm py-4 px-10 shadow-xl"
              onClick={() => navigate("/products")}
            >
              Shop Collection
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
