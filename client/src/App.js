//App.js: el componente principal de la aplicación.
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom"; //
import LandingPage from "./components/LandingPage"; //
import Home from "./components/Home";
import CharacterCreate from "./components/CharacterCreate";
import Detail from "./components/Detail"; //

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/characters" component={Home} />
          <Route path="/character" component={CharacterCreate} />
          <Route path="/details/:id" component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
