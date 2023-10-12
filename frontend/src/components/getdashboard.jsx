import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Recipes from './Recipes';
import ResponsiveAppBar from './manageDashboard/AppBar';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();
  const userId = location.state.userId; 
  const [name, setName] = useState('');
  const [collection, setCollection] = useState([]);
  const [showCollection, setShowCollection] = useState(false);

  useEffect(() => {
      const fetchData = async () => {
      try {
        console.log(userId);
        const response = await axios.get('https://flavor-fusion-ylnk.onrender.com/api/dashboard/', {
          withCredentials: true,
          params: { userId }
        });
        if (response.data.collection && response.data.name) 
        {
          setName(response.data.name);
          setCollection(response.data.collection);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userId]);

  const handleShowCollection = () => {
    setShowCollection(true);
  };

  const handleHideCollection = () => {
    setShowCollection(false);
  };

  return (
    <div>
      <ResponsiveAppBar name={name}  userId ={userId} onShowCollection={handleShowCollection} />

      {showCollection ? (
        <div>
          <h1>My Collection</h1>
          {collection.length > 0 ? (
            <Recipes collection={collection} />
          ) : (
            <p>No recipes in your collection.</p>
          )}
          <button onClick={handleHideCollection} className="btn btn-primary">Close</button>
        </div>
      ) : (
        <>
        <h1>All recipes</h1>
        <Recipes userId ={userId}/>
        </>
      )}
    </div>
  );
};

export default HomePage;
