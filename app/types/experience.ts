export interface Skill {
  name: string;
}

export type PositionType =
  | 'Co-op'
  | 'Internship'
  | 'Part-time'
  | 'Full-time'
  | 'Self-Employed'
  | 'Contract';

export interface Position {
  role: string;
  type: PositionType;
  startDate: Date | string;
  endDate: Date | string | 'present';
  location: string;
  note?: string;
}

export interface ExperienceItem {
  company: {
    name: string;
    url?: string;
    logo?: string;
  };
  skills: Skill[];
  position: Position;
  promotions?: Position[];
}
