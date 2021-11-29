import "./App.module.css";
import { Route, Switch } from "react-router-dom";
import Main from "./Components/Main/Main";
import LandingPage from "./Components/LandingPage/LandingPage";
import DogDetail from "./Components/DogDetail/DogDetail";
import AddDog from "./Components/AddDog/AddDog";
function App() {
  return (
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/dogs' component={Main} />
      <Route path='/dogs/dogdetail/:name' component={DogDetail} />
      <Route path='/addDog' component={AddDog} />
    </Switch>
  );
}

export default App;
