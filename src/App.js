import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css';
import Clarifai, { COLOR_MODEL } from 'clarifai';
 

const app = new Clarifai.App({apiKey: '19393ff85acd45508c5f54370215afca'});
const particlesOptions = {
  particles: {
    line_linked: {
      numeber: {
        value: 30,
        density:{
          enable: true,
          value_area: 800
        }
      }
    }
  }
 }

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '', 
      imgUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.input})
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input
      ).then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      },
      function(err) {
        // there was an error
      }
    );
  }

  render() {
    return(
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imgUrl={this.state.imgUrl}/>
      </div>
    )
  }
}
export default App;
