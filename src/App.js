import React, { Component, Suspense } from 'react';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import './App.css';
const Navigation = React.lazy(() => import('./components/Navigation/Navigation'));
const Logo = React.lazy(() => import('./components/Logo/Logo'));
const Rank = React.lazy(() => import('./components/Rank/Rank'));
const ImageLinkForm = React.lazy(() => import('./components/ImageLinkForm/ImageLinkForm'));
const FaceRecognition = React.lazy(() => import('./components/FaceRecognition/FaceRecognition'));
const Register = React.lazy(() => import('./components/Register/Register'));

const Modal = React.lazy(() => import('./components/Modal/Modal'))
const Profile = React.lazy(() => import('./components/Profile/Profile'))



const particlesOptions = {
	"particles": {
	  "number": {
	    "value": 150
	  },
	  "size": {
	    "value": 4  
	  }
  }
}
const initialState = {
  input: '', 
  imgUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState;
  }

  componentDidMount= () => {
    const token = window.localStorage.getItem('token');
    if(token) {
      fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }).then(resp => resp.json())
      .then(data => {
        if(data && data.id) {
          fetch(`http://localhost:3000/profile/${data.id}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
          })
              .then(response => response.json())
              .then(data => {
                  this.loadUser(data);
              })
          this.onRouteChange('home');
        }
      })
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    if (data && data.outputs) {
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return data.outputs[0].data.regions.map(face => {
        const clarifaiFace = face.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        }
      })
    } 
    return;
  }

  displayFaceBox = (boxes) => {
    if(boxes) {
      this.setState({boxes});
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.input})
    fetch('http://localhost:3000/imageUrl', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token')
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.localStorage.getItem('token')
            },
            body: JSON.stringify({
                id: this.state.user.id
            })
          }) 
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      return this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  }

  render() {
    const { isSignedIn, route, boxes, imgUrl, isProfileOpen} = this.state;
    return(
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Suspense fallback={<div>Loading...</div>}>
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal}/>
        </Suspense>
        {isProfileOpen && <Suspense fallback={<div>Loading...</div>}><Modal><Profile user={this.state.user} isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} loadUser={this.loadUser}></Profile></Modal></Suspense>}
        { route === 'home' 
          ? <div>
              <Suspense fallback={<div>Loading...</div>}>
                <section>
                  <Logo />
                  <Rank name={this.state.user.name} entries={this.state.user.entries}/>   
                  <ImageLinkForm 
                    onInputChange={this.onInputChange} 
                    onButtonSubmit={this.onButtonSubmit}
                  />
                  <FaceRecognition boxes={boxes} imgUrl={imgUrl}/>
                </section>
              </Suspense>
            </div>
          : (
            route === 'signin' 
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
              : <Suspense fallback={<div>Loading...</div>}><Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /></Suspense>
          ) 
        }
      </div> 
    )
  }
}
export default App;
