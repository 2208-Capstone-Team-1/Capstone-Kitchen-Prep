import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

// interface for recipe
interface recipeType {
  name: string;
  personal_note: string;
  url: string;
}

// interface for prop
interface Props {
  recipe: recipeType;
  index: number;
}

const RecipeCard: React.FC<Props> = ({ recipe, index }) => {
  //*** slicer function reduces the sentence & puts "..." if the length goes over 85. this is to prevent wrapping error */
  let newSentence = "";

  const slicer = (sentence: string) => {
    let el = sentence.split("");
    if (el.length > 86) {
      newSentence = el.slice(0, 86).join("") + "...";
    } else {
      newSentence = el.join("");
    }
    return newSentence;
  };

  slicer(recipe.personal_note);

  return (
    <React.Fragment>
      <Card
        sx={{
          width: 275,
          minHeight: 275,
          margin: 1,
          backgroundColor: "rgb(243, 212, 165)",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            color="text.secondary"
            gutterBottom
          >
            {index + 1}
          </Typography>
          <a href={recipe.url}>
            <Typography variant="h5">{recipe.name}</Typography>
          </a>
          <br />
          <Typography variant="body2">{newSentence}</Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default RecipeCard;
