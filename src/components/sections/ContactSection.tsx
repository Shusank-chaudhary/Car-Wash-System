import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-hero-gradient">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-2">Get in Touch</p>
          <h2 className="font-heading text-5xl md:text-6xl font-bold">
            CONTACT <span className="text-gradient">US</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              { icon: MapPin, title: "Location", text: "CleanRide Nepal, Tinkune, Kathmandu" },
              { icon: Phone, title: "Phone", text: "+977 9801234567" },
              { icon: Mail, title: "Email", text: "info@cleanridenepal.com" },
              { icon: Clock, title: "Hours", text: "Sun - Fri: 7 AM – 7 PM\nSat: 8 AM – 5 PM" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-foreground">{item.title}</h4>
                  <p className="font-body text-sm text-muted-foreground whitespace-pre-line">{item.text}</p>
                </div>
              </div>
            ))}

            <div className="flex gap-4 pt-4">
              {[Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden border border-border shadow-card min-h-[350px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5!2d85.342!3d27.688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQxJzE2LjgiTiA4NcKwMjAnMzEuMiJF!5e0!3m2!1sen!2snp!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "350px" }}
              allowFullScreen
              loading="lazy"
              title="CleanRide Nepal Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
