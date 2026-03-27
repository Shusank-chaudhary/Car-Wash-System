import { motion } from "framer-motion";
import { Droplets, SprayCan, Sparkles, Clock, Shield, Star } from "lucide-react";

const services = [
  {
    icon: Droplets,
    title: "Exterior Wash",
    desc: "High-pressure rinse, foam wash, hand dry and tire clean for a showroom shine.",
  },
  {
    icon: SprayCan,
    title: "Interior Deep Clean",
    desc: "Vacuum, dashboard wipe, seat cleaning, and air freshener for a brand-new feel.",
  },
  {
    icon: Sparkles,
    title: "Premium Detailing",
    desc: "Full polish, ceramic coating, leather conditioning, and engine bay cleaning.",
  },
  {
    icon: Clock,
    title: "Real-Time Tracking",
    desc: "Track your vehicle's wash status live — from queue to completion.",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    desc: "Not satisfied? We'll re-wash your vehicle free of charge.",
  },
  {
    icon: Star,
    title: "Loyalty Rewards",
    desc: "Every 5th wash free. Premium members get exclusive discounts.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-2">Our Expertise</p>
          <h2 className="font-heading text-5xl md:text-6xl font-bold">
            ENGINEERED<br />
            <span className="text-gradient">PERFECTION.</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto">
            We don't just wash vehicles — we scientifically restore them using premium products and advanced techniques.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-glow"
            >
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-2 text-foreground">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
