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
