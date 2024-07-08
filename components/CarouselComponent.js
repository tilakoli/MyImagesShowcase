/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useRef} from "react";

const CarouselComponent = () => {
  const carouselRef = useRef(null);
  const listRef = useRef(null);
  const thumbnailRef = useRef(null);
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);

  const timeRunning = 500;
  const timeAutoNext = 70000000;
  let runTimeOut;
  let runNextAuto;

  useEffect(() => {
    const nextButton = nextButtonRef.current;
    const prevButton = prevButtonRef.current;

    const showSlider = (type) => {
      const list = listRef.current;
      const thumbnails = thumbnailRef.current.children;

      if (type === "next") {
        list.appendChild(list.children[0]);
        thumbnailRef.current.appendChild(thumbnails[0]);
        carouselRef.current.classList.add("next");
      } else {
        list.prepend(list.children[list.children.length - 1]);
        thumbnailRef.current.prepend(thumbnails[thumbnails.length - 1]);
        carouselRef.current.classList.add("prev");
      }

      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        carouselRef.current.classList.remove("next");
        carouselRef.current.classList.remove("prev");
      }, timeRunning);

      clearTimeout(runNextAuto);
      runNextAuto = setTimeout(() => {
        nextButton.click();
      }, timeAutoNext);
    };

    nextButton.onclick = () => showSlider("next");
    prevButton.onclick = () => showSlider("prev");

    runNextAuto = setTimeout(() => {
      nextButton.click();
    }, timeAutoNext);

    return () => {
      nextButton.onclick = null;
      prevButton.onclick = null;
      clearTimeout(runTimeOut);
      clearTimeout(runNextAuto);
    };
  }, []);

  return (
    <div className="carousel" ref={carouselRef}>
      <div className="list" ref={listRef}>
        <div className="item">
          <img src="assets/02.jpg" alt="02" />
        </div>
        <div className="item">
          <img src="assets/10.jpg" alt="10" />
        </div>
        <div className="item">
          <img src="assets/12.jpg" alt="12" />
        </div>
        <div className="item">
          <img src="assets/dogsmiling.jpg" alt="dogsmiling" />
        </div>
      </div>

      <div className="thumbnail" ref={thumbnailRef}>
        <div className="item">
          <img src="assets/02.jpg" alt="02 thumbnail" />
          <div className="content">
            <div className="title">Name Slider</div>
          </div>
        </div>
        <div className="item">
          <img src="assets/10.jpg" alt="10 thumbnail" />
          <div className="content">
            <div className="title">Name Slider</div>
          </div>
        </div>
        <div className="item">
          <img src="assets/12.jpg" alt="12 thumbnail" />
          <div className="content">
            <div className="title">Name Slider</div>
          </div>
        </div>
        <div className="item">
          <img src="assets/dogsmiling.jpg" alt="dogsmiling thumbnail" />
          <div className="content">
            <div className="title">Name Slider</div>
          </div>
        </div>
      </div>
      <div className="arrows">
        <button id="prev" ref={prevButtonRef}>
          &lt;
        </button>
        <button id="next" ref={nextButtonRef}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CarouselComponent;
