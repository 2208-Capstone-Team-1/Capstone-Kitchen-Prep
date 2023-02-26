import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import MuiLoader from "../MuiLoader";
import "../Recipe/recipe.css";
import { setIngredients } from "../../store/ingredientSlice";
import { setAddRecipe } from "../../store/recipeSlice";
import "./recipesFromIngredients.css";
import { Box, Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";

const RecipesFromIngredients = () => {
  const dispatch = useDispatch();
  const [recievedRecipesInfo, setRecievedRecipesInfo] = useState({} as any);
  const [loading, setloading] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);

  /**
   * This function will combine all the ingredients names in a single string and pass it to the API endpoint
   */

  /** fetch ingredients by user */
  const fetchIngredients = async () => {
    try {
      const userData = await axios.get(`/api/users/${user.id}`);
      dispatch(setIngredients(userData.data.ingredients));
      // user -> ingredients
      if (userData) {
        const ingredientsLocal = userData.data.ingredients;
        const nameStrings = allIngredientsNames(ingredientsLocal);

        const { data } = await axios.get(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${nameStrings}&number=1&apiKey=bd758414abcc4276ab40dd407756e3d9`
        );
        if (data[0]?.id) {
          // this is waiting on the new state, not the current state
          const recipeId = data[0].id;
          const recipeInfo = await axios.get(
            `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=bd758414abcc4276ab40dd407756e3d9`
          );
          setRecievedRecipesInfo(recipeInfo.data as any);
          setloading(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  // function to format the ingredient names based on the API requirements.
  function allIngredientsNames(ingredientArray: any) {
    let ingredientNamesForRecipes: string[] = [];
    if (user.id && ingredientArray.length >= 0) {
      for (let i = 0; i < ingredientArray.length; i++) {
        ingredientNamesForRecipes.push(ingredientArray[i].name);
      }
      return ingredientNamesForRecipes.join(",+");
    }
  }

  //validation schema using yup.
  const formValidation = Yup.object().shape({
    personal_note: Yup.string().required("Your note about the recipe!!"),
  });

  const myForm = useFormik({
    initialValues: {
      personal_note: "",
    },
    validationSchema: formValidation,
    onSubmit: async (values) => {
      try {
        //send the data to the backend
        const bodyToSubmit = {
          name: recievedRecipesInfo.title,
          url: recievedRecipesInfo.spoonacularSourceUrl,
          personal_note: values.personal_note,
          calories: 0,
        };

        const createRecipe2 = await axios.post(
          `/api/users/${user.id}/recipes`,
          bodyToSubmit
        );
        dispatch(setAddRecipe(createRecipe2.data));
        values.personal_note = "";
      } catch (err) {
        console.error(err);
      }
    },
  });

  // load
  useEffect(() => {
    if (user.id) {
      fetchIngredients();
    }
  }, [user]);

  const imageURL = recievedRecipesInfo && `${recievedRecipesInfo.image}`;

  // removing the html tags from summary.
  const regex = /(<([^>]+)>)/gi;
  const summary =
    recievedRecipesInfo.summary &&
    recievedRecipesInfo.summary.replace(regex, "");

  return (
    // if loading is false, display an error message
    !loading ? (
      <div className="loadingContainer">
        <MuiLoader />
      </div>
    ) : (
      <>
        {
          <div className="card-container">
            <div className="card u-clearfix">
              <div className="card-body">
                <div className="card-media">
                  <div>
                    {" "}
                    <img src={imageURL} width="350px;" alt="" />
                  </div>{" "}
                  <div className="vegan-image">
                    {recievedRecipesInfo.vegan ? (
                      <img src="../static/vegan.png" width="60px" alt="" />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="gluten-image">
                    {recievedRecipesInfo.glutenFree ? (
                      <img
                        src="../static/gluten-free.png"
                        width="60px"
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <h2 className="card-title">{recievedRecipesInfo.title}</h2>
                <span className="card-description subtle">{summary}</span>
                <div className="card-read">
                  <a
                    className="sourceUrl"
                    href={recievedRecipesInfo.spoonacularSourceUrl}
                    target="_blank"
                  >
                    Read Full Recipe
                  </a>
                </div>
                <div>
                  {user.id && (
                    <>
                      <Box className="form-content" margin={3}>
                        <div className="saveRecipeSection">
                          {" "}
                          <div className="textField">
                            <TextField
                              color="secondary"
                              focused
                              className="recipeForm"
                              name="personal_note"
                              label="Your Note About The Recipe"
                              variant="outlined"
                              value={myForm.values.personal_note || ""}
                              onChange={myForm.handleChange}
                              onBlur={myForm.handleBlur}
                              error={
                                myForm.touched.personal_note &&
                                Boolean(myForm.errors.personal_note)
                              }
                              helperText={
                                myForm.touched.personal_note &&
                                myForm.errors.personal_note
                              }
                            />
                          </div>
                          <div>
                            <Button
                              id="addRecipe"
                              sx={{ m: 5 }}
                              onClick={myForm.submitForm}
                              variant="contained"
                            >
                              Save the recipe
                            </Button>
                          </div>
                        </div>
                      </Box>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="card-shadow"></div>
          </div>
        }
      </>
    )
  );
};

export default RecipesFromIngredients;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
