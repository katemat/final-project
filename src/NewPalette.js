import React from 'react'
import { ChromePicker } from 'react-color'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './NewPalette.css'
import DragAndDropList from './DragAndDropList'
import arrayMove from 'array-move'

class NewPalette extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      open: true,
      currentColor: "#94554C",
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

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  render() {
    return (
      <div className="NewPalette-container">
        <aside>
          <div>
            <Button
              variant='contained'
              color="secondary"
              onClick={this.clearPalete}
            >
              Clear Palette
        </Button>
            <Button variant='contained' color="primary">
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
        </aside>
        <main>
          <header>
            <ValidatorForm onSubmit={this.handleSave}>
              <TextValidator
                label="Enter Palette Name"
                name="newPaletteName"
                value={this.state.newPaletteName}
                onChange={this.handleChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['this field is required', 'the Palette with this name already exists']}
              />
              <div>
                <Button
                  variant='contained'
                  color='primary'
                  type="submit">
                  Save Palette
                  </Button>
              </div>
            </ValidatorForm>
          </header>
          <DragAndDropList
            colors={this.state.colors}
            handleDeleteColor={this.handleDeleteColor}
            axis='xy'
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    )
  }
}

export default NewPalette