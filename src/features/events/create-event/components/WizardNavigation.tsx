import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

type WizardNavigationProps = {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  isNextDisabled?: boolean;
  nextButtonText?: string;
  showSaveDraft?: boolean;
};

const WizardNavigation = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSaveDraft,
  isNextDisabled = false,
  nextButtonText = "Suivant",
  showSaveDraft = true,
}: WizardNavigationProps) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="sticky bottom-0 bg-card border-t border-border p-4 lg:p-6">
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <div className="flex-1">
          {!isFirstStep && (
            <Button variant="outline" onClick={onPrevious}>
              {/* Add icon manually if needed */}
              <span className="mr-2">
                <ChevronLeftIcon />
              </span>
              Précédent
            </Button>
          )}
        </div>

        {/* Save Draft Button */}
        <div className="flex-1 flex justify-center">
          {showSaveDraft && (
            <Button
              variant="ghost"
              //   iconName="Save"
              //   iconPosition="left"
              onClick={onSaveDraft}
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="hidden sm:inline">Sauvegarder le brouillon</span>
              <span className="sm:hidden">Sauvegarder</span>
            </Button>
          )}
        </div>

        {/* Next Button */}
        <div className="flex-1 flex justify-end">
          <Button
            variant="default"
            onClick={onNext}
            className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
            disabled={isNextDisabled}
          >
            {isLastStep ? "Terminer" : nextButtonText}
            <span className="ml-2">
              {isLastStep ? (
                // You can use a check icon from lucide-react or any icon library
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              )}
            </span>
          </Button>
        </div>
      </div>

      {/* Progress Dots - Mobile */}
      <div className="flex justify-center mt-4 md:hidden">
        <div className="flex space-x-2">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index + 1 <= currentStep
                  ? "bg-primary"
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WizardNavigation;
