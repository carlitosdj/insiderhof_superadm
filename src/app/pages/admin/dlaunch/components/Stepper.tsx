import React from 'react';

interface StepperProps {
  currentStep: number;
  totalSteps?: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps = 5 }) => {
  return (
    <div className="stepper-container mb-8">
      <div className="d-flex align-items-center">
        <div className="flex-grow-1 bg-light rounded-pill me-3" style={{ height: '8px' }}>
          <div 
            className="bg-primary rounded-pill transition-all" 
            style={{ 
              width: `${(currentStep / totalSteps) * 100}%`, 
              height: '100%',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
        {/* <span className="text-muted fs-7 fw-bold">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span> */}
      </div>
    </div>
  );
};

export default Stepper; 