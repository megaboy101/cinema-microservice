export interface Movie {
  readonly id: string;
  readonly title: string;
  readonly runtime: number;
  readonly format: string;
  readonly plot: string;
  readonly releaseYear: number;
  readonly releaseMonth: number;
  readonly releaseDay: number;
}
