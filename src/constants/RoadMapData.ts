export type RoadMapKeys = 'id' | 'text' | 'year' | 'img1440' | 'img760' | 'img390' | 'style'; 
export interface RoadMapItem {
    id: number;
    text: string;
    year: string;
    img1440: string;
    img760: string;
    img390: string;
    style: string;
}

export const RoadMapData: RoadMapItem[] = [
    {
        id: 1,
        text: 'text_1',
        year: '2016',
        img1440: '/images/RoadMap/photo2.png',
        img760: '/images/RoadMap/760/2.png',
        img390: '/images/RoadMap/390/2.png',
        style: 'reverse',
    },
    {
        id: 2,
        text: 'text_2',
        year: '2017',
        img1440: '/images/RoadMap/photo3.png',
        img760: '/images/RoadMap/760/3.png',
        img390: '/images/RoadMap/390/3.png',
        style: '',
    },
    {
        id: 3,
        text: 'text_3',
        year: '2018',
        img1440: '/images/RoadMap/photo4.png',
        img760: '/images/RoadMap/760/4.png',
        img390: '/images/RoadMap/390/4.png',
        style: 'reverse',
    },
    {
        id: 4,
        text: 'text_4',
        year: '2019',
        img1440: '/images/RoadMap/photo5.png',
        img760: '/images/RoadMap/760/5.png',
        img390: '/images/RoadMap/390/5.png',
        style: '',
        
    },
    {
        id: 5,
        text: 'text_5',
        year: '2019',
        img1440: '/images/RoadMap/photo6.png',
        img760: '/images/RoadMap/760/6.png',
        img390: '/images/RoadMap/390/6.png',
        style: 'reverse',
    },
    {
        id: 6,
        text: 'text_6',
        year: '2020',
        img1440: '/images/RoadMap/photo7.png',
        img760: '/images/RoadMap/760/7.png',
        img390: '/images/RoadMap/390/7.png',
        style: '',
    },
    {
        id: 7,
        text: 'text_7',
        year: '2022',
        img1440: '/images/RoadMap/photo8.png',
        img760: '/images/RoadMap/760/8.png',
        img390: '/images/RoadMap/390/8.png',
        style: 'reverse',
    },
    {
        id: 8,
        text: 'text_8',
        year: '2023',
        img1440: '/images/RoadMap/photo9.png',
        img760: '/images/RoadMap/760/9.png',
        img390: '/images/RoadMap/390/9.png',
        style: '',
    },
    {
        id: 9,
        text: 'text_9',
        year: '2024',
        img1440: '/images/RoadMap/photo10.png',
        img760: '/images/RoadMap/760/10.png',
        img390: '/images/RoadMap/390/10.png',
        style: 'reverse',

    },
];
