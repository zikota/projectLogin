
import React from 'react';
import RecipeCard from './RecipeCard';
import { Grid } from '@mui/material';

function Item(props) {

    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            image: "https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            image: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"
        }
    ]

    return (
        <Grid container spacing={3} columns={3} alignItems="center" justifyContent="center" style={{ textAlign: "center" }}>
            {
                //props.item.map((item1, i) => <RecipeCard key={i} name={item1.name} description={item1.description} image={item1.image} />)
                <RecipeCard key={props.i} name={props.item.name} description={props.item.description} image={props.item.image} />
            }
        </Grid>
    );
}

export default Item;