export interface Plant {
  name: string;
  uid: string;
}

export interface PlantContent {
  count: number;
  previous: null,
  next: null,
  results: Plant[];
}