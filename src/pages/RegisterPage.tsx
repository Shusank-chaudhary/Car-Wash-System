import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth, UserRole } from "@/lib/auth-context";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("customer");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email, password, role, phone);
    switch (role) {
      case "admin": navigate("/admin"); break;
      case "staff": navigate("/staff"); break;
      default: navigate("/dashboard"); break;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="font-heading text-4xl tracking-wider">
            <span className="text-gradient">CLEAN</span>
            <span className="text-foreground">RIDE</span>
          </Link>
          <p className="font-body text-muted-foreground mt-2">Create your account</p>
        </div>

        <div className="p-6 rounded-lg bg-card border border-border shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-body text-sm text-muted-foreground mb-1 block">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label className="font-body text-sm text-muted-foreground mb-1 block">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label className="font-body text-sm text-muted-foreground mb-1 block">Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required
                placeholder="+977 98XXXXXXXX"
                className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label className="font-body text-sm text-muted-foreground mb-1 block">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label className="font-body text-sm text-muted-foreground mb-2 block">I am a</label>
              <div className="grid grid-cols-3 gap-2">
                {(["customer", "staff", "admin"] as UserRole[]).map((r) => (
                  <button
                    key={r} type="button" onClick={() => setRole(r)}
                    className={`py-2 rounded-md font-body text-sm capitalize border transition-all ${
                      role === r
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full py-3 rounded-md font-heading text-lg tracking-wider bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              CREATE ACCOUNT
            </button>
          </form>

          <p className="text-center mt-4 font-body text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
