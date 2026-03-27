import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(email, password);
    if (success) {
      const saved = JSON.parse(localStorage.getItem("carwash_user") || "{}");
      switch (saved.role) {
        case "admin": navigate("/admin"); break;
        case "staff": navigate("/staff"); break;
        default: navigate("/dashboard"); break;
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
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
          <p className="font-body text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        <div className="p-6 rounded-lg bg-card border border-border shadow-card">
          {error && (
            <div className="mb-4 p-3 rounded-md bg-destructive/10 border border-destructive/30 text-destructive font-body text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-body text-sm text-muted-foreground mb-1 block">Email</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                placeholder="admin@cleanride.com"
                className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label className="font-body text-sm text-muted-foreground mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full py-3 rounded-md font-heading text-lg tracking-wider bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              SIGN IN
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="font-body text-xs text-muted-foreground text-center mb-3">Demo Accounts:</p>
            <div className="space-y-1 font-body text-xs text-muted-foreground">
              <p><span className="text-primary">Admin:</span> admin@cleanride.com / admin123</p>
              <p><span className="text-primary">Staff:</span> staff@cleanride.com / staff123</p>
              <p><span className="text-primary">Customer:</span> customer@cleanride.com / customer123</p>
            </div>
          </div>

          <p className="text-center mt-4 font-body text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">Register</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
