import axios from "axios";

export const instanceRickAndMorty = axios.create(
    {
        baseURL: "https://rickandmortyapi.com/api"
    }
)