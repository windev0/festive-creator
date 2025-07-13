import { Button } from "@/components/ui/button";
import { defaultSteps } from "@/features/events/utils/constants";
import { CheckIcon, XIcon } from "lucide-react";

type ProgressIndicatorProps = {
  currentStep: number;
  totalSteps: number;
  steps: { id: number; label: string; icon: string }[];
  onStepClick: (stepId: number) => void;
  onSave: () => void;
  onExit: () => void;
  hasUnsavedChanges?: boolean;
};

const ProgressIndicator = ({
  currentStep = 1,
  totalSteps = 4,
  steps = [],
  onStepClick,
  onSave,
  onExit,
  hasUnsavedChanges = false,
}: ProgressIndicatorProps) => {
  const progressSteps = steps.length > 0 ? steps : defaultSteps;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleStepClick = (stepId: number) => {
    if (onStepClick && stepId <= currentStep) {
      onStepClick(stepId);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
  };

  const handleExit = () => {
    if (onExit) {
      onExit();
    }
  };

  return (
    <div className="sticky top-16 z-40 bg-card border-b border-border">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Progress Steps - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {progressSteps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              const isClickable = step.id <= currentStep;

              return (
                <button
                  key={index}
                  onClick={() => handleStepClick(step.id)}
                  disabled={!isClickable}
                  className={`flex  items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-indigo-600 cursor-pointer bg-indigo-600/10"
                      : isCompleted
                      ? "text-green-600 cursor-pointer hover:text-green-600/80"
                      : isClickable
                      ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                      : "text-muted-foreground/50 cursor-not-allowed"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors duration-200 ${
                      isActive
                        ? "border-indigo-400 bg-indigo-400 text-primary-foreground"
                        : isCompleted
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-muted-foreground/30"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckIcon name="Check" size={12} />
                    ) : (
                      <span className="text-xs font-semibold">{step.id}</span>
                    )}
                  </div>
                  <span>{step.label}</span>
                </button>
              );
            })}
          </div>

          {/* Progress Bar - Mobile */}
          <div className="md:hidden flex-1 mr-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Etape {currentStep} sur {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">
                {progressSteps[currentStep - 1]?.label}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className=" h-2 rounded-full transition-all duration-300 ease-out bg-indigo-600"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {hasUnsavedChanges && (
              <Button
                variant="outline"
                size="sm"
                // iconName="Save"
                // iconPosition="left"
                onClick={handleSave}
                className="hidden sm:flex left-2"
              >
                Enregistrer
              </Button>
            )}

            <XIcon
              //   variant="ghost"
              size={20}
              //   iconName="X"
              onClick={handleExit}
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="hidden sm:inline ml-1">Annuler</span>
            </XIcon>
          </div>
        </div>

        {/* Mobile Step Indicator */}
        <div className="md:hidden flex items-center justify-center space-x-2 mt-3">
          {progressSteps.map((step) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(step.id)}
              disabled={step.id > currentStep}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
                step.id === currentStep
                  ? "bg-indigo-400 text-white"
                  : step.id < currentStep
                  ? "bg-green-600 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step.id < currentStep ? (
                <CheckIcon name="Check" size={12} />
              ) : (
                step.id
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
