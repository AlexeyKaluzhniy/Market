import * as Keychain from "react-native-keychain";

interface ISecuredData {
    refreshToken: string;
}

export const getSecureItem = async <Key extends keyof ISecuredData>(key: Key): Promise<ISecuredData[Key] | null> => {
    try {
        const result = await Keychain.getInternetCredentials(key);
        if (!result) {
            return null;
        }
        const {password} = result;

        return JSON.parse(password) || null;
    } catch {
        return null;
    }
};

export const setSecureItem = async <Key extends keyof ISecuredData>(key: Key, data?: ISecuredData[Key] | null) => {
    try {
        if (!data) {
            await Keychain.resetInternetCredentials(key);
        } else {
            const value = JSON.stringify(data);
            await Keychain.setInternetCredentials(key, "-", value);
        }
    } catch {
        /**/
    }
};
