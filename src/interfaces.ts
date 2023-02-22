export interface Beer {
  id: number;
  name?: number | string;
  tagline?: string;
  first_brewed?: string;
  description?: string;
  image_url?: string;
  abv?: number;
}

export interface PageState {
  skip: number;
  take: number;
}
