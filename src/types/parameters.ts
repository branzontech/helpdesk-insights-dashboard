export interface ParameterCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface ParameterItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  module: string;
  type: "boolean" | "number" | "text" | "select";
  value: boolean | number | string;
  options?: string[]; // Para tipo select
  min?: number; // Para tipo number
  max?: number; // Para tipo number
  unit?: string; // Para mostrar unidades (días, MB, etc.)
  impact: "low" | "medium" | "high";
  affectedUsers: number;
  dependencies?: string[];
  tags?: string[];
}

export interface ParametersStats {
  total: number;
  enabled: number;
  disabled: number;
}

export interface ParameterModule {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}