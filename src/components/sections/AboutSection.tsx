import { motion } from "framer-motion";
import { Shield, Award, Users, Clock } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";

const stats = [
  { icon: Shield, label: "Vehicles Washed", value: "15,000+" },
  { icon: Award, label: "Years Experience", value: "8+" },
  { icon: Users, label: "Happy Customers", value: "5,000+" },
  { icon: Clock, label: "Avg. Wait Time", value: "15 min" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-card">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs tracking-[0.3em] text-primary uppercase">Who We Are</span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold mt-2 mb-4">
            ABOUT <span className="text-gradient">CLEANRIDE</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nepal's most trusted car wash service — combining cutting-edge technology with premium hand-wash care.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-card">
              <img
                src={aboutTeam}
                alt="CleanRide Nepal professional team"
                className="w-full h-80 object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="font-heading text-2xl md:text-3xl font-bold">
              PREMIUM CARE FOR YOUR VEHICLE
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Founded in Kathmandu, CleanRide Nepal has been setting the standard for professional vehicle care across the valley. Our team of trained specialists uses eco-friendly products and advanced equipment to deliver a spotless finish every time.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From quick exterior washes to full interior detailing, we handle cars, SUVs, and bikes with equal precision. Our real-time tracking system lets you monitor your vehicle's progress from booking to completion.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Eco-Friendly", "Real-Time Tracking", "Trained Staff", "Premium Products"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-xs font-body tracking-wider border border-primary/30 text-primary bg-primary/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-xl bg-secondary/50 border border-border"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-heading text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="font-body text-xs tracking-wider text-muted-foreground uppercase mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
