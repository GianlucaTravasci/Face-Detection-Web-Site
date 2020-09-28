import React from 'react'
import './Profile.css'

const Profile = ({isProfileOpen, toggleModal}) => {
    return (
        <div className="profile-modal">
            <article className="br3 ba mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{backgroundColor: 'rgba(255,255,255,0.3)'}}>
                <main className="pa4 black-80">
                    <img src="http://tachyons.io/img/logo.jpg" className="br-100 h3 w3 dib" alt="avatar" />
                    <h1>John Doe</h1>
                    <h4>Images submited: 5</h4>
                    <p>Member since: Jenuary</p>
                    <hr />
                    <label className="mt2 fw6" htmlFor="user-name">Name</label>
                    <input  
                        className="pa2 ba w-100"
                        placeholder="John" 
                        type="text" 
                        name="user-name"  
                        id="name"
                    />
                    <div className="mt4" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <button className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20">Save</button>
                    </div>
                    <div onClick={toggleModal} className="mt4" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <button className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20">Cancel</button>
                    </div>
                </main>
                <div className="modal-close pointer" onClick={toggleModal}>&times;</div>
            </article>
        </div>
    )
}

export default Profile;