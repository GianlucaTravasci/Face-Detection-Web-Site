import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './ProfileIcon.css';

const ProfileIcon = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <div class="pa4 tc">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    Dropdown
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>View Profile</DropdownItem>
                    <DropdownItem>Signout</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <div class="pa4 tc">
                <img
                src="http://tachyons.io/img/logo.jpg"
                class="br-100 h3 w3 dib" alt="avatar"  
                />
            </div>
        </div>
    );
}

export default ProfileIcon;