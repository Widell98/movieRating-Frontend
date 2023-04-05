import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'


const Dashboard = () => {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [newMovie, setNewMovie] = useState({
    
     title: '',
     comment: '',
     rating: '',
   });

   const handleInputChange = (event) => {
  const { name, value } = event.target;
  setNewMovie({ ...newMovie, [name]: value });
};

useEffect(() => {
  function handleOutsideClick(event) {
    if (selectedMovie && !event.target.closest(".Edit-Movie")) {
      setSelectedMovie(null);
    }
  }

  document.addEventListener("mousedown", handleOutsideClick);

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
  };
}, [selectedMovie]);

  useEffect(() => {
    axios.get('https://localhost:7157/Movies')
      .then((response) => {
        let movies = response.data;
        setMovies(movies);
        console.log(movies);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleEdit = (movie) => {
    setSelectedMovie(movie);
  };

  const handleUpdate = (id) => {
    axios
      .put(`https://localhost:7157/Movie/Edit?id=${id}`, selectedMovie)
      .then((response) => {
        const updatedMovies = movies.map(movie => {
          if (movie.id === id) {
            return response.data;
          }
          return movie;
        });
        setMovies(updatedMovies);
        setSelectedMovie(null);
        window.location.reload(); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`https://localhost:7157/Movie/Delete?id=${id}`)
        .then((response) => {
            let updatedMovies = movies.filter(movie => movie.id !== id);
            setMovies(updatedMovies);
        })
        .catch((error) => {
            console.log(error);
        });
};
       const addMovie = () => {
       axios
         .post('https://localhost:7157/Movie/post', newMovie)
         .then((response) => {
           const updatedMovies = [...movies, response.data];
           setMovies(updatedMovies);
           setNewMovie({ title: '', comment: '', rating: '' });
         })
         .catch((error) => {
           console.log(error);
         });
     };

  return (
    <Fragment>
      <div class="form-container">   
      <h1 className="form-title"> Movies </h1>    
          <form>
            <div className="addmovie">
              <label htmlFor="rating">Rating:</label>
              <input
                type="text"
                name="rating"
                id="rating"
                value={newMovie.rating}
                onChange={handleInputChange}
              />
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                value={newMovie.title}
                onChange={handleInputChange}
              />
              <label htmlFor="comment">Comment:</label>
              <input
                type="text"
                name="comment"
                id="comment"
                value={newMovie.comment}
                onChange={handleInputChange}
              />
            </div>
            <div>
            </div>
            <div>
            </div>
            <button type="button" onClick={addMovie}>
              Add Movie
            </button>
          </form>
          </div>
      <hr className="line"></hr>
      
      <section class="sub-section-alternative">
      <div class="Movie-Container">
        {movies.map((movie) => (
          <div id={movie.id} key={movie.id} class="Mapped-Movies">
            <h1>{movie.title}</h1>
            <p className="subtext">{movie.comment}</p>
            <p className="subtext">{movie.rating}</p>
            <button onClick={() => handleEdit(movie)}>Edit</button>
            <button onClick={() => handleDelete(movie.id)}>Delete</button>
          </div>
        ))}
      </div>
      </section>
      {selectedMovie && (
        <div className="Edit-Movie">
          <h2>Edit Movie</h2>
          <input type="text" value={selectedMovie.title} onChange={(e) => setSelectedMovie({ ...selectedMovie, title: e.target.value })} />
          <input type="text" value={selectedMovie.comment} onChange={(e) => setSelectedMovie({ ...selectedMovie, comment: e.target.value })} />
          <input type="number" value={selectedMovie.rating} onChange={(e) => setSelectedMovie({ ...selectedMovie, rating: parseInt(e.target.value) })} />
          <button onClick={() => handleUpdate(selectedMovie.id)}>Update</button>

        </div>
      )}
    </Fragment>
  );
};

export default Dashboard;

