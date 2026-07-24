import React from 'react';
import { QuantityStepper } from '../products/QuantityStepper';
import { formatCurrency } from '../../utils/persistence';
import type { Product, Variant } from '../../types';

interface Props {
  product: Product;
  variant?: Variant;
  quantity: number;
  onQuantityChange: (delta: number) => void;
}

export const ReviewItem: React.FC<Props> = ({ product, variant, quantity, onQuantityChange }) => {
  const itemTotal = product.price * quantity;
  const itemCompareTotal = product.compareAtPrice ? product.compareAtPrice * quantity : undefined;

  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <div className="flex items-center gap-3">
        <img src={product.image} alt={product.title} className="h-10 w-10 rounded border bg-white object-contain p-1" />
        <div>
          <h5 className="text-xs font-bold text-slate-800">
            {product.title} {variant && <span className="font-normal text-slate-500">({variant.name})</span>}
          </h5>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <QuantityStepper value={quantity} onChange={onQuantityChange} size="sm" />
        <div className="w-16 text-right">
          {itemCompareTotal && (
            <span className="block text-[10px] text-slate-400 line-through">
              {formatCurrency(itemCompareTotal)}
            </span>
          )}
          <span className="text-xs font-bold text-indigo-600">{formatCurrency(itemTotal)}</span>
        </div>
      </div>
    </div>
  );
};