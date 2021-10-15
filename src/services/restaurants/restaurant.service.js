import { mockImages, mocks } from '../mock';
import camelize from 'camelize';

export const restaurantsRequest = (location = "41.878113,-87.629799") => {
    return new Promise ((resolve, reject) => {
        const mock = mocks[location];
        if (!mock) {
            reject("not found");
        };
        resolve(mock);
    });
}

export const reastaurantsTransform = ({ results = [] }) => {
    const mappedResults = results.map((restaurant)=>{
        restaurant.photos = restaurant.photos.map((p)=>{
            console.log(mockImages);
            return mockImages[Math.ceil(Math.random() * mockImages.length - 1)];
        });
        return {
            ...restaurant,
            isOpenNow: 
                restaurant.opening_hours && restaurant.opening_hours.open_now,
            isClosedTemporarily: 
                restaurant.business_status === "CLOSED_TEMPORARILY",
        }
    });
    
    console.log(mappedResults);
    return camelize(mappedResults);
}

restaurantsRequest()
    .then(reastaurantsTransform)
    .then((transformedResponse)=>{
        console.log(transformedResponse.results.lenght);
    }).catch((err)=>{
        console.log(err);
    });