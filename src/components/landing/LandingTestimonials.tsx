import React from 'react';
import { Quote } from 'lucide-react';

export const LandingTestimonials: React.FC = () => {
  const testimonials = [
    {
      quote:
        '« Avant Velora, nos rendez-vous étaient dispersés entre WhatsApp et notre agenda papier. Maintenant, toute l’équipe voit la journée en un coup d’œil. »',
      author: 'Directrice d’institut',
      type: 'Institut de beauté & soins visage',
    },
    {
      quote:
        '« Nous retrouvons enfin l’historique client au moment où nous en avons besoin. L’accueil est bien plus serein et nos clientes le remarquent immédiatement. »',
      author: 'Responsable spa & wellness',
      type: 'Spa urbain & balnéothérapie',
    },
    {
      quote:
        '« Notre équipe passe moins de temps à chercher l’information et plus de temps avec les clients. La charge mentale a considérablement baissé en fin de journée. »',
      author: 'Praticienne fondatrice',
      type: 'Studio de massage & bien-être',
    },
  ];

  return (
    <section className="py-24 bg-[#F6F2EA]/30 border-b border-[#DED8CD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#70856F] block">
            Retours d'expérience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#16382D] tracking-tight text-balance">
            Pensé autour de la vraie vie d’un institut.
          </h2>
          <p className="text-xs text-[#68736D] italic">
            Témoignages de démonstration — à remplacer par les premiers clients Velora.
          </p>
        </div>

        {/* Testimonials 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#FCFBF8] border border-[#DED8CD] rounded-2xl p-7 shadow-xs flex flex-col justify-between space-y-6 hover:border-[#16382D] transition-colors"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-[#CDBB96]" />
                <p className="text-sm font-serif text-[#24312B] leading-relaxed italic">
                  {t.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-[#DED8CD]/60">
                <p className="font-semibold text-xs text-[#16382D]">{t.author}</p>
                <p className="text-[11px] text-[#68736D] mt-0.5">{t.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
