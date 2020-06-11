import React from 'react'
import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard'


class ColorBox extends React.Component {
  state = {
    copied: false
  }

  handleCopyState = () => {
    this.setState({ copied: true }, () =>
      setTimeout(() => this.setState({ copied: false }), 1500))
  }
  render() {
    const { name, background } = this.props
    // const { copied } = this.state
    return (
      <CopyToClipboard text={background} onCopy={this.handleCopyState}>
        <div style={{ background }} className="ColorBox" >
          <div
            style={{ background }}
            className={`copy-overlay ${this.state.copied && "display"}`} />
          <div className={`copy-msg ${this.state.copied && "display"}`}>
            <h1>copied!</h1>
            <p>{background}</p>
          </div>
          <div className="color-container">
            <div className="color-name">
              <span>{name}</span>
            </div>
            <button className="copy-btn">copy</button>
          </div>
        </div>
      </CopyToClipboard>
    )
  }
}

export default ColorBox
