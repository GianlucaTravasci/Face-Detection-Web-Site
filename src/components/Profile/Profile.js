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
                    <div className="measure">
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" for="name">Name</label>
                            <input  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black" type="text" name="name"  id="name" />
                        </div>
                    </div>
                </main>
            </article>
            <button onClick={toggleModal}>Click</button>
        </div>
    )
}

export default Profile;