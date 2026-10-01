import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUp } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  const { openModal, navigateTo } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FCFBF8] border-t border-[#DED8CD] pt-16 pb-12 text-xs text-[#68736D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand Col (2 cols on md) */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#16382D] text-[#FCFBF8] flex items-center justify-center font-serif text-lg font-bold">
                V
              </div>
              <span className="font-serif text-xl font-medium tracking-tight text-[#16382D]">
                Velora
              </span>
            </div>

            <p className="text-xs text-[#68736D] leading-relaxed max-w-xs">
              La plateforme de gestion pensée pour les instituts de beauté, spas et praticiens indépendants.
            </p>

            <div className="pt-2 flex flex-col gap-1.5">
              <button
                onClick={() => openModal('auth', { tab: 'login' })}
                className="text-xs text-[#16382D] hover:underline font-semibold text-left cursor-pointer"
              >
                Espace Gestionnaire · Se connecter →
              </button>
              <button
                onClick={() => openModal('auth', { tab: 'register' })}
                className="text-xs text-[#70856F] hover:text-[#16382D] hover:underline text-left cursor-pointer"
              >
                Créer un compte institut (Essai gratuit)
              </button>
            </div>
          </div>

          {/* Col: Produit */}
          <div className="space-y-3">
            <p className="font-semibold text-[#16382D] uppercase tracking-wider text-[11px] font-mono">
              Produit
            </p>
            <ul className="space-y-2">
              <li>
                <a href="#fonctionnalites" className="hover:text-[#16382D] transition-colors">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#produit" className="hover:text-[#16382D] transition-colors">
                  Réservation en ligne
                </a>
              </li>
              <li>
                <a href="#produit" className="hover:text-[#16382D] transition-colors">
                  Calendrier
                </a>
              </li>
              <li>
                <a href="#produit" className="hover:text-[#16382D] transition-colors">
                  Fichier clients
                </a>
              </li>
              <li>
                <a href="#produit" className="hover:text-[#16382D] transition-colors">
                  Gestion équipe
                </a>
              </li>
            </ul>
          </div>

          {/* Col: Entreprise */}
          <div className="space-y-3">
            <p className="font-semibold text-[#16382D] uppercase tracking-wider text-[11px] font-mono">
              Entreprise
            </p>
            <ul className="space-y-2">
              <li>
                <a href="#pour-qui" className="hover:text-[#16382D] transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/tarifs')}
                  className="hover:text-[#16382D] transition-colors text-left cursor-pointer"
                >
                  Tarifs & Offres
                </button>
              </li>
              <li>
                <a href="#ressources" className="hover:text-[#16382D] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col: Ressources */}
          <div className="space-y-3">
            <p className="font-semibold text-[#16382D] uppercase tracking-wider text-[11px] font-mono">
              Ressources
            </p>
            <ul className="space-y-2">
              <li>
                <a href="#ressources" className="hover:text-[#16382D] transition-colors">
                  Centre d'aide
                </a>
              </li>
              <li>
                <a href="#ressources" className="hover:text-[#16382D] transition-colors">
                  Guides beauté
                </a>
              </li>
              <li>
                <a href="#ressources" className="hover:text-[#16382D] transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Col: Légal */}
          <div className="space-y-3">
            <p className="font-semibold text-[#16382D] uppercase tracking-wider text-[11px] font-mono">
              Légal
            </p>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-[#16382D] cursor-pointer">
                  Confidentialité
                </span>
              </li>
              <li>
                <span className="hover:text-[#16382D] cursor-pointer">
                  Conditions
                </span>
              </li>
              <li>
                <span className="hover:text-[#16382D] cursor-pointer">
                  Sécurité des données
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-[#DED8CD]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Velora. Tous droits réservés.</p>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#16382D] cursor-pointer">Instagram</span>
            <span className="hover:text-[#16382D] cursor-pointer">Facebook</span>
            <span className="hover:text-[#16382D] cursor-pointer">LinkedIn</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#16382D] hover:text-[#70856F] transition-colors p-1"
            aria-label="Retour en haut"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
