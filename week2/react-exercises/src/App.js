import "./App.css";
import Friend from "./ex-1/Friends";
import DogGallery from "./ex-2/dogGallery";
import RandomJoke from "./ex-3/jokeGenerator";

function App() {
  return (
    <div className="App">
      <div>
        <Friend />
      </div>
      <hr />
      <div>
        <DogGallery />
      </div>
      <hr />
      <div>
        <RandomJoke />
      </div>
    </div>
  );
}

export default App;
