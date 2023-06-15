import { Destination } from "./destination-model";

export class DestinationList {
  message!: string
  data!: Destination[];
}

export class OneDestination {
  message!: string
  data!: Destination;
}
export class AuthenticatiobResponse {
  message!: string
  data!: string;
}
