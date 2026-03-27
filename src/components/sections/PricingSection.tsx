import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { packagePricing, WashPackage } from "@/lib/wash-data";

const tiers: { key: WashPackage; popular?: boolean }[] = [
  { key: "basic" },
  { key: "standard", popular: true },
  { key: "premium" },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="section-padding bg-hero-gradient">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-2">Transparent Pricing</p>
          <h2 className="font-heading text-5xl md:text-6xl font-bold">
            CHOOSE YOUR <span className="text-gradient">PACKAGE</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => {
            const pkg = packagePricing[tier.key];
            return (
              <motion.div
                key={tier.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-6 rounded-lg border transition-all duration-300 ${
                  tier.popular
                    ? "bg-card border-primary shadow-glow scale-105"
                    : "bg-card border-border shadow-card hover:border-primary/30"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground font-body text-xs font-semibold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6 pt-2">
                  <h3 className="font-heading text-2xl text-foreground mb-1">{pkg.name}</h3>
                  <p className="font-body text-xs text-muted-foreground mb-4">{pkg.duration} min</p>
                  <div className="font-heading text-5xl text-foreground">
                    Rs. {pkg.price.toLocaleString()}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className={`block w-full text-center py-3 rounded-md font-heading text-lg tracking-wider transition-all ${
                    tier.popular
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border border-border text-foreground hover:bg-secondary"
                  }`}
                >
                  Book Now
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
