import React from 'react';
import {
  FileText,
  Eye,
  UserCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const LandingValueSection: React.FC = () => {
  const values = [
    {
      title: "Moins d'administration",
      subtitle: 'Les informations restent au même endroit.',
      desc: 'Fini les doubles saisies entre le carnet de rendez-vous, le téléphone et la caisse. Vous consacrez votre énergie à l’accueil et aux soins.',
      icon: FileText,
    },
    {
      title: 'Une journée plus lisible',
      subtitle: 'Votre équipe sait immédiatement ce qui se passe.',
      desc: 'Chaque collaboratrice dispose de son planning actualisé en direct, avec le détail des protocoles demandés et le temps de préparation adéquat.',
      icon: Eye,
    },
    {
      title: 'Une meilleure connaissance client',
      subtitle: 'L’historique accompagne chaque visite.',
      desc: 'Les habitudes, préférences de cabine et sensibilités cutanées sont mémorisées sans effort pour offrir une attention personnalisée à chaque séance.',
      icon: UserCheck,
    },
    {
      title: 'Une réservation plus professionnelle',
      subtitle: 'Votre client bénéficie d’une expérience cohérente dès le premier clic.',
      desc: 'De la prise de rendez-vous en ligne jusqu’au reçu d’encaissement, l’image de marque de votre institut reflète le soin apporté à votre métier.',
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-24 bg-[#FCFBF8] border-b border-[#DED8CD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#70856F] block">
            Impact quotidien
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#16382D] tracking-tight text-balance">
            Plus de contrôle en coulisses. Une meilleure expérience devant.
          </h2>
          <p className="text-sm sm:text-base text-[#68736D] leading-relaxed max-w-xl mx-auto">
            La sérénité de votre équipe se ressent directement dans l’attention que vous portez à vos clients.
          </p>
        </div>

        {/* 4 Spacious Compositions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-[#FCFBF8] border border-[#DED8CD] rounded-2xl p-7 sm:p-8 space-y-4 hover:border-[#70856F] transition-all shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F6F2EA] border border-[#DED8CD] flex items-center justify-center text-[#16382D]">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-medium text-[#16382D]">
                      {val.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#70856F] mt-1">
                      {val.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#68736D] leading-relaxed">
                    {val.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DED8CD]/50 flex items-center gap-2 text-xs text-[#16382D] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#70856F]" />
                  <span>Conçu pour le calme en salon</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
