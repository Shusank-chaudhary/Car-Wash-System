const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="font-heading text-2xl tracking-wider mb-2">
              <span className="text-gradient">CLEAN</span>
              <span className="text-foreground">RIDE</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium car wash & detailing services
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition">Basic Wash</a></li>
              <li><a href="#" className="hover:text-foreground transition">Premium Detailing</a></li>
              <li><a href="#" className="hover:text-foreground transition">Interior Cleaning</a></li>
              <li><a href="#" className="hover:text-foreground transition">Protective Coating</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition">Locations</a></li>
              <li><a href="#" className="hover:text-foreground transition">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>📞 +977-1-XXXX-XXXX</li>
              <li>📧 info@cleanride.com</li>
              <li>📍 Kathmandu, Nepal</li>
              <li>⏰ 8:00 AM - 8:00 PM</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CleanRide Nepal. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
