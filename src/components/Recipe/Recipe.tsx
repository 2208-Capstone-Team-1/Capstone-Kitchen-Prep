import React, { useEffect, useState } from "react";
import axios from "axios";
import "./recipe.css"

const RecipePage = () => {
//this page will show a random recipe of the day using API

const [randomRecipe, setRandomRecipe] = useState<recipeObj>({} as recipeObj);
const [loading, setloading] = useState(false);

const recipeHandler = async () => {
    const {data} = await axios.get("https://api.spoonacular.com/recipes/random?apiKey=9a0bda7b9e944e938fa0a538fd4a5a77")
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
// const descriptionUrl = `${randomRecipe.summary}`;
// const description = descriptionUrl.slice(0, descriptionUrl.length -2);

// if loading is true and proper data was fetched & set, display the page
    return (
        <div>
            <h1>Today's recommendation</h1>
            <h2>{randomRecipe.title}</h2>
            <img className="recipe_img" src={imageURL} />
            <div className="recipe_diet">
            {randomRecipe.diets.map((diet : string, index : number)=> {
                return(
                <p className="recipe_ptag" key = {index}>{diet}</p>
                )
            })}
            </div>
            <div className="recipe_url">{randomRecipe.sourceUrl}</div>
            {randomRecipe.summary}     
        </div>
    )
}

export default RecipePage;