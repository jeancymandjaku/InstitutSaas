import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Business,
  User,
  Client,
  Service,
  Practitioner,
  Appointment,
  Payment,
  Notification,
  Activity,
  ReportDataset,
  ToastItem,
  ToastType,
  SubscriptionPlanId,
  BillingCycle,
} from '../types';
import {
  mockBusiness,
  mockUsers,
  mockTeam,
  mockServices,
  mockClients,
  mockAppointments,
  mockPayments,
  mockNotifications,
  mockActivities,
  mockReportsDatasets,
  TODAY_DATE,
} from '../data/mockData';
import { getStarterServicesForType } from '../utils/starterServices';

const INITIAL_INSTITUTE_ID = 'biz_velora_01';

interface AppContextType {
  // State
  business: Business;
  businesses: Business[];
  currentUser: User | null;
  users: User[];
  clients: Client[];
  services: Service[];
  team: Practitioner[];
  appointments: Appointment[];
  payments: Payment[];
  notifications: Notification[];
  activities: Activity[];
  reportPeriod: 'today' | '7days' | '30days' | '90days';
  currentReport: ReportDataset;
  
  // Navigation & Route
  currentRoute: string;
  selectedClientId: string | null;
  navigateTo: (route: string, clientId?: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // CRUD Actions
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  cancelAppointment: (id: string, reason?: string) => void;
  completeAppointment: (id: string) => void;
  rescheduleAppointment: (id: string, newDate: string, newTime: string) => void;

  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'totalVisits' | 'totalSpent' | 'lastVisitDate'>) => Client;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;

  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  toggleServiceActive: (id: string) => void;

  addPayment: (payment: Omit<Payment, 'id'>) => void;
  updatePaymentStatus: (id: string, status: Payment['status']) => void;

  updatePractitioner: (id: string, updates: Partial<Practitioner>) => void;
  updateBusiness: (updates: Partial<Business>) => void;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  setReportPeriod: (period: 'today' | '7days' | '30days' | '90days') => void;

  // Auth & Multi-Institute Session
  isAuthenticated: boolean;
  hasActiveSubscription: boolean;
  authTab: 'login' | 'register';
  setAuthTab: (tab: 'login' | 'register') => void;
  login: (email: string, password?: string) => boolean;
  loginDemo: () => void;
  registerManager: (data: {
    fullName: string;
    businessName: string;
    businessType?: string;
    city?: string;
    email: string;
    phone: string;
    password?: string;
    planId?: SubscriptionPlanId;
    billingCycle?: BillingCycle;
  }) => void;
  processSubscriptionPayment: (paymentData: {
    planId: SubscriptionPlanId;
    billingCycle: BillingCycle;
    paymentMethod: string;
    cardNumber?: string;
    cardHolder?: string;
  }) => Promise<boolean>;
  switchInstitute: (instituteId: string) => void;
  logout: () => void;

  // Modals & UI
  activeModal: string | null;
  modalData: any;
  openModal: (modal: string, data?: any) => void;
  closeModal: () => void;

  // Toasts
  toasts: ToastItem[];
  notify: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;

  // Computed metrics
  kpisToday: {
    revenue: number;
    appointmentsCount: number;
    newClientsCount: number;
    pendingPayments: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_PREFIX = 'velora_saas_v2_';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.warn('Storage save failed:', e);
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Multi-Institute Stores
  const [businesses, setBusinesses] = useState<Business[]>(() =>
    loadFromStorage('businesses', [mockBusiness])
  );

  const [users, setUsers] = useState<User[]>(() =>
    loadFromStorage('users', [mockUsers[0]])
  );

  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    loadFromStorage('currentUser', mockUsers[0])
  );

  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');

  // Master collections tagged by instituteId
  const [allClients, setAllClients] = useState<Client[]>(() => {
    const stored = loadFromStorage<Client[]>('clients', mockClients);
    return stored.map((c) => ({ ...c, instituteId: c.instituteId || INITIAL_INSTITUTE_ID }));
  });

  const [allServices, setAllServices] = useState<Service[]>(() => {
    const stored = loadFromStorage<Service[]>('services', mockServices);
    return stored.map((s) => ({ ...s, instituteId: s.instituteId || INITIAL_INSTITUTE_ID }));
  });

  const [allTeam, setAllTeam] = useState<Practitioner[]>(() => {
    const stored = loadFromStorage<Practitioner[]>('team', mockTeam);
    return stored.map((t) => ({ ...t, instituteId: t.instituteId || INITIAL_INSTITUTE_ID }));
  });

  const [allAppointments, setAllAppointments] = useState<Appointment[]>(() => {
    const stored = loadFromStorage<Appointment[]>('appointments', mockAppointments);
    return stored.map((a) => ({ ...a, instituteId: a.instituteId || INITIAL_INSTITUTE_ID }));
  });

  const [allPayments, setAllPayments] = useState<Payment[]>(() => {
    const stored = loadFromStorage<Payment[]>('payments', mockPayments);
    return stored.map((p) => ({ ...p, instituteId: p.instituteId || INITIAL_INSTITUTE_ID }));
  });

  const [allNotifications, setAllNotifications] = useState<Notification[]>(() => {
    const stored = loadFromStorage<Notification[]>('notifications', mockNotifications);
    return stored.map((n) => ({ ...n, instituteId: n.instituteId || INITIAL_INSTITUTE_ID }));
  });

  const [allActivities, setAllActivities] = useState<Activity[]>(() => {
    const stored = loadFromStorage<Activity[]>('activities', mockActivities);
    return stored.map((act) => ({ ...act, instituteId: act.instituteId || INITIAL_INSTITUTE_ID }));
  });

  const [reportPeriod, setReportPeriod] = useState<'today' | '7days' | '30days' | '90days'>('today');

  // Navigation
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Sync to local storage
  useEffect(() => { saveToStorage('businesses', businesses); }, [businesses]);
  useEffect(() => { saveToStorage('users', users); }, [users]);
  useEffect(() => { saveToStorage('currentUser', currentUser); }, [currentUser]);
  useEffect(() => { saveToStorage('clients', allClients); }, [allClients]);
  useEffect(() => { saveToStorage('services', allServices); }, [allServices]);
  useEffect(() => { saveToStorage('team', allTeam); }, [allTeam]);
  useEffect(() => { saveToStorage('appointments', allAppointments); }, [allAppointments]);
  useEffect(() => { saveToStorage('payments', allPayments); }, [allPayments]);
  useEffect(() => { saveToStorage('notifications', allNotifications); }, [allNotifications]);
  useEffect(() => { saveToStorage('activities', allActivities); }, [allActivities]);

  // Determine current active business based on currentUser's instituteId
  const currentInstituteId = currentUser?.instituteId || businesses[0]?.id || INITIAL_INSTITUTE_ID;
  const business: Business = businesses.find((b) => b.id === currentInstituteId) || businesses[0] || mockBusiness;

  const hasActiveSubscription = business.subscriptionStatus === 'active';

  // Strictly partitioned data for this institute only!
  const clients = allClients.filter((c) => (c.instituteId || INITIAL_INSTITUTE_ID) === currentInstituteId);
  const services = allServices.filter((s) => (s.instituteId || INITIAL_INSTITUTE_ID) === currentInstituteId);
  const team = allTeam.filter((t) => (t.instituteId || INITIAL_INSTITUTE_ID) === currentInstituteId);
  const appointments = allAppointments.filter((a) => (a.instituteId || INITIAL_INSTITUTE_ID) === currentInstituteId);
  const payments = allPayments.filter((p) => (p.instituteId || INITIAL_INSTITUTE_ID) === currentInstituteId);
  const notifications = allNotifications.filter((n) => (n.instituteId || INITIAL_INSTITUTE_ID) === currentInstituteId);
  const activities = allActivities.filter((act) => (act.instituteId || INITIAL_INSTITUTE_ID) === currentInstituteId);

  // Auth actions
  const login = (email: string, _password?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    setActiveModal(null);

    // 1. Marie Dupont / Demo account check
    if (
      cleanEmail.includes('marie') ||
      cleanEmail.includes('demo') ||
      cleanEmail === mockUsers[0].email.toLowerCase()
    ) {
      setCurrentUser(mockUsers[0]);
      notify(`Bienvenue Marie Dupont ! Connexion réussie.`);
      navigateTo('/app');
      return true;
    }

    // 2. Check for registered users
    const existingUser = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existingUser) {
      setCurrentUser(existingUser);
      const userBiz = businesses.find((b) => b.id === existingUser.instituteId);
      if (userBiz?.subscriptionStatus === 'pending_payment') {
        notify(`Bienvenue ${existingUser.name}. Finalisez votre abonnement pour débloquer votre espace.`, 'info');
        navigateTo('/checkout');
        return true;
      }
      notify(`Bienvenue ${existingUser.name} ! Connexion réussie.`);
      navigateTo('/app');
      return true;
    }

    // 3. Fallback for new email entered in demo
    const nameFromEmail = cleanEmail.split('@')[0];
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    
    const newBizId = 'biz_' + Date.now();
    const newBiz: Business = {
      ...mockBusiness,
      id: newBizId,
      name: `Institut ${formattedName}`,
      email: cleanEmail,
      planId: 'studio',
      planName: 'Studio & Institut',
      planPrice: 69,
      billingCycle: 'monthly',
      subscriptionStatus: 'pending_payment',
      ownerEmail: cleanEmail,
    };
    const newUser: User = {
      id: 'user_' + Date.now(),
      name: formattedName,
      email: cleanEmail,
      role: 'Directrice & Gestionnaire',
      avatar: '/src/assets/images/avatar_marie_dupont_1790707385423.jpg',
      phone: newBiz.phone,
      instituteId: newBizId,
      subscriptionStatus: 'pending_payment',
    };

    setBusinesses((prev) => [newBiz, ...prev]);
    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);

    notify(`Compte détecté. Veuillez finaliser votre abonnement pour débloquer votre espace.`, 'info');
    navigateTo('/checkout');
    return true;
  };

  const loginDemo = () => {
    setActiveModal(null);
    setCurrentUser(mockUsers[0]);
    notify(`Connecté avec succès en tant que Marie Dupont (Compte Démo).`);
    navigateTo('/app');
  };

  const registerManager = (data: {
    fullName: string;
    businessName: string;
    businessType?: string;
    city?: string;
    email: string;
    phone: string;
    password?: string;
    planId?: SubscriptionPlanId;
    billingCycle?: BillingCycle;
  }) => {
    setActiveModal(null);

    const newBizId = 'biz_' + Date.now();
    const selectedPlan: SubscriptionPlanId = data.planId || 'studio';
    const selectedCycle: BillingCycle = data.billingCycle || 'monthly';
    const planPrices = {
      essentiel: selectedCycle === 'yearly' ? 24 : 29,
      studio: selectedCycle === 'yearly' ? 55 : 69,
      signature: selectedCycle === 'yearly' ? 105 : 129,
    };
    const planNames = {
      essentiel: 'Essentiel',
      studio: 'Studio & Institut',
      signature: 'Spa & Signature',
    };

    const newBusiness: Business = {
      id: newBizId,
      name: data.businessName,
      tagline: data.businessType ? `Institut d'excellence · ${data.businessType}` : "L'art du soin et de la sérénité",
      address: 'Adresse de votre institut',
      city: data.city || 'Paris',
      country: 'France',
      phone: data.phone,
      email: data.email,
      website: `https://${data.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.velora.app`,
      currency: '€',
      vatRate: 20,
      openingHours: [
        { days: 'Mardi - Samedi', hours: '09:00 - 19:00' },
        { days: 'Dimanche - Lundi', hours: 'Fermé' },
      ],
      planId: selectedPlan,
      planName: planNames[selectedPlan],
      planPrice: planPrices[selectedPlan],
      billingCycle: selectedCycle,
      subscriptionStatus: 'pending_payment', // Must pass through payment!
      ownerEmail: data.email,
    };

    const newUser: User = {
      id: 'user_' + Date.now(),
      name: data.fullName,
      email: data.email,
      role: 'Directrice & Gestionnaire',
      avatar: '/src/assets/images/avatar_marie_dupont_1790707385423.jpg',
      phone: data.phone,
      instituteId: newBizId,
      subscriptionStatus: 'pending_payment',
    };

    // Primary practitioner
    const newPrac: Practitioner = {
      id: 'prac_' + Date.now(),
      instituteId: newBizId,
      name: data.fullName,
      role: 'Directrice & Praticienne principale',
      specialties: ['Diagnostic de peau', 'Soins experts', 'Accueil'],
      avatar: '/src/assets/images/avatar_marie_dupont_1790707385423.jpg',
      email: data.email,
      phone: data.phone,
      rating: 5.0,
      isAvailable: true,
      workDays: ['Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      workingHours: '09:00 - 19:00',
    };

    // Starter services tailored for their business category
    const starterServices: Service[] = getStarterServicesForType(data.businessType, newBizId);

    setBusinesses((prev) => [newBusiness, ...prev]);
    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setAllTeam((prev) => [newPrac, ...prev]);
    setAllServices((prev) => [...starterServices, ...prev]);

    notify(`Compte créé ! Veuillez finaliser le paiement pour activer votre espace.`, 'info');
    navigateTo('/checkout');
  };

  const processSubscriptionPayment = async (paymentData: {
    planId: SubscriptionPlanId;
    billingCycle: BillingCycle;
    paymentMethod: string;
    cardNumber?: string;
    cardHolder?: string;
  }): Promise<boolean> => {
    const planPrices = {
      essentiel: paymentData.billingCycle === 'yearly' ? 24 : 29,
      studio: paymentData.billingCycle === 'yearly' ? 55 : 69,
      signature: paymentData.billingCycle === 'yearly' ? 105 : 129,
    };
    const planNames = {
      essentiel: 'Essentiel',
      studio: 'Studio & Institut',
      signature: 'Spa & Signature',
    };

    const price = planPrices[paymentData.planId];
    const totalAmount = paymentData.billingCycle === 'yearly' ? price * 12 : price;

    const nextBilling = new Date();
    if (paymentData.billingCycle === 'yearly') {
      nextBilling.setFullYear(nextBilling.getFullYear() + 1);
    } else {
      nextBilling.setMonth(nextBilling.getMonth() + 1);
    }

    // Update active business subscription status
    setBusinesses((prev) =>
      prev.map((b) => {
        if (b.id === business.id) {
          return {
            ...b,
            planId: paymentData.planId,
            planName: planNames[paymentData.planId],
            planPrice: price,
            billingCycle: paymentData.billingCycle,
            subscriptionStatus: 'active' as const,
            subscribedAt: new Date().toISOString(),
            nextBillingDate: nextBilling.toISOString().split('T')[0],
          };
        }
        return b;
      })
    );

    // Update user subscription status
    if (currentUser) {
      const updatedUser: User = {
        ...currentUser,
        subscriptionStatus: 'active',
      };
      setCurrentUser(updatedUser);
      setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    }

    // Add subscription invoice payment transaction
    const invoicePayment: Payment = {
      id: 'sub_inv_' + Date.now(),
      instituteId: business.id,
      clientId: currentUser?.id || 'mgr_01',
      clientName: business.name,
      serviceName: `Abonnement Velora SaaS · ${planNames[paymentData.planId]} (${
        paymentData.billingCycle === 'yearly' ? 'Annuel' : 'Mensuel'
      })`,
      amount: totalAmount,
      method: (paymentData.paymentMethod as any) || 'carte',
      status: 'paye',
      date: TODAY_DATE,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      reference: 'INV-' + Math.floor(100000 + Math.random() * 900000),
    };
    setAllPayments((prev) => [invoicePayment, ...prev]);

    // Activity record
    const act: Activity = {
      id: 'act_' + Date.now(),
      instituteId: business.id,
      title: 'Abonnement activé',
      description: `Forfait ${planNames[paymentData.planId]} souscrit avec succès (${totalAmount} €)`,
      timestamp: "À l'instant",
      type: 'paiement',
      amount: totalAmount,
    };
    setAllActivities((prev) => [act, ...prev]);

    // Notification record
    const notif: Notification = {
      id: 'notif_' + Date.now(),
      instituteId: business.id,
      title: 'Votre espace Velora est activé !',
      message: `Paiement confirmé pour votre institut ${business.name}. Toutes vos fonctionnalités sont désormais débloquées.`,
      timestamp: "À l'instant",
      isRead: false,
      type: 'payment',
      linkRoute: '/app',
    };
    setAllNotifications((prev) => [notif, ...prev]);

    notify(`Paiement validé avec succès ! Bienvenue dans votre tableau de bord Velora.`, 'success');
    navigateTo('/app');
    return true;
  };

  const switchInstitute = (instituteId: string) => {
    const targetUser = users.find((u) => u.instituteId === instituteId) || mockUsers[0];
    setCurrentUser(targetUser);
    const targetBiz = businesses.find((b) => b.id === instituteId);
    notify(`Espace activé : ${targetBiz?.name || 'Institut'} (${targetUser.name})`);
    if (targetBiz?.subscriptionStatus === 'pending_payment') {
      navigateTo('/checkout');
    } else {
      navigateTo('/app');
    }
  };

  const logout = () => {
    setActiveModal(null);
    setCurrentUser(null);
    notify('Vous avez été déconnecté avec succès.', 'info');
    navigateTo('/');
  };

  // Toast notifier
  const notify = (message: string, type: ToastType = 'success') => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation helper
  const navigateTo = (route: string, clientId?: string) => {
    setCurrentRoute(route);
    if (clientId) {
      setSelectedClientId(clientId);
    } else {
      setSelectedClientId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modals
  const openModal = (modal: string, data?: any) => {
    setActiveModal(modal);
    setModalData(data || null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  // CRUD Actions stamped strictly with currentInstituteId
  const addAppointment = (item: Omit<Appointment, 'id' | 'createdAt'>) => {
    const id = 'apt_' + Date.now();
    const newAppointment: Appointment = {
      ...item,
      id,
      instituteId: currentInstituteId,
      createdAt: TODAY_DATE,
    };
    setAllAppointments((prev) => [newAppointment, ...prev]);

    const act: Activity = {
      id: 'act_' + Date.now(),
      instituteId: currentInstituteId,
      type: 'reservation',
      title: 'Nouveau rendez-vous',
      description: `${item.clientName} · ${item.serviceName} (${item.date} à ${item.time})`,
      timestamp: 'À l’instant',
      amount: item.price,
    };
    setAllActivities((prev) => [act, ...prev]);

    notify('Rendez-vous ajouté avec succès');
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAllAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt))
    );
    notify('Rendez-vous mis à jour');
  };

  const cancelAppointment = (id: string, reason?: string) => {
    setAllAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'annule' } : apt))
    );
    const act: Activity = {
      id: 'act_' + Date.now(),
      instituteId: currentInstituteId,
      type: 'annulation',
      title: 'Rendez-vous annulé',
      description: `Réservation annulée ${reason ? `(${reason})` : ''}`,
      timestamp: 'À l’instant',
    };
    setAllActivities((prev) => [act, ...prev]);
    notify('Rendez-vous annulé', 'warning');
  };

  const completeAppointment = (id: string) => {
    setAllAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'termine' } : apt))
    );
    const act: Activity = {
      id: 'act_' + Date.now(),
      instituteId: currentInstituteId,
      type: 'termine',
      title: 'Soin terminé',
      description: `Prestation effectuée avec succès`,
      timestamp: 'À l’instant',
    };
    setAllActivities((prev) => [act, ...prev]);
    notify('Rendez-vous marqué comme terminé');
  };

  const rescheduleAppointment = (id: string, newDate: string, newTime: string) => {
    setAllAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, date: newDate, time: newTime } : apt
      )
    );
    notify('Rendez-vous reprogrammé avec succès');
  };

  const addClient = (
    item: Omit<Client, 'id' | 'createdAt' | 'totalVisits' | 'totalSpent' | 'lastVisitDate'>
  ): Client => {
    const id = 'cli_' + Date.now();
    const newClient: Client = {
      ...item,
      id,
      instituteId: currentInstituteId,
      totalVisits: 0,
      totalSpent: 0,
      lastVisitDate: 'Jamais',
      status: 'nouveau',
      createdAt: TODAY_DATE,
    };
    setAllClients((prev) => [newClient, ...prev]);

    const act: Activity = {
      id: 'act_' + Date.now(),
      instituteId: currentInstituteId,
      type: 'client',
      title: 'Nouvelle cliente inscrite',
      description: `${item.firstName} ${item.lastName} a été ajoutée`,
      timestamp: 'À l’instant',
    };
    setAllActivities((prev) => [act, ...prev]);

    notify(`Cliente ${item.firstName} ${item.lastName} ajoutée`);
    return newClient;
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setAllClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    notify('Fiche client mise à jour');
  };

  const deleteClient = (id: string) => {
    setAllClients((prev) => prev.filter((c) => c.id !== id));
    notify('Cliente supprimée de votre fichier', 'info');
  };

  const addService = (item: Omit<Service, 'id'>) => {
    const id = 'srv_' + Date.now();
    const newService: Service = {
      ...item,
      id,
      instituteId: currentInstituteId,
    };
    setAllServices((prev) => [newService, ...prev]);
    notify('Prestation ajoutée au catalogue');
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setAllServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
    notify('Prestation mise à jour');
  };

  const deleteService = (id: string) => {
    setAllServices((prev) => prev.filter((s) => s.id !== id));
    notify('Prestation supprimée', 'info');
  };

  const toggleServiceActive = (id: string) => {
    setAllServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
    notify('Statut du service modifié');
  };

  const addPayment = (item: Omit<Payment, 'id'>) => {
    const id = 'pay_' + Date.now();
    const newPayment: Payment = {
      ...item,
      id,
      instituteId: currentInstituteId,
      reference: item.reference || `REF-${Date.now().toString().slice(-6)}`,
    };
    setAllPayments((prev) => [newPayment, ...prev]);

    if (item.appointmentId) {
      setAllAppointments((prev) =>
        prev.map((apt) =>
          apt.id === item.appointmentId ? { ...apt, paymentId: id } : apt
        )
      );
    }

    const newAct: Activity = {
      id: 'act_' + Date.now(),
      instituteId: currentInstituteId,
      type: 'paiement',
      title: 'Paiement enregistré',
      description: `${item.clientName} · €${item.amount} (${item.method.replace('_', ' ')})`,
      timestamp: 'À l’instant',
      amount: item.amount,
    };
    setAllActivities((prev) => [newAct, ...prev]);

    notify('Paiement enregistré avec succès');
  };

  const updatePaymentStatus = (id: string, status: Payment['status']) => {
    setAllPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
    notify('Statut du paiement mis à jour');
  };

  const updatePractitioner = (id: string, updates: Partial<Practitioner>) => {
    setAllTeam((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
    notify('Informations praticien enregistrées');
  };

  const updateBusiness = (updates: Partial<Business>) => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === currentInstituteId ? { ...b, ...updates } : b))
    );
    notify('Paramètres de l’institut enregistrés');
  };

  const markNotificationRead = (id: string) => {
    setAllNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setAllNotifications((prev) =>
      prev.map((n) => (n.instituteId === currentInstituteId ? { ...n, isRead: true } : n))
    );
    notify('Toutes les notifications marquées comme lues', 'info');
  };

  // Dynamic KPIs for today based on current institute's state
  const todayAppointments = appointments.filter((a) => a.date === TODAY_DATE);
  const todayPayments = payments.filter((p) => p.date === TODAY_DATE);
  const paidToday = todayPayments
    .filter((p) => p.status === 'paye')
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingPaymentsAmount = payments
    .filter((p) => p.status === 'en_attente')
    .reduce((sum, p) => sum + p.amount, 0);
  const newClientsCount = clients.filter((c) => c.status === 'nouveau').length;

  // Report dataset
  const currentReport: ReportDataset = currentInstituteId === INITIAL_INSTITUTE_ID
    ? mockReportsDatasets[reportPeriod]
    : {
        period: reportPeriod,
        kpis: {
          totalRevenue: payments.filter((p) => p.status === 'paye').reduce((s, p) => s + p.amount, 0),
          totalAppointments: appointments.length,
          newClients: clients.length,
          averageCart: payments.length > 0
            ? Math.round(payments.reduce((s, p) => s + p.amount, 0) / payments.length)
            : 0,
          growthRevenue: '+12.4%',
          growthAppointments: '+8.1%',
        },
        revenueSeries: [
          { label: 'Semaine 1', revenue: 1240, appointments: 14 },
          { label: 'Semaine 2', revenue: 1580, appointments: 19 },
          { label: 'Semaine 3', revenue: 1820, appointments: 22 },
          { label: 'Semaine 4', revenue: 2150, appointments: 26 },
        ],
        topServices: services.slice(0, 4).map((s, idx) => ({
          name: s.name,
          category: s.category,
          count: 12 - idx * 2,
          revenue: (12 - idx * 2) * s.price,
        })),
        practitioners: team.map((t) => ({
          practitionerName: t.name,
          appointmentsCount: appointments.filter((a) => a.practitionerName === t.name).length || 5,
          revenueGenerated: 640,
          occupancyRate: 85,
        })),
      };

  return (
    <AppContext.Provider
      value={{
        business,
        businesses,
        currentUser,
        users,
        isAuthenticated: !!currentUser,
        hasActiveSubscription,
        authTab,
        setAuthTab,
        login,
        loginDemo,
        registerManager,
        processSubscriptionPayment,
        switchInstitute,
        logout,
        clients,
        services,
        team,
        appointments,
        payments,
        notifications,
        activities,
        reportPeriod,
        currentReport,
        currentRoute,
        selectedClientId,
        navigateTo,
        searchQuery,
        setSearchQuery,
        addAppointment,
        updateAppointment,
        cancelAppointment,
        completeAppointment,
        rescheduleAppointment,
        addClient,
        updateClient,
        deleteClient,
        addService,
        updateService,
        deleteService,
        toggleServiceActive,
        addPayment,
        updatePaymentStatus,
        updatePractitioner,
        updateBusiness,
        markNotificationRead,
        markAllNotificationsRead,
        setReportPeriod,
        activeModal,
        modalData,
        openModal,
        closeModal,
        toasts,
        notify,
        removeToast,
        kpisToday: {
          revenue: paidToday,
          appointmentsCount: todayAppointments.length,
          newClientsCount,
          pendingPayments: pendingPaymentsAmount,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
