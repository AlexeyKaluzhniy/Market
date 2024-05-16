export interface ILogin {
    phoneNumber: string;
    password: string;
}

export interface IRegister extends ILogin {
    isConditionUsageAndConfidentialPoliticsAgree: boolean;
}

export interface ISendOtp {
    phoneNumber: string;
    otpCodeReason: 'Registration' | 'ResetPassword' | 'DeleteAccount';
}

export interface ICheckOtp extends ISendOtp {
    otpCode: string;
}

export interface ILoginResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token: string;
    scope: string;
}
