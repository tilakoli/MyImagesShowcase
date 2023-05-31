import React, { useEffect } from "react";
import { imagesData } from "@/utils/imageData";

const ImageGallery = () => {
  const [showImageModal, setShowImageModal] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState();

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleKeyPress();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    // 👇️ clean up event listener
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const handleKeyPress = () => {
    showImageModal === true && setShowImageModal(false);
  };

  if (typeof window !== "undefined") {
    const track = document.getElementById("image-track");

    const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

    const handleOnUp = () => {
      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = track.dataset.percentage;
    };

    const handleOnMove = (e) => {
      if (track.dataset.mouseDownAt === "0") return;

      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained =
          parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(
          Math.min(nextPercentageUnconstrained, 0),
          -100
        );

      track.dataset.percentage = nextPercentage;

      track.animate(
        {
          transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1200, fill: "forwards" }
      );

      for (const image of track.getElementsByClassName("image")) {
        image.animate(
          {
            objectPosition: `${100 + nextPercentage}% center`,
          },
          { duration: 1200, fill: "forwards" }
        );
      }
    };

    /* -- Had to add extra lines for touch events -- */

    window.onmousedown = (e) => handleOnDown(e);

    window.ontouchstart = (e) => handleOnDown(e.touches[0]);

    window.onmouseup = (e) => handleOnUp(e);

    window.ontouchend = (e) => handleOnUp(e.touches[0]);

    window.onmousemove = (e) => handleOnMove(e);

    window.ontouchmove = (e) => handleOnMove(e.touches[0]);
  }

  const handleImageClick = (e) => {
    setShowImageModal(true);
    setSelectedImage(e?.target?.src);
  };

  return (
    <>
      <h3
        style={{
          color: "white",
          position: "absolute",
          top: "5%",
          left: "45%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Double click to view!
      </h3>
      {/* <div className="headContainer">
        <div className="box">{"  ->"}</div>
      </div> */}

      <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
        {imagesData.map((image, index) => {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              loading="lazy"
              onDoubleClick={handleImageClick}
              className="image"
              key={index}
              src={image.src}
              draggable="false"
              alt={image?.alt}
            />
          );
        })}
      </div>
      {showImageModal && (
        <div
          className="mainImageContainer"
          onClick={() => setShowImageModal(false)}
        >
          {/*  eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedImage}
            alt={"showcase image"}
            className="mainImage"
          />
        </div>
      )}
    </>
  );
};

export default ImageGallery;
