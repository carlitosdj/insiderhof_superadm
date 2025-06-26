import React, { useState } from 'react';
import { CreateLaunchProvider, useCreateLaunch } from './CreateLaunchContext';
import Step1CreateLaunch from './step1CreateLaunch';
import Step2CreateEvent from './step2CreateEvent';
import Step3CreateSale from './step3CreateSale';
import Step4CreateProduct from './step4CreateProduct';
import Step5Review from './step5Review';

const CreateLaunchContent: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { step1Data, step2Data, step3Data, step4Data, clearAllData } = useCreateLaunch();

  const handleStep1Next = (data: any) => {
    setCurrentStep(2);
  };

  const handleStep2Next = (data: any) => {
    setCurrentStep(3);
  };

  const handleStep2Previous = (data: any) => {
    setCurrentStep(1);
  };

  const handleStep3Next = (data: any) => {
    setCurrentStep(4);
  };

  const handleStep3Previous = (data: any) => {
    setCurrentStep(2);
  };

  const handleStep4Previous = (data: any) => {
    setCurrentStep(3);
  };

  const handleStep5Previous = () => {
    setCurrentStep(4);
  };

  const goToStep5 = () => {
    setCurrentStep(5);
  };

  const handleLaunchCreated = () => {
    // Clear all cached data after successful creation
    clearAllData();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1CreateLaunch onNext={handleStep1Next} currentStep={currentStep} />;
      case 2:
        return (
          <Step2CreateEvent
            onNext={handleStep2Next}
            onPrevious={handleStep2Previous}
            step1Data={step1Data}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <Step3CreateSale
            onNext={handleStep3Next}
            onPrevious={handleStep3Previous}
            step1Data={step1Data}
            step2Data={step2Data}
            currentStep={currentStep}
          />
        );
      case 4:
        return (
          <Step4CreateProduct
            goToStep5={goToStep5}
            onPrevious={handleStep4Previous}
            step1Data={step1Data}
            step2Data={step2Data}
            step3Data={step3Data}
            currentStep={currentStep}
          />
        );
      case 5:
        return (
          <Step5Review
            onPrevious={handleStep5Previous}
            currentStep={currentStep}
          />
        );
      default:
        return <Step1CreateLaunch onNext={handleStep1Next} currentStep={currentStep} />;
    }
  };

  return <>{renderStep()}</>;
};

const CreateLaunch: React.FC = () => {
  return (
    <CreateLaunchProvider>
      <CreateLaunchContent />
    </CreateLaunchProvider>
  );
};

export default CreateLaunch; 