import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import MovieCard from './Moviecard';

const ListContainer = () => {
  const [muvies, setMuvies] = useState([]);

  useEffect(() => {
    const fetchMuvies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/muvies'); // Use axios.get to make the GET request
        const data = response.data;
        setMuvies(data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching muvies:', error);
      }
    };

    fetchMuvies();
  }, []);

  return (
    <div className='w-full p-4'>
        <p className='text-gray-400 text-start'>Favourite Movies</p>
    <div className="list-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
      {muvies.map((muvy) => (
        <MovieCard key={muvy.id} movie={muvy} />
      ))}
    </div>
    </div>
  );
};

export default ListContainer;
