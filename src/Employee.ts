
    export interface RootObject {
    _embedded: Embedded;
    _links: Links2;
    page: Page;
  }
  
  export interface Page {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
  
  interface Links2 {
    first: Self;
    prev:Self;
    self: Self2;
    next: Self;
    last: Self;
    profile: Self;
  }
  
  interface Self2 {
    href: string;
    templated: boolean;
  }
  
  export interface Embedded {
    employees: Employee[];
  }
  
  export interface Employee {
    id: number;
    birthDate: string;
    firstName: string;
    lastName: string;
    gender: string;
    hireDate: string;
    _links: Links;
  }
  
  export interface Links {
    self: Self;
    employee: Self;
  }
  
  interface Self {
    href: string;
  }
