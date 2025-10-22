import { useLanguage } from "@/contexts/LanguageContext";
import sustainabilityImage from "@assets/d98d187f-f737-4191-98a5-00aa3a88211b_1758830615469.png";

export function AboutSection() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-20 bg-secondary/20" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4" data-testid="about-title">
            {t("about.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="about-subtitle">
            {t("about.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-card-foreground mb-6" data-testid="green-jobs-title">
              {t("about.themeSubtitle")}
            </h3>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed" data-testid="green-jobs-description-1">
              {t("about.themeDescription")}
            </p>
          </div>
          <div className="relative">
            <img 
              src={sustainabilityImage} 
              alt="Green jobs illustration showing renewable energy, solar panels, wind turbines and sustainable practices" 
              className="rounded-xl shadow-lg"
              loading="lazy"
              data-testid="sustainability-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl"></div>
          </div>
        </div>

        {/* Organization Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card rounded-xl p-8 border border-border" data-testid="organizers-info">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V2H13V5.5L7 7V9L13 7.5V11H7V13H13V15.5L7 17V19L13 17.5V22H15V17.5L21 19V17L15 15.5V13H21V11H15V7.5L21 9Z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-card-foreground">{t("contact.organizers")}</h4>
                <p className="text-muted-foreground"></p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-card-foreground">Udruga tehničke kulture-Societa di cultura tecnica „Galileo Galilei"</h5>
                <p className="text-sm text-muted-foreground">Rovinj-Rovigno</p>
              </div>
              <div className="border-t border-border pt-3">
                <h5 className="font-semibold text-card-foreground">Goethe-Institut Kroatien</h5>
                <p className="text-sm text-muted-foreground">Zagreb</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-8 border border-border" data-testid="program-info">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-accent/20 text-accent rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18,4L20,8H17L15,4H13L15,8H12L10,4H8L10,8H7L5,4H4V10.5L9.5,16L12,13.5L14.5,16L20,10.5V4H18Z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-card-foreground">{t("about.programTitle")}</h4>
                <p className="text-muted-foreground">{t("about.programSubtitle")}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-card-foreground">{t("about.filmCount")}</span>
                <span className="font-semibold text-primary">21</span>
              </div>
              <div className="flex justify-between">
                <span className="text-card-foreground">{t("about.totalDuration")}</span>
                <span className="font-semibold text-primary">{t("about.totalDurationValue")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-card-foreground">{t("about.languages")}</span>
                <span className="font-semibold text-primary">{t("about.languagesValue")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Jury Section - Modern Design */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/70 text-white rounded-2xl shadow-lg mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM16 14C16 13.4 15.6 13 15 13H9C8.4 13 8 13.4 8 14V19H10V23H14V19H16V14ZM20.5 8.5C20.5 7.67 19.83 7 19 7S17.5 7.67 17.5 8.5 18.17 10 19 10 20.5 9.33 20.5 8.5ZM6.5 8.5C6.5 7.67 5.83 7 5 7S3.5 7.67 3.5 8.5 4.17 10 5 10 6.5 9.33 6.5 8.5Z"/>
              </svg>
            </div>
            <h4 className="text-3xl font-bold text-card-foreground mb-3">{t("about.juryTitle")}</h4>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("about.juryDescription")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4" data-testid="jury-info">
            <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <h5 className="font-bold text-sm text-card-foreground mb-1">Vedrana Špada</h5>
                <p className="text-xs text-muted-foreground leading-relaxed">nasl. doc. dr. sc.</p>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <h5 className="font-bold text-sm text-card-foreground mb-1">Mirta Smodlaka Tanković</h5>
                <p className="text-xs text-muted-foreground leading-relaxed">dr. sc.</p>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <h5 className="font-bold text-sm text-card-foreground mb-1">Lovro Šverko</h5>
                <p className="text-xs text-muted-foreground leading-relaxed">mag. paed. et educ. inf.</p>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <h5 className="font-bold text-sm text-card-foreground mb-1">Aleksandar Žibert</h5>
                <p className="text-xs text-muted-foreground leading-relaxed">dipl. rač. inž</p>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <h5 className="font-bold text-sm text-card-foreground mb-1">Eric Ušić</h5>
                <p className="text-xs text-muted-foreground leading-relaxed">dr. sc.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center bg-primary/5 rounded-2xl p-12 border border-primary/20" data-testid="mission-statement">
          <h3 className="text-2xl font-bold text-primary mb-4">{t("about.missionTitle")}</h3>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t("about.missionDescription")}
          </p>
        </div>
      </div>
    </section>
  );
}