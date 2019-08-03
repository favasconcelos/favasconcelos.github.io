import React from 'react';
// local
import './profile.scss';
// image
import imgProfile from '../../_assets/photos/profile.jpg';

const Profile: React.FC = () => <img id="profile" src={imgProfile} alt="Felipe Vasconcelos" />;

export default Profile;
