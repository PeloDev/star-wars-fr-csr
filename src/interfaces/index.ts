export interface ICharacterImage {
  url: string;
  thumbnail?: string;
  snippet?: string;
  context?: string;
}

export interface ICharacter {
  id: string;
  name: string;
  height: string;
  mass: string;
  gender: string;
  homeworld: string;
  images?: ICharacterImage[];
  homeworldOb?: any;
}

export interface ICharactersResult {
  count: number;
  total: number;
  people: ICharacter[];
}
