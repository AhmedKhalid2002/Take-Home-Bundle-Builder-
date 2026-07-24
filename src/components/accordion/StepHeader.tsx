import React from 'react';
import { useBundle } from '../../context/BundleContext';
import type { Step } from '../../types';

interface Props {
  step: Step;
  isOpen: boolean;
  onToggle: () => void;
}

export const StepHeader: React.FC<Props> = ({ step, isOpen, onToggle }) => {
  const { getStepSelectedCount } = useBundle();
  const selectedCount = getStepSelectedCount(step.categoryId);

  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between py-4 text-left border-b border-slate-200 transition-colors hover:bg-slate-50/50"
    >
      <div>
        <span className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">
          STEP {step.id} OF 4
        </span>
        <div className="mt-1 flex items-center gap-3">
          <img
            src={step.img}
            alt={step.title}
            className="h-10 w-10 rounded border bg-white object-contain p-1"
          />
          <h3 className="text-base font-bold text-slate-900 md:text-lg">
            {step.title}
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-2 text-indigo-600">
        <span className="text-xs font-semibold">{selectedCount} selected</span>
        <svg
          className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </button>
  );
};
