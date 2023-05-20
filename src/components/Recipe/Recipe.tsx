import { useEffect, useState } from "react";
import axios from "axios";
import "./recipe.css";
import MuiLoader from "../MuiLoader";

const RecipePage = () => {
  //this page will show a random recipe of the day using API

  const [randomRecipe, setRandomRecipe] = useState<recipeObj>({} as recipeObj);
  const [loading, setloading] = useState(false);

  const recipeHandler = async () => {
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}`
    );
    const recipe = data.recipes[0];
    setRandomRecipe(recipe as recipeObj);
    setloading(true);
  };

  // WILD CARD!
  interface recipeObj {
    [key: string]: any;
  }

  // interface for instruction
  interface instructionObj {
    number: number;
    step: string;
    ingredients: [];
    equipment: [];
  }

  // interface for ingredients
  interface ingredientObj {
    id: number;
    original: string;
  }

  useEffect(() => {
    recipeHandler();
  }, []);

  // if loading is false, display an error message
  if (!loading) {
    return (
      <div className="loadingContainer">
        <MuiLoader />
      </div>
    );
  }
  const imageURL = `${randomRecipe.image}`;
  //since summary key of randonRecipe contangs html tag, we are using parser
  let summaryObj = { summary: `${randomRecipe.summary}` };
  let parser = new DOMParser();
  let parsedObj = parser.parseFromString(summaryObj.summary, "text/html");

  // removing the html tags from summary.
  const regex = /(<([^>]+)>)/gi;
  const summary =
    randomRecipe.summary && randomRecipe.summary.replace(regex, "");

  // if loading is true and proper data was fetched & set, display the page
  return (
    <>
      <div className="card-container">
        <div className="card u-clearfix">
          <div className="card-body">
            <div className="card-media">
              <div>
                {" "}
                <img src={imageURL} width="350px;" alt="" />
              </div>{" "}
              <div className="vegan-image">
                {randomRecipe.vegan ? (
                  <img src="../static/vegan.png" width="60px" alt="" />
                ) : (
                  ""
                )}
              </div>
              <div className="gluten-image">
                {randomRecipe.glutenFree ? (
                  <img src="../static/gluten-free.png" width="60px" alt="" />
                ) : (
                  ""
                )}
              </div>
            </div>
            <h2 className="card-title">{randomRecipe.title}</h2>
            <span className="card-description subtle">{summary}</span>
            <div className="card-read">
              <a
                className="sourceUrl"
                href={randomRecipe.spoonacularSourceUrl}
                target="_blank"
              >
                Read Full Recipe
              </a>
            </div>
          </div>
        </div>
        <div className="card-shadow"></div>
      </div>
    </>

  );
};

export default RecipePage;
