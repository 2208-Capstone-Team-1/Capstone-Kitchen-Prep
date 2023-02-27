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
      "https://api.spoonacular.com/recipes/random?apiKey=9a0bda7b9e944e938fa0a538fd4a5a77"
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
    // <div className="recipe_body">
    //   <div className="recipe_container">
    //     <div className="recipe_box">
    //       <h1 className="recipe_h1">Today's recommendation</h1>
    //       <h2 className="recipe_h2">{randomRecipe.title}</h2>
    //       <img className="recipe_img" src={imageURL} />
    //       <h2 className="recipe_h2">Ingredients</h2>
    //       <div className="recipe_ingredients">
    //         {randomRecipe.extendedIngredients.map(
    //           (foodItem: ingredientObj, index: number) => {
    //             return (
    //               <div>
    //                 <p className="recipe_ptag" key={index}>
    //                   {index + 1}: {foodItem.original}
    //                 </p>
    //               </div>
    //             );
    //           }
    //         )}
    //       </div>
    //       <h2 className="recipe_h2">Recipe</h2>
    //       <div className="recipe_instruction">
    //         {randomRecipe.analyzedInstructions[0].steps.map(
    //           (step: instructionObj, index: number) => {
    //             return (
    //               <p className="recipe_ptag" key={index}>
    //                 {step.number}: {step.step}
    //               </p>
    //             );
    //           }
    //         )}
    //       </div>
    //       <div className="recipe_diet">
    //         {randomRecipe.diets.map((diet: string, index: number) => {
    //           return (
    //             <p className="recipe_ptag" key={index}>
    //               {" "}
    //               # {diet}
    //             </p>
    //           );
    //         })}
    //       </div>
    //       <div className="recipe_url">
    //         Source:{" "}
    //         <a className="recipe_atag" href={randomRecipe.sourceUrl}>
    //           {randomRecipe.sourceUrl}
    //         </a>
    //       </div>
    //       {/* <p className="recipe_ptag">{parsedObj.body.textContent}</p> */}
    //     </div>
    //   </div>
    // </div>
  );
};

export default RecipePage;
