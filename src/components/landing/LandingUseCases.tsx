import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const LandingUseCases: React.FC = () => {
  const useCases = [
    {
      title: 'Instituts de beauté',
      desc: 'Gérez vos rendez-vous, prestations sur-mesure et fidélisation de votre clientèle.',
      image: '/src/assets/images/landing_facial_treatment_1790763798152.jpg',
      tag: 'Soins visage & protocoles',
    },
    {
      title: 'Spas contemporains',
      desc: 'Organisez soins balnéo, cabines multiples, praticiens et forfaits bien-être.',
      image: '/src/assets/images/velora_spa_ambiance_1790707374686.jpg',
      tag: 'Rituels sensoriels & balnéo',
    },
    {
      title: 'Centres bien-être',
      desc: 'Structurez chaque séance de détente et chaque parcours client personnalisé.',
      image: '/src/assets/images/landing_massage_zen_1790763809635.jpg',
      tag: 'Holistique & relaxation',
    },
    {
      title: 'Studios d’onglerie',
      desc: 'Simplifiez votre planning, la gestion du matériel et vos réservations rapides.',
      image: '/src/assets/images/landing_nail_manicure_1790763819785.jpg',
      tag: 'Manucure & Nail art',
    },
    {
      title: 'Studios de massage',
      desc: 'Gérez vos praticiens, le temps de battement entre les séances et le confort des cabines.',
      image: '/src/assets/images/landing_massage_zen_1790763809635.jpg',
      tag: 'Deep tissue & relaxant',
    },
    {
      title: 'Professionnels indépendants',
      desc: 'Gardez toute votre activité, vos paiements et votre agenda sur un seul outil mobile.',
      image: '/src/assets/images/avatar_julie_martin_1790707396961.jpg',
      tag: 'Praticiens à domicile & solo',
    },
  ];

  return (
    <section id="pour-qui" className="py-24 bg-[#FCFBF8] border-b border-[#DED8CD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#70856F] block">
            Pour qui ?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#16382D] tracking-tight text-balance">
            Conçu pour les métiers qui prennent soin des autres.
          </h2>
          <p className="text-sm sm:text-base text-[#68736D] leading-relaxed max-w-xl mx-auto">
            Que vous dirigiez un établissement de 10 cabines ou exerciez en indépendant, Velora s'adapte à la réalité de votre pratique.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {useCases.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FCFBF8] border border-[#DED8CD] hover:border-[#16382D] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col"
            >
              {/* Photo Top with aspect ratio */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#FCFBF8]/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-mono font-medium text-[#16382D] border border-[#DED8CD]/60">
                  {item.tag}
                </div>
              </div>

              {/* Text Bottom */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#16382D] group-hover:text-[#70856F] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#68736D] leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#DED8CD]/50 flex items-center justify-between text-xs text-[#16382D] font-medium">
                  <span>En savoir plus</span>
                  <ArrowUpRight className="w-4 h-4 text-[#70856F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
