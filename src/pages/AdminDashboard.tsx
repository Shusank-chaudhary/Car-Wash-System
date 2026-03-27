import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { useNavigate, Link } from "react-router-dom";
import {
  Car, LogOut, User, Users, DollarSign, BarChart3,
  Calendar, Clock, Settings, ChevronRight, Trash2, Play, CheckCircle,
  Droplets, Wind, TrendingUp, Package
} from "lucide-react";
import {
  WashBooking, WashStatus, generateDemoBookings, packagePricing,
  vehicleTypeLabels, statusColors, statusLabels,
} from "@/lib/wash-data";

const statusFlow: WashStatus[] = ["queued", "in-progress", "washing", "drying", "completed"];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<WashBooking[]>(generateDemoBookings);
  const [activeTab, setActiveTab] = useState<"overview" | "queue" | "bookings" | "settings">("overview");

  const handleLogout = () => { logout(); navigate("/"); };

  const advanceStatus = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const currentIdx = statusFlow.indexOf(b.status);
        if (currentIdx < statusFlow.length - 1) return { ...b, status: statusFlow[currentIdx + 1] };
        return b;
      })
    );
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.map((b) => b.id === bookingId ? { ...b, status: "cancelled" as WashStatus } : b));
  };

  const queuedCount = bookings.filter((b) => b.status === "queued").length;
  const activeCount = bookings.filter((b) => ["in-progress", "washing", "drying"].includes(b.status)).length;
  const completedCount = bookings.filter((b) => b.status === "completed").length;
  const todayRevenue = bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + packagePricing[b.washPackage].price, 0);

  const tabs = [
    { key: "overview", label: "Overview", icon: BarChart3 },
    { key: "queue", label: "Live Queue", icon: Car },
    { key: "bookings", label: "All Bookings", icon: Calendar },
    { key: "settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="font-heading text-2xl tracking-wider">
            <span className="text-gradient">CLEAN</span><span className="text-foreground">RIDE</span>
            <span className="font-body text-xs text-primary ml-2 px-2 py-0.5 rounded bg-primary/10">Admin</span>
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

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 font-body text-sm border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div>
            <h1 className="font-heading text-3xl text-foreground mb-6">Dashboard Overview</h1>

            {/* Stats cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "In Queue", value: queuedCount, icon: Clock, color: "text-yellow-400" },
                { label: "Active Washes", value: activeCount, icon: Droplets, color: "text-primary" },
                { label: "Completed Today", value: completedCount, icon: CheckCircle, color: "text-green-400" },
                { label: "Today's Revenue", value: `Rs. ${todayRevenue.toLocaleString()}`, icon: DollarSign, color: "text-primary" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-lg bg-card border border-border shadow-card"
                >
                  <div className="flex items-center justify-between mb-2">
                    <s.icon size={20} className={s.color} />
                    <TrendingUp size={14} className="text-green-400" />
                  </div>
                  <div className={`font-heading text-3xl ${s.color}`}>{s.value}</div>
                  <div className="font-body text-xs text-muted-foreground mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent activity */}
            <h2 className="font-heading text-2xl text-foreground mb-4">Recent Activity</h2>
            <div className="space-y-2">
              {bookings.slice(0, 5).map((b) => (
                <div key={b.id} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                  <div className="flex items-center gap-3">
                    <Car size={16} className="text-muted-foreground" />
                    <div>
                      <span className="font-body text-sm text-foreground">{b.customerName}</span>
                      <span className="font-body text-xs text-muted-foreground ml-2">{b.vehicleNumber}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-body text-xs text-muted-foreground">{b.timeSlot}</span>
                    <span className={`px-2 py-1 rounded-full font-body text-xs ${statusColors[b.status]}`}>{statusLabels[b.status]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LIVE QUEUE TAB */}
        {activeTab === "queue" && (
          <div>
            <h1 className="font-heading text-3xl text-foreground mb-6">Live Vehicle Queue</h1>
            <div className="space-y-3">
              {bookings
                .filter((b) => b.status !== "completed" && b.status !== "cancelled")
                .map((booking) => (
                  <motion.div
                    key={booking.id}
                    layout
                    className="p-4 rounded-lg bg-card border border-border shadow-card flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusColors[booking.status]}`}>
                        <Car size={18} />
                      </div>
                      <div>
                        <div className="font-heading text-lg text-foreground">{booking.vehicleNumber}</div>
                        <div className="font-body text-xs text-muted-foreground">
                          {booking.customerName} • {vehicleTypeLabels[booking.vehicleType]} • {booking.vehicleColor}
                        </div>
                        <div className="font-body text-xs text-muted-foreground">
                          {packagePricing[booking.washPackage].name} • {booking.timeSlot}
                          {booking.assignedStaff && ` • Staff: ${booking.assignedStaff}`}
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="flex-1 max-w-xs">
                      <div className="flex gap-1">
                        {statusFlow.map((s, i) => {
                          const currentIdx = statusFlow.indexOf(booking.status);
                          return (
                            <div key={s} className={`h-2 flex-1 rounded-full ${i <= currentIdx ? "bg-primary" : "bg-muted"}`} />
                          );
                        })}
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="font-body text-[10px] text-muted-foreground">Queue</span>
                        <span className="font-body text-[10px] text-muted-foreground">Done</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full font-body text-xs ${statusColors[booking.status]}`}>
                        {statusLabels[booking.status]}
                      </span>
                      <button onClick={() => advanceStatus(booking.id)}
                        className="flex items-center gap-1 px-3 py-2 rounded-md bg-primary text-primary-foreground font-body text-xs hover:opacity-90"
                      >
                        Next <ChevronRight size={12} />
                      </button>
                      <button onClick={() => cancelBooking(booking.id)}
                        className="p-2 rounded-md border border-border text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* ALL BOOKINGS TAB */}
        {activeTab === "bookings" && (
          <div>
            <h1 className="font-heading text-3xl text-foreground mb-6">All Bookings</h1>
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      {["Customer", "Vehicle", "Package", "Price", "Time", "Staff", "Status", "Actions"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left font-body text-xs text-muted-foreground uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} className="border-t border-border hover:bg-secondary/20 transition-colors">
                        <td className="px-4 py-3 font-body text-sm text-foreground">
                          <div>{b.customerName}</div>
                          <div className="text-xs text-muted-foreground">{b.customerPhone}</div>
                        </td>
                        <td className="px-4 py-3 font-body text-sm text-foreground">
                          {b.vehicleNumber}
                          <div className="text-xs text-muted-foreground">{vehicleTypeLabels[b.vehicleType]} • {b.vehicleColor}</div>
                        </td>
                        <td className="px-4 py-3 font-body text-sm text-muted-foreground">{packagePricing[b.washPackage].name}</td>
                        <td className="px-4 py-3 font-body text-sm text-primary font-semibold">Rs. {packagePricing[b.washPackage].price}</td>
                        <td className="px-4 py-3 font-body text-sm text-muted-foreground">
                          {b.date}<br />{b.timeSlot}
                        </td>
                        <td className="px-4 py-3 font-body text-sm text-muted-foreground">{b.assignedStaff || "—"}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full font-body text-xs ${statusColors[b.status]}`}>{statusLabels[b.status]}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {b.status !== "completed" && b.status !== "cancelled" && (
                              <button onClick={() => advanceStatus(b.id)} className="p-1.5 rounded bg-primary/10 text-primary hover:bg-primary/20">
                                <ChevronRight size={14} />
                              </button>
                            )}
                            {b.status !== "cancelled" && (
                              <button onClick={() => cancelBooking(b.id)} className="p-1.5 rounded bg-destructive/10 text-destructive hover:bg-destructive/20">
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="max-w-2xl">
            <h1 className="font-heading text-3xl text-foreground mb-6">Settings</h1>
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="font-heading text-xl text-foreground mb-4">Business Info</h3>
                <div className="space-y-3">
                  <div>
                    <label className="font-body text-sm text-muted-foreground mb-1 block">Business Name</label>
                    <input type="text" defaultValue="CleanRide Nepal" className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="font-body text-sm text-muted-foreground mb-1 block">Phone</label>
                    <input type="tel" defaultValue="+977 9801234567" className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="font-body text-sm text-muted-foreground mb-1 block">Operating Hours</label>
                    <input type="text" defaultValue="7:00 AM - 7:00 PM" className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="font-heading text-xl text-foreground mb-4">Package Pricing</h3>
                <div className="space-y-3">
                  {(["basic", "standard", "premium"] as const).map((pkg) => (
                    <div key={pkg} className="flex items-center justify-between p-3 rounded-md bg-secondary">
                      <div>
                        <span className="font-body text-sm text-foreground">{packagePricing[pkg].name}</span>
                        <span className="font-body text-xs text-muted-foreground ml-2">({packagePricing[pkg].duration} min)</span>
                      </div>
                      <span className="font-heading text-lg text-primary">Rs. {packagePricing[pkg].price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-3 rounded-md font-heading text-lg tracking-wider bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                SAVE CHANGES
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
