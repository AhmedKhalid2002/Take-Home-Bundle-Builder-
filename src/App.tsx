import React from 'react';
import { BundleProvider, useBundle } from './context/BundleContext';
import { AccordionStep } from './components/accordion/AccordionStep';
import { ReviewPanel } from './components/review/ReviewPanel';

const BundleContent: React.FC = () => {
  const { steps } = useBundle();

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
          Let's get started!
        </h1>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Builder Accordion (Left) */}
          <div className="lg:col-span-7 xl:col-span-8">
            {steps.map((step) => (
              <AccordionStep key={step.id} step={step} />
            ))}
          </div>

          {/* Review Panel (Right) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <ReviewPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BundleProvider>
      <BundleContent />
    </BundleProvider>
  );
}