import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState, useRef } from 'react';
import RecipeCard from './RecipeCard';
import { Button, useForkRef } from '@mui/material';
import CarouselCard from './CarouselCard';
import Carousel from 'react-material-ui-carousel'
import Link from '@mui/material/Link';
import Recipe from './Recipe'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


const mdTheme = createTheme();

const drawerWidth = 350;

function HomePage() {

  const [openDialog, setOpenDialog] = React.useState(false);
  const [scrollDialog, setScrollDialog] = React.useState('paper');
  const [recipeID, setRecipeID] = useState(0);
  const [page, setPage] = useState(1);
  const [recipe, setRecipeData] = useState([]);
  const [openDrawer, setOpenDrawer] = React.useState(true);
  const [ windowWidth, setWindowWidth ] = useState();
  const [ widthGridItem, setWidthGridItem ] = useState();
  
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize)
    setWindowWidth(window.innerWidth);
  })

  useEffect(()=>{
    if (windowWidth <= 1004)
      setWidthGridItem(345)
    if (windowWidth <= 1154 && windowWidth > 1004)
      setWidthGridItem(170)
    if (windowWidth <= 1306 && windowWidth > 1154)
      setWidthGridItem(220)
    else if(windowWidth <= 1550 && windowWidth > 1306)
      setWidthGridItem(270);
    else if (windowWidth > 1550 && windowWidth < 1916)
      setWidthGridItem(345)
    else if (windowWidth >= 1916)
      setWidthGridItem(400)
  },[windowWidth])

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        backgroundColor: "#F4EDE8",
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );


  useEffect(() => {
    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'https://www.themealdb.com/api/json/v1/1/search.php?f=c',
      headers: {}
    };

    axios(config)
      .then(function (response) {

        const transformedData = response.data.meals.map((meal) => {
          let short = meal.strInstructions;
          if (short != null) {
            short = meal.strInstructions.substring(0, 150);
          }

          let imgUrl = meal.strMealThumb;

          return { id: meal.idMeal, name: meal.strMeal, image: imgUrl, description: short, area: meal.strArea, mainIngredient: meal.strIngredient1, category: meal.strCategory }

        });
        setRecipeData(transformedData);
      })

      .catch(function (error) {
        console.log(error);
      });

  }, []);

  const displayPosts = () => {
    const slicedArray = recipe.slice(0, 3 * page);
    return slicedArray.map((recipe) => {
      let width = widthGridItem.current;
      return <Grid item xs={false}>
        <RecipeCard id={recipe.id} maxWidth={widthGridItem} name={recipe.name} image={recipe.image} description={recipe.description} key={recipe.id} onClick={handleClickOpenDialog('paper', recipe.id)}></RecipeCard>

      </Grid>

    })
  }

  function handleClick() {
    setPage(page + 1);
  }

  var items = [
    {
      id: "52952",
      name: "Beef Lo Mein",
      description: "Beef",
      image: "https://www.themealdb.com/images/media/meals/1529444830.jpg"
    },
    {
      id: "52982",
      name: "Spaghetti alla Carbonara",
      description: "Pasta",
      image: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg"
    },
    {
      id: "52859",
      name: "Key Lime Pie",
      description: "Dessert",
      image: "https://www.themealdb.com/images/media/meals/qpqtuu1511386216.jpg"
    },
    {
      id: "52959",
      name: "Baked salmon with fennel & tomatoes",
      description: "Seafood",
      image: "https://www.themealdb.com/images/media/meals/1548772327.jpg"
    }

  ]

  const handleClickOpenDialog = (scrollType, recipeID) => () => {
    setOpenDialog(true);
    setScrollDialog(scrollType);
    setRecipeID(recipeID);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setRecipeID(0);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openDialog]);


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer variant="permanent" open={openDrawer} className="homepageDrawer"

        >

          <Typography
            sx={{
              fontWeight: 600,
              padding: 3,
              textAlign: 'center',

            }}
          >Browse top categories</Typography>

          <Link href="/recipes/pasta" underline="none"><Typography
            sx={{
              textAlign: "center",
              padding: 1
            }}
          >Pasta</Typography></Link>
          <Link href="/recipes/seafood" underline="none"><Typography
            sx={{
              textAlign: "center",
              padding: 1
            }}>
            Seafood</Typography></Link>
          <Link href="/recipes/vegetarian" underline="none"><Typography
            sx={{
              textAlign: "center",
              padding: 1
            }}>
            Vegetarian</Typography></Link>
          <Divider />
          <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FYummy-101232779366237&tabs=timeline&width=340&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=60264765759"
            width="340" height="600" scrolling="no" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            //height: '100vh',
            overflow: 'hidden',
          }}
        >

          <Container maxWidth="l" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={1}>
              {/* Newsest recipes */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '60vh',
                  }}
                >

                  <Carousel
                    navButtonsAlwaysVisible='true'
                    autoPlay='false'
                    animation='slide'
                  >
                    {
                      items.map((item, i) => <CarouselCard key={i} name={item.name} description={item.description} image={item.image} onClick={handleClickOpenDialog('paper', item.id)} />)
                    }
                  </Carousel>
                  <Recipe open={openDialog} scroll={scrollDialog} handleClickOpenDialog={handleClickOpenDialog} recipeID={recipeID} handleClose={handleCloseDialog} descriptionElementRef={descriptionElementRef} ></Recipe>

                </Paper>
              </Grid>


              {/* Top recipes */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h4" component="div" align="center">Top rated recipes</Typography>
                  <Grid container spacing={3} columns={3} alignItems="center" justifyContent="center" style={{ textAlign: "center" }}>
                    {displayPosts()}
                    <Button
                      variant="outlined"
                      onClick={handleClick}
                      sx={{
                        width: 380,
                        marginTop: 3,
                        marginLeft: 3
                      }}
                    >
                      Load more
                    </Button>
                  </Grid>
                  <Recipe open={openDialog} scroll={scrollDialog} handleClickOpenDialog={handleClickOpenDialog} recipeID={recipeID} handleClose={handleCloseDialog} descriptionElementRef={descriptionElementRef} ></Recipe>

                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default HomePage;