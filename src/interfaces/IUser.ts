import { Document } from 'mongoose';

export interface User {
    _id?: string;
    name: string;
    email: string | boolean | undefined;
    password: string;
}

export interface UserModel extends Omit<User, '_id'>, Document {}

export interface DecodeUser extends Omit<User, '_id'> {
    id: string;
}
