// JSONPlaceholder API Types
// Reference: https://jsonplaceholder.typicode.com/users

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface JSONPlaceholderUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

// Type for creating a new user (without id)
export type CreateJSONPlaceholderUser = Omit<JSONPlaceholderUser, 'id'>;

// Type for updating a user (partial fields)
export type UpdateJSONPlaceholderUser = Partial<JSONPlaceholderUser> & { id: number };
