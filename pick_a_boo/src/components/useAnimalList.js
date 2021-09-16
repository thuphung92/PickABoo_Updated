import { useState, useEffect } from 'react';
import { Client } from '@petfinder/petfinder-js';

const client = new Client({apiKey: process.env.REACT_APP_API_KEY, secret: process.env.REACT_APP_API_SECRET});

const localCache = {}; 
export default function useAnimalList() {
    const [animalList, setAnimalList] = useState([]);
    const [status, setStatus] = useState('unloaded');

    useEffect(() =>{
        if (!animal) {
            setAnimalList([]);
        } else {
            getAnimalList();
        }

        async function getAnimalList() {
            setAnimalList([]); //to clear the list of the previous state if it exists
            setStatus ('loading');
    
            const resp = await client.animalData.types()
            const animals = resp.data.types.map(type => {return type.name})
            localCache[animals] = animals || [];
            setAnimalList(localCache[animals])
            setStatus('loaded');
        }
    }, [])

    return [animalList, status];
}

