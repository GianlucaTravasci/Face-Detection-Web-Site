import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './ProfileIcon.css';

const ProfileIcon = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <div class="pa4 tc">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle tag="span" data-toggle="dropdown" aria-expanded={dropdownOpen}>
                    <img src="http://tachyons.io/img/logo.jpg" className="br-100 h3 w3 dib" alt="avatar" />
                </DropdownToggle>
                <DropdownMenu className="b--transparent shadow-5" style={{backgroundColor: 'rgba(255,255,255,0.7)'}}>
                    <DropdownItem>View Profile</DropdownItem>
                    <DropdownItem>Signout</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default ProfileIcon;