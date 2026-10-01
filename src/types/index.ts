export type AppointmentStatus = 'confirme' | 'en_attente' | 'termine' | 'annule';
export type PaymentStatus = 'paye' | 'partiel' | 'en_attente' | 'rembourse';
export type PaymentMethod = 'carte' | 'especes' | 'mobile_money' | 'virement';
export type ServiceCategory = 'Soins visage' | 'Massages' | 'Corps' | 'Ongles' | 'Beauté';

export type SubscriptionPlanId = 'essentiel' | 'studio' | 'signature';
export type SubscriptionStatus = 'active' | 'pending_payment' | 'cancelled';
export type BillingCycle = 'monthly' | 'yearly';

export interface Business {
  id: string;
  name: string;
  tagline: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  currency: string;
  vatRate: number;
  openingHours: {
    days: string;
    hours: string;
  }[];
  // Multi-tenant & Subscription fields
  planId?: SubscriptionPlanId;
  planName?: string;
  planPrice?: number;
  billingCycle?: BillingCycle;
  subscriptionStatus?: SubscriptionStatus;
  subscribedAt?: string;
  nextBillingDate?: string;
  ownerEmail?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  phone: string;
  instituteId: string; // The institute this manager belongs to
  subscriptionStatus?: SubscriptionStatus;
}

export interface Client {
  id: string;
  instituteId?: string; // Partitioned by institute
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate?: string;
  notes?: string;
  preferences?: string;
  allergies?: string;
  totalVisits: number;
  totalSpent: number;
  lastVisitDate: string;
  status: 'actif' | 'nouveau' | 'inactif' | 'vip';
  avatar?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  instituteId?: string; // Partitioned by institute
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: ServiceCategory;
  isActive: boolean;
  color?: string;
}

export interface Practitioner {
  id: string;
  instituteId?: string; // Partitioned by institute
  name: string;
  role: string;
  specialties: string[];
  avatar: string;
  email: string;
  phone: string;
  rating: number;
  isAvailable: boolean;
  workDays: string[];
  workingHours: string;
}

export interface Appointment {
  id: string;
  instituteId?: string; // Partitioned by institute
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  practitionerId: string;
  practitionerName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  durationMinutes: number;
  status: AppointmentStatus;
  price: number;
  notes?: string;
  paymentId?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  instituteId?: string; // Partitioned by institute
  appointmentId?: string;
  clientId: string;
  clientName: string;
  serviceName: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  date: string; // YYYY-MM-DD
  time: string;
  reference?: string;
}

export interface Activity {
  id: string;
  instituteId?: string; // Partitioned by institute
  type: 'reservation' | 'client' | 'paiement' | 'annulation' | 'termine';
  title: string;
  description: string;
  timestamp: string;
  amount?: number;
}

export interface Notification {
  id: string;
  instituteId?: string; // Partitioned by institute
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'booking' | 'payment' | 'reminder' | 'system';
  linkRoute?: string;
}

export interface ReportKPIs {
  totalRevenue: number;
  totalAppointments: number;
  newClients: number;
  averageCart: number;
  growthRevenue: string;
  growthAppointments: string;
}

export interface RevenueDataPoint {
  label: string;
  revenue: number;
  appointments: number;
}

export interface TopServiceData {
  name: string;
  category: ServiceCategory;
  count: number;
  revenue: number;
}

export interface PractitionerPerformance {
  practitionerName: string;
  appointmentsCount: number;
  revenueGenerated: number;
  occupancyRate: number;
}

export interface ReportDataset {
  period: 'today' | '7days' | '30days' | '90days';
  kpis: ReportKPIs;
  revenueSeries: RevenueDataPoint[];
  topServices: TopServiceData[];
  practitioners: PractitionerPerformance[];
}

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}
