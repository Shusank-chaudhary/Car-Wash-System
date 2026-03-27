import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { useNavigate, Link } from "react-router-dom";
import {
  Car, LogOut, User, ChevronRight, Play, CheckCircle, Clock,
  Droplets, Wind
} from "lucide-react";
import {
  WashBooking, WashStatus, generateDemoBookings, packagePricing,
  vehicleTypeLabels, statusColors, statusLabels,
} from "@/lib/wash-data";

const statusFlow: WashStatus[] = ["queued", "in-progress", "washing", "drying", "completed"];

const StaffDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<WashBooking[]>(generateDemoBookings);
  const [filter, setFilter] = useState<"all" | WashStatus>("all");

  const handleLogout = () => { logout(); navigate("/"); };

  const advanceStatus = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const currentIdx = statusFlow.indexOf(b.status);
        if (currentIdx < statusFlow.length - 1) {
          return { ...b, status: statusFlow[currentIdx + 1], assignedStaff: user?.name };
        }
        return b;
      })
    );
  };

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
  const queuedCount = bookings.filter((b) => b.status === "queued").length;
  const inProgressCount = bookings.filter((b) => ["in-progress", "washing", "drying"].includes(b.status)).length;
  const completedCount = bookings.filter((b) => b.status === "completed").length;

  const getStatusIcon = (status: WashStatus) => {
    switch (status) {
      case "queued": return <Clock size={16} />;
      case "in-progress": return <Play size={16} />;
      case "washing": return <Droplets size={16} />;
      case "drying": return <Wind size={16} />;
      case "completed": return <CheckCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="font-heading text-2xl tracking-wider">
            <span className="text-gradient">CLEAN</span><span className="text-foreground">RIDE</span>
            <span className="font-body text-xs text-muted-foreground ml-2">Staff Panel</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <User size={16} /> <span className="font-body">{user?.name}</span>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "In Queue", count: queuedCount, color: "text-yellow-400" },
            { label: "In Progress", count: inProgressCount, color: "text-primary" },
            { label: "Completed", count: completedCount, color: "text-green-400" },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-lg bg-card border border-border text-center">
              <div className={`font-heading text-3xl ${s.color}`}>{s.count}</div>
              <div className="font-body text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[{ key: "all", label: "All" }, ...statusFlow.map((s) => ({ key: s, label: statusLabels[s] }))].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className={`px-4 py-2 rounded-md font-body text-xs whitespace-nowrap border transition-all ${
                filter === f.key ? "bg-primary text-primary-foreground border-primary" : "bg-secondary border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Vehicle Queue */}
        <h2 className="font-heading text-2xl text-foreground mb-4">Vehicle Queue</h2>
        <div className="space-y-3">
          {filtered.map((booking) => (
            <motion.div
              key={booking.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 rounded-lg bg-card border border-border shadow-card flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusColors[booking.status]}`}>
                  {getStatusIcon(booking.status)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Car size={14} className="text-muted-foreground" />
                    <span className="font-heading text-lg text-foreground">{booking.vehicleNumber}</span>
                    <span className="font-body text-xs text-muted-foreground">({vehicleTypeLabels[booking.vehicleType]})</span>
                  </div>
                  <div className="font-body text-xs text-muted-foreground">
                    {booking.customerName} • {booking.timeSlot} • {packagePricing[booking.washPackage].name}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full font-body text-xs ${statusColors[booking.status]}`}>
                  {statusLabels[booking.status]}
                </span>
                {booking.status !== "completed" && booking.status !== "cancelled" && (
                  <button
                    onClick={() => advanceStatus(booking.id)}
                    className="flex items-center gap-1 px-4 py-2 rounded-md bg-primary text-primary-foreground font-body text-xs hover:opacity-90 transition-opacity"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground font-body">No vehicles found</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
