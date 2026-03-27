export type VehicleType = "car" | "suv" | "bike";
export type WashPackage = "basic" | "standard" | "premium";
export type WashStatus = "queued" | "in-progress" | "washing" | "drying" | "completed" | "cancelled";

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface WashBooking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  vehicleType: VehicleType;
  vehicleNumber: string;
  vehicleColor: string;
  washPackage: WashPackage;
  timeSlot: string;
  date: string;
  status: WashStatus;
  assignedStaff?: string;
  queuePosition?: number;
  createdAt: string;
  estimatedTime?: number; // minutes
}

export const packagePricing: Record<WashPackage, { name: string; price: number; duration: number; features: string[] }> = {
  basic: {
    name: "Basic Wash",
    price: 500,
    duration: 20,
    features: ["Exterior Wash", "Rinse & Dry", "Tire Cleaning"],
  },
  standard: {
    name: "Standard Wash",
    price: 1000,
    duration: 40,
    features: ["Exterior Wash", "Interior Vacuum", "Dashboard Wipe", "Tire Shine", "Air Freshener"],
  },
  premium: {
    name: "Premium Detail",
    price: 2000,
    duration: 75,
    features: ["Full Exterior Polish", "Interior Deep Clean", "Leather Conditioning", "Engine Bay Clean", "Ceramic Spray", "Tire Dressing"],
  },
};

export const vehicleTypeLabels: Record<VehicleType, string> = {
  car: "Car",
  suv: "SUV",
  bike: "Bike",
};

export const statusColors: Record<WashStatus, string> = {
  queued: "bg-yellow-500/20 text-yellow-400",
  "in-progress": "bg-blue-500/20 text-blue-400",
  washing: "bg-primary/20 text-primary",
  drying: "bg-purple-500/20 text-purple-400",
  completed: "bg-green-500/20 text-green-400",
  cancelled: "bg-destructive/20 text-destructive",
};

export const statusLabels: Record<WashStatus, string> = {
  queued: "In Queue",
  "in-progress": "In Progress",
  washing: "Washing",
  drying: "Drying",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let h = 7; h <= 19; h++) {
    const hour = h > 12 ? h - 12 : h;
    const ampm = h >= 12 ? "PM" : "AM";
    slots.push({
      id: `slot-${h}-00`,
      time: `${hour}:00 ${ampm}`,
      available: Math.random() > 0.3,
    });
    slots.push({
      id: `slot-${h}-30`,
      time: `${hour}:30 ${ampm}`,
      available: Math.random() > 0.3,
    });
  }
  return slots;
};

// Demo bookings
export const generateDemoBookings = (): WashBooking[] => [
  {
    id: "b1", customerId: "3", customerName: "Hari Bahadur", customerPhone: "+977 9812345678",
    vehicleType: "car", vehicleNumber: "BA 1 KHA 2345", vehicleColor: "White",
    washPackage: "premium", timeSlot: "10:00 AM", date: new Date().toISOString().split("T")[0],
    status: "washing", assignedStaff: "Ram", queuePosition: 1, createdAt: new Date().toISOString(), estimatedTime: 45,
  },
  {
    id: "b2", customerId: "4", customerName: "Sita Sharma", customerPhone: "+977 9823456789",
    vehicleType: "suv", vehicleNumber: "BA 2 PA 5678", vehicleColor: "Black",
    washPackage: "standard", timeSlot: "10:30 AM", date: new Date().toISOString().split("T")[0],
    status: "queued", assignedStaff: "Shyam", queuePosition: 2, createdAt: new Date().toISOString(), estimatedTime: 40,
  },
  {
    id: "b3", customerId: "5", customerName: "Bikash Thapa", customerPhone: "+977 9834567890",
    vehicleType: "bike", vehicleNumber: "BA 22 PA 1234", vehicleColor: "Red",
    washPackage: "basic", timeSlot: "11:00 AM", date: new Date().toISOString().split("T")[0],
    status: "queued", queuePosition: 3, createdAt: new Date().toISOString(), estimatedTime: 20,
  },
  {
    id: "b4", customerId: "6", customerName: "Anita KC", customerPhone: "+977 9845678901",
    vehicleType: "car", vehicleNumber: "BA 3 CHA 9012", vehicleColor: "Silver",
    washPackage: "premium", timeSlot: "9:00 AM", date: new Date().toISOString().split("T")[0],
    status: "completed", assignedStaff: "Ram", createdAt: new Date().toISOString(),
  },
  {
    id: "b5", customerId: "7", customerName: "Deepak Gurung", customerPhone: "+977 9856789012",
    vehicleType: "suv", vehicleNumber: "BA 1 JA 3456", vehicleColor: "Blue",
    washPackage: "standard", timeSlot: "11:30 AM", date: new Date().toISOString().split("T")[0],
    status: "in-progress", assignedStaff: "Shyam", queuePosition: 4, createdAt: new Date().toISOString(), estimatedTime: 35,
  },
];
