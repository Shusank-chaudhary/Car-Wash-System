import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-carwash.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Professional car wash service"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/70" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
      </div>

      {/* Animated water/light effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 20, ease: "linear" }}
        style={{
          background: "radial-gradient(ellipse at 50% 80%, hsl(var(--primary) / 0.3), transparent 70%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-body text-xs tracking-[0.2em] text-primary uppercase">
            Serving Kathmandu • Lalitpur • Bhaktapur
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] mb-6"
        >
          THE FUTURE
          <br />
          <span className="text-gradient">OF CLEAN.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-body text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto"
        >
          Nepal's premier car wash service. Real-time vehicle tracking, premium care for cars, SUVs & bikes. Book your wash in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-10 py-4 rounded-md font-heading text-xl tracking-wider bg-primary text-primary-foreground hover:opacity-90 transition-opacity animate-pulse-glow"
          >
            BOOK YOUR WASH
          </Link>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-10 py-4 rounded-md font-heading text-xl tracking-wider border border-border text-foreground hover:bg-secondary transition-colors backdrop-blur-sm"
          >
            VIEW PACKAGES
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 flex flex-col items-center text-muted-foreground"
      >
        <span className="font-body text-xs tracking-[0.3em] uppercase mb-2">Scroll</span>
        <ChevronDown size={24} />
      </motion.a>
    </section>
  );
};

export default HeroSection;
