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
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                  currentStep >= step.id
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                )}
              >
                {step.id}
              </div>
              <span className="mt-2 text-xs font-medium text-gray-500">
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-1 flex-1 mx-4',
                  currentStep > step.id ? 'bg-sky-600' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
