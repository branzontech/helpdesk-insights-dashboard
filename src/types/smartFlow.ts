export interface SmartFlowAction {
  id: string;
  type: 'status' | 'priority' | 'assign' | 'reply' | 'tag' | 'escalate' | 'close';
  label: string;
  value: string | string[];
}

export interface SmartFlow {
  id: string;
  name: string;
  description: string;
  category: 'quick-resolve' | 'escalation' | 'assignment' | 'communication' | 'custom';
  icon: string;
  color: string;
  actions: SmartFlowAction[];
  usageCount: number;
  lastUsed?: Date;
}

export interface SmartFlowCategory {
  id: string;
  name: string;
  description: string;
  flows: SmartFlow[];
}
