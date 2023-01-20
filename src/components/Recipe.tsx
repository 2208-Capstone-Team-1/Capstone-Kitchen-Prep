import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RecipePage = () => {
//this page will show a random recipe of the day using API

// https://api.spoonacular.com/recipes/random?apiKey=d7fef678f3ed43d18f58a17532ec590a

const [randomRecipe, setRandomRecipe] = useState<recipeObj>({} as recipeObj);
const [loading, setloading] = useState(false);

const recipeHandler = async () => {
    const {data} = await axios.get("https://api.spoonacular.com/recipes/random?apiKey=d7fef678f3ed43d18f58a17532ec590a")
    console.log(data.recipes[0]);
    const recipe = data.recipes[0];
    setRandomRecipe(recipe as recipeObj );
    setloading(true);
}

interface recipeObj {
[key: string]: any;
}

useEffect(()=>{
    recipeHandler();
}, [])

// if loading is false, display an error message
if(!loading){
    return (<div>Oops! Something went wrong!</div>)
}
const imageURL = `${randomRecipe.image}`;
const descriptionUrl = `${randomRecipe.summary}`;
const description = descriptionUrl.slice(0, descriptionUrl.length -2);

// if loading is true and proper data was fetched & set, display the page
    return (
        <div>
            <h1>Today's recommendation</h1>
            <h2>{randomRecipe.title}</h2>
            <img src={imageURL} />
            <p>{randomRecipe.creditsText}</p>
            <p>{description}</p>
            <div>{randomRecipe.instructions}</div>
            
        </div>
    )
}

export default RecipePage;