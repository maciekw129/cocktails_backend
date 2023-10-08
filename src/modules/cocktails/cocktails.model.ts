export enum Category {
  shot = 1,
  short = 2,
  long = 3,
  other = 4,
}

export enum Difficulty {
  easy = 1,
  medium = 2,
  hard = 3,
}

export interface CocktailsParams {
  name: string;
  category: string;
  difficulty: string;
  ingredients: string[];
  userId: string;
  page: number;
}
