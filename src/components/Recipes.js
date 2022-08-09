import '../App.css';
import * as React from 'react';
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import { useParams } from 'react-router-dom';
import Recipe from './Recipe';
import Container from '@mui/material/Container';

function Recipes ()
{
    const { name } = useParams();

    const [ searchText, setSearchText ] = useState("");
    const [ searchRadio, setSearchRadio ] = useState("name");
    const [ recipesData, setRecipesData ] = useState([]);
    const [ filteredRecipesData, setFilteredRecipesData ] = useState([]);
    //const [ IDsData, setIDsData ] = useState([]);
    let IDsData = useRef([]);
    const [ loading, setLoading ] = useState(true);
    const inputRef = useRef();

    const [openDialog, setOpenDialog] = React.useState(false);
    const [scrollDialog, setScrollDialog] = React.useState('paper');
    const [recipeID, setRecipeID] = useState(0);
    
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

    const [currentPage, setCurrentPage] = useState(1);
    
    let PageSize = 9;

    const getMeals = async function(){
        var axios = require('axios');
        var config = {
          method: 'get',
          url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + name,
          headers: { }
        };

        await axios(config).then(function(response){
            const transformedData = response.data.meals.map((meal, index) => {
                return { id: meal.idMeal, key: index }
            
              });
              IDsData.current = transformedData;
              getMealsDetails();
              setTimeout(() => setLoading(false), 500);
        })
        .catch(function (error) {
        console.log(error);
        });
          
    }

    const getMealsDetails = async function() {
        var axios = require('axios');
        var detailedData = IDsData.current.map(async (detailedMeal) => {
            var config2 = {
                method: 'get',
                url: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + detailedMeal.id,
                headers: { }
              };
    
              axios(config2)
              .then(function(response) {
                const mealData = response.data.meals.map((mealFull, index) => {
                    let short = mealFull.strInstructions;
                    if (short != null)
                    {
                        short = mealFull.strInstructions.substring(0, 150);
                    }
                    detailedMeal.name = mealFull.strMeal;
                    detailedMeal.description = short;
                    detailedMeal.image = mealFull.strMealThumb;
                    detailedMeal.area = mealFull.strArea;
                    detailedMeal.category = mealFull.strCategory;
                    detailedMeal.mainIngredient = mealFull.strIngredient1;
                })
        })
    }) 
    
    }

    useEffect(() => {
        getMeals();
      },[]);

    useEffect(()=>{
    }, [filteredRecipesData])

    useEffect(()=>{
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setFilteredRecipesData(recipesData.slice(firstPageIndex, lastPageIndex));
    }, [recipesData, currentPage])


    useEffect(()=>{
        if(loading === false)
        {
            inputRef.current.focus();
            setRecipesData(IDsData.current);
        }
    }, [loading])

    function onSearch(e)
    {
        if(e !== undefined) e.preventDefault();
        if(searchText === "")
        {
            setRecipesData(IDsData.current); 
        }
        else if (searchRadio === "name" && searchText !== "")
        {

            setRecipesData(IDsData.current.filter(meal=>meal.name.toLowerCase().includes(searchText.toLowerCase()))); 

        }
        else if (searchRadio === "area")
        {
            setRecipesData(IDsData.current.filter(meal=>meal.area.toLowerCase() === searchText.toLowerCase()));
        }
        else if (searchRadio === "ingredient")
        {
            setRecipesData(IDsData.current.filter(meal=>meal.mainIngredient.toLowerCase() === searchText.toLowerCase()));
        }
        
    }

    function keyPress(e){
        if(e.keyCode == 13){
           onSearch();
        }
     }
    
    return (
        <div>
            <Container maxWidth>
            <div id="bcgImage">
            <br/><br/><br/>
            <Container fixed sx={{backgroundColor:'rgba(255, 255, 255, 0.5)'}}>
                <FormControl fullWidth >
                <br/><br/>
                    <TextField id="outlined-basic" inputRef={inputRef} onKeyDown={keyPress} onChange={(e)=>setSearchText(e.target.value)} label="Search" variant="outlined" />
                    <RadioGroup 
                        id="radio-group"
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        defaultValue="name"
                        name="radio-buttons-group"
                        onChange={(e)=>setSearchRadio(e.target.value)}
                    >
                        <FormControlLabel value="name" control={<Radio />} label="Name" />
                        <FormControlLabel value="ingredient" control={<Radio />} label="Main Ingredient" />
                        <FormControlLabel value="area" control={<Radio />} label="Area" />
                    </RadioGroup>
                    <Button variant="contained" id="searchBtn" onClick={onSearch} endIcon={<SearchIcon />}></Button>
                    <br/>
                </FormControl>
            </Container>
                <br/><br/> <br/><br/> <br/>
            </div>
            </Container>
        <Container fixed>
        <div>
            
            <br/><br/>
            <Grid container spacing={7} columns={3} alignItems="center" justifyContent="center" style={{ textAlign: "center" }}>
            {
                
                filteredRecipesData.map((recipe)=>{
                    let width=345;
                    return <RecipeCard id={recipe.id} maxWidth={width} name={recipe.name} image={recipe.image} description={recipe.description} key={recipe.key} onClick={handleClickOpenDialog('paper', recipe.id)}></RecipeCard>

                })
            }
            </Grid>
            <Recipe open={openDialog} scroll={scrollDialog} handleClickOpenDialog={handleClickOpenDialog} recipeID={recipeID} handleClose={handleCloseDialog} descriptionElementRef={descriptionElementRef} ></Recipe>
            <br/><br/><br/>
            <Pagination
                currentPage={currentPage}
                totalCount={Math.ceil(recipesData.length / PageSize)}
                onPageChange={page => setCurrentPage(page)}
            />
            <br/><br/>
        </div>
        </Container>
        </div>
    )

}

export default Recipes;