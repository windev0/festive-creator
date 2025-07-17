import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  EyeIcon,
  HeartIcon,
  MessageSquareIcon,
  ShieldIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import { useState } from "react";

type MessageComposerProps = {
  customMessage: string;
  onMessageChange: (message: string) => void;
  donationEnabled: boolean;
  onDonationToggle: (enabled: boolean) => void;
  donationGoal: string;
  onDonationGoalChange: (goal: string) => void;
  donationDescription: string;
  onDonationDescriptionChange: (description: string) => void;
  speechSynthesis: SpeechSynthesis;
};

interface MessageChangeEvent extends React.ChangeEvent<HTMLTextAreaElement> {}

const MessageComposer = ({
  customMessage,
  onMessageChange,
  donationEnabled,
  onDonationToggle,
  donationGoal,
  onDonationGoalChange,
  donationDescription,
  onDonationDescriptionChange,
  speechSynthesis,
}: MessageComposerProps) => {
  const [messageLength, setMessageLength] = useState(
    customMessage?.length || 0
  );
  const [isTextToSpeech, setIsTextToSpeech] = useState(false);
  const maxMessageLength = 500;

  const handleMessageChange = (e: MessageChangeEvent): void => {
    const value: string = e.target.value;
    if (value.length <= maxMessageLength) {
      setMessageLength(value.length);
      onMessageChange(value);
    }
  };

  const handleTextToSpeech = () => {
    if (customMessage && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(customMessage);
      utterance.lang = "fr-FR";
      speechSynthesis.speak(utterance);
      setIsTextToSpeech(true);
      setTimeout(() => setIsTextToSpeech(false), 3000);
    }
  };

  const messageTemplates = [
    {
      category: "Anniversaire",
      templates: [
        "Joyeux anniversaire ! Que cette nouvelle année t'apporte bonheur, santé et réussite. Profite bien de ta journée spéciale !",
        "Un an de plus, une année de souvenirs merveilleux ! Bon anniversaire et que tous tes rêves se réalisent.",
        "Aujourd'hui, c'est ta fête ! Que cette journée soit remplie de joie, de rires et de moments inoubliables.",
      ],
    },
    {
      category: "Mariage",
      templates: [
        "Félicitations pour votre union ! Que votre amour grandisse chaque jour et que votre bonheur soit éternel.",
        "Deux cœurs qui s'unissent, deux âmes qui se trouvent. Tous nos vœux de bonheur pour votre nouvelle vie à deux !",
        "Que votre mariage soit le début d'une belle aventure remplie d'amour, de complicité et de bonheur partagé.",
      ],
    },
    {
      category: "Bébé",
      templates: [
        "Félicitations pour l'arrivée de votre petit trésor ! Que ce bébé vous apporte une joie immense et des moments magiques.",
        "Un nouveau petit miracle vient d'arriver ! Tous nos vœux de bonheur pour votre famille qui s'agrandit.",
        "Bienvenue au monde petit ange ! Que ta vie soit remplie d'amour, de rires et de belles découvertes.",
      ],
    },
  ];

  const insertTemplate = (template: string) => {
    onMessageChange(template);
    setMessageLength(template.length);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Ajoutez votre message
        </h2>
        <p className="text-muted-foreground">
          Personnalisez votre carte avec un message touchant
        </p>
      </div>

      {/* Message Input */}
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={customMessage}
            onChange={handleMessageChange}
            placeholder="Écrivez votre message personnel ici..."
            className="w-full min-h-[120px] p-4 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />

          <div className="absolute bottom-3 right-3 flex items-center space-x-2">
            <span
              className={`text-xs ${
                messageLength > maxMessageLength * 0.9
                  ? "text-warning"
                  : "text-muted-foreground"
              }`}
            >
              {messageLength}/{maxMessageLength}
            </span>
            {customMessage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleTextToSpeech}
                disabled={isTextToSpeech}
              >
                {isTextToSpeech ? (
                  <Volume2Icon name={"Volume2"} size={18} />
                ) : (
                  <VolumeXIcon name={"Volume2"} size={18} />
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Message Templates */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <MessageSquareIcon
              name="MessageSquare"
              size={20}
              className="mr-2"
            />
            Modèles de messages
          </h3>

          {messageTemplates.map((category) => (
            <div key={category.category} className="space-y-2">
              <h4 className="font-medium text-foreground">
                {category.category}
              </h4>
              <div className="grid gap-2">
                {category.templates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => insertTemplate(template)}
                    className="text-left p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-200"
                  >
                    <p className="text-sm text-foreground line-clamp-2">
                      {template}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Donation Section */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <HeartIcon name="Heart" size={24} className="text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Collecte de dons
              </h3>
              <p className="text-sm text-muted-foreground">
                Permettez aux visiteurs de faire un don (optionnel)
              </p>
            </div>
          </div>
          <Checkbox
            checked={donationEnabled}
            onChange={(e) => onDonationToggle(e.currentTarget.value === "on")}
          />
        </div>

        {donationEnabled && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomInput
                label="Objectif de don (€)"
                type="number"
                placeholder="500"
                value={donationGoal}
                onChange={(e) => onDonationGoalChange(e.target.value)}
                description="Montant souhaité (optionnel)"
              />

              <div className="flex items-end">
                <div className="text-sm text-muted-foreground">
                  <p>Paiement sécurisé via</p>
                  <p className="font-semibold text-primary">Stitch Payment</p>
                </div>
              </div>
            </div>

            <CustomInput
              label="Description du don"
              type="text"
              placeholder="Pour offrir un cadeau spécial..."
              value={donationDescription}
              onChange={(e) => onDonationDescriptionChange(e.target.value)}
              description="Expliquez pourquoi vous collectez des dons"
            />

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShieldIcon
                    name="Shield"
                    size={16}
                    className="text-primary"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    Paiement sécurisé
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Tous les dons sont traités de manière sécurisée via Stitch
                    Payment. Les donateurs recevront un reçu automatique par
                    email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Preview */}
      {customMessage && (
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2 flex items-center">
            <EyeIcon name="Eye" size={16} className="mr-2" />
            Aperçu du message
          </h4>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-foreground whitespace-pre-wrap">
              {customMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageComposer;
