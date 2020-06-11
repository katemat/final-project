import React from 'react'
import { ChromePicker } from 'react-color'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import DragAndDropColorBox from './DragAndDropColorBox'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Divider from '@material-ui/core/Divider'
import SaveIcon from '@material-ui/icons/Save';

import './NewPalette.css'

class NewPalette extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentColor: "#534EA8",
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
            <h1>Select Your Colors</h1>
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
            <Button
              variant='contained'
              color="secondary"
              onClick={this.clearPalete}>
              Clear Palette
            </Button>

            <div>
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
                    'Color cannot be selected twice']}
                />

                <Button
                  variant='outlined'
                  color='primary'
                  type='submit'
                  style={{ backgroundColor: this.state.currentColor }}>
                  Add Color
          </Button>
              </ValidatorForm>
            </div>

          </aside>
          <main>
            {/* <header> */}
            {/* <ValidatorForm onSubmit={this.handleSave}>
                <TextValidator
                  label="Enter Palette Name"
                  disabled={this.state.colors.length === 0}
                  name="newPaletteName"
                  value={this.state.newPaletteName}
                  onChange={this.handleChange}
                  validators={['required', 'isPaletteNameUnique']}
                  errorMessages={['this field is required', ' This name already exists']}
                />
                <div>
                  <Button
                    variant='contained'
                    color='primary'
                    type="submit"
                    disabled={this.state.colors.length === 0} >
                    Save Palette
                  </Button>
                </div>
              </ValidatorForm> */}
            {/* </header> */}
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
      </div>
    )
  }
}

export default NewPalette