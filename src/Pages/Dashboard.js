import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

const Dashboard = () => {
    // function LogMovies() {

    //     axios.get('https://localhost:7157/Movies').then(response => {
    //         console.log(response.data);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7157/Movies')
            .then((response) => {
                let movies = response.data;
                setMovies(movies);
                console.log(movies);
            });
    }, []);






    return (
        <Fragment>
            <hr className="line"></hr>
            <div className="Movie-Container">
                {
                    movies.map((movie) => (
                        <div className="Mapped-Movies">
                        <h1> {movie.title}</h1>
                          <p> {movie.comment}</p>
                          <p> {movie.rating}</p>

                        </div>
                    ))
                }
            </div>
    </Fragment>
    );
}

export default Dashboard;
