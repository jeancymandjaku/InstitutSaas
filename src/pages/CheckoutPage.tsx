import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Lock,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Store,
  User,
  ArrowLeft,
  Smartphone,
  Building,
  Check,
  Zap,
} from 'lucide-react';
import { SubscriptionPlanId, BillingCycle } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    business,
    currentUser,
    processSubscriptionPayment,
    registerManager,
    navigateTo,
    notify,
  } = useApp();

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanId>(
    (business.planId as SubscriptionPlanId) || 'studio'
  );
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(
    business.billingCycle || 'monthly'
  );
  const [paymentMethod, setPaymentMethod] = useState<'carte' | 'apple_pay' | 'sepa' | 'mobile_money'>('carte');

  // Guest onboarding state if user directly navigated to checkout without account
  const [guestManagerName, setGuestManagerName] = useState('Clara Vasseur');
  const [guestBusinessName, setGuestBusinessName] = useState('Institut Clara Beauté');
  const [guestEmail, setGuestEmail] = useState('clara.vasseur@institut-clara.fr');
  const [guestCity, setGuestCity] = useState('Paris');
  const [guestBusinessType, setGuestBusinessType] = useState('Institut de beauté');

  // Card form state
  const [cardHolder, setCardHolder] = useState(currentUser?.name || 'Clara Vasseur');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('884');
  const [mobilePhone, setMobilePhone] = useState(currentUser?.phone || '+33 6 12 34 56 78');
  const [savePaymentMethod, setSavePaymentMethod] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepState, setStepState] = useState<'idle' | 'processing' | 'success'>('idle');

  const plans = [
    {
      id: 'essentiel' as SubscriptionPlanId,
      name: 'Essentiel',
      monthlyPrice: 29,
      yearlyPrice: 24,
      target: 'Praticiennes solo',
      perks: ['1 agenda inclus', 'Réservation en ligne', 'Fichier clients illimité', 'Rappels SMS'],
    },
    {
      id: 'studio' as SubscriptionPlanId,
      name: 'Studio & Institut',
      monthlyPrice: 69,
      yearlyPrice: 55,
      target: '2 à 5 praticiennes',
      badge: 'Recommandé',
      perks: ['Jusqu’à 5 praticiennes', 'Multi-cabines & postes', 'Rappels SMS illimités', 'Rapports & TVA'],
    },
    {
      id: 'signature' as SubscriptionPlanId,
      name: 'Spa & Signature',
      monthlyPrice: 129,
      yearlyPrice: 105,
      target: 'Spas & Grands centres',
      badge: 'Prestige',
      perks: ['Collaborateurs illimités', 'Espaces humides & balnéo', 'Gestion des stocks', 'Support 7j/7 VIP'],
    },
  ];

  const currentPlanObj = plans.find((p) => p.id === selectedPlan) || plans[1];
  const unitPrice = billingCycle === 'yearly' ? currentPlanObj.yearlyPrice : currentPlanObj.monthlyPrice;
  const subtotal = billingCycle === 'yearly' ? unitPrice * 12 : unitPrice;
  const tva = Math.round(subtotal * 0.2 * 100) / 100;
  const totalTtc = Math.round((subtotal + tva) * 100) / 100;

  const handleFillTestCard = () => {
    setCardHolder(currentUser?.name || 'Clara Vasseur');
    setCardNumber('4242 4242 4242 4242');
    setCardExpiry('08/29');
    setCardCvc('314');
    notify('Données de carte de test sécurisée insérées', 'info');
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setStepState('processing');

    if (!currentUser) {
      registerManager({
        fullName: guestManagerName.trim() || 'Clara Vasseur',
        businessName: guestBusinessName.trim() || 'Institut Clara Beauté',
        email: guestEmail.trim() || 'clara.vasseur@institut-clara.fr',
        phone: mobilePhone,
        city: guestCity || 'Paris',
        businessType: guestBusinessType,
        planId: selectedPlan,
        billingCycle,
      });
    }

    // Simulate bank authorization & 3D Secure
    setTimeout(async () => {
      setStepState('success');
      setTimeout(async () => {
        await processSubscriptionPayment({
          planId: selectedPlan,
          billingCycle,
          paymentMethod,
          cardNumber,
          cardHolder: cardHolder || guestManagerName,
        });
        setIsProcessing(false);
      }, 700);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FCFBF8] text-[#24312B] flex flex-col justify-between selection:bg-[#E8EEE8] selection:text-[#16382D]">
      {/* Top Header */}
      <header className="px-4 sm:px-8 py-4 border-b border-[#DED8CD]/70 bg-[#FCFBF8]/90 backdrop-blur-xs flex items-center justify-between">
        <div
          onClick={() => navigateTo('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#16382D] text-[#FCFBF8] flex items-center justify-center font-serif text-lg font-bold group-hover:bg-[#70856F] transition-colors shadow-xs">
            V
          </div>
          <span className="font-serif text-xl font-medium tracking-tight text-[#16382D]">
            Velora
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#E8EEE8] rounded-full text-[#16382D] font-mono text-[11px]">
            <Lock className="w-3.5 h-3.5 text-[#70856F]" />
            <span>Paiement sécurisé SSL 256-bit</span>
          </div>

          <button
            onClick={() => navigateTo('/')}
            className="flex items-center gap-1.5 text-[#68736D] hover:text-[#16382D] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Retour au site</span>
          </button>
        </div>
      </header>

      {/* Main Checkout Area */}
      <main className="max-w-6xl w-full mx-auto px-4 py-8 sm:py-12 flex-1">
        {/* Onboarding Notice Banner */}
        <div className="mb-8 p-4 sm:p-5 bg-[#F6F2EA] border border-[#DED8CD] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#16382D] text-[#CDBB96] flex items-center justify-center shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg sm:text-xl font-medium text-[#16382D]">
                  Activation de votre espace institut
                </h1>
                <span className="text-[10px] font-mono bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full font-semibold">
                  Étape obligatoire
                </span>
              </div>
              {currentUser ? (
                <p className="text-xs text-[#68736D] mt-0.5">
                  Établissement : <strong className="text-[#16382D]">{business.name}</strong> ({business.city}) · Gestionnaire : <strong className="text-[#16382D]">{currentUser.name}</strong>
                </p>
              ) : (
                <p className="text-xs text-[#68736D] mt-0.5">
                  Finalisez vos coordonnées et validez votre abonnement pour débloquer immédiatement votre espace gestionnaire.
                </p>
              )}
            </div>
          </div>

          <div className="text-right text-xs shrink-0 self-end sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#DED8CD] text-[#70856F] font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Garantie 14 jours satisfait ou remboursé</span>
            </span>
          </div>
        </div>

        {/* Checkout Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Plan selector & Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-[#DED8CD]/60 pb-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#16382D] font-mono">
                  1. Choix du forfait
                </h2>

                {/* Billing Cycle Switch */}
                <div className="flex items-center gap-1 bg-[#E8EEE8] p-0.5 rounded-lg text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      billingCycle === 'monthly' ? 'bg-white text-[#16382D] font-semibold shadow-xs' : 'text-[#68736D]'
                    }`}
                  >
                    Mensuel
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                      billingCycle === 'yearly' ? 'bg-white text-[#16382D] font-semibold shadow-xs' : 'text-[#68736D]'
                    }`}
                  >
                    <span>Annuel</span>
                    <span className="text-[9px] bg-[#CDBB96] text-[#16382D] px-1 rounded font-bold">-20%</span>
                  </button>
                </div>
              </div>

              {/* Plans Radio Cards */}
              <div className="space-y-2.5">
                {plans.map((p) => {
                  const isSelected = selectedPlan === p.id;
                  const price = billingCycle === 'yearly' ? p.yearlyPrice : p.monthlyPrice;

                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPlan(p.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#16382D] bg-[#F6F2EA] shadow-xs'
                          : 'border-[#DED8CD] bg-[#FCFBF8] hover:border-[#70856F]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-[#16382D] bg-[#16382D]' : 'border-[#DED8CD]'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-[#16382D]">{p.name}</span>
                            {p.badge && (
                              <span className="text-[9px] font-mono bg-[#16382D] text-[#FCFBF8] px-1.5 py-0.5 rounded">
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#68736D]">{p.target}</span>
                        </div>
                      </div>

                      <div className="text-right font-mono">
                        <span className="text-sm font-semibold text-[#16382D]">{price} €</span>
                        <span className="text-[10px] text-[#68736D]">/mois</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order breakdown */}
              <div className="pt-3 border-t border-[#DED8CD]/60 space-y-2 text-xs">
                <div className="flex justify-between text-[#68736D]">
                  <span>Abonnement {currentPlanObj.name} ({billingCycle === 'yearly' ? '12 mois' : '1 mois'})</span>
                  <span className="font-mono text-[#16382D]">{subtotal} €</span>
                </div>
                <div className="flex justify-between text-[#68736D]">
                  <span>TVA estimée (20%)</span>
                  <span className="font-mono text-[#16382D]">{tva} €</span>
                </div>
                <div className="flex justify-between text-[#16382D] font-semibold text-sm pt-2 border-t border-[#DED8CD]/60">
                  <span>Total à régler aujourd'hui</span>
                  <span className="font-mono text-base text-[#16382D]">{totalTtc} €</span>
                </div>
                <p className="text-[10px] text-[#68736D] pt-1">
                  Facturation récurrente, annulable en 1 clic depuis votre espace gestionnaire.
                </p>
              </div>
            </div>

            {/* Attached Perks Checklist */}
            <div className="p-4 bg-[#E8EEE8]/60 border border-[#70856F]/20 rounded-xl space-y-2 text-xs">
              <p className="font-semibold text-[#16382D] text-[11px] font-mono uppercase tracking-wider">
                Avantages immédiats débloqués :
              </p>
              <ul className="space-y-1.5 text-[11px] text-[#24312B]">
                {currentPlanObj.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Payment Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#FCFBF8] border border-[#DED8CD] rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#16382D] font-mono">
                2. Méthode de paiement sécurisée
              </h2>
              <p className="text-xs text-[#68736D] mt-0.5">
                Réglez en toute sécurité pour activer votre espace institut en direct.
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('carte')}
                className={`p-2.5 rounded-xl border text-center font-medium transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'carte'
                    ? 'border-[#16382D] bg-[#F6F2EA] text-[#16382D] shadow-xs'
                    : 'border-[#DED8CD] text-[#68736D] hover:bg-[#E8EEE8]'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#16382D]" />
                <span className="text-[11px]">Carte Bancaire</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-2.5 rounded-xl border text-center font-medium transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'apple_pay'
                    ? 'border-[#16382D] bg-[#F6F2EA] text-[#16382D] shadow-xs'
                    : 'border-[#DED8CD] text-[#68736D] hover:bg-[#E8EEE8]'
                }`}
              >
                <Zap className="w-4 h-4 text-[#16382D]" />
                <span className="text-[11px]">Apple / Google</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('sepa')}
                className={`p-2.5 rounded-xl border text-center font-medium transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'sepa'
                    ? 'border-[#16382D] bg-[#F6F2EA] text-[#16382D] shadow-xs'
                    : 'border-[#DED8CD] text-[#68736D] hover:bg-[#E8EEE8]'
                }`}
              >
                <Building className="w-4 h-4 text-[#16382D]" />
                <span className="text-[11px]">Prélèvement SEPA</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('mobile_money')}
                className={`p-2.5 rounded-xl border text-center font-medium transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'mobile_money'
                    ? 'border-[#16382D] bg-[#F6F2EA] text-[#16382D] shadow-xs'
                    : 'border-[#DED8CD] text-[#68736D] hover:bg-[#E8EEE8]'
                }`}
              >
                <Smartphone className="w-4 h-4 text-[#16382D]" />
                <span className="text-[11px]">Mobile Money</span>
              </button>
            </div>

            {/* Test Helper Pill */}
            <div className="flex items-center justify-between p-3 bg-[#E8EEE8]/60 border border-[#70856F]/20 rounded-xl text-xs">
              <span className="text-[11px] text-[#16382D] font-medium">
                Prototype Frontend · Test de paiement
              </span>
              <button
                type="button"
                onClick={handleFillTestCard}
                className="text-[11px] font-semibold text-[#16382D] bg-white border border-[#DED8CD] px-2.5 py-1 rounded-lg hover:bg-[#E8EEE8] transition-colors cursor-pointer"
              >
                Remplir carte de test
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handlePay} className="space-y-4 text-xs">
              {!currentUser && (
                <div className="p-4 bg-[#F6F2EA] border border-[#DED8CD] rounded-xl space-y-3">
                  <p className="font-mono text-[11px] font-semibold uppercase text-[#16382D]">
                    Coordonnées de votre institut & compte gestionnaire :
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                        Votre prénom & nom *
                      </label>
                      <input
                        type="text"
                        required
                        value={guestManagerName}
                        onChange={(e) => {
                          setGuestManagerName(e.target.value);
                          setCardHolder(e.target.value);
                        }}
                        placeholder="Ex: Clara Vasseur"
                        className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg p-2 text-xs text-[#24312B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                        Nom de l'établissement *
                      </label>
                      <input
                        type="text"
                        required
                        value={guestBusinessName}
                        onChange={(e) => setGuestBusinessName(e.target.value)}
                        placeholder="Ex: L'Atelier Botanique Spa"
                        className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg p-2 text-xs text-[#24312B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                        Email professionnel *
                      </label>
                      <input
                        type="email"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="clara@atelier-botanique.com"
                        className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg p-2 text-xs text-[#24312B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                        Ville
                      </label>
                      <input
                        type="text"
                        value={guestCity}
                        onChange={(e) => setGuestCity(e.target.value)}
                        placeholder="Ex: Paris"
                        className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg p-2 text-xs text-[#24312B]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'carte' && (
                <>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                      Nom complet sur la carte
                    </label>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Ex: Clara Vasseur"
                      className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg p-2.5 text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                      Numéro de carte bancaire
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68736D]" />
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg pl-9 pr-3 py-2.5 text-xs font-mono text-[#24312B] focus:ring-1 focus:ring-[#70856F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                        Date d'expiration
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/AA"
                        className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg p-2.5 text-xs font-mono text-[#24312B] focus:ring-1 focus:ring-[#70856F]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                        Cryptogramme (CVC)
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123"
                        className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg p-2.5 text-xs font-mono text-[#24312B] focus:ring-1 focus:ring-[#70856F]"
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === 'apple_pay' && (
                <div className="p-6 border border-[#DED8CD] rounded-xl text-center space-y-3 bg-[#F6F2EA]/40">
                  <Zap className="w-8 h-8 text-[#16382D] mx-auto" />
                  <p className="font-semibold text-sm text-[#16382D]">Paiement rapide Apple Pay / Google Pay</p>
                  <p className="text-xs text-[#68736D]">
                    Authentification biométrique instantanée sur votre appareil sécurisé.
                  </p>
                </div>
              )}

              {paymentMethod === 'sepa' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                      IBAN du compte professionnel
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="FR76 3000 6000 0112 3456 7890 189"
                      className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg p-2.5 text-xs font-mono text-[#24312B] focus:ring-1 focus:ring-[#70856F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                      Titulaire du compte bancaire
                    </label>
                    <input
                      type="text"
                      required
                      defaultValue={business.name}
                      className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg p-2.5 text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F]"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'mobile_money' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                      Numéro de téléphone Mobile Money
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68736D]" />
                      <input
                        type="tel"
                        required
                        value={mobilePhone}
                        onChange={(e) => setMobilePhone(e.target.value)}
                        placeholder="+243 81 000 0000"
                        className="w-full bg-[#FCFBF8] border border-[#DED8CD] rounded-lg pl-9 pr-3 py-2.5 text-xs font-mono text-[#24312B] focus:ring-1 focus:ring-[#70856F]"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-[#68736D]">
                    Compatible Orange Money, MTN MoMo, Airtel Money & M-Pesa.
                  </p>
                </div>
              )}

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-[#68736D]">
                  <input
                    type="checkbox"
                    checked={savePaymentMethod}
                    onChange={(e) => setSavePaymentMethod(e.target.checked)}
                    className="w-3.5 h-3.5 text-[#16382D] rounded border-[#DED8CD]"
                  />
                  <span className="text-[11px]">
                    J'autorise Velora à prélever {totalTtc} € selon la périodicité choisie.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] text-xs font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-75 cursor-pointer"
                >
                  {stepState === 'processing' ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Vérification bancaire 3D Secure...
                    </span>
                  ) : stepState === 'success' ? (
                    <span className="inline-flex items-center gap-2 text-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      Paiement approuvé ! Déblocage de votre institut...
                    </span>
                  ) : (
                    <>
                      <span>Valider le paiement ({totalTtc} €) & activer mon espace</span>
                      <ArrowRight className="w-4 h-4 text-[#CDBB96]" />
                    </>
                  )}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-[#DED8CD]/60 flex items-center justify-between text-[11px] text-[#68736D]">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#70856F]" />
                  Chiffrement bancaire TLS 1.3
                </span>
                <span>PCI-DSS Niveau 1</span>
                <span>Sans engagement</span>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer Minimal */}
      <footer className="py-4 text-center text-[11px] text-[#68736D] border-t border-[#DED8CD]/50">
        © 2026 Velora SaaS. Espace réservé aux gestionnaires d'instituts de beauté & spas.
      </footer>
    </div>
  );
};
