export enum View {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  SERVICES = 'SERVICES',
  CAREERS = 'CAREERS',
  CONTACT = 'CONTACT'
}

export interface JobPosition {
  id: string;
  title: string;
  company: string; // Nome da empresa contratante
  type: string;
  location: string;
  description: string;
  requirements: string[];
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}