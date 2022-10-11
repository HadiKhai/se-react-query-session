import {useQueries} from "@tanstack/react-query";
import {instanceRickAndMorty} from "../axios";

export const buildCharacterById = (id) => ["CHARACTER_BY_ID", id]

export const getCharacterById = (id) => instanceRickAndMorty.get("/character/"+id).then((res) => res.data)

export const useCharactersByIds = (ids=[]) =>
    useQueries({
        queries:ids.map((id) => ({
            queryKey:buildCharacterById(id), queryFn: () =>  getCharacterById(id), staleTime: Infinity,
            refetchOnWindowFocus:false

        }))
    })