import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  Store,
  Phone,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { mockUsers } from '../../data/mockData';

export const AuthModal: React.FC = () => {
  const {
    activeModal,
    modalData,
    closeModal,
    login,
    loginDemo,
    registerManager,
    authTab,
    setAuthTab,
  } = useApp();

  const isOpen = activeModal === 'auth';

  // Active tab in modal: 'demo' | 'login' | 'register'
  const [currentTab, setCurrentTab] = useState<'demo' | 'login' | 'register'>('demo');

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

  // Synchronize initial tab and plan from modalData or context
  useEffect(() => {
    if (isOpen) {
      if (modalData?.plan) {
        const p = String(modalData.plan).toLowerCase();
        if (p.includes('essentiel')) setRegPlanId('essentiel');
        else if (p.includes('signature') || p.includes('spa')) setRegPlanId('signature');
        else setRegPlanId('studio');
      }

      if (modalData?.tab) {
        setCurrentTab(modalData.tab);
      } else if (authTab === 'register') {
        setCurrentTab('register');
      } else if (authTab === 'login') {
        setCurrentTab('login');
      } else {
        setCurrentTab('demo');
      }
    }
  }, [isOpen, modalData, authTab]);

  if (!isOpen) return null;

  const handle1ClickDemo = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      loginDemo();
      setIsSubmitting(false);
      closeModal();
    }, 300);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      login(loginEmail, loginPassword);
      setIsSubmitting(false);
      closeModal();
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
      closeModal();
    }, 450);
  };

  const fillRegisterSample = () => {
    setRegFullName('Camille Rousseau');
    setRegBusinessName('Maison Velora Spa & Botanique');
    setRegBusinessType('Spa & Balnéo');
    setRegCity('Bordeaux Centre');
    setRegEmail('camille@maisonvelora.fr');
    setRegPhone('+33 6 45 89 12 30');
    setRegPassword('Velora2026!');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Espace Gestionnaire Velora"
      subtitle="Connectez-vous pour piloter votre institut de beauté & spa"
      maxWidth="lg"
    >
      <div className="space-y-5">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-[#E8EEE8] p-1 rounded-xl text-xs">
          <button
            type="button"
            onClick={() => {
              setCurrentTab('demo');
              setAuthTab('login');
            }}
            className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              currentTab === 'demo'
                ? 'bg-white text-[#16382D] shadow-xs font-semibold'
                : 'text-[#68736D] hover:text-[#16382D]'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#CDBB96] fill-[#CDBB96]" />
            <span>Accès Démo 1-Clic</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrentTab('login');
              setAuthTab('login');
            }}
            className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all cursor-pointer ${
              currentTab === 'login'
                ? 'bg-white text-[#16382D] shadow-xs font-semibold'
                : 'text-[#68736D] hover:text-[#16382D]'
            }`}
          >
            Se connecter
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrentTab('register');
              setAuthTab('register');
            }}
            className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all cursor-pointer ${
              currentTab === 'register'
                ? 'bg-white text-[#16382D] shadow-xs font-semibold'
                : 'text-[#68736D] hover:text-[#16382D]'
            }`}
          >
            Créer un compte
          </button>
        </div>

        {/* TAB 1: ACCÈS DÉMO 1-CLIC */}
        {currentTab === 'demo' && (
          <div className="space-y-4">
            <div className="bg-[#F6F2EA] border border-[#DED8CD] rounded-2xl p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={mockUsers[0].avatar}
                    alt={mockUsers[0].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#16382D]/20 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#E8EEE8] text-[10px] font-mono text-[#16382D] uppercase tracking-wide">
                      <Sparkles className="w-2.5 h-2.5 text-[#70856F]" />
                      <span>Profil Gestionnaire prêt</span>
                    </div>
                    <h3 className="font-serif text-lg font-medium text-[#16382D] mt-0.5">
                      Marie Dupont
                    </h3>
                    <p className="text-xs text-[#68736D]">
                      Directrice & Fondatrice · Velora Beauty Studio
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md shrink-0">
                  Démo Active
                </span>
              </div>

              <p className="text-xs text-[#68736D] leading-relaxed">
                Explorez instantanément le SaaS Velora avec des données de simulation réalistes :
                agenda synchronisé du jour, 22 fiches clientes complètes, catalogue de soins,
                équipe de praticiennes et encaissements du mois.
              </p>

              <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                <div className="bg-white/80 border border-[#DED8CD]/60 p-2.5 rounded-lg text-center">
                  <span className="block font-semibold text-[#16382D] text-sm">12</span>
                  <span className="text-[#68736D] text-[10px]">RDV aujourd'hui</span>
                </div>
                <div className="bg-white/80 border border-[#DED8CD]/60 p-2.5 rounded-lg text-center">
                  <span className="block font-semibold text-[#16382D] text-sm">22</span>
                  <span className="text-[#68736D] text-[10px]">Clientes actives</span>
                </div>
                <div className="bg-white/80 border border-[#DED8CD]/60 p-2.5 rounded-lg text-center">
                  <span className="block font-semibold text-[#16382D] text-sm">6</span>
                  <span className="text-[#68736D] text-[10px]">Praticiennes</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handle1ClickDemo}
              className="w-full py-3.5 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] text-xs font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-75 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Ouverture de votre espace...
                </span>
              ) : (
                <>
                  <span>Accéder au tableau de bord en 1 clic</span>
                  <ArrowRight className="w-4 h-4 text-[#CDBB96]" />
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-[11px] text-[#68736D] pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#70856F]" />
                Sans inscription ni mot de passe
              </span>

              <button
                type="button"
                onClick={() => setCurrentTab('register')}
                className="text-[#16382D] font-medium hover:underline cursor-pointer"
              >
                Créer un compte personnalisé →
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: SE CONNECTER */}
        {currentTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div className="flex items-center justify-between bg-[#F6F2EA] border border-[#DED8CD] p-3 rounded-xl">
              <div>
                <p className="text-[11px] font-semibold text-[#16382D]">Identifiants démo recommandés :</p>
                <p className="text-[11px] text-[#68736D] font-mono">marie.dupont@velora-demo.com</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('marie.dupont@velora-demo.com');
                  setLoginPassword('Velora2026!');
                }}
                className="text-[11px] font-semibold text-[#16382D] bg-white border border-[#DED8CD] px-2.5 py-1 rounded-lg hover:bg-[#E8EEE8] transition-colors cursor-pointer"
              >
                Remplir
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                Adresse email du gestionnaire
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

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-[#68736D]">
                  Mot de passe
                </label>
                <span className="text-[10px] text-[#70856F] font-mono">
                  (Libre en mode démonstration)
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

            <div className="flex items-center justify-between pt-0.5">
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
                onClick={handle1ClickDemo}
                className="text-[#70856F] hover:text-[#16382D] hover:underline"
              >
                Connexion directe sans mot de passe
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] rounded-xl font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-75 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connexion en cours...
                </span>
              ) : (
                <>
                  <span>Se connecter comme gestionnaire</span>
                  <ArrowRight className="w-4 h-4 text-[#CDBB96]" />
                </>
              )}
            </button>

            <div className="pt-1 text-center text-[11px] text-[#68736D]">
              Pas encore de compte pour votre institut ?{' '}
              <button
                type="button"
                onClick={() => setCurrentTab('register')}
                className="text-[#16382D] font-semibold underline cursor-pointer"
              >
                Créer un compte gestionnaire
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: CRÉER UN COMPTE GESTIONNAIRE */}
        {currentTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between pb-1">
              <div>
                <p className="text-xs font-semibold text-[#16382D]">Créer votre nouvel espace</p>
                <p className="text-[11px] text-[#68736D]">Configurez votre salon et accédez instantanément au SaaS.</p>
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
                  <option value="Centre Wellness">Centre Wellness & Bien-être</option>
                  <option value="Studio de massage">Studio de massage</option>
                  <option value="Studio d'onglerie">Studio d'onglerie & Nail Art</option>
                  <option value="Praticien indépendant">Praticien(ne) indépendant(e)</option>
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
                  Email professionnel *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68736D]" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="direction@institut.com"
                    className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg pl-9 pr-3 py-2 text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                  Téléphone professionnel
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68736D]" />
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg pl-9 pr-3 py-2 text-xs text-[#24312B] font-mono focus:outline-none focus:ring-1 focus:ring-[#70856F]"
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
                  placeholder="Choisissez votre mot de passe"
                  className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg pl-9 pr-3 py-2 text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
                />
              </div>
            </div>

            {/* Choice of Plan */}
            <div>
              <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                Forfait souhaité (débloqué par paiement à l'étape suivante) *
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

            <button
              type="submit"
              disabled={isSubmitting || !agreeTerms}
              className="w-full py-3.5 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] rounded-xl font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-75 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Création de votre institut en cours...
                </span>
              ) : (
                <>
                  <span>Créer mon compte & passer au paiement</span>
                  <ArrowRight className="w-4 h-4 text-[#CDBB96]" />
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-[#68736D]">
              Le paiement est requis pour activer et débloquer l'accès à votre espace.
            </p>

            <div className="pt-1 text-center text-[11px] text-[#68736D]">
              Vous avez déjà un compte gestionnaire ?{' '}
              <button
                type="button"
                onClick={() => setCurrentTab('login')}
                className="text-[#16382D] font-semibold underline cursor-pointer"
              >
                Se connecter
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
