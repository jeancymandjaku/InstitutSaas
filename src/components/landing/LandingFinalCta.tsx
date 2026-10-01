import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const LandingFinalCta: React.FC = () => {
  const { openModal } = useApp();

  return (
    <section className="py-28 bg-[#16382D] text-[#FCFBF8] relative overflow-hidden">
      {/* Background Soft Lighting Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#70856F]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono uppercase tracking-widest text-[#CDBB96]">
          <Sparkles className="w-3 h-3 text-[#CDBB96]" />
          <span>Faites le pas vers la clarté</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight text-balance max-w-3xl mx-auto leading-tight">
          Donnez à votre institut une meilleure façon de fonctionner.
        </h2>

        <p className="text-sm sm:text-base text-[#DED8CD]/80 leading-relaxed max-w-xl mx-auto">
          Commencez avec l'essentiel. Faites évoluer votre activité quand vous êtes prêt.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <button
            onClick={() => openModal('auth', { tab: 'register' })}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 bg-[#FCFBF8] hover:bg-white text-[#16382D] text-xs font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all active:scale-98 cursor-pointer"
          >
            <span>Commencer gratuitement</span>
            <ArrowRight className="w-4 h-4 text-[#16382D]" />
          </button>

          <button
            onClick={() => openModal('auth', { tab: 'demo' })}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 bg-white/8 hover:bg-white/14 border border-white/20 text-[#FCFBF8] text-xs font-medium rounded-xl transition-all cursor-pointer"
          >
            <span>Accéder à la démo interactive</span>
          </button>
        </div>

        {/* Quiet Brand Tagline */}
        <p className="text-xs text-[#CDBB96]/80 font-mono tracking-wider pt-6">
          Rendez-vous · Clients · Équipe · Paiements · Un seul espace
        </p>
      </div>
    </section>
  );
};
