import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function DetailCaurosel({product}) {
  
  return (
    <>
      <ImageGallery
        items={product.images}
        showPlayButton={false}
        showFullscreenButton={false}
        autoPlay={true}
        showThumbnails={false}
        showBullets={true}
      />
    </>
  );
}
