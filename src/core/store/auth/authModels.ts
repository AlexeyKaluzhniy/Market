export interface ILogin {
    phoneNumber: string;
    password: string;
}

export interface IRegister {
    phoneNumber: string;
    password: string;
    isConditionUsageAndConfidentialPoliticsAgree: boolean;
}

export interface ISendOtp {
    phoneNumber: string;
    otpCodeReason: 'Registration' | 'ResetPassword' | 'DeleteAccount';
    otpProviderType: 'Sms';
}

export interface ICheckOtp extends ISendOtp {
    otpCode: string;
}
