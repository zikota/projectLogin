import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Grid } from '@mui/material';

const styles = {
    image: {
        height: "65vh",  
        opacity: '0.5'
          
    },
    card: {
        position: 'relative',
        backgroundColor: 'black', 
        textAlign: 'center'
    },
    text: {
        position: 'absolute',
        top: '25vh',
        color: 'white',
        left: '32%',
        width: '30%'
         
    },
    desc: {
        fontSize: '20px',
        textAlign: 'center'
    },
    title: {
        fontSize: '35px',
        textAlign: 'center'
    }
}

function CarouselCard(props) {

    return (
        <Grid item onClick={props.onClick}>
            <Card style={styles.card}>
                <CardActionArea style={styles.imgContainter}>
                    <CardMedia
                        component="img"
                        image={props.image}
                        alt={props.name}
                        style={styles.image}
                    />
                    <CardContent
                        style={styles.text}
                    >
                        <Typography gutterBottom variant="h5" component="div" style={styles.title}>
                            {props.name}
                        </Typography>
                        <Typography variant="body2" color="white" style={styles.desc}>
                            {props.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>

    );
}

export default CarouselCard;