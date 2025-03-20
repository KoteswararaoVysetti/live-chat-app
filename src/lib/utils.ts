import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitialLetter(name?: string) {
  if (!name) return '';

  const initialLetter = name.charAt(0);

  return initialLetter;
}
