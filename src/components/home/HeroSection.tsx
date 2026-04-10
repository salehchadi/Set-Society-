import { motion } from "motion/react";
import { IMAGES } from "../../assets/constants";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative h-[90vh] min-h-[700px] overflow-hidden bg-surface-container-low">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={IMAGES.hero}
          alt="The Modern Uniform"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="space-y-4"
        >
          <span className="font-script text-4xl md:text-5xl text-white block">
            New Season
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-[0.9] tracking-tight max-w-2xl">
            THE MODERN UNIFORM
          </h1>
          <Button
            className="mt-8 !bg-primary !text-white"
            onClick={() => navigate("/products")}
          >
            SHOP THE SET
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
