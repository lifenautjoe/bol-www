import { Injectable } from '@angular/core';
import { User, UserData } from '../models/user';
import { UserFactoryService } from '../factories/user-factory.service';
import 'rxjs/add/operator/toPromise';
import { ApiResponse } from '../models/api-response';
import * as Bluebird from 'bluebird';
import { PromisedHttpService } from './promised-http.service';

@Injectable()
export class AuthApiService {
    private static readonly LOGIN_URL = 'users/logIn';
    private static readonly LOGOUT_URL = 'users/logOut';

    constructor(private promisedHttpService: PromisedHttpService,
                private userFactoryService: UserFactoryService) {

    }

    logIn(data: LoginData): Bluebird<User> {
        return this.promisedHttpService.post(AuthApiService.LOGIN_URL, data, {
            responseType: 'json'
        }).then((response: UserData) => {
            return this.userFactoryService.make(response);
        });
    }

    logOut(): Bluebird<ApiResponse> {
        return this.promisedHttpService.post(AuthApiService.LOGOUT_URL, undefined, {
            responseType: 'json'
        }) as Bluebird<ApiResponse>;
    }
}

export interface LoginData {
    userName: string;
}
