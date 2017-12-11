import { User } from './user';

export class IsLoggedInParsedResponse {
    loggedIn: boolean;
    loggedInUser?: User;
}
