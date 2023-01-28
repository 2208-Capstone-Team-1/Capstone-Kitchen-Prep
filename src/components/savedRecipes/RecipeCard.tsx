import React from "react";
import "./savedRecipe.css"

// interface for recipe
interface recipeType {
  name: string;
  personal_note: string;
  url: string;
}

// interface for prop
interface Props{
  recipe: recipeType;
  index: number;
}

const RecipeCard: React.FC<Props> = ({recipe, index}) => {


  
//*** slicer function reduces the sentence & puts "..." if the length goes over 85. this is to prevent wrapping error */
let newSentence = "";

const slicer = (sentence : string) => {
	let el = sentence.split('');
	if (el.length > 86) {
		newSentence = el.slice(0, 86).join('') + "..."
	} else {
		newSentence = el.join('');
	}
	return newSentence;
} 

slicer(recipe.personal_note);

  return <div className="recipeCard_body">
    <div className="circle"></div>
      <div className="recipeCard_container">
        <div className="recipeCard_number">{index +1}</div>
          <div className="recipeCard_innerbox">
              <div className="recipeCard_name"><p className="recipeCard_ptagOne">{recipe.name}</p></div>
              <div className="recipeCard_note"><p className="recipeCard_ptagTwo">"{newSentence}"</p></div>
              <div className="recipeCard_url">
                <a className="recipeCard_atag" href={recipe.url}>Click for full recipe</a>
              </div>
          </div>
      </div>
    </div>;
};

export default RecipeCard;
