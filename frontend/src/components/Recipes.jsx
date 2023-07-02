import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Recipes.css';
import { IconButton, Snackbar } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Recipes = ({ collection }) => {
  const [recipes, setRecipes] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://flavor-fusion-ylnk.onrender.com/displayRecipe',{ withCredentials: true });
        setRecipes(response.data);
      } catch (error) {
        console.log('Failed to fetch recipes');
      }
    };

    fetchRecipes();
  }, []);

  const addToCollection = async (recipeId) => {
    try {
      // Send a request to add the recipe to the user's collection
      await axios.post('https://flavor-fusion-ylnk.onrender.com/api/collection', { recipeId },{ withCredentials: true });
      console.log(`Recipe with ID ${recipeId} added to collection`);
      setShowMessage(true); // Show the success message
    } catch (error) {
      console.log(`Failed to add recipe with ID ${recipeId} to collection`);
    }
  };

  // Filter the recipes based on the recipe IDs in the collection
  const filteredRecipes = collection
    ? recipes.filter((recipe) => collection.includes(recipe._id))
    : recipes;

  return (
    <div>
      <div className="recipe-cards">
        {filteredRecipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <p className="title">{recipe.title}</p>
            <div className="recipe-info">
              <label className="info-label">Ingredients:</label>
              <p>{recipe.ingredients}</p>
            </div>
            <div className="recipe-info">
              <label className="info-label">Instructions:</label>
              <p>{recipe.instructions}</p>
            </div>
            <div className="recipe-info">
              <label className="info-label">Prep Time (in min.): <span className="prep-time">{recipe.prepTime}</span></label>
            </div>
            <p className="author-name">~ {recipe.author}</p>
            <IconButton
              className="add-to-collection-button"
              onClick={() => addToCollection(recipe._id)}
              title="Add to collection"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
        ))}
      </div>
      <Snackbar
        open={showMessage}
        autoHideDuration={3000}
        onClose={() => setShowMessage(false)}
        message="Recipe added to collection"
      />
    </div>
  );
};

export default Recipes;
