import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import NewPalette from './NewPalette'

function Home() {
  return (
    <div>
      <h1>Welcome to Color Life Creator!</h1>
    </div>
  )
}



function Generate() {

  return (
    <div>
      <h1>We can do it for you!</h1>
    </div>
  )
}

function Palette(id) {

}
class App extends React.Component {


  render() {

    return (
      <div className="App">

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
            <li>
              <Link to="/generate">Generate</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/create" >
            <NewPalette />
          </Route>

          <Route path="/generate">
            <Generate />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div >
    );
  }
}

export default App;
