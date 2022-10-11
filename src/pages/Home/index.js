import React, {useState} from 'react';
import {postEpisode, useEpisodes} from "../../query/episodes/useEpisodes";
import {Button, CircularProgress, Typography} from "@mui/material";
import {useHistory} from "react-router";
import {useMutation} from "@tanstack/react-query";

const HomePage = () => {

    const { push } = useHistory();

    const [enabled,setEnabled] = useState(false)

    const { data: episodes , isLoading: isLoadingEpisodes, isFetching: isFetchingEpisodes, refetch: refetchAllEpisodes } = useEpisodes({ enabled})

    const { mutate} = useMutation(["POST_EPISODE"])

    // mutate({
    //
    // })

    return (
        <div>
            <Button variant={"contained"} disabled={isFetchingEpisodes} onClick={() => setEnabled(true)} >
                Fetch
            </Button>

            <Button variant={"contained"} disabled={isFetchingEpisodes} onClick={() => refetchAllEpisodes()} >
                Refetch
            </Button>
            <Button variant={"contained"} disabled={isFetchingEpisodes} onClick={() => mutate({name:"Rick"})} >
                Submit Episode
            </Button>
            {
                episodes?.results?.map((episode) => {
                    return <Typography onClick={() => push('/episodes/'+episode.id)}>
                        {episode.name}
                    </Typography>
                })
            }
        </div>
    );
};

export default HomePage;