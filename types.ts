
export interface LocalizedString {
  id: string;
  en: string;
  zh: string;
}

export type AnimalType = 'MAMALIA' | 'REPTIL' | 'BURUNG' | 'IKAN' | 'SERANGGA' | 'AMFIBI' | 'INVERTEBRATA';
export type AnimalDiet = 'HERBIVORA' | 'KARNIVORA' | 'OMNIVORA';

export interface AnimalData {
  id: string;
  name: LocalizedString;
  emoji: string;
  image: string;
  diet?: AnimalDiet;
  type?: AnimalType;
  fact?: LocalizedString;
}

export interface Quiz {
  correctAnswer: string;
  options: string[];
  animal: AnimalData;
}
