import { useQuery} from "@tanstack/react-query";
import {instanceRickAndMorty} from "../axios";
import {queryClient} from "../../App";

export const ALL_EPISODES_KEY = ["ALL_EPISODES_KEY"]

export const buildEpisodeByIdKey = (id) => ["EPISODE_BY_ID:" , id]

export const getEpisodes = () => instanceRickAndMorty.get("/episode").then((res) => res.data)

export const getEpisodeById = (id) => instanceRickAndMorty.get("/episode/"+id).then((res) => res.data)

export const useEpisodes = ({enabled}) => useQuery(
    {
        refetchOnWindowFocus:false,
        queryKey: ALL_EPISODES_KEY,
        queryFn: () => getEpisodes(),
        placeholderData: { info : {} , results: []},
        // On success or when data is retrieved create keys for each episode alone
        onSuccess: (data) => {
            data.results.map((episode) => {
                queryClient.setQueryData(buildEpisodeByIdKey(episode.id), {...episode})
            })
        },
        staleTime: Infinity,
        enabled
    }
)


// Id 1
export const useEpisodeById = ({id}) => useQuery(
    {
        // False to prevent refetch when resize of when opening inspect element
        refetchOnWindowFocus:false,
        // [EPISODE_BY_ID , 1]
        queryKey: buildEpisodeByIdKey(id),
        // Get data of episode id 1
        queryFn: () => getEpisodeById(id),
        staleTime:1000000,
        cacheTime:100000,
    }
)

export const postEpisode = ({payload}) => queryClient.setMutationDefaults(["POST_EPISODE"],{
        mutationFn: () =>  instanceRickAndMorty.post("/episode", {...payload}).then((res) => res.data),
        onSuccess: (data) => {
            queryClient.setQueryData(buildEpisodeByIdKey(data.id), {...data})
            // Update all episode

            // 2 approaches

            // Fetch all episodes again required api call
            queryClient.invalidateQueries({
                queryKey: ALL_EPISODES_KEY
            })

            // Optimistic Update, no api call
            const allEpisodes = queryClient.getQueryData(ALL_EPISODES_KEY)
            queryClient.setQueryData(ALL_EPISODES_KEY, [data, ...allEpisodes])
        }
    }
)

export const useCurrentUser = () => useQuery({
    queryKey:["CurrentUser"]
    }
)

// export const registerUser = ({payload}) => useMutation({
//         mutationFn: instanceRickAndMorty.post("/register", {...payload}).then((res) => res.data),
//         mutationKey: "POST_EPISODE",
//         onSuccess: (data) => {
//             queryClient.setQueryData(["CurrentUser"], {...data})
//         }
//     }
// )