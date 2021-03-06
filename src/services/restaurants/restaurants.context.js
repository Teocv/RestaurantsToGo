import React, { useState, createContext, useEffect, useMemo } from 'react';
import { restaurantsRequest, restaurantsTransform } from './restaurant.service';

export const RestaurantContext = createContext();

export const RestaurantContextProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const retrieveRestaurants = () => {
        setIsLoading(true);
        setTimeout(()=>{
            setIsLoading(false);
            restaurantsRequest()
                .then(restaurantsTransform)
                .then((results)=>{
                    setRestaurants(results);
                }).catch((error)=>{
                    setError(error);
                })
        }, 2000);
    }

    useEffect(()=>{
        retrieveRestaurants();
    },[])
    return <RestaurantContext.Provider value={{
        restaurants, isLoading, error,
    }}>{children}</RestaurantContext.Provider>
}