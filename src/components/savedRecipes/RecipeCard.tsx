import React from "react";
import "./savedRecipe.css"

interface recipeType {
  name: string;
  personal_note: string;
  url: string;
}


interface Props{
  recipe: recipeType;
  index: number;
}
const RecipeCard: React.FC<Props> = ({recipe, index}) => {
  return <div className="recipeCard_body">
    <div className="circle"></div>
      <div className="recipeCard_container">
        <div className="recipeCard_number">{index +1}</div>
        <div className="recipeCard_name"><p className="recipeCard_ptagOne">{recipe.name}</p></div>
        <div className="recipeCard_note"><p className="recipeCard_ptagTwo">{recipe.personal_note}</p></div>
        <div className="recipeCard_url">
          <a className="recipeCard_atag" href={recipe.url}>Click for Recipe</a>
        </div>
      </div>
    </div>;
};

export default RecipeCard;
