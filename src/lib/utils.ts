import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
'`/src/components/'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
