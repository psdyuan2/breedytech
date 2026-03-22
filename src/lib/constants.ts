export const SITE_NAME = 'Zobbi Gear';

export const formatINR = (paise: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(paise / 100);
};
