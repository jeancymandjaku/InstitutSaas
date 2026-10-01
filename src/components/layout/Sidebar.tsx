import React, { useState } from 'react';
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
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Globe,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed: externalCollapsed,
  onToggleCollapse,
}) => {
  const { currentRoute, navigateTo, currentUser, appointments, logout } = useApp();
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  const isCollapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;
  const toggle = onToggleCollapse || (() => setInternalCollapsed(!internalCollapsed));

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
  ];

  return (
    <aside
      className={`hidden md:flex flex-col bg-[#16382D] text-[#FCFBF8] border-r border-[#16382D]/80 transition-all duration-300 select-none z-30 shrink-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
      style={{ minHeight: '100vh' }}
    >
      {/* Brand Header */}
      <div className="h-18 flex items-center justify-between px-5 border-b border-white/10">
        {!isCollapsed ? (
          <div
            onClick={() => navigateTo('/app')}
            className="cursor-pointer flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#CDBB96] flex items-center justify-center text-[#16382D] font-serif font-bold text-lg shadow-sm">
              V
            </div>
            <div>
              <span className="font-serif text-xl font-medium tracking-tight text-white group-hover:text-[#CDBB96] transition-colors block leading-none">
                Velora
              </span>
              <span className="text-[10px] text-[#CDBB96] tracking-widest uppercase mt-0.5 block font-mono">
                Beauty & Spa
              </span>
            </div>
          </div>
        ) : (
          <div
            onClick={() => navigateTo('/app')}
            className="w-10 h-10 mx-auto rounded-lg bg-[#CDBB96] flex items-center justify-center text-[#16382D] font-serif font-bold text-xl cursor-pointer hover:opacity-90"
            title="Velora SaaS"
          >
            V
          </div>
        )}

        <button
          onClick={toggle}
          className={`p-1.5 rounded-md text-[#DED8CD]/70 hover:text-white hover:bg-white/10 transition-colors ${
            isCollapsed ? 'hidden' : 'block'
          }`}
          title={isCollapsed ? 'Déplier la barre' : 'Réduire la barre'}
          aria-label={isCollapsed ? 'Déplier la barre' : 'Réduire la barre'}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentRoute === item.route ||
            (item.route === '/app/clients' && currentRoute.startsWith('/app/clients'));

          return (
            <button
              key={item.route}
              onClick={() => navigateTo(item.route)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-white/12 text-white font-semibold shadow-xs'
                  : 'text-[#DED8CD]/75 hover:text-white hover:bg-white/6'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-[#CDBB96]' : 'text-[#DED8CD]/70'
                }`}
              />
              {!isCollapsed && (
                <span className="truncate text-left flex-1">{item.label}</span>
              )}
              {!isCollapsed && item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-[#CDBB96] text-[#16382D] font-bold">
                  {item.badge}
                </span>
              )}
              {isCollapsed && item.badge && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#CDBB96]" />
              )}
            </button>
          );
        })}

        <div className="pt-3 pb-1">
          <div className="border-t border-white/10 my-2" />
        </div>

        {/* Settings */}
        <button
          onClick={() => navigateTo('/app/settings')}
          title={isCollapsed ? 'Paramètres' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
            currentRoute === '/app/settings'
              ? 'bg-white/12 text-white font-semibold shadow-xs'
              : 'text-[#DED8CD]/75 hover:text-white hover:bg-white/6'
          } ${isCollapsed ? 'justify-center px-0' : ''}`}
        >
          <Settings
            className={`w-4 h-4 shrink-0 ${
              currentRoute === '/app/settings' ? 'text-[#CDBB96]' : 'text-[#DED8CD]/70'
            }`}
          />
          {!isCollapsed && <span className="truncate text-left">Paramètres</span>}
        </button>

        {/* Site public landing page */}
        <button
          onClick={() => navigateTo('/')}
          title={isCollapsed ? 'Site public' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-[#DED8CD]/60 hover:text-white hover:bg-white/6 ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
        >
          <Globe className="w-4 h-4 shrink-0 text-[#CDBB96]" />
          {!isCollapsed && <span className="truncate text-left">Site public</span>}
        </button>
      </div>

      {/* Collapse Toggle for collapsed state */}
      {isCollapsed && (
        <div className="p-3 border-t border-white/10 flex justify-center">
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-[#DED8CD]/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Déplier la barre latérale"
            aria-label="Déplier la barre latérale"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* User Profile Footer */}
      <div className="p-3 border-t border-white/10 bg-[#0f261e]/40">
        <div className={`flex items-center gap-2.5 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div
            onClick={() => navigateTo('/app/settings')}
            className={`flex items-center gap-2.5 cursor-pointer p-1 rounded-lg hover:bg-white/8 transition-colors flex-1 min-w-0 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title="Profil & Paramètres de l'institut"
          >
            <img
              src={currentUser?.avatar || '/src/assets/images/avatar_marie_dupont_1790707385423.jpg'}
              alt={currentUser?.name || 'Gestionnaire'}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover border border-[#CDBB96]/40 shrink-0"
            />
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate leading-tight">
                  {currentUser?.name || 'Marie Dupont'}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3 text-[#CDBB96] shrink-0" />
                  <p className="text-[10px] text-[#DED8CD]/70 truncate">
                    {currentUser?.role || 'Gestionnaire & Directrice'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                logout();
              }}
              title="Se déconnecter et retourner au site"
              className="p-1.5 rounded-lg text-[#DED8CD]/60 hover:text-rose-300 hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
              aria-label="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
