import React from 'react'
import { ChromePicker } from 'react-color'
import Button from '@material-ui/core/Button'
import DragAndDropColorBox from './DragAndDropColorBox'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './NewPalette.css'

class NewPalette extends React.Component {

  state = {
    open: true,
    currentColor: "skyblue",
    colors: [],
    newName: ""
  }

  updateCurrentColor = (newColor) => {
    this.setState({
      currentColor: newColor.hex
    })
  }

  addNewColor = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newName
    }
    this.setState({
      colors: [...this.state.colors, newColor],
      newName: ""
    })
  }

  handleChange = (e) => {
    this.setState({
      newName: e.target.value
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
  }
  clearPalete = () => {
    this.setState({
      colors: []
    })
  }

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
          <ChromePicker color={this.state.currentColor} onChangeComplete={this.updateCurrentColor} />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator
              value={this.state.newName}
              onChange={this.handleChange}
              validators={['required', 'isColorNameUnique', "isColorUnique"]}
              errorMessages={['this field is required', 'Color Name must be unique', 'Color cannot be selected twice']} />
            <Button
              variant='outlined'
              color='primary'
              type='submit'
              // onClick={this.addNewColor}
              style={{ backgroundColor: this.state.currentColor }}>
              Add Color
          </Button>
          </ValidatorForm>
        </aside>
        <main>
          <ul>{this.state.colors.map(color => (
            <DragAndDropColorBox color={color.color} name={color.name} />
          ))}
          </ul>
        </main>
      </div>
    )
  }
}

export default NewPalette