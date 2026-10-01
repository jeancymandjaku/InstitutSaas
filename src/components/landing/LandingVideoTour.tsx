import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Play,
  Sparkles,
  Calendar,
  Users,
  CreditCard,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';

export const LandingVideoTour: React.FC = () => {
  const { navigateTo } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 bg-[#16382D] text-[#FCFBF8] border-b border-[#0f261e] relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#70856F]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-12">
        {/* Header */}
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#CDBB96] block">
            Démonstration Produit
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight text-balance">
            Entrez dans Velora.
          </h2>
          <p className="text-sm sm:text-base text-[#DED8CD]/80 leading-relaxed max-w-lg mx-auto">
            Voyez comment une journée complète se déroule dans Velora : de l'ouverture du salon au bilan de caisse en soirée.
          </p>
        </div>

        {/* 16:9 Premium Cinema Frame Mockup */}
        <div className="relative max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden border border-[#DED8CD]/20 shadow-2xl bg-[#0f261e] group cursor-pointer">
          {/* Visual Poster Composition */}
          <div className="absolute inset-0">
            <img
              src="/src/assets/images/velora_spa_ambiance_1790707374686.jpg"
              alt="Velora Interface Overview"
              className="w-full h-full object-cover opacity-35 group-hover:scale-102 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f261e] via-[#16382D]/80 to-transparent" />
          </div>

          {/* Overlay UI Preview cards inside frame */}
          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-left">
            {/* Top row */}
            <div className="flex items-center justify-between text-xs text-white/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#CDBB96]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#CDBB96]">
                  Aperçu interactif
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#DED8CD]/60">
                1080p · Audio spatial
              </span>
            </div>

            {/* Center Play Button */}
            <div className="self-center text-center space-y-4">
              <button
                onClick={() => navigateTo('/app')}
                className="w-20 h-20 rounded-full bg-[#FCFBF8] text-[#16382D] flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300"
                aria-label="Lancer la démonstration produit"
              >
                <Play className="w-8 h-8 fill-[#16382D] ml-1" />
              </button>
              <div className="space-y-0.5">
                <p className="font-serif text-lg text-white">
                  Explorer la démo interactive
                </p>
                <p className="text-xs text-[#CDBB96] font-mono">
                  Visite produit · 1 min 42
                </p>
              </div>
            </div>

            {/* Bottom mini status */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/70 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4 text-[11px] font-mono">
                <span>01. Agenda</span>
                <span>02. Dossier client</span>
                <span>03. Encaissement</span>
              </div>
              <button
                onClick={() => navigateTo('/app')}
                className="text-xs text-[#CDBB96] hover:underline font-medium"
              >
                Accéder au logiciel complet →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
