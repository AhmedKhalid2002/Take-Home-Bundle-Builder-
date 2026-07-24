import type { ActiveVariants, CartQuantities } from '../types';

const STORAGE_KEY = 'wyze_bundle_builder_state_v1';

interface StoredState {
  quantities: CartQuantities;
  activeVariants: ActiveVariants;
  openStep: number;
}

export const loadSavedState = (): StoredState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveState = (state: StoredState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save bundle state:', e);
  }
};

export const formatCurrency = (amount: number): string => {
  if (amount === 0) return 'FREE';
  return `$${amount.toFixed(2)}`;
};
