export interface IAuthState {
    accessToken: string;
    refreshToken: string;
}

export const AuthInitialState: IAuthState = {
    accessToken: '',
    refreshToken: ''
};
