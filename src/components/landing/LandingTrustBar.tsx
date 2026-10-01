import React from 'react';

export const LandingTrustBar: React.FC = () => {
  const categories = [
    { label: 'Institut de beauté', desc: 'Soins visage & protocoles sur-mesure' },
    { label: 'Spa contemporain', desc: 'Rituels bien-être & balnéothérapie' },
    { label: 'Centre Wellness', desc: 'Parcours sensoriels & relaxation' },
    { label: 'Studio beauté & ongles', desc: 'Nail art, regard & maquillage' },
    { label: 'Praticien indépendant', desc: 'Ostéo, massage & soins à domicile' },
  ];

  return (
    <section className="py-16 border-y border-[#DED8CD]/60 bg-[#F6F2EA]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <p className="text-xs font-mono uppercase tracking-widest text-[#70856F]">
          Pensé pour les professionnels qui prennent leur métier au sérieux.
        </p>

        {/* Categories Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="px-4 py-2.5 bg-[#FCFBF8] border border-[#DED8CD] rounded-xl text-left shadow-xs hover:border-[#70856F] transition-colors"
            >
              <span className="font-serif text-sm font-medium text-[#16382D] block">
                {cat.label}
              </span>
              <span className="text-[11px] text-[#68736D] block font-sans">
                {cat.desc}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#68736D] font-sans pt-2">
          Une seule expérience pour organiser votre journée, votre équipe et vos clients.
        </p>
      </div>
    </section>
  );
};
