import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Recipes from './Recipes';
import ResponsiveAppBar from './manageDashboard/AppBar';

const HomePage = () => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [collection, setCollection] = useState([]);
  const [showCollection, setShowCollection] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://flavor-fusion-ylnk.onrender.com/api/dashboard/',{ withCredentials: true });

        if (response.data.userId && response.data.name) {
          setUserId(response.data.userId);
          setName(response.data.name);
          setCollection(response.data.collection);
        } else {
          // window.location.href = '/';
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleShowCollection = () => {
    setShowCollection(true);
  };

  const handleHideCollection = () => {
    setShowCollection(false);
  };

  return (
    <div>
      <ResponsiveAppBar name={name} onShowCollection={handleShowCollection} />

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
        <Recipes />
        </>
      )}
    </div>
  );
};

export default HomePage;
