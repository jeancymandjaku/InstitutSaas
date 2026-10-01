import React from 'react';
import {
  Calendar,
  Users,
  Smartphone,
  UserCheck,
  CreditCard,
  BarChart3,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const LandingFeatureStory: React.FC = () => {
  return (
    <section id="fonctionnalites" className="py-24 bg-[#FCFBF8] border-b border-[#DED8CD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#70856F] block">
            Fonctionnalités Clés
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#16382D] tracking-tight text-balance">
            Les essentiels. Rien de superflu.
          </h2>
          <p className="text-sm sm:text-base text-[#68736D] leading-relaxed max-w-xl mx-auto">
            Chaque outil a été conçu pour répondre précisément au rythme d’un institut de beauté, sans boutons inutiles ni complexité superflue.
          </p>
        </div>

        {/* Asymmetric Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 max-w-6xl mx-auto">
          {/* 01 - Calendrier intelligent (Grande carte: 7 cols) */}
          <div className="md:col-span-7 bg-[#FCFBF8] border border-[#DED8CD] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#16382D] transition-all duration-300 group shadow-xs">
            <div>
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="font-mono text-xs text-[#70856F] font-semibold">
                  01 — Calendrier intelligent
                </span>
                <span className="w-8 h-8 rounded-lg bg-[#E8EEE8] flex items-center justify-center text-[#16382D]">
                  <Calendar className="w-4 h-4" />
                </span>
              </div>

              <h3 className="font-serif text-2xl font-medium text-[#16382D] mb-2">
                Voyez toute votre journée et toute votre équipe en un seul endroit.
              </h3>
              <p className="text-xs sm:text-sm text-[#68736D] leading-relaxed max-w-md">
                Un agenda dynamique découpé par praticienne et par cabine. Déplacez, prolongez ou réattribuez un soin d’un simple geste sans friction.
              </p>
            </div>

            {/* Micro visual snippet inside */}
            <div className="mt-6 pt-5 border-t border-[#DED8CD]/60 bg-[#F6F2EA]/30 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-5 rounded-b-2xl">
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg">
                  <span className="text-[10px] text-[#68736D] font-mono block">Aminata</span>
                  <span className="font-semibold text-[#16382D] block truncate">Soin visage</span>
                  <span className="text-[10px] text-[#70856F] font-mono">14:30 · 75m</span>
                </div>
                <div className="p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg">
                  <span className="text-[10px] text-[#68736D] font-mono block">Sarah</span>
                  <span className="font-semibold text-[#16382D] block truncate">Massage</span>
                  <span className="text-[10px] text-[#70856F] font-mono">16:00 · 60m</span>
                </div>
                <div className="p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg">
                  <span className="text-[10px] text-[#68736D] font-mono block">Clara</span>
                  <span className="font-semibold text-[#16382D] block truncate">Manucure</span>
                  <span className="text-[10px] text-[#70856F] font-mono">17:15 · 45m</span>
                </div>
              </div>
            </div>
          </div>

          {/* 02 - Clients (Carte: 5 cols) */}
          <div className="md:col-span-5 bg-[#FCFBF8] border border-[#DED8CD] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#16382D] transition-all duration-300 group shadow-xs">
            <div>
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="font-mono text-xs text-[#70856F] font-semibold">
                  02 — Clients
                </span>
                <span className="w-8 h-8 rounded-lg bg-[#E8EEE8] flex items-center justify-center text-[#16382D]">
                  <Users className="w-4 h-4" />
                </span>
              </div>

              <h3 className="font-serif text-2xl font-medium text-[#16382D] mb-2">
                Historique, préférences et notes toujours à portée de main.
              </h3>
              <p className="text-xs sm:text-sm text-[#68736D] leading-relaxed">
                Retrouvez instantanément la fiche complète : habitudes, contre-indications cutanées et achats boutique pour conseiller avec justesse.
              </p>
            </div>

            <div className="mt-6 p-3.5 bg-[#F6F2EA]/40 rounded-xl border border-[#DED8CD] flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#16382D] text-white flex items-center justify-center font-serif text-xs font-bold shrink-0">
                SM
              </div>
              <div className="text-xs min-w-0">
                <p className="font-semibold text-[#16382D] truncate">Sophie Martin · VIP</p>
                <p className="text-[11px] text-[#68736D] truncate">Dernier soin : 12 septembre (€80)</p>
              </div>
            </div>
          </div>

          {/* 03 - Réservation en ligne (Carte: 5 cols) */}
          <div className="md:col-span-5 bg-[#FCFBF8] border border-[#DED8CD] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#16382D] transition-all duration-300 group shadow-xs">
            <div>
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="font-mono text-xs text-[#70856F] font-semibold">
                  03 — Réservation en ligne
                </span>
                <span className="w-8 h-8 rounded-lg bg-[#E8EEE8] flex items-center justify-center text-[#16382D]">
                  <Smartphone className="w-4 h-4" />
                </span>
              </div>

              <h3 className="font-serif text-2xl font-medium text-[#16382D] mb-2">
                Laissez vos clients choisir leur prestation et leur créneau.
              </h3>
              <p className="text-xs sm:text-sm text-[#68736D] leading-relaxed">
                Une page de réservation raffinée intégrable sur votre site web ou votre page Instagram, active 24 heures sur 24 sans double réservation.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs p-3 bg-[#E8EEE8]/40 rounded-xl border border-[#70856F]/20 font-mono">
              <span className="text-[#16382D] font-semibold">velora.me/votre-institut</span>
              <span className="text-[#70856F] font-bold">24h/24</span>
            </div>
          </div>

          {/* 04 - Équipe (Grande carte: 7 cols) */}
          <div className="md:col-span-7 bg-[#FCFBF8] border border-[#DED8CD] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#16382D] transition-all duration-300 group shadow-xs">
            <div>
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="font-mono text-xs text-[#70856F] font-semibold">
                  04 — Équipe
                </span>
                <span className="w-8 h-8 rounded-lg bg-[#E8EEE8] flex items-center justify-center text-[#16382D]">
                  <UserCheck className="w-4 h-4" />
                </span>
              </div>

              <h3 className="font-serif text-2xl font-medium text-[#16382D] mb-2">
                Sachez qui travaille, qui est disponible et ce qui est réservé.
              </h3>
              <p className="text-xs sm:text-sm text-[#68736D] leading-relaxed max-w-md">
                Gérez les plannings individuels, les rotations de cabines, les pauses et les compétences spécifiques de chaque praticienne sans friction.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-[#DED8CD]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span className="font-medium text-[#16382D]">4 praticiennes actives</span>
              </div>
              <span className="text-[11px] text-[#68736D] font-mono">
                Zéro conflit d’horaires détecté
              </span>
            </div>
          </div>

          {/* 05 - Paiements (Carte: 6 cols) */}
          <div className="md:col-span-6 bg-[#FCFBF8] border border-[#DED8CD] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#16382D] transition-all duration-300 group shadow-xs">
            <div>
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="font-mono text-xs text-[#70856F] font-semibold">
                  05 — Paiements
                </span>
                <span className="w-8 h-8 rounded-lg bg-[#E8EEE8] flex items-center justify-center text-[#16382D]">
                  <CreditCard className="w-4 h-4" />
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#16382D] mb-2">
                Gardez une trace claire des paiements, acomptes et soldes.
              </h3>
              <p className="text-xs sm:text-sm text-[#68736D] leading-relaxed">
                Carte bancaire, espèces, Mobile Money ou virement : chaque encaissement est relié immédiatement à la fiche du client et à la prestation.
              </p>
            </div>

            <div className="mt-6 p-3 bg-[#F6F2EA]/60 rounded-xl border border-[#DED8CD] flex items-center justify-between text-xs">
              <span className="text-[#68736D]">Encaissement direct en caisse</span>
              <span className="font-mono font-bold text-[#16382D]">Ticket & Reçu par email</span>
            </div>
          </div>

          {/* 06 - Vue d'ensemble (Carte: 6 cols) */}
          <div className="md:col-span-6 bg-[#FCFBF8] border border-[#DED8CD] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#16382D] transition-all duration-300 group shadow-xs">
            <div>
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="font-mono text-xs text-[#70856F] font-semibold">
                  06 — Vue d'ensemble
                </span>
                <span className="w-8 h-8 rounded-lg bg-[#E8EEE8] flex items-center justify-center text-[#16382D]">
                  <BarChart3 className="w-4 h-4" />
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#16382D] mb-2">
                Comprenez immédiatement l'activité de votre établissement.
              </h3>
              <p className="text-xs sm:text-sm text-[#68736D] leading-relaxed">
                Chiffre d’affaires, soins phares, taux de remplissage et panier moyen : suivez la santé de votre activité avec des indicateurs clairs.
              </p>
            </div>

            <div className="mt-6 p-3 bg-[#E8EEE8]/40 rounded-xl border border-[#70856F]/20 flex items-center justify-between text-xs">
              <span className="text-[#16382D] font-medium">Export de rapport comptable</span>
              <span className="font-mono text-[#70856F] font-semibold">CSV en 1 clic</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
