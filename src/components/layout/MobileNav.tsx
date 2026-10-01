import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Calendar,
  Users,
  CalendarCheck,
  Sparkles,
  UserCheck,
  CreditCard,
  BarChart3,
  Settings,
  X,
  ShieldCheck,
  LogOut,
} from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { currentRoute, navigateTo, currentUser, appointments, logout } = useApp();

  if (!isOpen) return null;

  const pendingAppointmentsCount = appointments.filter(
    (a) => a.status === 'en_attente'
  ).length;

  const navItems = [
    { label: 'Accueil', route: '/app', icon: LayoutDashboard },
    { label: 'Calendrier', route: '/app/calendar', icon: Calendar },
    { label: 'Clients', route: '/app/clients', icon: Users },
    {
      label: 'Réservations',
      route: '/app/bookings',
      icon: CalendarCheck,
      badge: pendingAppointmentsCount > 0 ? pendingAppointmentsCount : undefined,
    },
    { label: 'Services', route: '/app/services', icon: Sparkles },
    { label: 'Équipe', route: '/app/team', icon: UserCheck },
    { label: 'Paiements', route: '/app/payments', icon: CreditCard },
    { label: 'Rapports', route: '/app/reports', icon: BarChart3 },
    { label: 'Paramètres', route: '/app/settings', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#24312B]/50 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-72 max-w-[80vw] bg-[#16382D] text-[#FCFBF8] flex flex-col h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#CDBB96] flex items-center justify-center text-[#16382D] font-serif font-bold text-lg">
              V
            </div>
            <div>
              <span className="font-serif text-lg font-medium text-white block leading-none">
                Velora
              </span>
              <span className="text-[10px] text-[#CDBB96] tracking-widest uppercase font-mono mt-0.5 block">
                Beauty & Spa
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#DED8CD] hover:text-white hover:bg-white/10"
            aria-label="Fermer le menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav list */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentRoute === item.route ||
              (item.route === '/app/clients' && currentRoute.startsWith('/app/clients'));

            return (
              <button
                key={item.route}
                onClick={() => {
                  navigateTo(item.route);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-white/12 text-white font-semibold'
                    : 'text-[#DED8CD]/80 hover:text-white hover:bg-white/6'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-[#CDBB96]' : 'text-[#DED8CD]/70'
                  }`}
                />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-[#CDBB96] text-[#16382D] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* User profile footer */}
        <div className="p-4 border-t border-white/10 bg-[#0f261e]/40">
          <div className="flex items-center justify-between gap-3">
            <div
              onClick={() => {
                onClose();
                navigateTo('/app/settings');
              }}
              className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
            >
              <img
                src={currentUser?.avatar || '/src/assets/images/avatar_marie_dupont_1790707385423.jpg'}
                alt={currentUser?.name || 'Gestionnaire'}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-[#CDBB96]/40 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">
                  {currentUser?.name || 'Marie Dupont'}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3 text-[#CDBB96] shrink-0" />
                  <p className="text-[11px] text-[#DED8CD]/70 truncate">
                    {currentUser?.role || 'Gestionnaire & Directrice'}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                logout();
              }}
              className="p-2 text-[#DED8CD]/70 hover:text-rose-300 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
