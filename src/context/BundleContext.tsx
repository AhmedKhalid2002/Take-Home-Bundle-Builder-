import React, { createContext, useContext, useState, useEffect } from 'react';
import data from '../data/bundleData.json';
import { loadSavedState, saveState } from '../utils/persistence';
import type { ActiveVariants, CartQuantities, Product, Step } from '../types';

interface BundleContextType {
  products: Product[];
  steps: Step[];
  openStep: number;
  setOpenStep: (stepId: number) => void;
  quantities: CartQuantities;
  activeVariants: ActiveVariants;
  updateQuantity: (key: string, delta: number) => void;
  setQuantityDirectly: (key: string, count: number) => void;
  selectVariant: (productId: string, variantId: string) => void;
  getStepSelectedCount: (categoryId: Product['categoryId']) => number;
  saveSystemToStorage: () => void;
  subtotal: number;
  compareSubtotal: number;
  savings: number;
}

const BundleContext = createContext<BundleContextType | undefined>(undefined);

// Initial Seed setup according to Figma pre-populated design
const initialQuantitiesSeed: CartQuantities = {
  'cam-v4:white': 1,
  'cam-pan-v3': 2,
  'motion-sensor': 2,
  'sense-hub': 1,
  'sd-card': 2,
  'cam-unlimited': 1,
};

const initialVariantsSeed: ActiveVariants = {
  'cam-v4': 'white',
  'cam-battery-pro': 'white',
};

export const BundleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [openStep, setOpenStep] = useState<number>(1);
  const [quantities, setQuantities] = useState<CartQuantities>(
    initialQuantitiesSeed,
  );
  const [activeVariants, setActiveVariants] =
    useState<ActiveVariants>(initialVariantsSeed);

  useEffect(() => {
    const saved = loadSavedState();
    if (saved) {
      setQuantities(saved.quantities);
      setActiveVariants(saved.activeVariants);
      setOpenStep(saved.openStep);
    }
  }, []);

  const updateQuantity = (key: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[key] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [key]: next };
    });
  };

  const setQuantityDirectly = (key: string, count: number) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(0, count),
    }));
  };

  const selectVariant = (productId: string, variantId: string) => {
    setActiveVariants((prev) => ({ ...prev, [productId]: variantId }));
  };

  const getStepSelectedCount = (categoryId: Product['categoryId']): number => {
    const categoryProducts = data.products.filter(
      (p) => p.categoryId === categoryId,
    );
    let count = 0;

    categoryProducts.forEach((p) => {
      if (p.variants && p.variants.length > 0) {
        p.variants.forEach((v) => {
          if ((quantities[`${p.id}:${v.id}`] || 0) > 0) count++;
        });
      } else {
        if ((quantities[p.id] || 0) > 0) count++;
      }
    });

    return count;
  };

  // Calculations
  let subtotal = 0;
  let compareSubtotal = 0;

  data.products.forEach((p) => {
    if (p.variants && p.variants.length > 0) {
      p.variants.forEach((v) => {
        const qty = quantities[`${p.id}:${v.id}`] || 0;
        subtotal += qty * p.price;
        compareSubtotal += qty * (p.compareAtPrice ?? p.price);
      });
    } else {
      const qty = quantities[p.id] || 0;
      subtotal += qty * p.price;
      compareSubtotal += qty * (p.compareAtPrice ?? p.price);
    }
  });

  const savings = compareSubtotal - subtotal;

  const saveSystemToStorage = () => {
    saveState({ quantities, activeVariants, openStep });
    alert('System configuration saved successfully!');
  };

  return (
    <BundleContext.Provider
      value={{
        products: data.products as Product[],
        steps: data.steps as Step[],
        openStep,
        setOpenStep,
        quantities,
        activeVariants,
        updateQuantity,
        setQuantityDirectly,
        selectVariant,
        getStepSelectedCount,
        saveSystemToStorage,
        subtotal,
        compareSubtotal,
        savings,
      }}
    >
      {children}
    </BundleContext.Provider>
  );
};

export const useBundle = () => {
  const context = useContext(BundleContext);
  if (!context) throw new Error('useBundle must be used within BundleProvider');
  return context;
};
