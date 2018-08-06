export interface Country {
  readonly _id: string;
  readonly name: string;
}

export interface State {
  readonly _id: string;
  readonly name: string;
  readonly country_id: string;
}

export interface City {
  readonly _id: string;
  readonly name: string;
  readonly state_id: string;
}

export interface Location {
  readonly countryId: string;
  readonly stateId: string;
  readonly cityId: string;
}

export interface Schedule {
  readonly time: string;
  readonly seatsEmpty: ReadonlyArray<string>;
  readonly seatsOccupied: ReadonlyArray<string>;
  readonly price: number;
  readonly movie_id: string;
}

export interface CinemaRoom {
  readonly name: number;
  readonly capacity: number;
  readonly schedules: ReadonlyArray<Schedule>;
}

export interface Cinema {
  readonly _id: string;
  readonly name: string;
  readonly cinemaRooms: ReadonlyArray<CinemaRoom>;
  readonly city_id: string;
}
