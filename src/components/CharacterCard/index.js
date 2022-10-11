import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CharacterCard = ({character}) => {
    console.log(character)
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image={character.image}
                alt= {character.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {character.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {character.species}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CharacterCard;