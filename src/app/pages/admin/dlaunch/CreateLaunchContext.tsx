import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Step1Data {
  name: string;
  description: string;
  slug: string;
  type: string;
  expertName: string;
  domain: string;
  cartOpenDate: Date;
  cartCloseDate: Date;
}

interface Step2Data {
  eventName: string;
  leadForm: string;
  eventGroupLink: string;
  domain: string;
  productName: string;
  productWaitLink: string;
  paidGroup: string;
  leadSignUpStartDate: Date;
  leadSignUpEndDate: Date;
  eventStartDate: Date;
  eventEndDate: Date;
}

interface Step3Data {
  cpl1: string;
  cpl2: string;
  cpl3: string;
  dateCpl1: Date;
  dateCpl2: Date;
  dateCpl3: Date;
}

interface Step4Data {
  productName: string;
  paidGroup: string;
  productWaitLink: string;
  price: number;
  installments: string;
  aviso: string;
  renovationTime: number;
  renovationPrice: number;
  antecipateRenovationPrice: number;
  renovationDescription: string;
  renovationInstallments: string;
  onboardingVideo: string;
  checkoutPage: string;
}

interface CreateLaunchContextType {
  step1Data: Step1Data | null;
  step2Data: Step2Data | null;
  step3Data: Step3Data | null;
  step4Data: Step4Data | null;
  updateStep1Data: (data: Step1Data) => void;
  updateStep2Data: (data: Step2Data) => void;
  updateStep3Data: (data: Step3Data) => void;
  updateStep4Data: (data: Step4Data) => void;
  clearAllData: () => void;
}

const CreateLaunchContext = createContext<CreateLaunchContextType | undefined>(undefined);

export const useCreateLaunch = () => {
  const context = useContext(CreateLaunchContext);
  if (context === undefined) {
    throw new Error('useCreateLaunch must be used within a CreateLaunchProvider');
  }
  return context;
};

interface CreateLaunchProviderProps {
  children: ReactNode;
}

export const CreateLaunchProvider: React.FC<CreateLaunchProviderProps> = ({ children }) => {
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const [step3Data, setStep3Data] = useState<Step3Data | null>(null);
  const [step4Data, setStep4Data] = useState<Step4Data | null>(null);

  const updateStep1Data = (data: Step1Data) => {
    setStep1Data(data);
  };

  const updateStep2Data = (data: Step2Data) => {
    setStep2Data(data);
  };

  const updateStep3Data = (data: Step3Data) => {
    setStep3Data(data);
  };

  const updateStep4Data = (data: Step4Data) => {
    setStep4Data(data);
  };

  const clearAllData = () => {
    setStep1Data(null);
    setStep2Data(null);
    setStep3Data(null);
    setStep4Data(null);
  };

  const value: CreateLaunchContextType = {
    step1Data,
    step2Data,
    step3Data,
    step4Data,
    updateStep1Data,
    updateStep2Data,
    updateStep3Data,
    updateStep4Data,
    clearAllData,
  };

  return (
    <CreateLaunchContext.Provider value={value}>
      {children}
    </CreateLaunchContext.Provider>
  );
}; 