import { Button } from "@/components/ui/button";
import { animations, themes } from "@/features/events/utils/constants";
import {
  Palette,
  Zap,
  Clock,
  Check,
  CheckIcon,
  InfoIcon,
} from "lucide-react";
import { useState } from "react";

type CustomizationPanelProps = {
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
  selectedAnimation: string;
  onAnimationSelect: (animation: string) => void;
  videoDuration: number;
  onDurationChange: (duration: number) => void;
};

const CustomizationPanel = ({
  selectedTheme,
  onThemeSelect,
  selectedAnimation,
  onAnimationSelect,
  videoDuration,
  onDurationChange,
}: CustomizationPanelProps) => {
  const [activeTab, setActiveTab] = useState("themes");


  const tabs = [
    { id: "themes", label: "Thèmes", icon: Palette },
    { id: "animations", label: "Animations", icon: Zap },
    { id: "duration", label: "Durée", icon: Clock },
  ];

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Personnalisez votre carte
        </h2>
        <p className="text-muted-foreground">
          Choisissez le thème, les animations et la durée de votre vidéo
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Themes Tab */}
      {activeTab === "themes" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Choisissez un thème
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onThemeSelect(theme.id)}
                className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  selectedTheme === theme.id
                    ? "border-primary shadow-lg"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <div className="aspect-video relative">
                  <img
                    src={theme.preview}
                    alt={theme.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-200" />

                  {selectedTheme === theme.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      <Check size={14} />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h4 className="font-semibold text-foreground mb-1">
                    {theme.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {theme.description}
                  </p>

                  <div className="flex space-x-1">
                    {theme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Animations Tab */}
      {activeTab === "animations" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Choisissez une animation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {animations.map((animation) => (
              <button
                key={animation.id}
                onClick={() => onAnimationSelect(animation.id)}
                className={`p-6 rounded-lg border-2 text-left transition-all duration-200 hover:scale-105 ${
                  selectedAnimation === animation.id
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card hover:border-muted-foreground/30"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedAnimation === animation.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <animation.icon size={24} />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">
                      {animation.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {animation.description}
                    </p>
                    <p className="text-xs text-primary font-medium">
                      {animation.preview}
                    </p>
                  </div>

                  {selectedAnimation === animation.id && (
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      <CheckIcon name="Check" size={14} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Duration Tab */}
      {activeTab === "duration" && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground">
            Durée de la vidéo
          </h3>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-primary mb-2">
                {formatDuration(videoDuration)}
              </div>
              <p className="text-muted-foreground">Durée sélectionnée</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>20 sec</span>
                <span>3 min</span>
              </div>

              <input
                type="range"
                min="20"
                max="180"
                step="10"
                value={videoDuration}
                onChange={(e) => onDurationChange(parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />

              <div className="grid grid-cols-3 gap-2 mt-4">
                {[30, 60, 120].map((duration) => (
                  <Button
                    key={duration}
                    variant={videoDuration === duration ? "default" : "outline"}
                    size="sm"
                    onClick={() => onDurationChange(duration)}
                  >
                    {formatDuration(duration)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <InfoIcon name="Info" size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  Conseils pour la durée
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 20-30 sec: Parfait pour les réseaux sociaux</li>
                  <li>• 1-2 min: Idéal pour partager par message</li>
                  <li>• 2-3 min: Parfait pour les présentations détaillées</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizationPanel;
