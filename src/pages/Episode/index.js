import React, {useEffect} from 'react';
import {useHistory, useParams} from "react-router";
import {useEpisodeById, useEpisodes} from "../../query/episodes/useEpisodes";
import {CircularProgress, Grid, Typography} from "@mui/material";
import {useCharactersByIds} from "../../query/characters";
import CharacterCard from "../../components/CharacterCard";

const Episode = () => {

    const { push } = useHistory();
    const { episodeId }  = useParams()

    const { data: allEpisodes , isLoading: isLoadingAllEpisodes} = useEpisodes({
        enabled:true
    })

    const { data: episode, isLoading: isLoadingEpisode, isFetching: isFetchingEpisode, refetch: refetchEpisode } = useEpisodeById({id: episodeId});

    const characters = useCharactersByIds(episode ? episode.characters.map((characterLink) => {
            const link = characterLink.split("/")
            return link[link.length-1]
        }) : [])


    useEffect(() => {
        if(!episode){
            refetchEpisode()
        }
    },[episode])

    if(isLoadingEpisode){
        return <CircularProgress />
    }
    return (
        <div style={{padding:"5% 10%"}}>
            <Typography>
                All Episodes
            </Typography>
            <div style={{display:'flex', flexWrap:"wrap"}}>
                {
                    allEpisodes?.results?.map((episode) => {
                        return (<Typography width={"150px"} margin={"20px"} onClick={() => push('/episodes/'+episode.id)}>
                            {episode.name}
                        </Typography>)
                    })                }
                <Typography>
                </Typography>

            </div>
            <Typography variant={"h4"} marginBottom={5}>
                Episode Name: {episode.name}

            </Typography>


            <Grid container spacing={2}>
                {
                    (characters.length > 0) &&
                    characters.map(({data: character, isLoading}) => {
                        if(!isLoading){
                            return (
                                <Grid xs={12} sm={6} md={4} lg={3} item>

                                    <CharacterCard character={character} />
                                </Grid>
                            )
                        }

                    })
                }
            </Grid>

        </div>
    );
};

export default Episode;