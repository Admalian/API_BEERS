export interface Beer {
  id: number;
  name?: number | string;
  tagline?: string;
  first_brewed?: string;
  description?: string;
  image_url?: string;
  abv?: number;
  /*ibu?: number;
  target_fg?: number;
  target_og?: number;
  ebc?: number;
  srm?: number;
  ph?: number;
  attenuation_level?: number;
  volume?: any;
  boil_volume?: any;
  method?: any;
  ingredients?: any;
  food_pairing?: any; //[index:number];
  brewers_tips?: string;
  contributed_by?: string;
  */
}

export interface PageState {
  skip: number;
  take: number;
}
/*
export interface BeerVolume {
  value?: number;
  unit?: string;
}

export interface BeerBoilVolume {
  value?: number;
  unit?: string;
}

export interface BeerMethod {
  mash_temp?: MashTempArray[];
}
export interface MashTempArray {
  temp?: TempDetails;
  unit?: string;
}
export interface TempDetails {
  mash_temp?: MashTempArray[];
}


export interface columnInterface {
  title?: string;
  field?: string;
  show?: boolean;
  filter?: "boolean" | "numeric" | "text" | "date" | undefined;
  minWidth?: number;
  minGridWidth?: number;
  locked?: boolean;
  width?: string | number;
  children?: JSX.Element | JSX.Element[];
}*/
