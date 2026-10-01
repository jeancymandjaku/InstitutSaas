import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Store,
  User,
  Bell,
  Sliders,
  Save,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { business, currentUser, updateBusiness, notify } = useApp();

  const [activeTab, setActiveTab] = useState<'business' | 'profile' | 'notifications' | 'preferences'>('business');

  const safeUser = currentUser || {
    id: 'user_fallback',
    name: 'Marie Dupont',
    email: 'marie.dupont@velora-demo.com',
    role: 'Directrice & Gestionnaire',
    avatar: '/src/assets/images/avatar_marie_dupont_1790707385423.jpg',
    phone: business.phone,
  };

  // Business form state
  const [bizName, setBizName] = useState(business.name);
  const [bizTagline, setBizTagline] = useState(business.tagline);
  const [bizAddress, setBizAddress] = useState(business.address);
  const [bizCity, setBizCity] = useState(business.city);
  const [bizCountry, setBizCountry] = useState(business.country);
  const [bizPhone, setBizPhone] = useState(business.phone);
  const [bizEmail, setBizEmail] = useState(business.email);
  const [bizCurrency, setBizCurrency] = useState(business.currency);
  const [bizVat, setBizVat] = useState(business.vatRate);

  // Profile form state
  const [userName, setUserName] = useState(safeUser.name);
  const [userEmail, setUserEmail] = useState(safeUser.email);
  const [userPhone, setUserPhone] = useState(safeUser.phone);

  // Notification preferences state
  const [notifSms, setNotifSms] = useState(true);
  const [notifEmailReminders, setNotifEmailReminders] = useState(true);
  const [notifDailySummary, setNotifDailySummary] = useState(true);

  const handleSaveBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusiness({
      name: bizName,
      tagline: bizTagline,
      address: bizAddress,
      city: bizCity,
      country: bizCountry,
      phone: bizPhone,
      email: bizEmail,
      currency: bizCurrency,
      vatRate: Number(bizVat),
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    notify('Profil administrateur mis à jour');
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    notify('Préférences de notification enregistrées');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-serif font-normal text-[#16382D] tracking-tight">
          Paramètres de l’Établissement
        </h1>
        <p className="text-xs text-[#68736D] mt-0.5">
          Configuration générale, coordonnées, profil et préférences de l’institut
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#DED8CD] text-xs">
        <button
          onClick={() => setActiveTab('business')}
          className={`py-2.5 px-4 font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'business'
              ? 'border-[#16382D] text-[#16382D] font-semibold'
              : 'border-transparent text-[#68736D] hover:text-[#16382D]'
          }`}
        >
          <Store className="w-3.5 h-3.5" />
          <span>Informations de l'établissement</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`py-2.5 px-4 font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'profile'
              ? 'border-[#16382D] text-[#16382D] font-semibold'
              : 'border-transparent text-[#68736D] hover:text-[#16382D]'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Profil administrateur</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`py-2.5 px-4 font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'notifications'
              ? 'border-[#16382D] text-[#16382D] font-semibold'
              : 'border-transparent text-[#68736D] hover:text-[#16382D]'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Notifications & Rappels</span>
        </button>
      </div>

      {/* Tab 1: Informations de l'établissement */}
      {activeTab === 'business' && (
        <form onSubmit={handleSaveBusiness} className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-5 sm:p-6 shadow-xs space-y-5 text-xs">
          <div className="border-b border-[#DED8CD]/60 pb-3">
            <h2 className="text-sm font-semibold text-[#16382D]">
              Coordonnées de l'institut
            </h2>
            <p className="text-[11px] text-[#68736D]">
              Ces mentions figurent sur les reçus, réservations et confirmations envoyées aux clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                Nom commercial de l'établissement *
              </label>
              <input
                type="text"
                required
                value={bizName}
                onChange={(e) => setBizName(e.target.value)}
                className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                Slogan / Tagline
              </label>
              <input
                type="text"
                value={bizTagline}
                onChange={(e) => setBizTagline(e.target.value)}
                className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                Adresse postale *
              </label>
              <input
                type="text"
                required
                value={bizAddress}
                onChange={(e) => setBizAddress(e.target.value)}
                className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                Ville & Pays *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={bizCity}
                  onChange={(e) => setBizCity(e.target.value)}
                  className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F]"
                />
                <input
                  type="text"
                  required
                  value={bizCountry}
                  onChange={(e) => setBizCountry(e.target.value)}
                  className="w-24 p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                Téléphone standard *
              </label>
              <input
                type="tel"
                required
                value={bizPhone}
                onChange={(e) => setBizPhone(e.target.value)}
                className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] font-mono focus:ring-1 focus:ring-[#70856F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                Email de contact *
              </label>
              <input
                type="email"
                required
                value={bizEmail}
                onChange={(e) => setBizEmail(e.target.value)}
                className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F]"
              />
            </div>
          </div>

          <div className="border-t border-[#DED8CD]/60 pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] rounded-lg text-xs font-medium shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5 text-[#CDBB96]" />
              <span>Enregistrer les modifications</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Profil administrateur */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-5 sm:p-6 shadow-xs space-y-5 text-xs">
          <div className="border-b border-[#DED8CD]/60 pb-3 flex items-center gap-4">
            <img
              src={safeUser.avatar}
              alt={safeUser.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-full object-cover border border-[#CDBB96]"
            />
            <div>
              <h2 className="text-sm font-semibold text-[#16382D]">{safeUser.name}</h2>
              <p className="text-[11px] text-[#70856F] font-medium">{safeUser.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                Nom complet
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                Rôle système
              </label>
              <input
                type="text"
                disabled
                value={safeUser.role}
                className="w-full p-2 bg-stone-100 border border-[#DED8CD] rounded-lg text-xs text-[#68736D] cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                Adresse email
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                Téléphone direct
              </label>
              <input
                type="tel"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] font-mono focus:ring-1 focus:ring-[#70856F]"
              />
            </div>
          </div>

          <div className="border-t border-[#DED8CD]/60 pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] rounded-lg text-xs font-medium shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5 text-[#CDBB96]" />
              <span>Mettre à jour le profil</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Notifications */}
      {activeTab === 'notifications' && (
        <form onSubmit={handleSavePreferences} className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-5 sm:p-6 shadow-xs space-y-4 text-xs">
          <div className="border-b border-[#DED8CD]/60 pb-3">
            <h2 className="text-sm font-semibold text-[#16382D]">
              Alertes et rappels automatiques
            </h2>
            <p className="text-[11px] text-[#68736D]">
              Activez ou désactivez les notifications envoyées aux praticiennes et aux clients.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#F6F2EA]/50 rounded-lg border border-[#DED8CD]/50">
              <div>
                <p className="font-semibold text-[#16382D]">Rappels SMS automatiques aux clients (H-24)</p>
                <p className="text-[11px] text-[#68736D]">
                  Envoie un message de confirmation poli 24 heures avant le soin.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifSms}
                onChange={(e) => setNotifSms(e.target.checked)}
                className="w-4 h-4 text-[#16382D] rounded"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-[#F6F2EA]/50 rounded-lg border border-[#DED8CD]/50">
              <div>
                <p className="font-semibold text-[#16382D]">Alertes praticiennes nouveaux rendez-vous</p>
                <p className="text-[11px] text-[#68736D]">
                  Alerte immédiate sur l'application lorsqu'un rendez-vous est calé.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifEmailReminders}
                onChange={(e) => setNotifEmailReminders(e.target.checked)}
                className="w-4 h-4 text-[#16382D] rounded"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-[#F6F2EA]/50 rounded-lg border border-[#DED8CD]/50">
              <div>
                <p className="font-semibold text-[#16382D]">Récapitulatif de clôture de caisse quotidien</p>
                <p className="text-[11px] text-[#68736D]">
                  Synthèse des règlements et prestations envoyée chaque soir à 19h30.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifDailySummary}
                onChange={(e) => setNotifDailySummary(e.target.checked)}
                className="w-4 h-4 text-[#16382D] rounded"
              />
            </div>
          </div>

          <div className="border-t border-[#DED8CD]/60 pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] rounded-lg text-xs font-medium shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5 text-[#CDBB96]" />
              <span>Enregistrer les préférences</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
