import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  Play,
  Calendar,
  Clock,
  Sparkles,
  CreditCard,
  UserCheck,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export const LandingHero: React.FC = () => {
  const { openModal, navigateTo } = useApp();

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#F6F2EA]/40 via-[#FCFBF8] to-[#FCFBF8]">
      {/* Background Subtle Ambience Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-[#E8EEE8]/40 via-[#F6F2EA]/60 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow & Hero Copy */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE8]/80 border border-[#70856F]/20 text-[11px] font-mono uppercase tracking-widest text-[#16382D]">
            <Sparkles className="w-3 h-3 text-[#70856F]" />
            <span>Gestion Beauté & Bien-être</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-[#16382D] tracking-tight leading-[1.08] text-balance">
            L'excellence au cœur de votre institut de beauté & spa.
          </h1>

          <p className="text-base sm:text-lg text-[#68736D] leading-relaxed max-w-2xl mx-auto font-sans font-normal text-balance">
            Velora réunit vos rendez-vous, vos clients, votre équipe, vos prestations et vos paiements dans une expérience simple pensée pour les instituts de beauté et les spas modernes.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => openModal('auth', { tab: 'register' })}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] text-xs font-semibold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
            >
              <span>Commencer gratuitement</span>
              <ArrowRight className="w-4 h-4 text-[#CDBB96]" />
            </button>

            <button
              onClick={() => openModal('auth', { tab: 'demo' })}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FCFBF8] hover:bg-[#F6F2EA] border border-[#DED8CD] text-[#24312B] text-xs font-medium rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#70856F]" />
              <span>Tester la démo en 1 clic</span>
            </button>
          </div>

          {/* Caption */}
          <p className="text-xs text-[#68736D]/80 pt-1 font-sans">
            Pensé pour les professionnels qui veulent passer moins de temps à gérer et plus de temps à prendre soin de leurs clients.
          </p>
        </div>

        {/* HERO VISUEL COMPOSITION */}
        <div className="mt-14 sm:mt-16 lg:mt-20 relative max-w-5xl mx-auto">
          {/* Subtle Ambient Spa Photography Background Anchor */}
          <div className="absolute -top-10 -right-6 md:-right-12 w-64 md:w-80 h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl border border-[#DED8CD]/60 -rotate-2 hidden sm:block opacity-85 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <img
              src="/src/assets/images/velora_spa_ambiance_1790707374686.jpg"
              alt="Atmosphère spa contemporain et cabine de soin haut de gamme"
              className="w-full h-full object-cover brightness-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#16382D]/40 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-[11px] text-white/90 font-serif italic">
              « L’équilibre entre sérénité et précision. »
            </div>
          </div>

          {/* Main Dashboard Mockup */}
          <div className="relative z-10 bg-[#FCFBF8] border border-[#DED8CD] rounded-2xl shadow-2xl shadow-stone-900/5 overflow-hidden transition-all duration-300 hover:border-[#70856F]/60">
            {/* Topbar of Mockup */}
            <div className="px-5 py-3.5 border-b border-[#DED8CD]/70 bg-[#F6F2EA]/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                </div>
                <div className="h-3 w-px bg-[#DED8CD]" />
                <div className="flex items-center gap-1.5 text-xs text-[#16382D] font-medium">
                  <span className="font-serif">Velora Studio</span>
                  <span className="text-[#68736D] font-sans font-normal text-[11px]">· Gombe, Kinshasa</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="font-mono text-[#68736D] text-[11px] hidden sm:inline">
                  Mardi 27 septembre
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#16382D] bg-[#E8EEE8] px-2 py-0.5 rounded-md font-semibold">
                  12 rendez-vous
                </span>
              </div>
            </div>

            {/* Inner Dashboard Grid */}
            <div className="p-5 sm:p-7 space-y-6">
              {/* Row 1: KPI Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-3.5 bg-[#FCFBF8] border border-[#DED8CD]/70 rounded-xl">
                  <span className="text-[11px] text-[#68736D] block">Revenus du jour</span>
                  <span className="font-serif text-xl sm:text-2xl font-normal text-[#16382D] tabular-nums block mt-1">
                    €1 240
                  </span>
                  <span className="text-[10px] text-[#70856F] font-mono mt-0.5 inline-flex items-center gap-1">
                    <TrendingUp className="w-2.5 h-2.5" /> +18 %
                  </span>
                </div>

                <div className="p-3.5 bg-[#FCFBF8] border border-[#DED8CD]/70 rounded-xl">
                  <span className="text-[11px] text-[#68736D] block">Nouveaux clients</span>
                  <span className="font-serif text-xl sm:text-2xl font-normal text-[#16382D] tabular-nums block mt-1">
                    3
                  </span>
                  <span className="text-[10px] text-[#68736D] font-mono mt-0.5 block">
                    Fiches complétées
                  </span>
                </div>

                <div className="p-3.5 bg-[#FCFBF8] border border-[#DED8CD]/70 rounded-xl">
                  <span className="text-[11px] text-[#68736D] block">Équipe en service</span>
                  <span className="font-serif text-xl sm:text-2xl font-normal text-[#16382D] tabular-nums block mt-1">
                    4 praticiens
                  </span>
                  <span className="text-[10px] text-[#70856F] font-mono mt-0.5 block">
                    Disponibilités actives
                  </span>
                </div>

                <div className="p-3.5 bg-[#F6F2EA]/60 border border-[#DED8CD]/70 rounded-xl">
                  <span className="text-[11px] text-[#68736D] block">Prochain soin</span>
                  <span className="font-mono text-sm sm:text-base font-semibold text-[#16382D] block mt-1">
                    14:30
                  </span>
                  <span className="text-[10px] text-[#16382D] font-medium block truncate">
                    Sophie Martin · Soin visage
                  </span>
                </div>
              </div>

              {/* Row 2: Mini Agenda & Next Appointments */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 2 Cols: Schedule Stream */}
                <div className="md:col-span-2 border border-[#DED8CD]/70 rounded-xl p-4 bg-[#FCFBF8] space-y-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-[#DED8CD]/50">
                    <span className="font-semibold text-[#16382D]">Planning de l'après-midi</span>
                    <span className="text-[#68736D] text-[11px]">Cabines 1, 2 & 3</span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-[#E8EEE8]/50 border border-[#70856F]/20 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-semibold text-[#16382D] bg-[#FCFBF8] px-2 py-1 rounded border border-[#DED8CD]/60 text-[11px]">
                          14:30
                        </span>
                        <div>
                          <p className="font-medium text-[#16382D]">Sophie Martin</p>
                          <p className="text-[11px] text-[#68736D]">Soin visage premium · Praticienne : Aminata</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#16382D] shrink-0">€80</span>
                    </div>

                    <div className="p-3 rounded-lg bg-[#FCFBF8] border border-[#DED8CD]/60 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[#68736D] bg-[#F6F2EA] px-2 py-1 rounded border border-[#DED8CD]/60 text-[11px]">
                          16:00
                        </span>
                        <div>
                          <p className="font-medium text-[#16382D]">Laura Bernard</p>
                          <p className="text-[11px] text-[#68736D]">Massage relaxant · Praticienne : Sarah</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#16382D] shrink-0">€70</span>
                    </div>

                    <div className="p-3 rounded-lg bg-[#FCFBF8] border border-[#DED8CD]/60 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[#68736D] bg-[#F6F2EA] px-2 py-1 rounded border border-[#DED8CD]/60 text-[11px]">
                          17:15
                        </span>
                        <div>
                          <p className="font-medium text-[#16382D]">Claire Dubois</p>
                          <p className="text-[11px] text-[#68736D]">Manucure velours & soin des mains · Clara</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#16382D] shrink-0">€45</span>
                    </div>
                  </div>
                </div>

                {/* 1 Col: Mini Calendar & Live Activity */}
                <div className="border border-[#DED8CD]/70 rounded-xl p-4 bg-[#F6F2EA]/40 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-[#DED8CD]/50">
                      <span className="font-semibold text-[#16382D]">Activité en direct</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    </div>

                    <div className="space-y-2.5 mt-3 text-xs">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#70856F] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-medium text-[#16382D]">Paiement carte validé</p>
                          <p className="text-[10px] text-[#68736D]">€80 · Reçu électronique envoyé</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#16382D] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-medium text-[#16382D]">Rappel automatique SMS</p>
                          <p className="text-[10px] text-[#68736D]">Envoyé à Sophie Martin (J-1)</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#CDBB96] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-medium text-[#16382D]">Note de soin enregistrée</p>
                          <p className="text-[10px] text-[#68736D]">« Peau réactive aux agrumes »</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#DED8CD]/50">
                    <button
                      onClick={() => navigateTo('/app')}
                      className="w-full py-2 bg-[#16382D] hover:bg-[#0f261e] text-white text-[11px] font-medium rounded-lg text-center transition-colors shadow-xs"
                    >
                      Ouvrir l’application complète
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elegant Micro-Cards Around Mockup */}
          {/* Card 1: Top Left - Nouveau rendez-vous */}
          <div className="absolute -top-6 -left-4 sm:-left-8 bg-[#FCFBF8] border border-[#DED8CD] rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-3 hidden sm:flex z-20 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="w-8 h-8 rounded-lg bg-[#16382D] text-[#CDBB96] flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-[10px] uppercase font-semibold text-[#70856F] tracking-wide">
                Nouveau rendez-vous
              </p>
              <p className="text-xs font-semibold text-[#16382D]">
                Soin visage · 14:30
              </p>
            </div>
          </div>

          {/* Card 2: Bottom Right - Paiement reçu */}
          <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-[#FCFBF8] border border-[#DED8CD] rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-3 hidden sm:flex z-20 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="w-8 h-8 rounded-lg bg-[#CDBB96] text-[#16382D] flex items-center justify-center shrink-0 font-bold text-xs">
              €
            </div>
            <div className="text-left">
              <p className="text-[10px] uppercase font-semibold text-[#70856F] tracking-wide">
                Paiement reçu
              </p>
              <p className="text-xs font-semibold text-[#16382D]">
                €80 · Sans contact
              </p>
            </div>
          </div>

          {/* Card 3: Center Bottom Left - Client confirmé */}
          <div className="absolute -bottom-5 left-8 bg-[#FCFBF8] border border-[#DED8CD] rounded-xl px-3.5 py-2 shadow-lg flex items-center gap-2.5 hidden md:flex z-20">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <div className="text-left text-xs">
              <span className="text-[#68736D]">Client confirmé : </span>
              <span className="font-semibold text-[#16382D]">Sophie Martin</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
