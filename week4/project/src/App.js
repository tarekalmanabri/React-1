import "./App.css";
import GetCity from "./components/GetCity";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CityPage from "./components/CityPage";

function App() {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="app">
        <div className="app-inner">
          <Switch>
            <Route path="/:cityId" children={<CityPage />} />
            <Route path="/">
              <div className="home">
                <h1 className="title">Weather</h1>
                <GetCity />
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
