export interface IRegister {
    phoneNumber: string;
    password: string;
    isConditionUsageAndConfidentialPoliticsAgree: string;
}

export interface ISendOtp {
    phoneNumber: string;
    otpCodeReason: 'Registration' | 'ResetPassword' | 'DeleteAccount';
    otpProviderType: 'Sms';
}

export interface ICheckOtp extends ISendOtp {
    otpCode: string;
}
