import { motion } from "framer-motion";
import { CalendarCheck, Car, Eye, Sparkles } from "lucide-react";

const steps = [
  { icon: CalendarCheck, title: "Book Online", desc: "Choose your package, pick a time slot, and book in seconds." },
  { icon: Car, title: "Drop Your Vehicle", desc: "Bring your car, SUV, or bike to our station at the booked time." },
  { icon: Eye, title: "Track in Real-Time", desc: "Watch your vehicle's status live — queued, washing, drying, done." },
  { icon: Sparkles, title: "Drive Away Clean", desc: "Pick up your sparkling vehicle, pay, and enjoy the ride." },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-2">Simple Process</p>
          <h2 className="font-heading text-5xl md:text-6xl font-bold">
            HOW IT <span className="text-gradient">WORKS</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="text-center relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
              )}

              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4 relative z-10">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="font-heading text-sm text-primary mb-1 tracking-wider">STEP {i + 1}</div>
              <h3 className="font-heading text-xl text-foreground mb-2">{step.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
