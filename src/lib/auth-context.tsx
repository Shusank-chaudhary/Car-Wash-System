import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "staff" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, role: UserRole, phone?: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo users for frontend
const demoUsers: (User & { password: string })[] = [
  { id: "1", name: "Admin User", email: "admin@cleanride.com", password: "admin123", role: "admin", phone: "+977 9801234567" },
  { id: "2", name: "Staff Ram", email: "staff@cleanride.com", password: "staff123", role: "staff", phone: "+977 9801234568" },
  { id: "3", name: "Customer Hari", email: "customer@cleanride.com", password: "customer123", role: "customer", phone: "+977 9801234569" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("carwash_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string): boolean => {
    const found = demoUsers.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem("carwash_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, _password: string, role: UserRole, phone?: string): boolean => {
    const newUser: User = { id: Date.now().toString(), name, email, role, phone };
    setUser(newUser);
    localStorage.setItem("carwash_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("carwash_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
