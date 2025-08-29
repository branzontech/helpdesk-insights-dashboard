import { LucideIcon } from 'lucide-react';

export interface SettingCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  order: number;
}

export interface SettingOption {
  value: string;
  label: string;
}

export interface Setting {
  id: string;
  categoryId: string;
  name: string;
  subtitle?: string;
  description?: string;
  type: 'boolean' | 'number' | 'text' | 'select' | 'custom';
  value: boolean | number | string | null;
  
  // Number specific
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  slider?: boolean;
  
  // Text specific
  placeholder?: string;
  
  // Select specific
  options?: SettingOption[];
  
  // Metadata
  impact: 'low' | 'medium' | 'high';
  dependencies?: string[];
  experimental?: boolean;
  order: number;
}

export interface UseSettingsDataProps {
  searchTerm: string;
  selectedCategory: string;
}