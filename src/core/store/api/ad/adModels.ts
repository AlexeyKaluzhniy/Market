export interface IAdvertisement {
    id: string;
    createdUtc: string;
    updatedUtc: string;
    deletedUtc: string;
    name: string;
    description: string;
    photos: string[];
    user: {
        id: string;
        createdUtc: string;
        updatedUtc: string;
        deletedUtc: string;
        phone: string;
        email: string;
        firstName: string;
        lastName: string;
        birthDay: string;
        avatarUri: string;
    };
    userId: string;
    city: string | undefined;
    price: number;
}
