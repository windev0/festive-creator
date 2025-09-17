import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ClockIcon, SaveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const MainLayout = React.lazy(() => import("@/layouts/MainLayout"));
const ProgressIndicator = React.lazy(
  () => import("@/features/events/create-event/components/ProgressIndicator")
);
const MusicSelector = React.lazy(
  () => import("@/features/events/create-event/components/MusicSelector")
);
const WizardNavigation = React.lazy(
  () => import("@/features/events/create-event/components/WizardNavigation")
);
const EventCategorySelector = React.lazy(
  () =>
    import("@/features/events/create-event/components/EventCategorySelector")
);
const PhotoUploader = React.lazy(
  () => import("@/features/events/create-event/components/PhotoUploder")
);
const CustomizationPanel = React.lazy(
  () => import("@/features/events/create-event/components/CustomizationPanel")
);
const MessageComposer = React.lazy(
  () => import("@/features/events/create-event/components/MessageComposer")
);

import { customToastMsg, getFileUniqueName } from "@/utils/functions";
import type { FormDataType } from "@/features/events/utils/types";
import { initialData, musicLibrary } from "@/features/events/utils/constants";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [step, _] = useState(1);
  const [formData, setFormData] = useState<FormDataType>(initialData);
  const [currentStep, setCurrentStep] = useState(1);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const totalSteps = 5;
  const steps = [
    { id: 1, label: "Type d'événement", icon: "Calendar" },
    { id: 2, label: "Photos", icon: "Image" },
    { id: 3, label: "Musique", icon: "Music" },
    { id: 4, label: "Personnalisation", icon: "Palette" },
    { id: 5, label: "Message", icon: "MessageSquare" },
  ];

  // const nextStep = () => setStep((prev) => prev + 1);
  // const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (updates: Partial<FormDataType>) => {
    setFormData((prev) => {
      console.log("prev formData:", prev);
      return { ...prev, ...updates };
    });
    setHasUnsavedChanges(true);

    console.log("updateFormData called with updates:", formData);
  };

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  // Load saved draft on component mount
  useEffect(() => {
    console.log("step", step);
    const savedDraft = localStorage.getItem("cardCreationDraft");
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft.formData || formData);
        setCurrentStep(parsedDraft.currentStep || 1);
      } catch (error) {
        console.error("Erreur lors du chargement du brouillon:", error);
      }
    }
  }, []);

  // Save draft to localStorage
  const saveDraft = () => {
    console.log("saveDraft", formData);
    const draftData = {
      formData,
      currentStep,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cardCreationDraft", JSON.stringify(draftData));
    setHasUnsavedChanges(false);

    // Show success feedback
    customToastMsg({
      msg: "Brouillon sauvegardé avec succès",
    });
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const handleFinish = () => {
    // Clear draft and navigate to video generation
    navigate("/event-preview", {
      state: {
        cardData: formData,
        isNewCard: true,
      },
    });
    localStorage.removeItem("cardCreationDraft");
  };

  const handleExit = () => {
    if (hasUnsavedChanges) {
      const confirmExit = window.confirm(
        "Vous avez des modifications non sauvegardées. Voulez-vous sauvegarder avant de quitter ?"
      );
      if (confirmExit) {
        saveDraft();
      }
    }
    navigate("/user-dashboard");
  };

  const isStepValid = () => {
    const {
      title,
      category,
      photos,
      musicUrl,
      selectedMusicID,
      musicUploaded,
      recordedVoice,
      // duration,
      // message,
      videoDuration,
      selectedAnimation,
      selectedTheme,
    } = formData;
    switch (currentStep) {
      case 1:
        return title && category;
      case 2:
        return photos.length > 0;
      case 3:
        return (
          musicUrl !== null ||
          selectedMusicID !== undefined ||
          selectedMusicID !== "" ||
          musicUploaded ||
          recordedVoice
        );
      case 4:
        return videoDuration && selectedAnimation && selectedTheme;
      case 5:
        return true; // Final step, always valid
      default:
        return false;
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <EventCategorySelector
            selectedEventCategory={formData.category}
            onEventCategorySelect={(category) => updateFormData({ category })}
            title={formData.title}
            onEventTitle={(title) => updateFormData({ title })}
          />
        );
      case 2:
        return (
          <PhotoUploader
            uploadedPhotos={formData.photos?.map((photo, index) => {
              return {
                id: index + 1,
                file: photo,
                url: photo && URL.createObjectURL(photo),
                name: getFileUniqueName(photo, index),
              };
            })}
            onPhotosUpload={(newPhotos) => {
              // control max 4 file, si ça dépasse on affiche un message d'erreur
              if (formData.photos.length + newPhotos.length > 5) {
                customToastMsg({
                  msg: "Vous ne pouvez pas ajouter plus de 5 photos",
                  className: "bg-red-500 text-white",
                });
                return;
              }
              updateFormData({
                photos: [
                  ...formData.photos,
                  ...newPhotos.map((p, idx) => {
                    const uniqueName = getFileUniqueName(p.file, idx);
                    const newFile = new File([p.file], uniqueName, {
                      type: p.file.type,
                    });
                    return newFile;
                  }),
                ],
              });
            }}
            onPhotoRemove={(uploadedPhotos, photoId) => {
              updateFormData({
                photos: formData.photos.filter((photo) => {
                  // Find the photo object to remove by id
                  const photoToRemove = uploadedPhotos.find(
                    (p) => p.id === photoId
                  );
                  if (photoToRemove) {
                    return photo.name !== photoToRemove.file.name;
                  }
                  return true; // renvoyer tous les éléments
                }),
              });
            }}
          />
        );
      case 3:
        return (
          <MusicSelector
            selectedMusic={formData.selectedMusicID ?? ""}
            uploadedMusic={formData.musicUploaded ?? null}
            onMusicSelect={(musicId) =>
              updateFormData({
                musicUrl: musicLibrary.find((m) => m.id === musicId)?.url || "",
                selectedMusicID: musicId,
              })
            }
            onMusicUpload={(music) => updateFormData({ musicUploaded: music })}
            recordedVoice={formData.recordedVoice}
            onVoiceRecord={(voiceData) =>
              updateFormData({ recordedVoice: voiceData })
            }
          />
        );
      case 4:
        return (
          <CustomizationPanel
            selectedTheme={formData.selectedTheme}
            onThemeSelect={(themeId) =>
              updateFormData({ selectedTheme: themeId })
            }
            selectedAnimation={formData.selectedAnimation}
            onAnimationSelect={(animationId) =>
              updateFormData({ selectedAnimation: animationId })
            }
            videoDuration={formData.videoDuration ?? 60}
            onDurationChange={(duration) =>
              updateFormData({ videoDuration: duration })
            }
          />
        );
      case 5:
        // return <Step5 prev={prevStep} data={formData} />;
        return (
          <MessageComposer
            customMessage={formData.customMessage}
            onMessageChange={(message) =>
              updateFormData({ customMessage: message })
            }
            donationEnabled={formData.donationEnabled}
            onDonationToggle={(enabled) =>
              updateFormData({ donationEnabled: enabled })
            }
            donationGoal={formData.donationGoal}
            onDonationGoalChange={(goal) =>
              updateFormData({ donationGoal: goal })
            }
            donationDescription={formData.donationDescription}
            onDonationDescriptionChange={(description) =>
              updateFormData({ donationDescription: description })
            }
            speechSynthesis={window.speechSynthesis}
          />
        );
      default:
        return null;
    }
  };
  return (
    <MainLayout>
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        steps={steps}
        onStepClick={handleStepClick}
        onSave={saveDraft}
        onExit={handleExit}
        hasUnsavedChanges={hasUnsavedChanges}
      />
      {/* <div className="max-w-3xl mx-auto mt-10 px-4"> */}
      {/* {step === 1 && (
          <Step1 next={nextStep} data={formData} updateForm={updateForm} />
        )}
        {step === 2 && (
          <Step2
            next={nextStep}
            prev={prevStep}
            data={formData}
            updateForm={updateForm}
          />
        )}
        {step === 3 && (
          <Step3
            next={nextStep}
            prev={prevStep}
            data={formData}
            updateForm={updateForm}
          />
        )}
        {step === 4 && (
          <Step4
            next={nextStep}
            prev={prevStep}
            data={formData}
            updateForm={updateForm}
          />
        )}
        {step === 5 && <Step5 prev={prevStep} data={formData} />} */}
      {/* </div> */}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 pb-32">
        <div className="max-w-4xl mx-auto">
          {/* Step Content */}
          <div className="bg-card rounded-lg border border-border p-6 lg:p-8 mb-8">
            {getStepContent()}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button
              variant="default"
              className="bg-indigo-500 text-white cursor-pointer hover:bg-indigo-600"
              onClick={saveDraft}
              disabled={!hasUnsavedChanges}
            >
              <span className="flex items-center gap-2 ">
                <SaveIcon />
                Sauvegarder le brouillon
              </span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              // iconName="Eye"
              // iconPosition="left"
              onClick={() => {
                localStorage.setItem(
                  "formData",
                  JSON.stringify({
                    formData,
                  })
                );
                navigate("/event-preview", {
                  state: {
                    cardData: formData,
                    isPreview: true,
                  },
                });
              }}
              disabled={!isStepValid()}
            >
              Aperçu rapide
            </Button>
          </div>

          {/* Progress Summary */}
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <ClockIcon
                name="Clock"
                size={16}
                className="text-muted-foreground"
              />
              <span className="text-sm text-muted-foreground">
                Étape {currentStep} sur {totalSteps} •
                {Math.round((currentStep / totalSteps) * 100)}% terminé
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <WizardNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSaveDraft={saveDraft}
        isNextDisabled={!isStepValid()}
        nextButtonText={
          currentStep === totalSteps ? "Créer la carte" : "Suivant"
        }
        showSaveDraft={hasUnsavedChanges}
      />
    </MainLayout>
  );
};

export default CreateEventPage;
