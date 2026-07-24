import React from 'react';
import { useBundle } from '../../context/BundleContext';
import { StepHeader } from './StepHeader';
import { ProductCard } from '../products/ProductCard';
import type { Step } from '../../types';

interface Props {
  step: Step;
}

export const AccordionStep: React.FC<Props> = ({ step }) => {
  const { openStep, setOpenStep, products } = useBundle();
  const isOpen = openStep === step.id;

  const stepProducts = products.filter((p) => p.categoryId === step.categoryId);

  return (
    <div className="rounded-2xl bg-indigo-50/40 p-5 lg:p-6 border border-indigo-100/80 mb-2">
      <div className="mb-2  ">
        <StepHeader
          step={step}
          isOpen={isOpen}
          onToggle={() => setOpenStep(isOpen ? 0 : step.id)}
        />

        {isOpen && (
          <div className="py-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {stepProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>

            {step.nextStepTitle && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setOpenStep(step.id + 1)}
                  className="rounded-lg border border-indigo-200 bg-indigo-50/50 px-6 py-2.5 text-sm font-bold text-indigo-600 hover:bg-indigo-100 transition-all"
                >
                  Next: {step.nextStepTitle}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
