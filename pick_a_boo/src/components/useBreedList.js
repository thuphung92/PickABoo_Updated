import { useState, useEffect } from 'react';
import { Client } from '@petfinder/petfinder-js';

const client = new Client({apiKey: process.env.REACT_APP_API_KEY, secret: process.env.REACT_APP_API_SECRET});

// save the previous choices in the local Cache -> don't have to request api every single time
const localCache = {}; 

export default function useBreedList(animal) {
    const [breedList, setBreedList] = useState([]);
    const [status, setStatus] = useState('unloaded');

    useEffect(() =>{
        if (!animal) {
            setBreedList([]);
        } else if (localCache[animal]) {
            setBreedList(localCache[animal])
        } else {
            getBreedList();
        }

        async function getBreedList() {
            //clear the list of the previous state if it exists
            setBreedList([]); 
            setStatus ('loading');
    
            const resp = await client.animalData.breeds(`${ animal }`).then(resp =>{
                return resp.data.breeds
            })
            const breeds = resp.map(breed => {return breed.name})
            localCache[animal] = breeds || [];
            setBreedList(localCache[animal])
            setStatus('loaded');
        }
    }, [animal])

    return [breedList, status];
}