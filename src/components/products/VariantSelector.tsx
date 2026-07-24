import React from 'react';
import type { Variant } from '../../types';

interface Props {
  variants: Variant[];
  activeVariantId: string;
  onSelect: (variantId: string) => void;
}

export const VariantSelector: React.FC<Props> = ({
  variants,
  activeVariantId,
  onSelect,
}) => {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {variants.map((v) => {
        const isSelected = v.id === activeVariantId;
        return (
          <button
            key={v.id}
            type="button"
            onClick={() => onSelect(v.id)}
            className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all ${
              isSelected
                ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            {v.colorHex && (
              <span
                className="h-3 w-3 rounded-full border border-slate-300"
                style={{ backgroundColor: v.colorHex }}
              />
            )}
            <span>{v.name}</span>
          </button>
        );
      })}
    </div>
  );
};
