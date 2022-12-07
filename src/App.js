import '../src/App.css';
import Dashboard from './Pages/Dashboard';
import Title from './Components/Title';
import MoviePicture from './Pictures/movie-theater.png';

function App() {
  return (
    <div className="App">      
      <Title/>
     <Dashboard/>
      {/* <img src={MoviePicture}></img> */}
    </div>
  );
}

export default App;
