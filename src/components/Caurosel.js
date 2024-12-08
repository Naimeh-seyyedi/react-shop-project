import React from "react";
import ImageGallery from "react-image-gallery";

import images from "assets/images/imagesMain";
import "react-image-gallery/styles/css/image-gallery.css";

export default function Caurosel() {
  
  return (
    <>
      <ImageGallery
        items={images}
        showPlayButton={false}
        showFullscreenButton={false}
        autoPlay={true}
        showThumbnails={false}
        showBullets={true}
      />
    </>
  );
}
