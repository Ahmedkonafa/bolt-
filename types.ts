
export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  language?: string;
  path: string;
}

export interface Step {
  id: string;
  title: string;
  description: string;
  status?: 'pending' | 'running' | 'completed' | 'error';
  type: 'shell' | 'file';
  path?: string;
  content?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  steps?: Step[];
}

export enum TabType {
  CODE = 'code',
  PREVIEW = 'preview',
}
