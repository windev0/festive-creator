import { useState } from "react";

import Step1 from "@/features/event/components/Step1";
import Step2 from "@/features/event/components/Step2";
import Step3 from "@/features/event/components/Step3";
import Step4 from "@/features/event/components/Step4";
import Step5 from "@/features/event/components/Step5";
import MainLayout from "@/layouts/MainLayout";

export type FormDataType = {
  title: string;
  category: string;
  duration: string;
  photos: File[];
  music?: File | null; // TODO A revoir
  message: string;
  userId: string;
};

const initialData: FormDataType = {
  title: "",
  category: "",
  duration: "",
  photos: [],
  music: null,
  message: "",
  userId: "",
};

const CreateEventForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormDataType>(initialData);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateForm = (updates: Partial<FormDataType>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto mt-10 px-4">
        {step === 1 && (
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
        {step === 5 && <Step5 prev={prevStep} data={formData} />}
      </div>
    </MainLayout>
  );
};

export default CreateEventForm;
