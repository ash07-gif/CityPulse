import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { IssueStatus } from './types';
import type { BadgeProps } from "@/components/ui/badge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStatusVariant(status: IssueStatus): BadgeProps['variant'] {
    switch (status) {
        case 'Resolved':
            return 'success';
        case 'In Progress':
            return 'warning';
        case 'Open':
            return 'destructive';
        default:
            return 'default';
    }
}
