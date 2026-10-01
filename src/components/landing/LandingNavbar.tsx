import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, X, ArrowRight, LogOut, LayoutDashboard, UserCheck } from 'lucide-react';

export const LandingNavbar: React.FC = () => {
  const { navigateTo, openModal, currentUser, isAuthenticated, logout, currentRoute } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentRoute !== '/') {
      navigateTo('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenLogin = () => {
    setMobileMenuOpen(false);
    openModal('auth', { tab: 'login' });
  };

  const handleOpenRegister = () => {
    setMobileMenuOpen(false);
    openModal('auth', { tab: 'register' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FCFBF8]/92 backdrop-blur-md py-3 border-b border-[#DED8CD]/60 shadow-xs'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Left - ONLY Icon + Velora, no subtitle */}
        <div
          onClick={() => {
            if (currentRoute !== '/') {
              navigateTo('/');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#16382D] text-[#FCFBF8] flex items-center justify-center font-serif text-lg font-bold shadow-xs group-hover:bg-[#70856F] transition-colors">
            V
          </div>
          <span className="font-serif text-xl font-medium tracking-tight text-[#16382D] leading-none">
            Velora
          </span>
        </div>

        {/* Desktop Nav Center */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#68736D]">
          <button
            onClick={() => {
              if (currentRoute !== '/') {
                navigateTo('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={`transition-colors cursor-pointer font-medium ${
              currentRoute === '/'
                ? 'text-[#16382D] font-bold border-b-2 border-[#16382D] pb-0.5'
                : 'hover:text-[#16382D]'
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => handleNavClick('fonctionnalites')}
            className="hover:text-[#16382D] transition-colors cursor-pointer"
          >
            Fonctionnalités
          </button>
          <button
            onClick={() => navigateTo('/tarifs')}
            className={`transition-colors cursor-pointer font-medium ${
              currentRoute === '/tarifs' || currentRoute === '/pricing'
                ? 'text-[#16382D] font-bold border-b-2 border-[#16382D] pb-0.5'
                : 'hover:text-[#16382D]'
            }`}
          >
            Tarifs
          </button>
          <button
            onClick={() => handleNavClick('pour-qui')}
            className="hover:text-[#16382D] transition-colors cursor-pointer"
          >
            Pour qui ?
          </button>
          <button
            onClick={() => handleNavClick('ressources')}
            className="hover:text-[#16382D] transition-colors cursor-pointer"
          >
            Ressources
          </button>
        </nav>

        {/* Action Buttons Right - (Compte Démo removed as requested) */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && currentUser ? (
            /* Connected Manager State */
            <div className="flex items-center gap-2.5">
              <div
                onClick={() => navigateTo('/app')}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#E8EEE8] hover:bg-[#DED8CD]/50 rounded-lg cursor-pointer transition-colors border border-[#70856F]/20"
                title="Accéder au tableau de bord"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-xs font-medium text-[#16382D] max-w-[120px] truncate">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-[#70856F] font-mono">
                  (Gestionnaire)
                </span>
              </div>

              <button
                onClick={() => navigateTo('/app')}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] text-xs font-medium rounded-lg shadow-xs transition-all active:scale-98 cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#CDBB96]" />
                <span>Tableau de bord</span>
              </button>

              <button
                onClick={logout}
                title="Se déconnecter"
                className="p-2 text-[#68736D] hover:text-rose-600 hover:bg-[#F6F2EA] rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Unauthenticated Visitor State */
            <>
              <button
                onClick={handleOpenLogin}
                className="px-3.5 py-2 text-xs font-medium text-[#16382D] hover:text-[#70856F] transition-colors cursor-pointer"
              >
                Se connecter
              </button>

              <button
                onClick={handleOpenRegister}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] text-xs font-medium rounded-lg shadow-xs transition-all active:scale-98 cursor-pointer"
              >
                <span>Commencer gratuitement</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#CDBB96]" />
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger & Quick Button */}
        <div className="flex items-center gap-2 md:hidden">
          {isAuthenticated && currentUser ? (
            <button
              onClick={() => navigateTo('/app')}
              className="px-3 py-1.5 bg-[#16382D] text-[#FCFBF8] text-xs font-medium rounded-lg flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3 h-3 text-[#CDBB96]" />
              <span>Tableau de bord</span>
            </button>
          ) : (
            <button
              onClick={handleOpenLogin}
              className="px-3 py-1.5 bg-[#16382D] text-[#FCFBF8] text-xs font-medium rounded-lg cursor-pointer"
            >
              Connexion
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#24312B] hover:text-[#16382D] rounded-lg cursor-pointer"
            aria-label="Menu de navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FCFBF8] border-b border-[#DED8CD] px-4 pt-4 pb-6 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (currentRoute !== '/') {
                navigateTo('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={`block w-full text-left py-2 text-sm font-medium ${
              currentRoute === '/'
                ? 'text-[#16382D] font-bold'
                : 'text-[#24312B]'
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => handleNavClick('fonctionnalites')}
            className="block w-full text-left py-2 text-sm text-[#24312B] font-medium"
          >
            Fonctionnalités
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              navigateTo('/tarifs');
            }}
            className={`block w-full text-left py-2 text-sm font-medium ${
              currentRoute === '/tarifs' || currentRoute === '/pricing'
                ? 'text-[#16382D] font-bold'
                : 'text-[#24312B]'
            }`}
          >
            Tarifs & Offres
          </button>
          <button
            onClick={() => handleNavClick('pour-qui')}
            className="block w-full text-left py-2 text-sm text-[#24312B] font-medium"
          >
            Pour qui ?
          </button>
          <button
            onClick={() => handleNavClick('ressources')}
            className="block w-full text-left py-2 text-sm text-[#24312B] font-medium"
          >
            Ressources
          </button>

          <div className="pt-3 border-t border-[#DED8CD]/60 space-y-2">
            {isAuthenticated && currentUser ? (
              <>
                <div className="p-3 bg-[#E8EEE8] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#16382D]" />
                    <div>
                      <p className="text-xs font-semibold text-[#16382D]">{currentUser.name}</p>
                      <p className="text-[10px] text-[#68736D]">Connecté en tant que gestionnaire</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="text-xs text-rose-600 font-medium hover:underline"
                  >
                    Déconnexion
                  </button>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('/app');
                  }}
                  className="w-full py-2.5 text-center text-xs font-medium text-[#FCFBF8] bg-[#16382D] rounded-lg flex items-center justify-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-[#CDBB96]" />
                  <span>Accéder au tableau de bord</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleOpenLogin}
                  className="w-full py-2.5 text-center text-xs font-medium text-[#16382D] bg-[#F6F2EA] rounded-lg hover:bg-[#E8EEE8] transition-colors"
                >
                  Se connecter (Espace Gestionnaire)
                </button>

                <button
                  onClick={handleOpenRegister}
                  className="w-full py-2.5 text-center text-xs font-medium text-[#FCFBF8] bg-[#16382D] rounded-lg flex items-center justify-center gap-1.5"
                >
                  <span>Commencer gratuitement (14 jours)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#CDBB96]" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
