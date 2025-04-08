import React from 'react';
import { cn } from '@/lib/utils';

export type Step = {
  id: number;
  title: string;
  description: string;
};

interface StepperProps {
  steps: Step[];
  currentStep: number;
  renderContent?: (stepId: number) => React.ReactNode;
}

export function Stepper({ steps, currentStep, renderContent }: StepperProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="w-full sm:w-auto sm:flex-1 sm:flex sm:flex-col sm:items-center">
              <div className="flex items-center sm:flex-col sm:items-center w-full sm:w-auto">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0',
                    currentStep >= step.id
                      ? 'bg-indigo-800 text-white'
                      : 'bg-gray-200 text-gray-500'
                  )}
                >
                  {step.id}
                </div>
                <span className="ml-3 sm:ml-0 sm:mt-2 text-xs font-medium text-gray-500 text-left sm:text-center">
                  {step.title}
                </span>
              </div>

              {/* Renderiza o conteúdo do formulário apenas no mobile e quando for o passo atual */}
              <div className={cn(
                'sm:hidden mt-4 mb-6',
                currentStep === step.id ? 'block' : 'hidden'
              )}>
                {renderContent?.(step.id)}
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  'w-1 sm:w-24 h-8 sm:h-1 my-1 sm:my-0 ml-4 sm:mx-0 flex-none',
                  currentStep > step.id ? 'bg-indigo-800' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
