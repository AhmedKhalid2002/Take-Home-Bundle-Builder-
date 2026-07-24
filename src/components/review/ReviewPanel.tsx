import React from 'react';
import { useBundle } from '../../context/BundleContext';
import { formatCurrency } from '../../utils/persistence';
import { ReviewItem } from './ReviewItem';
import shippingIcon from '../../../public/assets/shipping.png';
import Satisfaction from '../../../public/assets/Satisfaction-Badge.png';

export const ReviewPanel: React.FC = () => {
  const {
    products,
    quantities,
    updateQuantity,
    subtotal,
    compareSubtotal,
    savings,
    saveSystemToStorage,
  } = useBundle();

  // Extract all selected items
  const selectedItems: Array<{
    product: (typeof products)[0];
    variant?: any;
    quantity: number;
    key: string;
  }> = [];

  products.forEach((p) => {
    if (p.variants && p.variants.length > 0) {
      p.variants.forEach((v) => {
        const key = `${p.id}:${v.id}`;
        const qty = quantities[key] || 0;
        if (qty > 0)
          selectedItems.push({ product: p, variant: v, quantity: qty, key });
      });
    } else {
      const qty = quantities[p.id] || 0;
      if (qty > 0) selectedItems.push({ product: p, quantity: qty, key: p.id });
    }
  });

  const categories = ['CAMERAS', 'SENSORS', 'ACCESSORIES', 'PLAN'] as const;

  return (
    <div className="rounded-2xl bg-indigo-50/40 p-5 lg:p-6 border border-indigo-100/80 sticky top-6">
      <h2 className="text-xl font-bold text-slate-900">Your security system</h2>
      <p className="mt-1 text-xs text-slate-500">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>

      {/* Grouped Line Items */}
      <div className="mt-6 space-y-4 divide-y divide-slate-200/60">
        {categories.map((cat) => {
          const itemsInCat = selectedItems.filter(
            (i) => i.product.categoryGroup === cat,
          );
          if (itemsInCat.length === 0) return null;

          return (
            <div key={cat} className="pt-3 first:pt-0">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {cat}
              </span>
              <div className="mt-1">
                {itemsInCat.map((item) => (
                  <ReviewItem
                    key={item.key}
                    product={item.product}
                    variant={item.variant}
                    quantity={item.quantity}
                    onQuantityChange={(delta) =>
                      updateQuantity(item.key, delta)
                    }
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Shipping Row */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-200/60 pt-3 text-xs">
        <div className="flex items-center gap-2">
          <img src={shippingIcon} alt="Shipping" className="h-10 w-10" />
          <span className="font-semibold text-slate-700">Fast Shipping</span>
        </div>
        <span className="font-bold text-indigo-600">FREE</span>
      </div>

      {/* Satisfaction Guarantee Badge & Pricing */}
      <div className="mt-6 rounded-xl bg-indigo-100/50 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600 text-white text-[10px] font-bold text-center leading-tight">
            <img src={Satisfaction} alt="Satisfaction" className="h-24 w-24" />
          </div>
          <span className="text-[11px] font-medium text-slate-700">
            30-day guarantee
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-500 block">
            as low as $19.19/mo
          </span>
          <span className="text-xs text-slate-400 line-through mr-1.5">
            {formatCurrency(compareSubtotal)}
          </span>
          <span className="text-xl font-black text-indigo-600">
            {formatCurrency(subtotal)}
          </span>
        </div>
      </div>

      {/* Savings Notification */}
      {savings > 0 && (
        <p className="mt-3 text-center text-xs font-semibold text-emerald-600">
          Congrats! You're saving {formatCurrency(savings)} on your security
          bundle!
        </p>
      )}

      {/* Buttons */}
      <button
        type="button"
        onClick={() => alert('Proceeding to Checkout prototype!')}
        className="mt-4 w-full rounded-lg bg-indigo-600 py-3 text-sm font-bold text-white transition-all hover:bg-indigo-700 shadow-md shadow-indigo-200"
      >
        Checkout
      </button>

      <div className="mt-3 text-center">
        <button
          type="button"
          onClick={saveSystemToStorage}
          className="text-xs font-medium text-slate-500 underline underline-offset-2 hover:text-indigo-600"
        >
          Save my system for later
        </button>
      </div>
    </div>
  );
};
