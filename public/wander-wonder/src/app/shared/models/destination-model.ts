export  class Airports {
  name !:string;
  city !:string;
}
export class Country {
  name !:string;
  population !:Number;
}
export class Destination {
  name !: string;
  description !: string;
  expense !:Number;
  photo !:string;
  country !: Country;
  airports !: [Airports];
}


