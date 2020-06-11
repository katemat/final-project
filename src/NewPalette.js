import React from 'react'
import { ChromePicker } from 'react-color'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import DragAndDropColorBox from './DragAndDropColorBox'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Divider from '@material-ui/core/Divider'
import SaveIcon from '@material-ui/icons/Save'
import chroma from "chroma-js"
import './NewPalette.css'

class NewPalette extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentColor: "rgb(238,238,116)",
      colors: [],
      newColorName: "",
      newPaletteName: ""
    }
  }

  updateCurrentColor = (newColor) => {
    this.setState({
      currentColor: newColor.hex
    })
  }

  addNewColor = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    }
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: ""
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // validation colorPicker
  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", value =>
      this.state.colors.every(({ color }) => color !== this.state.currentColor)
    );
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
    );
  }
  clearPalete = () => {
    this.setState({
      colors: []
    })
  }

  randomColor = () => {
    let randomColor = chroma.random()._rgb.slice(0, 3)
    const newColor = {
      color: `rgb(${randomColor})`,
      name: `rgb(${randomColor})`
    }
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: ""
    })
  }

  handleSave = () => {
    let newName = this.state.newPaletteName
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors
    }
    this.props.savePalette(newPalette)
    this.props.history.push('/')
  }

  handleDeleteColor = (colorName) => {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    })
  }

  render() {
    return (
      <div>
        <div className="newPalette-navbar">
          <div className="goBack">
            <Link to='/'>
              ⏎ Back</Link>
          </div>
          <div className="navbar-title">
            <h1> Create Your Own Color Palette</h1>
          </div>

          <div className="save-palette">
            <ValidatorForm onSubmit={this.handleSave}>
              <TextValidator
                label="Enter Palette Name"
                disabled={this.state.colors.length === 0}
                name="newPaletteName"
                value={this.state.newPaletteName}
                onChange={this.handleChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['this field is required', ' This name already exists']} />
              <Button
                variant='contained'
                color='primary'
                type="submit"
                disabled={this.state.colors.length === 0}
                size="large"
                startIcon={<SaveIcon />} >
                Save Palette
                  </Button>
            </ValidatorForm>
          </div>
        </div>
        <Divider />
        <div className="NewPalette-container">
          <aside>
            <div className="clear-btn">
              <Button
                variant='contained'
                color="secondary"
                disabled={this.state.colors.length === 0}
                onClick={this.clearPalete}>
                Clear Palette
            </Button>
            </div>
            <div className="random-btn">
              <Button
                variant='contained'
                color="primary"
                onClick={this.randomColor}>
                Random Color
            </Button>
            </div>

            <ChromePicker
              color={this.state.currentColor}
              onChangeComplete={this.updateCurrentColor} />
            <ValidatorForm onSubmit={this.addNewColor}>
              <TextValidator
                value={this.state.newColorName}
                name="newColorName"
                onChange={this.handleChange}
                validators={['required', 'isColorNameUnique', "isColorUnique"]}
                errorMessages={['this field is required',
                  'Color Name must be unique',
                  'Color should be unique']}
              />
              <button
                className="add-btn"
                type='submit'
                style={{ backgroundColor: this.state.currentColor, color: chroma(this.state.currentColor).luminance() <= 0.8 ? "white" : "black" }}>
                Add Color
              </button>
            </ValidatorForm>

          </aside>
          <main>
            <ul>{this.state.colors.map(color => (
              <DragAndDropColorBox
                key={color.name}
                color={color.color}
                name={color.name}
                handleDelete={() => this.handleDeleteColor(color.name)} />
            ))}
            </ul>
          </main>
        </div>
      </div >
    )
  }
}

export default NewPalette