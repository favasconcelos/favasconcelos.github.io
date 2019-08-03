import React from 'react';
// local
import './photos.scss';
// images
import IMG_1 from '../../_assets/photos/01.jpg';
import IMG_2 from '../../_assets/photos/02.jpg';
import IMG_3 from '../../_assets/photos/03.jpg';

const PHOTOS = [IMG_1, IMG_2, IMG_3];

const Photos: React.FC = () => {
  return (
    <div id="photos">
      {PHOTOS.map((photo, i) => {
        const key = `photo-${i}`;
        return <img key={key} src={photo} alt="Photos" />;
      })}
    </div>
  );
};

export default Photos;
