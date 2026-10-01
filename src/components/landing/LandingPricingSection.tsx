import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Zap,
  HelpCircle,
} from 'lucide-react';

export const LandingPricingSection: React.FC = () => {
  const { openModal } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const offers = [
    {
      id: 'essentiel',
      name: 'Essentiel',
      target: 'Praticiennes indépendantes & professionnelles solo',
      monthlyPrice: 29,
      yearlyPrice: 24,
      description: 'Tout le nécessaire pour digitaliser vos rendez-vous, fidéliser vos clientes et supprimer les rendez-vous manqués.',
      badge: null,
      highlight: false,
      buttonText: 'Démarrer avec Essentiel',
      advantages: [
        '1 praticienne / agenda inclus',
        'Agenda intelligent & synchronisation en direct',
        'Réservation en ligne 24/7 sans commission',
        'Fichier clientes illimité avec historique des soins',
        'Rappels automatiques par SMS & email anti-no-show',
        'Encaissement rapide & suivi de caisse journalier',
        'Catalogue jusqu’à 25 prestations de soins',
        'Fiches techniques & notes de préférences clientes',
        'Support réactif par email 7j/7',
      ],
    },
    {
      id: 'studio',
      name: 'Studio & Institut',
      target: 'Instituts de beauté, ongleries & salons (2 à 5 praticiennes)',
      monthlyPrice: 69,
      yearlyPrice: 55,
      description: 'La formule plébiscitée pour coordonner une équipe, optimiser les cabines de soin et piloter l’activité avec sérénité.',
      badge: 'Le plus populaire · Recommandé',
      highlight: true,
      buttonText: 'Choisir le forfait Studio',
      advantages: [
        'Jusqu’à 5 praticiennes avec plannings individuels',
        'Gestion multi-cabines & postes de travail',
        'Rappels SMS illimités sans surcoût',
        'Fiches clientes VIP enrichies (allergies, photos avant/après)',
        'Gestion des pourboires et commissions par collaboratrice',
        'Rapports financiers automatiques & export comptable TVA',
        'Catalogue de prestations illimité avec temps de pause',
        'Zéro commission sur toutes vos réservations web',
        'Statistiques de fréquentation et taux de récurrence',
        'Support prioritaire dédié par chat & téléphone',
      ],
    },
    {
      id: 'signature',
      name: 'Spa & Signature',
      target: 'Spas haut de gamme, centres wellness & multi-postes',
      monthlyPrice: 129,
      yearlyPrice: 105,
      description: 'L’expérience de prestige taillée sur mesure pour les spas d’exception, centres thermaux et grands instituts de soin.',
      badge: 'Excellence & Multi-cabines',
      highlight: false,
      buttonText: 'Choisir le forfait Signature',
      advantages: [
        'Praticiennes & collaborateurs illimités',
        'Gestion des espaces humides (hammam, balnéo, cabines duo)',
        'Forfaits cures, abonnements & bons cadeaux personnalisés',
        'Gestion complète du stock cabine & produits de revente',
        'Alertes automatiques de réassort & inventaire simplifié',
        'Rapports de rentabilité par cabine et par collaborateur',
        'Programme de fidélité personnalisé et relances ciblées',
        'Onboarding personnalisé 1-à-1 avec un spécialiste Velora',
        'Support VIP prioritaire 7j/7 avec référent dédié',
      ],
    },
  ];

  return (
    <section id="tarifs" className="py-24 md:py-32 bg-[#F6F2EA]/60 relative overflow-hidden scroll-mt-20">
      {/* Decorative ambient blurred glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[#E8EEE8]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE8] border border-[#70856F]/20 text-[11px] font-mono uppercase tracking-widest text-[#16382D]">
            <Sparkles className="w-3 h-3 text-[#70856F]" />
            <span>Tarifs clairs & transparents</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#16382D] tracking-tight leading-tight">
            Des offres adaptées à la taille de votre institut.
          </h2>

          <p className="text-sm sm:text-base text-[#68736D] leading-relaxed max-w-2xl mx-auto">
            Choisissez la formule qui correspond à votre activité. Tous nos forfaits comprennent 14 jours d’essai gratuit, sans engagement ni carte bancaire.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="bg-[#FCFBF8] border border-[#DED8CD] p-1 rounded-xl inline-flex items-center gap-1 shadow-xs">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-[#16382D] text-[#FCFBF8] shadow-xs'
                    : 'text-[#68736D] hover:text-[#16382D]'
                }`}
              >
                Facturation mensuelle
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 text-xs rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  billingCycle === 'yearly'
                    ? 'bg-[#16382D] text-[#FCFBF8] shadow-xs'
                    : 'text-[#68736D] hover:text-[#16382D]'
                }`}
              >
                <span>Facturation annuelle</span>
                <span className="text-[10px] bg-[#CDBB96] text-[#16382D] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  -20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {offers.map((offer) => {
            const price = billingCycle === 'yearly' ? offer.yearlyPrice : offer.monthlyPrice;

            return (
              <div
                key={offer.id}
                className={`relative bg-[#FCFBF8] rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  offer.highlight
                    ? 'border-2 border-[#16382D] shadow-2xl shadow-[#16382D]/10 ring-4 ring-[#16382D]/5 lg:-translate-y-2'
                    : 'border border-[#DED8CD] shadow-lg hover:border-[#70856F]/60 hover:shadow-xl'
                }`}
              >
                {/* Highlight Badge */}
                {offer.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#16382D] text-[#FCFBF8] text-[10px] font-mono uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3 h-3 text-[#CDBB96]" />
                    <span>{offer.badge}</span>
                  </div>
                )}

                <div className="p-7 sm:p-8 space-y-6">
                  {/* Title & Target */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl font-medium text-[#16382D]">
                        {offer.name}
                      </h3>
                      {offer.highlight && (
                        <span className="text-[11px] font-mono text-[#70856F] bg-[#E8EEE8] px-2 py-0.5 rounded font-medium">
                          Idéal Instituts
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#70856F] font-medium leading-relaxed">
                      {offer.target}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="pt-2 pb-1 border-b border-[#DED8CD]/60">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-4xl sm:text-5xl font-normal text-[#16382D]">
                        {price} €
                      </span>
                      <span className="text-xs text-[#68736D]">
                        / mois {billingCycle === 'yearly' && <span className="text-[11px] font-mono text-[#70856F]">(facturé annuellement)</span>}
                      </span>
                    </div>
                    <p className="text-xs text-[#68736D] mt-2.5 leading-relaxed">
                      {offer.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div>
                    <button
                      type="button"
                      onClick={() => openModal('auth', { tab: 'register', plan: offer.name })}
                      className={`w-full py-3.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer shadow-sm ${
                        offer.highlight
                          ? 'bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] shadow-md hover:shadow-lg'
                          : 'bg-[#F6F2EA] hover:bg-[#E8EEE8] text-[#16382D] border border-[#DED8CD]'
                      }`}
                    >
                      <span>{offer.buttonText}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${offer.highlight ? 'text-[#CDBB96]' : 'text-[#70856F]'}`} />
                    </button>
                    <p className="text-[10px] text-center text-[#68736D] mt-2">
                      14 jours d’essai gratuit · Sans carte bancaire
                    </p>
                  </div>

                  {/* Advantages list */}
                  <div className="space-y-3 pt-3">
                    <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#16382D]">
                      Avantages attachés :
                    </p>
                    <ul className="space-y-2.5 text-xs text-[#24312B]">
                      {offer.advantages.map((adv, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-[#E8EEE8] text-[#16382D] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-[#16382D]" />
                          </div>
                          <span className="leading-snug text-[#24312B]">{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Card Footer Guarantee */}
                <div className="px-7 py-3.5 bg-[#F6F2EA]/40 border-t border-[#DED8CD]/60 rounded-b-2xl flex items-center justify-between text-[11px] text-[#68736D]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#70856F]" />
                    Sans engagement
                  </span>
                  <span className="font-mono text-[#70856F]">Support 7j/7</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Trust Row */}
        <div className="pt-8 border-t border-[#DED8CD]/70 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
          <div className="p-4 bg-[#FCFBF8] border border-[#DED8CD] rounded-xl space-y-1 shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-[#E8EEE8] text-[#16382D] flex items-center justify-center mx-auto mb-2">
              <Zap className="w-3.5 h-3.5 text-[#16382D]" />
            </div>
            <p className="font-semibold text-[#16382D]">Démarrage immédiat en 2 minutes</p>
            <p className="text-[11px] text-[#68736D]">Importez votre fichier clients ou commencez directement.</p>
          </div>

          <div className="p-4 bg-[#FCFBF8] border border-[#DED8CD] rounded-xl space-y-1 shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-[#E8EEE8] text-[#16382D] flex items-center justify-center mx-auto mb-2">
              <CreditCard className="w-3.5 h-3.5 text-[#16382D]" />
            </div>
            <p className="font-semibold text-[#16382D]">Zéro commission sur vos encaissements</p>
            <p className="text-[11px] text-[#68736D]">100% des revenus de vos soins vous reviennent.</p>
          </div>

          <div className="p-4 bg-[#FCFBF8] border border-[#DED8CD] rounded-xl space-y-1 shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-[#E8EEE8] text-[#16382D] flex items-center justify-center mx-auto mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#16382D]" />
            </div>
            <p className="font-semibold text-[#16382D]">Accompagnement humain dédié</p>
            <p className="text-[11px] text-[#68736D]">Une équipe française à votre écoute pour vous aider à réussir.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
