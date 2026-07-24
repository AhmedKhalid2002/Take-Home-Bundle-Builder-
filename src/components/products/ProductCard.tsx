import React from 'react';
import { useBundle } from '../../context/BundleContext';
import { VariantSelector } from './VariantSelector';
import { QuantityStepper } from './QuantityStepper';
import type { Product } from '../../types';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { quantities, activeVariants, updateQuantity, selectVariant } =
    useBundle();

  const activeVariantId = product.variants
    ? activeVariants[product.id] || product.variants[0].id
    : undefined;
  const currentKey = activeVariantId
    ? `${product.id}:${activeVariantId}`
    : product.id;
  const currentQuantity = quantities[currentKey] || 0;

  const isSelected = currentQuantity > 0;

  return (
    <div
      className={`relative flex flex-col justify-between rounded-xl border p-4 transition-all duration-200 ${
        isSelected
          ? 'border-indigo-600 bg-white shadow-md ring-1 ring-indigo-600'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      {/* Optional Badge */}
      {product.discountBadge && (
        <span className="absolute top-3 left-3 rounded-md bg-indigo-600 px-2 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider">
          {product.discountBadge}
        </span>
      )}

      {/* Main Image */}
      <div className="my-2 flex h-32 items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="mt-2 flex-grow">
        <h4 className="text-sm font-bold text-slate-900">{product.title}</h4>
        {product.description && (
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            {product.description}{' '}
            {product.learnMoreUrl && (
              <a
                href={product.learnMoreUrl}
                className="font-medium text-indigo-600 hover:underline"
              >
                Learn More
              </a>
            )}
          </p>
        )}

        {/* Variants Selector */}
        {product.variants && (
          <VariantSelector
            variants={product.variants}
            activeVariantId={activeVariantId!}
            onSelect={(vId) => selectVariant(product.id, vId)}
          />
        )}
      </div>

      {/* Footer: Stepper & Pricing */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <QuantityStepper
          value={currentQuantity}
          onChange={(delta) => updateQuantity(currentKey, delta)}
        />

        <div className="text-right">
          {product.compareAtPrice && (
            <span className="block text-xs text-slate-400 line-through">
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
          <span className="text-sm font-extrabold text-indigo-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
