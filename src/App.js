import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import NewPalette from './NewPalette'
import PaletteList from './PaletteList'
import seedColors from "./seedColors";
import Palette from './Palette'
import { generatePalette } from './colorHelper'


// function Home() {
//   return (
//     <div>
//       <h1>Welcome to Color Life Creator!</h1>
//     </div>
//   )
// }



// function Generate() {

//   return (
//     <div>
//       <h1>We can do it for you!</h1>
//     </div>
//   )
// }

class App extends React.Component {

  state = {
    palettes: seedColors
  }

  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id
    })
  }

  savePalette = (newPalette) => {
    this.setState({
      palettes: [...this.state.palettes, newPalette]
    })
  }
  render() {

    return (
      <div className="App">

        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/palette/new">Create</Link>
            </li>
            <li>
              <Link to="/generate">Generate</Link>
            </li>
          </ul>
        </nav> */}
        <Switch>
          <Route
            exact path="/palette/new"
            render={(routeProps) =>
              <NewPalette savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />}
          />
          {/* <Route exact path="/generate">
            <Generate />
          </Route> */}
          <Route
            exact path='/palette/:id'
            render={(routeProps =>
              <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
            )}
          />
          <Route path="/">
            <PaletteList palettes={this.state.palettes} />
          </Route>
        </Switch>
      </div >
    );
  }
}

export default App;
