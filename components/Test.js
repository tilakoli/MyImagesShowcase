import React from "react";

const Test = () => {
  if (typeof window !== "undefined") {
    const track = document.getElementById("image-track");

    const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

    const handleClick = (e) => {
      console.log("something handle");
    };
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
  return (
    <>
      <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
        <img className="image" src="/assets/03.jpg" draggable="false" />
        <img className="image" src="/assets/image3.jpg" draggable="false" />

        <img className="image" src="/assets/12.jpg" draggable="false" />

        <img className="image" src="/assets/10.jpg" draggable="false" />

        <img className="image" src="/assets/02.jpg" draggable="false" />

        <img className="image" src="/assets/13.jpg" draggable="false" />

        <img className="image" src="/assets/01.jpg" draggable="false" />

        <img className="image" src="/assets/04.jpg" draggable="false" />

        <img className="image" src="/assets/09.jpg" draggable="false" />
        <img className="image" src="/assets/image5.jpg" draggable="false" />
      </div>
    </>
  );
};

export default Test;
