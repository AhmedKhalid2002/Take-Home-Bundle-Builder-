export interface Variant {
  id: string;
  name: string;
  colorHex?: string;
  image?: string;
}

export interface Product {
  id: string;
  categoryId: 'cameras' | 'plans' | 'sensors' | 'protection';
  categoryGroup: 'CAMERAS' | 'SENSORS' | 'ACCESSORIES' | 'PLAN';
  title: string;
  description?: string;
  learnMoreUrl?: string;
  price: number;
  compareAtPrice?: number;
  discountBadge?: string;
  image: string;
  variants?: Variant[];
}

export type CartQuantities = Record<string, number>;
export type ActiveVariants = Record<string, string>;
export interface Step {
  id: number;
  title: string;
  categoryId: Product['categoryId'];
  nextStepTitle?: string;
  img: string;
}
