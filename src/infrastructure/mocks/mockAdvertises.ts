import {AdvertisesResources} from "~/common/ImageResources.g";

export const data = [
    {
        id: '1',
        title: 'Продажа велосипеда',
        description: 'Почти новый горный велосипед, бренд XYZ, 2023 года выпуска. Использовался всего несколько месяцев',
        price: '100',
        priceType: 'руб.',
        location: 'Бендеры',
        date: 'сегодня в 13:04',
        images: [AdvertisesResources.bicycle]
    },
    {
        id: '2',
        title: 'Продажа велосипеда',
        description: 'Почти новый горный велосипед, бренд XYZ, 2023 года выпуска. Использовался всего несколько месяцев',
        price: '1200',
        priceType: 'руб.',
        location: 'Тирасполь',
        date: 'сегодня в 13:04',
        images: null
    },
    {
        id: '3',
        title: 'Продажа велосипеда',
        description: 'Почти новый горный велосипед, бренд XYZ, 2023 года выпуска. Использовался всего несколько месяцев',
        price: 'Договорная',
        priceType: undefined,
        location: 'Рыбница',
        date: 'сегодня в 13:04',
        images: [AdvertisesResources.bicycle, AdvertisesResources.bicycle, AdvertisesResources.bicycle]
    },
    {
        id: '4',
        title: 'Продажа велосипеда',
        description: 'Почти новый горный велосипед, бренд XYZ, 2023 года выпуска. Использовался всего несколько месяцев',
        price: '178',
        priceType: 'руб.',
        location: 'Тирасполь',
        date: 'сегодня в 13:04',
        images: [AdvertisesResources.bicycle, AdvertisesResources.bicycle]
    }
];
