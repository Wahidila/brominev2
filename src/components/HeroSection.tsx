import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, CalendarDays } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import heroBg from "../assets/hero-bg.webp";

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 30, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const layer1X = useTransform(smoothX, [-0.5, 0.5], [15, -15]);
  const layer1Y = useTransform(smoothY, [-0.5, 0.5], [15, -15]);

  const layer2X = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const layer2Y = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  const layer3X = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const layer3Y = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  const bgX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-background">
        <img
          src={heroBg}
          alt="Conference Background"
          className="w-full h-full object-cover opacity-80"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="absolute inset-0 bg-background/40 hero-overlay" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            right: "-10%",
            top: "-20%",
            x: layer1X,
            y: layer1Y,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            left: "-15%",
            bottom: "-20%",
            x: layer2X,
            y: layer2Y,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)/0.6) 0%, transparent 70%)",
            right: "20%",
            bottom: "30%",
            x: layer3X,
            y: layer3Y,
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <motion.div
          className="absolute w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)/0.15) 0%, transparent 70%)",
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-primary font-display font-semibold tracking-[0.3em] uppercase text-sm mb-4">
            The 4th Brawijaya Medical Conference
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            BMC <span className="text-gradient">2026</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            Clinical Research Collaboration on Tuberculosis to Achieve Sustainable Global Goals
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground mb-12">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <CalendarDays className="text-primary" size={20} />
              <span className="font-medium">September 4–6, 2026</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <MapPin className="text-primary" size={20} />
              <span className="font-medium">Malang, Indonesia</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <CountdownTimer targetDate="2026-05-31T23:59:59" label="Early-Bird Deadline" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <motion.a
            href="#dates"
            className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-base hover:opacity-90 transition-opacity glow-orange"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(var(--primary)/0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Abstract
          </motion.a>
          <motion.a
            href="#preface"
            className="px-8 py-3.5 rounded-lg border border-border text-foreground font-display font-semibold text-base hover:bg-secondary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
