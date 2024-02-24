import React, { useState } from "react";

export default function Gallery() {
  const images: string[] = [
    "/gallery/img1.jpg",
    "/gallery/img2.jpg",
    "/gallery/img3.jpg",
    "/gallery/img4.jpg",
    "/gallery/img5.jpg",
    "/gallery/img6.jpg",
    "/gallery/img7.jpg",
    "/gallery/img8.jpg",
    "/gallery/img9.jpg",
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };
  const angle: number = 360 / images.length;

  return (
    <div className="gallery-container">
      <div className="box">
        {images.map((imgSrc, index) => (
          <span
            key={index}
            onClick={() => handleImageClick(imgSrc)}
            style={{
              transform: `rotateY(${angle * index}deg) translateZ(400px)`,
              animationDelay: `-${(46 / images.length) * index}s`,
            }}
          >
            <img src={imgSrc} alt={`Image ${index + 1}`} />
          </span>
        ))}
      </div>

      {selectedImage && (
        <div
          className="modal-background"
          onClick={() => setSelectedImage(null)}
        >
          <div className="modal-content">
            <img src={selectedImage} alt="Selected" />
          </div>
        </div>
      )}
    </div>
  );
}
