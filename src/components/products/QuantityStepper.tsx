import React from 'react';

interface Props {
  value: number;
  onChange: (delta: number) => void;
  size?: 'sm' | 'md';
}

export const QuantityStepper: React.FC<Props> = ({
  value,
  onChange,
  size = 'md',
}) => {
  const isSm = size === 'sm';

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-slate-200 bg-white ${isSm ? 'p-0.5' : 'p-1'}`}
    >
      <button
        type="button"
        onClick={() => onChange(-1)}
        disabled={value === 0}
        className={`flex items-center justify-center rounded text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent ${
          isSm ? 'h-6 w-6 text-sm' : 'h-8 w-8 text-base font-bold'
        }`}
      >
        -
      </button>
      <span
        className={`text-center font-semibold text-slate-800 ${isSm ? 'w-6 text-xs' : 'w-8 text-sm'}`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(1)}
        className={`flex items-center justify-center rounded text-slate-600 transition-colors hover:bg-slate-100 ${
          isSm ? 'h-6 w-6 text-sm' : 'h-8 w-8 text-base font-bold'
        }`}
      >
        +
      </button>
    </div>
  );
};
