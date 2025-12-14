export interface Project {
  id: string;
  title: string;
  description: string;
  path: string;
  lastModified: string;
  slideCount: number;
  tags: string[];
  thumbnailGradient: string;
}

export type ViewMode = 'hub' | 'viewer';
