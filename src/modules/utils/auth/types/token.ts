import { Request } from 'express';

export interface AccessToken {
    id: string;
    email: string;
}

export interface CurrentUser extends AccessToken {}

export type AppRequest = Request & { user: CurrentUser };
