import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@material-ui/core';
import axios from 'axios';

const AddRecipe = ({ onClose, onCancel }) => {
 const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
 const [note, setNote] = useState('');
const [prepTime, setPrepTime] = useState('');
const [author, setAuthor] = useState('');

const handleAddRecipe = async (e) => {
  e.preventDefault();
    try{
     let response =  await axios.post('https://flavor-fusion-ylnk.onrender.com/addRecipe', { title, ingredients, instructions, note, prepTime, author });
      // Handle successful recipe addition
      if(response.status === 200)
      {
        window.location.reload('/dashboard');
      }
      onClose();
    } catch(error){
      // Handle error
    }
};

return(
    <div>
      <Dialog open={true} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill out the fields to add a new recipe.</DialogContentText>
          <TextField autoFocus margin="dense" id="title" label="Recipe Title" type="text"value={title}
             onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required />
          <TextField margin="dense" id="ingredients" label="Ingredients" type="text" value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            multiline
            minRows={4}
            fullWidth
            required />
          <TextField margin="dense" id="instructions"label="Instructions" type="text" value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            multiline
            minRows={4}
            fullWidth
            required />
          <TextField margin="dense" id="note" label="Note" type="text" value={note} onChange={(e) => setNote(e.target.value)} fullWidth />
          <TextField margin="dense" id="prepTime" label="Preparation Time (in minutes)" type="number"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            fullWidth
            required />
          <TextField margin="dense" id="author" label="Author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
            fullWidth
            required />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary"> Cancel </Button>
          <Button onClick={handleAddRecipe} color="primary"> Add Recipe </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddRecipe;