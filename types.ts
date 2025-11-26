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
  responsibilities: string[]; // Novo
  benefits: string[]; // Novo
  salary?: string; // Novo
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}