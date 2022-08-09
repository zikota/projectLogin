import '../App.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import IngredientCard from './IngredientCard';
import Typography from '@mui/material/Typography';
import { Grid, Container } from '@mui/material';
import Pagination from '@mui/material/Pagination';

function Ingredients() {

  const [ingredientsData, setIngData] = useState([]);

  let [page, setPage] = useState(1);
  const PER_PAGE = 9;

  const handleChange = (e, p) => {
    setPage(p);
    //_DATA.jump(p);

  };

  useEffect(() => {
    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
      headers: {}
    };

    axios(config)
      .then(function (response) {

        const transformedData = response.data.meals.map((ingredient) => {

          let short = ingredient.strDescription;
          let long = ingredient.strDescription;
          if (short != null) {
            short = ingredient.strDescription.substring(0, 150);
          }
          let imgUrl = "https://www.themealdb.com/images/ingredients/" + ingredient.strIngredient + ".png";
          imgUrl = imgUrl.replace(" ", "%20");
          return { id: ingredient.idIngredient, name: ingredient.strIngredient, image: imgUrl, description: short, long: long }
        });
        setIngData(transformedData);
      })

      .catch(function (error) {
        console.log(error);
      });

  }, []);

  useEffect(() => {
    console.log("page:" + page);
  }, [page]);

  const displayPosts = () => {

    let start = (page - 1) * PER_PAGE;
    let end = PER_PAGE * page;
    const slicedArray = ingredientsData.slice(start, end);
    return slicedArray.map((ingredient) => {
      return <IngredientCard id={ingredient.id} width="345" name={ingredient.name} image={ingredient.image} description={ingredient.description} long={ingredient.long} key={ingredient.id}></IngredientCard>
    })
  }


  return (
    <div>
      <Container maxWidth>
        <div id="bcgImgIng"><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
      </Container>
    <Container fixed>
      <div style={{ minHeight: "700px" }}>
        <Typography variant="h2" component="div" align="center">
          
        </Typography>

        <Grid container spacing={3} columns={3} alignItems="center" justifyContent="center" style={{ textAlign: "center" }}>
          {displayPosts()}
        </Grid>
        <br /><br />
        <Pagination page={page}
          count={Math.ceil(ingredientsData.length / PER_PAGE)}
          onChange={handleChange} style={{ padding: "20px" }} />
      </div>
    </Container>
    </div>
  );
}

export default Ingredients;
