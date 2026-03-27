import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { useNavigate, Link } from "react-router-dom";
import {
  Car, Calendar, Clock, Package, Plus, Eye, LogOut, User,
  ChevronRight
} from "lucide-react";
import {
  WashBooking, WashPackage, VehicleType, generateTimeSlots,
  generateDemoBookings, packagePricing, vehicleTypeLabels,
  statusColors, statusLabels,
} from "@/lib/wash-data";

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<WashBooking[]>(generateDemoBookings);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<WashBooking | null>(null);

  // Booking form state
  const [vehicleType, setVehicleType] = useState<VehicleType>("car");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [washPackage, setWashPackage] = useState<WashPackage>("standard");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const timeSlots = generateTimeSlots();

  const handleLogout = () => { logout(); navigate("/"); };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: WashBooking = {
      id: `b-${Date.now()}`,
      customerId: user!.id,
      customerName: user!.name,
      customerPhone: user!.phone || "",
      vehicleType, vehicleNumber, vehicleColor, washPackage,
      timeSlot: selectedSlot, date: selectedDate,
      status: "queued",
      queuePosition: bookings.filter((b) => b.status !== "completed" && b.status !== "cancelled").length + 1,
      createdAt: new Date().toISOString(),
      estimatedTime: packagePricing[washPackage].duration,
    };
    setBookings([newBooking, ...bookings]);
    setShowBookingForm(false);
    setVehicleNumber(""); setVehicleColor(""); setSelectedSlot("");
  };

  const myBookings = bookings.filter((b) => b.customerId === user?.id || b.customerId === "3");
  const activeBookings = myBookings.filter((b) => b.status !== "completed" && b.status !== "cancelled");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="font-heading text-2xl tracking-wider">
            <span className="text-gradient">CLEAN</span><span className="text-foreground">RIDE</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <User size={16} /> <span className="font-body">{user?.name}</span>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors">
              <LogOut size={16} /> <span className="hidden sm:inline font-body">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome & Quick Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl text-foreground">
              Welcome, <span className="text-gradient">{user?.name?.split(" ")[0]}</span>
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-1">Manage your wash bookings and track vehicle status</p>
          </div>
          <button
            onClick={() => setShowBookingForm(!showBookingForm)}
            className="flex items-center gap-2 px-6 py-3 rounded-md font-heading text-sm tracking-wider bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus size={18} /> BOOK A WASH
          </button>
        </div>

        {/* Booking Form */}
        {showBookingForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-8 p-6 rounded-lg bg-card border border-border shadow-card"
          >
            <h2 className="font-heading text-2xl text-foreground mb-6">New Booking</h2>
            <form onSubmit={handleBook} className="space-y-6">
              {/* Vehicle Type */}
              <div>
                <label className="font-body text-sm text-muted-foreground mb-2 block">Vehicle Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["car", "suv", "bike"] as VehicleType[]).map((vt) => (
                    <button key={vt} type="button" onClick={() => setVehicleType(vt)}
                      className={`py-3 rounded-md font-body text-sm border transition-all ${
                        vehicleType === vt ? "bg-primary text-primary-foreground border-primary" : "bg-secondary border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {vehicleTypeLabels[vt]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-sm text-muted-foreground mb-1 block">Vehicle Number</label>
                  <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} required
                    placeholder="BA 1 KHA 2345"
                    className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="font-body text-sm text-muted-foreground mb-1 block">Vehicle Color</label>
                  <input type="text" value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} required
                    placeholder="White"
                    className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* Package */}
              <div>
                <label className="font-body text-sm text-muted-foreground mb-2 block">Wash Package</label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {(["basic", "standard", "premium"] as WashPackage[]).map((pkg) => (
                    <button key={pkg} type="button" onClick={() => setWashPackage(pkg)}
                      className={`p-4 rounded-md border text-left transition-all ${
                        washPackage === pkg ? "border-primary bg-primary/10" : "border-border bg-secondary hover:border-primary/30"
                      }`}
                    >
                      <div className="font-heading text-lg text-foreground">{packagePricing[pkg].name}</div>
                      <div className="font-body text-xs text-muted-foreground">{packagePricing[pkg].duration} min</div>
                      <div className="font-heading text-xl text-primary mt-1">Rs. {packagePricing[pkg].price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-sm text-muted-foreground mb-1 flex items-center gap-2">
                    <Calendar size={14} /> Select Date
                  </label>
                  <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required
                    className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div>
                <label className="font-body text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Clock size={14} /> Select Time Slot
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {timeSlots.map((slot) => (
                    <button key={slot.id} type="button" onClick={() => slot.available && setSelectedSlot(slot.time)}
                      disabled={!slot.available}
                      className={`px-2 py-2 rounded-md font-body text-xs border transition-all ${
                        selectedSlot === slot.time
                          ? "bg-primary text-primary-foreground border-primary"
                          : slot.available
                          ? "bg-secondary border-border text-muted-foreground hover:border-primary/50"
                          : "bg-muted border-border text-muted-foreground/30 cursor-not-allowed line-through"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button type="submit" disabled={!selectedSlot}
                  className="flex-1 py-3 rounded-md font-heading text-lg tracking-wider bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  CONFIRM BOOKING
                </button>
                <button type="button" onClick={() => setShowBookingForm(false)}
                  className="px-6 py-3 rounded-md font-body text-sm border border-border text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Active Bookings - Real-time tracking */}
        {activeBookings.length > 0 && (
          <div className="mb-8">
            <h2 className="font-heading text-2xl text-foreground mb-4 flex items-center gap-2">
              <Eye size={20} className="text-primary" /> Live Vehicle Status
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-lg bg-card border border-border shadow-card cursor-pointer hover:border-primary/30 transition-colors"
                  onClick={() => setSelectedBooking(booking)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Car size={18} className="text-primary" />
                      <span className="font-heading text-lg text-foreground">{booking.vehicleNumber}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full font-body text-xs ${statusColors[booking.status]}`}>
                      {statusLabels[booking.status]}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-muted rounded-full mb-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: "0%" }}
                      animate={{
                        width: booking.status === "queued" ? "15%" :
                               booking.status === "in-progress" ? "40%" :
                               booking.status === "washing" ? "65%" :
                               booking.status === "drying" ? "85%" : "100%"
                      }}
                      transition={{ duration: 1 }}
                    />
                  </div>

                  <div className="flex justify-between font-body text-xs text-muted-foreground">
                    <span>{packagePricing[booking.washPackage].name}</span>
                    <span>{booking.timeSlot}</span>
                  </div>
                  {booking.queuePosition && booking.status === "queued" && (
                    <p className="font-body text-xs text-primary mt-2">Queue position: #{booking.queuePosition}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Bookings History */}
        <div>
          <h2 className="font-heading text-2xl text-foreground mb-4 flex items-center gap-2">
            <Package size={20} className="text-primary" /> Booking History
          </h2>
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    {["Vehicle", "Package", "Date", "Time", "Status"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-body text-xs text-muted-foreground uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {myBookings.map((b) => (
                    <tr key={b.id} className="border-t border-border hover:bg-secondary/20 transition-colors cursor-pointer" onClick={() => setSelectedBooking(b)}>
                      <td className="px-4 py-3 font-body text-sm text-foreground">
                        <div className="flex items-center gap-2">
                          <Car size={14} className="text-muted-foreground" />
                          {b.vehicleNumber}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-body text-sm text-muted-foreground">{packagePricing[b.washPackage].name}</td>
                      <td className="px-4 py-3 font-body text-sm text-muted-foreground">{b.date}</td>
                      <td className="px-4 py-3 font-body text-sm text-muted-foreground">{b.timeSlot}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full font-body text-xs ${statusColors[b.status]}`}>{statusLabels[b.status]}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Booking Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedBooking(null)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-card border border-border rounded-lg p-6 w-full max-w-md shadow-card"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-heading text-2xl text-foreground mb-4">Booking Details</h3>
              <div className="space-y-3 font-body text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Vehicle</span><span className="text-foreground">{selectedBooking.vehicleNumber} ({selectedBooking.vehicleColor})</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="text-foreground">{vehicleTypeLabels[selectedBooking.vehicleType]}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Package</span><span className="text-foreground">{packagePricing[selectedBooking.washPackage].name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Price</span><span className="text-primary font-semibold">Rs. {packagePricing[selectedBooking.washPackage].price}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="text-foreground">{selectedBooking.date}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="text-foreground">{selectedBooking.timeSlot}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className={`px-2 py-1 rounded-full text-xs ${statusColors[selectedBooking.status]}`}>{statusLabels[selectedBooking.status]}</span></div>
                {selectedBooking.assignedStaff && <div className="flex justify-between"><span className="text-muted-foreground">Assigned Staff</span><span className="text-foreground">{selectedBooking.assignedStaff}</span></div>}
                {selectedBooking.estimatedTime && <div className="flex justify-between"><span className="text-muted-foreground">Est. Time</span><span className="text-foreground">{selectedBooking.estimatedTime} min</span></div>}
              </div>

              {/* Status timeline */}
              <div className="mt-6 pt-4 border-t border-border">
                <p className="font-body text-xs text-muted-foreground mb-3">Progress</p>
                <div className="flex items-center gap-1">
                  {(["queued", "in-progress", "washing", "drying", "completed"] as const).map((s, i) => {
                    const statuses = ["queued", "in-progress", "washing", "drying", "completed"];
                    const currentIdx = statuses.indexOf(selectedBooking.status);
                    const isActive = i <= currentIdx;
                    return (
                      <div key={s} className="flex-1 flex items-center gap-1">
                        <div className={`h-2 flex-1 rounded-full ${isActive ? "bg-primary" : "bg-muted"}`} />
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1">
                  <span className="font-body text-[10px] text-muted-foreground">Queue</span>
                  <span className="font-body text-[10px] text-muted-foreground">Done</span>
                </div>
              </div>

              <button onClick={() => setSelectedBooking(null)} className="w-full mt-6 py-2 rounded-md border border-border text-muted-foreground hover:text-foreground font-body text-sm transition-colors">
                Close
              </button>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CustomerDashboard;
