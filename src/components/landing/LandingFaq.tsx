import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

export const LandingFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "À qui s'adresse Velora ?",
      a: "Velora est conçu pour les instituts de beauté, salons, spas, centres bien-être, studios de massage, ongleries et professionnels indépendants exigeants.",
    },
    {
      q: 'Les clients peuvent-ils réserver en ligne ?',
      a: 'Oui. Velora propose un module de réservation en ligne épuré, accessible 24h/24, qui respecte en temps réel vos disponibilités et la durée exacte de chaque soin.',
    },
    {
      q: 'Puis-je gérer plusieurs praticiens ?',
      a: 'Oui. Vous pouvez attribuer des compétences spécifiques, des plannings distincts et des temps de pause dédiés à chacun de vos collaborateurs.',
    },
    {
      q: 'Une réceptionniste peut-elle gérer les rendez-vous ?',
      a: 'Oui. L’interface permet à l’accueil de visualiser l’ensemble des cabines, d’enregistrer les arrivées et d’encaisser en toute simplicité.',
    },
    {
      q: 'Les praticiens peuvent-ils consulter leur planning ?',
      a: 'Oui. Chaque praticienne a un accès clair à sa journée, avec la liste de ses rendez-vous et les notes spécifiques de chaque client.',
    },
    {
      q: 'Puis-je suivre les paiements ?',
      a: 'Oui. Velora consigne les encaissements par carte, espèces, mobile money ou virement, ainsi que les acomptes et les soldes restants.',
    },
    {
      q: "L'historique client est-il conservé ?",
      a: 'Oui. Chaque fiche conserve la chronologie complète des soins, les praticiennes référentes, les préférences et les éventuelles sensibilités cutanées.',
    },
    {
      q: 'Les données de mon établissement sont-elles séparées ?',
      a: 'Oui. Chaque établissement dispose de son propre espace étanche, garantissant la stricte confidentialité de votre fichier clientèle et de vos chiffres.',
    },
    {
      q: 'Puis-je commencer avec une petite équipe ?',
      a: 'Oui. Velora s’adapte parfaitement dès 1 ou 2 praticiennes, sans configuration lourde.',
    },
    {
      q: 'Velora pourra-t-il évoluer avec mon établissement ?',
      a: 'Oui. Le produit est conçu pour grandir progressivement au rythme de votre activité : ouverture de nouvelles cabines, intégration de nouvelles prestations et recrutement de personnel.',
    },
  ];

  return (
    <section id="ressources" className="py-24 bg-[#FCFBF8] border-b border-[#DED8CD]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#70856F] block">
            Questions fréquentes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#16382D] tracking-tight text-balance">
            Tout ce que vous devez savoir.
          </h2>
          <p className="text-sm sm:text-base text-[#68736D] leading-relaxed max-w-xl mx-auto">
            Des réponses transparentes et concises sur le fonctionnement quotidien de Velora.
          </p>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-[#DED8CD]/60 border-y border-[#DED8CD]/60">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left py-2 group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg font-medium text-[#16382D] group-hover:text-[#70856F] transition-colors pr-4">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#F6F2EA] flex items-center justify-center text-[#16382D] shrink-0 transition-transform duration-200">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 text-[#16382D]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-[#70856F]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-2 pb-3 text-xs sm:text-sm text-[#68736D] leading-relaxed animate-in fade-in duration-200 pr-8">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
