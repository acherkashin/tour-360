import { asset } from 'react-360';

const agro = {
    name: 'agro',
    // url: `https://cors-anywhere.herokuapp.com/https://d36tnp772eyphs.cloudfront.net/blogs/1/2006/11/360-panorama-matador-seo.jpg`,
    url: asset('agro.jpg'),
    sound: asset('audio/vilenskaja.m4a'),
    portals: [
        {
            name: 'zoo',
            transformPortal: [{ translate: [11, 0, -6] }]
        },
        {
            name: 'kirha',
            transformPortal: [{ translate: [10, 0, 8] }]
        }
    ],
    labels: [
        {
            // offset: 0,
            // viewStyle: {
            //     transform: [{ translate: [1, 2, -5] }, { scale: 1.5 }]
            // },
            text: 'Здание Аграрного Университета',
            description: '----',
            // infoPosition: 1900, // pixels
        }
    ]
};

export default agro;