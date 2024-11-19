import { Decimal } from 'decimal.js';

export const formatPrice = (price: string | number): string => {
  return new Decimal(price).toFixed(2);
};

export const formatVolume = (volume: string | number): string => {
  return new Decimal(volume).toFixed(2);
};

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(2)}%`;
}; 