export interface Register {
    find(arg0: (a: Register) => boolean): unknown;
    id?: number; // Optional for new registrations
    name: string;
    addresss : string;
    email: string;
    number: string;
    password: string;
}