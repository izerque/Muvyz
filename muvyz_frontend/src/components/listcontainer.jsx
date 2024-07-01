import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const ListContainer = () => {
  const [muvies, setMuvies] = useState([]); // State to store movies
  const [showForm, setShowForm] = useState(false); // State to toggle form display
  const [newMovie, setNewMovie] = useState({ title: '', year: '', rating: '', thumbnail: '' }); // State to store new movie data
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for OMDb search results
  const [selectedMovie, setSelectedMovie] = useState(null); // State for the selected movie data

  // Fetch movies from the backend
  useEffect(() => {
    const fetchMuvies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/muvies');
        const data = response.data;
        setMuvies(data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching muvies:', error);
      }
    };

    fetchMuvies();
  }, []);

  // Handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/muvies', newMovie);
      setShowForm(false);
      setNewMovie({ title: '', year: '', rating: '', thumbnail: '' });
      const response = await axios.get('http://localhost:5000/muvies');
      setMuvies(response.data.slice(0, 10));
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };
  

  // Handle search query change
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {  // Only search if the query length is more than 2 characters
      try {
        const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=1d5e0453`);
        setSearchResults(response.data.Search || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Handle movie selection from the search results
  const handleMovieSelect = async (movie) => {
    setSearchQuery(movie.Title);
    setSearchResults([]);
    setSelectedMovie(movie);

    // Fetch detailed movie data
    try {
      const response = await axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=1d5e0453`);
      const data = response.data;
      setNewMovie({
        title: data.Title,
        year: data.Year,
        rating: data.imdbRating || '',  // OMDb API provides rating in `imdbRating`
        thumbnail: data.Poster,
      });
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  return (
    <div className='w-full p-4'>
      <div className='flex justify-between px-10'>
        <p className='text-gray-400 text-start'>Favourite Movies</p>
        <button
          className="bg-[#3a6ed6] text-white font-bold rounded-full w-[150px] h-[40px] border-none"
          type="button"
          onClick={() => setShowForm(!showForm)} // Toggle form display
        >
          + Add movie
        </button>
      </div>

      {showForm && (
        <div className='mt-4 w-7/12 mx-auto p-4 border rounded bg-gray-900'>
          <p className='text-white font-md'>Add a Movie to the database</p>
          <form onSubmit={handleFormSubmit} className='gap-6'>
            <div className='mb-4'>
              <label className='block text-gray-700'>Movie Title</label>
              <input
                type='text'
                name='title'
                value={searchQuery}
                placeholder='Search for a movie'
                onChange={handleSearchChange}  // Update search query
                className='mt-1 p-2 border rounded w-10/12 px-4 py-2 border-gray-300 text-white bg-gray-900'
                required
              />
              {/* Display search results */}
              {searchResults.length > 0 && (
                <ul className='mt-2 bg-blue-400 border border-gray-600 rounded'>
                  {searchResults.map((result) => (
                    <li
                      key={result.imdbID}
                      onClick={() => handleMovieSelect(result)}
                      className='p-2 hover:bg-gray-700 cursor-pointer'
                    >
                      {result.Title} ({result.Year})
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Movie Year</label>
              <input
                type='number'
                name='year'
                value={newMovie.year}
                placeholder='Enter year of release "2021"'
                onChange={handleInputChange}
                className='mt-1 p-2 border rounded w-10/12 px-4 py-2 border-gray-300 text-white bg-gray-900'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Rating</label>
              <input
                type='number'
                step='0.1'
                name='rating'
                value={newMovie.rating}
                placeholder='Enter rating'
                onChange={handleInputChange}
                className='mt-1 p-2 border rounded w-10/12 px-4 py-2 border-gray-300 text-white bg-gray-900'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Thumbnail Link</label>
              <input
                type='text'
                name='thumbnail'
                value={newMovie.thumbnail}
                placeholder='Enter movie poster link'
                onChange={handleInputChange}
                className='mt-1 p-2 border rounded w-10/12 px-4 py-2 border-gray-300 text-white bg-gray-900'
                required
              />
            </div>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='text-white py-2 px-4 bg-[#3a6ed6] font-bold rounded-full w-[150px] h-[40px] border-none'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="list-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
        {muvies.map((muvy) => (
          <MovieCard key={muvy.id} movie={muvy} />
        ))}
      </div>
    </div>
  );
};

export default ListContainer;
