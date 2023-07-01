import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

import SignUp from './components/signUp';
import Login from './components/login';
// import Recipes from './components/Recipes';
import AddRecipe from './components/AddRecipe';
import Dashboard from './components/getdashboard';

const App = () => {
  return (
    <Router>
      <Routes>
      {/* <Switch> */}
        <Route exact path="/" component={SignUp} element={<SignUp />} />
        <Route exact path="/login" component={Login} element={<Login />} />
        <Route exact path="/dashboard" component={Dashboard} element={<Dashboard />} />
        {/* <Route exact path="/recipes" component={Recipes} element={<Recipes />} /> */}
        <Route exact path="/addRecipe" component={AddRecipe} element={<AddRecipe />}/>
      {/* </Switch> */}</Routes>
    </Router>
  );
};

export default App;