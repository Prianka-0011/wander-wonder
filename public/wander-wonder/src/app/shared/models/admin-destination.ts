
export class Airports {
  _id!: string;
  name!: string;
  city!: string;
}

export class Country {
  _id!: string
  name!:string;
  population!:Number;
}

export class Destination {
  #_id!: string;
  #name!: string;
  #description!: string;
  #expense!:Number;
  #photo!:FormData;
  #country!: Country;
  #airports!: [Airports];
  get _id() {
    return this.#_id;
  }
  set _id(_id) {
    this.#_id = _id;
  }

  get name() {
    return this.#name;
  }
  set name(name) {
    this.#name = name;
  }

  get description() {
    return this.#description;
  }
  set description(description) {
    this.#description = description;
  }

  get expense() {
    return this.#expense;
  }
  set expense(expense) {
    this.#expense = expense;
  }

  get photo() {
    return this.#photo;
  }
  set photo(photo) {
    this.#photo = photo;
  }

  get country() {
    return this.#country;
  }
  set country(country) {
    this.#country = country;
  }
  get airports() {
    return this.#airports;
  }
  set airports(airports) {
    this.#airports = airports;
  }


}
