import React, { Component } from 'react'
import './Profile.css'

class Profile extends Component{
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.user.name
        }
    }

    onInputChange = (event) => {
        this.setState({name: event.target.value})
    }

    updateProfile = (name) => {
        fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                 name
            })
        }).then(resp => {
            this.props.toggleModal();
            this.props.loadUser({...this.props.user, name});
        }).catch(console.log)
    }

    render() {
        const {user} = this.props;
        const {name} = this.state;
        return (
            <div className="profile-modal">
                <article className="br3 ba mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{backgroundColor: 'rgba(255,255,255,0.3)'}}>
                    <main className="pa4 black-80">
                        <img src="http://tachyons.io/img/logo.jpg" className="br-100 h3 w3 dib" alt="avatar" />
                        <h1>{this.state.name}</h1>
                        <h4>Images submited: {user.entries}</h4>
                        <h6>Member since: {new Date(user.joined).toLocaleDateString()}</h6>
                        <hr />
                        <label className="mt2 fw6" htmlFor="user-name">Name</label>
                        <input  
                            onChange={this.onInputChange}
                            className="pa2 ba w-100"
                            placeholder={user.name}
                            type="text" 
                            name="user-name"  
                            id="name"
                        />
                        <div className="mt4" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                            <button onClick={() => this.updateProfile(name)} className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20">Save</button>
                            <button onClick={this.props.toggleModal} className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20">Cancel</button>
                        </div>
                    </main>
                    <div className="modal-close pointer" onClick={this.props.toggleModal}>&times;</div>
                </article>
            </div>
        )
    }
    
}

export default Profile;