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
  enabled: boolean;
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