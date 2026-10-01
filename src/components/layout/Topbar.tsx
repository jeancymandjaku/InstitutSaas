import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  Plus,
  Menu,
  Check,
  Calendar,
  User,
  Clock,
  ExternalLink,
  Store,
  LogOut,
  Settings,
  Globe,
} from 'lucide-react';

interface TopbarProps {
  onOpenMobileMenu: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileMenu }) => {
  const {
    business,
    currentUser,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    openModal,
    navigateTo,
    clients,
    services,
    appointments,
    logout,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifFilter, setNotifFilter] = useState<'all' | 'unread'>('all');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close notifications and user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((n) =>
    notifFilter === 'unread' ? !n.isRead : true
  );

  // Search results
  const searchResults = React.useMemo(() => {
    if (!searchVal.trim()) return null;
    const q = searchVal.toLowerCase();

    const matchedClients = clients
      .filter((c) => `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) || c.phone.includes(q))
      .slice(0, 3);

    const matchedServices = services
      .filter((s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q))
      .slice(0, 3);

    const matchedAppointments = appointments
      .filter((a) => a.clientName.toLowerCase().includes(q) || a.serviceName.toLowerCase().includes(q))
      .slice(0, 3);

    return {
      clients: matchedClients,
      services: matchedServices,
      appointments: matchedAppointments,
      hasResults:
        matchedClients.length > 0 ||
        matchedServices.length > 0 ||
        matchedAppointments.length > 0,
    };
  }, [searchVal, clients, services, appointments]);

  // Formatted date
  const todayFormatted = 'Mardi 29 septembre 2026';

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#FCFBF8]/90 backdrop-blur-md border-b border-[#DED8CD]/60 px-4 md:px-8 flex items-center justify-between gap-4">
      {/* Left side: Mobile trigger + Business info / Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg text-[#24312B] hover:bg-[#E8EEE8] transition-colors"
          aria-label="Ouvrir le menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#68736D]">
            <Store className="w-3.5 h-3.5 text-[#70856F]" />
            <span className="font-medium text-[#16382D] truncate max-w-[170px] sm:max-w-[220px]">
              {business.name}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-[#68736D]">{business.city}</span>
          </div>
        </div>
      </div>

      {/* Middle: Global Search */}
      <div ref={searchRef} className="relative flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68736D]/70" />
          <input
            type="text"
            placeholder="Rechercher client, soin, réservation..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            className="w-full bg-[#F6F2EA]/80 hover:bg-[#F6F2EA] focus:bg-[#FCFBF8] border border-[#DED8CD] rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#24312B] placeholder:text-[#68736D]/60 focus:outline-none focus:ring-1 focus:ring-[#70856F] focus:border-[#70856F] transition-all"
          />
        </div>

        {/* Global Search Dropdown */}
        {searchFocused && searchResults && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#FCFBF8] border border-[#DED8CD] rounded-xl shadow-xl overflow-hidden py-2 z-50 text-xs">
            {!searchResults.hasResults ? (
              <div className="px-4 py-3 text-center text-[#68736D]">
                Aucun résultat pour « {searchVal} »
              </div>
            ) : (
              <div className="divide-y divide-[#DED8CD]/40 max-h-80 overflow-y-auto">
                {searchResults.clients.length > 0 && (
                  <div className="p-2">
                    <p className="text-[10px] font-semibold text-[#68736D] uppercase px-2 mb-1">
                      Clients
                    </p>
                    {searchResults.clients.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          navigateTo('/app/clients', c.id);
                          setSearchFocused(false);
                          setSearchVal('');
                        }}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-[#E8EEE8] cursor-pointer text-[#24312B]"
                      >
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-[#70856F]" />
                          <span className="font-medium">{c.firstName} {c.lastName}</span>
                        </div>
                        <span className="text-[11px] text-[#68736D]">{c.phone}</span>
                      </div>
                    ))}
                  </div>
                )}

                {searchResults.services.length > 0 && (
                  <div className="p-2">
                    <p className="text-[10px] font-semibold text-[#68736D] uppercase px-2 mb-1">
                      Services
                    </p>
                    {searchResults.services.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          navigateTo('/app/services');
                          setSearchFocused(false);
                          setSearchVal('');
                        }}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-[#E8EEE8] cursor-pointer text-[#24312B]"
                      >
                        <span className="font-medium">{s.name}</span>
                        <span className="text-[11px] font-mono text-[#16382D]">€{s.price} · {s.durationMinutes} min</span>
                      </div>
                    ))}
                  </div>
                )}

                {searchResults.appointments.length > 0 && (
                  <div className="p-2">
                    <p className="text-[10px] font-semibold text-[#68736D] uppercase px-2 mb-1">
                      Rendez-vous
                    </p>
                    {searchResults.appointments.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => {
                          openModal('appointment_detail', a);
                          setSearchFocused(false);
                          setSearchVal('');
                        }}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-[#E8EEE8] cursor-pointer text-[#24312B]"
                      >
                        <div>
                          <p className="font-medium">{a.clientName}</p>
                          <p className="text-[10px] text-[#68736D]">{a.serviceName} · {a.date} à {a.time}</p>
                        </div>
                        <span className="text-[11px] text-[#70856F] font-mono">€{a.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right side: Date, Notifications, Quick Action button, Avatar */}
      <div className="flex items-center gap-3">
        {/* Date */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#68736D]">
          <Calendar className="w-3.5 h-3.5 text-[#70856F]" />
          <span>{todayFormatted}</span>
        </div>

        {/* Quick Action Button "+" */}
        <button
          onClick={() => openModal('quick_action')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] rounded-lg text-xs font-medium shadow-xs transition-colors whitespace-nowrap active:scale-98"
        >
          <Plus className="w-4 h-4 text-[#CDBB96]" />
          <span className="hidden sm:inline">Action</span>
        </button>

        {/* Notifications Dropdown */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-lg text-[#24312B] hover:bg-[#E8EEE8] transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-[#24312B]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#16382D] ring-2 ring-[#FCFBF8]" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#FCFBF8] border border-[#DED8CD] rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3.5 bg-[#F6F2EA]/60 border-b border-[#DED8CD]/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#16382D]">Notifications</h4>
                  <p className="text-[11px] text-[#68736D]">
                    {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-[#E8EEE8] p-0.5 rounded-md text-[10px]">
                    <button
                      onClick={() => setNotifFilter('all')}
                      className={`px-2 py-0.5 rounded ${
                        notifFilter === 'all'
                          ? 'bg-white text-[#16382D] font-medium shadow-xs'
                          : 'text-[#68736D]'
                      }`}
                    >
                      Toutes
                    </button>
                    <button
                      onClick={() => setNotifFilter('unread')}
                      className={`px-2 py-0.5 rounded ${
                        notifFilter === 'unread'
                          ? 'bg-white text-[#16382D] font-medium shadow-xs'
                          : 'text-[#68736D]'
                      }`}
                    >
                      Non lues
                    </button>
                  </div>

                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[10px] text-[#70856F] hover:text-[#16382D] font-medium underline transition-colors"
                    >
                      Tout lire
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#DED8CD]/40">
                {filteredNotifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[#68736D]">
                    Aucune notification à afficher
                  </div>
                ) : (
                  filteredNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationRead(notif.id);
                        if (notif.linkRoute) {
                          navigateTo(notif.linkRoute);
                          setIsNotifOpen(false);
                        }
                      }}
                      className={`p-3.5 hover:bg-[#F6F2EA]/50 cursor-pointer transition-colors flex items-start gap-3 ${
                        !notif.isRead ? 'bg-[#E8EEE8]/40' : ''
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          !notif.isRead ? 'bg-[#16382D]' : 'bg-transparent'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold text-[#16382D] truncate">
                            {notif.title}
                          </p>
                          <span className="text-[10px] text-[#68736D] shrink-0 font-mono">
                            {notif.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-[#68736D] mt-0.5 leading-relaxed line-clamp-2">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Menu */}
        <div ref={userMenuRef} className="relative pl-1">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 cursor-pointer p-0.5 rounded-full border border-transparent hover:border-[#70856F] transition-all"
            aria-label="Menu du profil gestionnaire"
          >
            <img
              src={currentUser?.avatar || '/src/assets/images/avatar_marie_dupont_1790707385423.jpg'}
              alt={currentUser?.name || 'Gestionnaire'}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover border border-[#DED8CD]"
            />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-[#FCFBF8] border border-[#DED8CD] rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 text-xs">
              <div className="p-3.5 bg-[#F6F2EA]/60 border-b border-[#DED8CD]/60">
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentUser?.avatar || '/src/assets/images/avatar_marie_dupont_1790707385423.jpg'}
                    alt={currentUser?.name || 'Gestionnaire'}
                    className="w-9 h-9 rounded-full object-cover border border-[#DED8CD]"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#16382D] truncate">
                      {currentUser?.name || 'Marie Dupont'}
                    </p>
                    <p className="text-[11px] text-[#68736D] truncate">
                      {currentUser?.email || 'marie.dupont@velora-demo.com'}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-mono text-[#16382D] bg-[#E8EEE8] px-1.5 py-0.5 rounded">
                      {currentUser?.role || 'Gestionnaire & Directrice'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-1.5 space-y-0.5">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    navigateTo('/app/settings');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#24312B] hover:bg-[#E8EEE8] transition-colors text-left cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-[#70856F]" />
                  <span>Paramètres de l'établissement</span>
                </button>

                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    navigateTo('/');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#24312B] hover:bg-[#E8EEE8] transition-colors text-left cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-[#70856F]" />
                  <span>Voir le site public vitrine</span>
                </button>

                <div className="h-px bg-[#DED8CD]/60 my-1" />

                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Se déconnecter</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
