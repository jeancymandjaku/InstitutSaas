import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  User,
  Store,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff,
  MapPin,
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const {
    authTab,
    setAuthTab,
    login,
    loginDemo,
    registerManager,
    navigateTo,
  } = useApp();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('marie.dupont@velora-demo.com');
  const [loginPassword, setLoginPassword] = useState('Velora2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regBusinessName, setRegBusinessName] = useState('');
  const [regBusinessType, setRegBusinessType] = useState('Institut de beauté');
  const [regPlanId, setRegPlanId] = useState<'essentiel' | 'studio' | 'signature'>('studio');
  const [regCity, setRegCity] = useState('Paris 8ème');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('+33 6 12 34 56 78');
  const [regPassword, setRegPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const fillRegisterSample = () => {
    setRegFullName('Camille Rousseau');
    setRegBusinessName('Maison Velora Spa & Botanique');
    setRegBusinessType('Spa & Balnéo');
    setRegCity('Bordeaux Centre');
    setRegEmail('camille@maisonvelora.fr');
    setRegPhone('+33 6 45 89 12 30');
    setRegPassword('Velora2026!');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      login(loginEmail, loginPassword);
      setIsSubmitting(false);
    }, 350);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFullName.trim() || !regBusinessName.trim() || !regEmail.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      registerManager({
        fullName: regFullName.trim(),
        businessName: regBusinessName.trim(),
        businessType: regBusinessType,
        city: regCity.trim() || 'Paris',
        email: regEmail.trim(),
        phone: regPhone.trim(),
        password: regPassword || 'Velora2026!',
        planId: regPlanId,
      });
      setIsSubmitting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#FCFBF8] text-[#24312B] flex flex-col justify-between selection:bg-[#E8EEE8] selection:text-[#16382D]">
      {/* Top Header Bar */}
      <header className="px-4 sm:px-8 py-5 flex items-center justify-between border-b border-[#DED8CD]/60 bg-[#FCFBF8]/80 backdrop-blur-xs">
        <div
          onClick={() => navigateTo('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#16382D] text-[#FCFBF8] flex items-center justify-center font-serif text-lg font-bold group-hover:bg-[#70856F] transition-colors">
            V
          </div>
          <div>
            <span className="font-serif text-xl font-medium tracking-tight text-[#16382D] block leading-none">
              Velora
            </span>
            <span className="text-[10px] text-[#70856F] tracking-widest uppercase font-mono mt-0.5 block">
              Espace Gestionnaire
            </span>
          </div>
        </div>

        <button
          onClick={() => navigateTo('/')}
          className="flex items-center gap-1.5 text-xs text-[#68736D] hover:text-[#16382D] transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour au site vitrine</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 sm:py-12 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Form Card (7 cols on lg) */}
          <div className="lg:col-span-7 bg-[#FCFBF8] border border-[#DED8CD] rounded-2xl shadow-xl p-6 sm:p-9 space-y-6">
            {/* Tabs Header */}
            <div className="flex items-center justify-between border-b border-[#DED8CD]/70 pb-3">
              <div className="flex items-center gap-1 bg-[#E8EEE8] p-0.5 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setAuthTab('login')}
                  className={`px-4 py-1.5 rounded-md font-medium transition-colors ${
                    authTab === 'login'
                      ? 'bg-white text-[#16382D] shadow-xs font-semibold'
                      : 'text-[#68736D] hover:text-[#16382D]'
                  }`}
                >
                  Se connecter
                </button>
                <button
                  type="button"
                  onClick={() => setAuthTab('register')}
                  className={`px-4 py-1.5 rounded-md font-medium transition-colors ${
                    authTab === 'register'
                      ? 'bg-white text-[#16382D] shadow-xs font-semibold'
                      : 'text-[#68736D] hover:text-[#16382D]'
                  }`}
                >
                  Créer un compte
                </button>
              </div>

              <span className="text-[11px] font-mono text-[#70856F] hidden sm:inline">
                {authTab === 'login' ? 'Accès direct' : 'Nouvel institut'}
              </span>
            </div>

            {/* Quick 1-Click Demo Account Banner */}
            <div className="p-3.5 bg-[#F6F2EA] border border-[#DED8CD] rounded-xl flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#16382D] text-white flex items-center justify-center font-serif text-xs font-bold shrink-0">
                  MD
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#16382D] truncate">
                    Compte Démo : Marie Dupont
                  </p>
                  <p className="text-[11px] text-[#68736D] truncate">
                    Directrice & Spa Velora (Données prêtes)
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={loginDemo}
                className="px-3 py-1.5 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] text-[11px] font-medium rounded-lg shadow-xs transition-colors shrink-0"
              >
                Connexion 1-clic
              </button>
            </div>

            {/* TAB 1: LOGIN FORM */}
            {authTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#16382D]">
                    Bon retour parmi nous
                  </h2>
                  <p className="text-xs text-[#68736D] mt-0.5">
                    Entrez vos identifiants pour gérer votre institut.
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                    Adresse email professionnelle
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68736D]" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="nom@institut.com"
                      className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg pl-9 pr-3 py-2.5 text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-[#68736D]">
                      Mot de passe
                    </label>
                    <span className="text-[10px] text-[#70856F] font-mono cursor-pointer hover:underline">
                      (N'importe quel mot de passe en démo)
                    </span>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68736D]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg pl-9 pr-9 py-2.5 text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68736D] hover:text-[#16382D]"
                      aria-label="Afficher ou masquer mot de passe"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-[#68736D]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 text-[#16382D] rounded border-[#DED8CD]"
                    />
                    <span>Se souvenir de moi</span>
                  </label>

                  <button
                    type="button"
                    onClick={loginDemo}
                    className="text-[#70856F] hover:text-[#16382D] hover:underline"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] rounded-xl font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Connexion en cours...
                      </span>
                    ) : (
                      <>
                        <span>Accéder au tableau de bord</span>
                        <ArrowRight className="w-4 h-4 text-[#CDBB96]" />
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-2 text-center text-[11px] text-[#68736D]">
                  Pas encore de compte gestionnaire ?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthTab('register')}
                    className="text-[#16382D] font-semibold underline"
                  >
                    Créer mon compte établissement
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: REGISTER FORM */}
            {authTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-normal text-[#16382D]">
                      Créer votre compte établissement
                    </h2>
                    <p className="text-xs text-[#68736D] mt-0.5">
                      Configurez votre institut et accédez instantanément à l'ensemble du SaaS.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={fillRegisterSample}
                    className="text-[11px] font-medium text-[#70856F] hover:text-[#16382D] underline cursor-pointer"
                  >
                    Exemple automatique
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                      Votre prénom & nom *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68736D]" />
                      <input
                        type="text"
                        required
                        value={regFullName}
                        onChange={(e) => setRegFullName(e.target.value)}
                        placeholder="Ex: Clara Vasseur"
                        className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg pl-9 pr-3 py-2 text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                      Nom de l'établissement *
                    </label>
                    <div className="relative">
                      <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68736D]" />
                      <input
                        type="text"
                        required
                        value={regBusinessName}
                        onChange={(e) => setRegBusinessName(e.target.value)}
                        placeholder="Ex: L'Atelier Botanique Spa"
                        className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg pl-9 pr-3 py-2 text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                      Type d'activité
                    </label>
                    <select
                      value={regBusinessType}
                      onChange={(e) => setRegBusinessType(e.target.value)}
                      className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg p-2 text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
                    >
                      <option value="Institut de beauté">Institut de beauté</option>
                      <option value="Spa & Balnéo">Spa & Balnéothérapie</option>
                      <option value="Centre Wellness">Centre Wellness</option>
                      <option value="Studio de massage">Studio de massage</option>
                      <option value="Studio d'onglerie">Studio d'onglerie & Nail art</option>
                      <option value="Praticien indépendant">Praticien indépendant</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                      Ville / Localisation
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68736D]" />
                      <input
                        type="text"
                        value={regCity}
                        onChange={(e) => setRegCity(e.target.value)}
                        placeholder="Ex: Paris 8ème"
                        className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg pl-9 pr-3 py-2 text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                      Téléphone professionnel *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68736D]" />
                      <input
                        type="tel"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg pl-9 pr-3 py-2 text-xs text-[#24312B] font-mono focus:outline-none focus:ring-1 focus:ring-[#70856F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                      Email professionnel *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68736D]" />
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="clara@atelier-botanique.com"
                        className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg pl-9 pr-3 py-2 text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                    Mot de passe *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68736D]" />
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Au moins 6 caractères"
                      className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg pl-9 pr-3 py-2 text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
                    />
                  </div>
                </div>

                {/* Choice of Plan */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                    Forfait souhaité (activation par paiement à l'étape suivante) *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'essentiel', name: 'Essentiel', price: '29 €/m', desc: '1 praticienne' },
                      { id: 'studio', name: 'Studio', price: '69 €/m', desc: '2-5 praticiennes' },
                      { id: 'signature', name: 'Signature', price: '129 €/m', desc: 'Spas & Illimité' },
                    ].map((p) => (
                      <div
                        key={p.id}
                        onClick={() => setRegPlanId(p.id as any)}
                        className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${
                          regPlanId === p.id
                            ? 'border-[#16382D] bg-[#E8EEE8] text-[#16382D] font-semibold'
                            : 'border-[#DED8CD] bg-[#FCFBF8] text-[#68736D] hover:border-[#70856F]'
                        }`}
                      >
                        <p className="text-xs font-serif font-bold text-[#16382D]">{p.name}</p>
                        <p className="text-[11px] font-mono text-[#16382D]">{p.price}</p>
                        <p className="text-[9px] text-[#68736D]">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-[#68736D]">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-3.5 h-3.5 text-[#16382D] rounded border-[#DED8CD]"
                    />
                    <span className="text-[11px]">
                      J'accepte les conditions d'utilisation et la charte de confidentialité Velora.
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !agreeTerms}
                    className="w-full py-3.5 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] rounded-xl font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Création de votre compte institut...
                      </span>
                    ) : (
                      <>
                        <span>Créer mon compte & passer au paiement</span>
                        <ArrowRight className="w-4 h-4 text-[#CDBB96]" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-[#68736D] mt-1.5">
                    Étape sécurisée : le paiement valide et débloque immédiatement votre espace institut.
                  </p>
                </div>

                <div className="pt-1 text-center text-[11px] text-[#68736D]">
                  Vous avez déjà un compte ?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthTab('login')}
                    className="text-[#16382D] font-semibold underline"
                  >
                    Se connecter
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Brand & Reassurance Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE8] text-[11px] font-mono uppercase tracking-wider text-[#16382D]">
                <Sparkles className="w-3 h-3 text-[#70856F]" />
                <span>Gestion professionnelle</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#16382D] leading-snug">
                L’art du soin et de la sérénité au service de votre salon.
              </h3>

              <p className="text-xs sm:text-sm text-[#68736D] leading-relaxed">
                Connectez-vous en un instant pour piloter vos rendez-vous, coordonner votre équipe et accueillir vos clients en toute quiétude.
              </p>
            </div>

            {/* Micro Feature highlights */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 bg-[#FCFBF8] border border-[#DED8CD] rounded-xl flex items-center gap-3 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#70856F] shrink-0" />
                <span className="text-[#24312B] font-medium">Agenda & planning synchronisés en direct</span>
              </div>

              <div className="p-3 bg-[#FCFBF8] border border-[#DED8CD] rounded-xl flex items-center gap-3 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#70856F] shrink-0" />
                <span className="text-[#24312B] font-medium">Fiches clients détaillées avec historique des soins</span>
              </div>

              <div className="p-3 bg-[#FCFBF8] border border-[#DED8CD] rounded-xl flex items-center gap-3 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#70856F] shrink-0" />
                <span className="text-[#24312B] font-medium">Caisse, paiements et rapports comptables exportables</span>
              </div>
            </div>

            {/* Security note */}
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#68736D]">
              <ShieldCheck className="w-4 h-4 text-[#70856F]" />
              <span>Données cloisonnées et protégées · Conforme RGPD</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="py-4 text-center text-[11px] text-[#68736D] border-t border-[#DED8CD]/50">
        © 2026 Velora. Tous droits réservés · Plateforme de gestion pour instituts de beauté et spas.
      </footer>
    </div>
  );
};
