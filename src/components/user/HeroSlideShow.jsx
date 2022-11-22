import React, { useEffect, useState, useRef, forwardRef } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getLatestUploads } from "../../api/movie";
import { useNotification } from "../../hooks";

let count = 0;
let intervalId;
let newTime = 0;
let lastTime = 0;
export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState({});
  const [clonedSlide, setClonedSlide] = useState({});
  const [slides, setSlides] = useState([]);
  const [upNext, setUpNext] = useState([]);
  const [visible, setVisible] = useState(true);
  const slideRef = useRef();
  const clonedSlideRef = useRef();

  const { updateNotification } = useNotification();

  const fetchLatestUploads = async () => {
    const { error, movies } = await getLatestUploads();
    if (error) return updateNotification("error", error);
    setSlides([...movies]);
    setCurrentSlide(movies[0]);
  };
  const startSlideShow = () => {
    intervalId = setInterval(() => {
      newTime = new Date();
      let delta = newTime - lastTime;
      if (delta < 4000) return clearInterval(intervalId);
      handleOnNextClick();
    }, 5000);
  };

  const pauseSlideShow = () => {
    clearInterval(intervalId);
  };
  const handleOnNextClick = () => {
    lastTime = new Date();
    pauseSlideShow();
    setClonedSlide(slides[count]);
    clonedSlideRef.current.classList.add("slide-out-to-left");
    count = (count + 1) % slides.length;
    setCurrentSlide(slides[count]);
    slideRef.current.classList.add("slide-in-from-right");
    // console.log(currentSlide);
    updateUpNext(count);
  };

  const updateUpNext = (currentIndex) => {
    if (!slides.length) return;
    const upNextCount = currentIndex + 1;
    const end = upNextCount + 3;
    let newSlides = [...slides];
    newSlides = newSlides.slice(upNextCount, end);
    if (!newSlides.length) {
      newSlides = [...slides].slice(0, 3);
    }
    setUpNext([...newSlides]);
  };

  const handleOnPrevClick = () => {
    pauseSlideShow();
    setClonedSlide(slides[count]);
    count = (count + slides.length - 1) % slides.length;
    setCurrentSlide(slides[count]);
    clonedSlideRef.current.classList.add("slide-out-to-right");
    slideRef.current.classList.add("slide-in-from-left");
    updateUpNext(count);
  };

  const handleAnimationEnd = () => {
    const classes = [
      "slide-out-to-left",
      "slide-in-from-right",
      "slide-out-to-right",
      "slide-in-from-left",
    ];
    // clonedSlideRef.current.classList.remove("-z-10");
    slideRef.current.classList.remove(...classes);
    clonedSlideRef.current.classList.remove(...classes);
    setClonedSlide({});
    startSlideShow();
  };

  const handleVisibilityChange = () => {
    const visibility = document.visibilityState;
    if (visibility === "visible") setVisible(true);
    if (visibility === "hidden") setVisible(false);
  };
  useEffect(() => {
    fetchLatestUploads();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      pauseSlideShow();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  useEffect(() => {
    if (slides.length && visible) {
      startSlideShow();
      updateUpNext(count);
    } else {
      pauseSlideShow();
    }
  }, [slides.length, visible]);

  return (
    <div className="w-full flex pt-2">
      {/* Slide show section */}
      <div className="md:w-4/5 w-full aspect-video relative overflow-hidden">
        {/* <div className="w-full cursor-pointer">
          <img
            ref={slideRef}
            //   onAnimationEnd={handleAnimationEnd}
            className="aspect-video object-cover relative z-10"
            src={currentSlide.poster}
            alt=""
          />
          <div className="absolute z-20 inset-0 flex flex-col justify-end py-3 bg-gradient-to-t from-white dark:from-primary">
            <h1 className="font-semibold  text-4xl text-highlight dark:text-highlight-dark">
              {currentSlide.title}
            </h1>
          </div>
        </div> */}
        {/* cloned slide */}
        <Slide
          title={currentSlide.title}
          id={currentSlide.id}
          src={currentSlide.poster}
          ref={slideRef}
          className="relative z-10"
        />
        <Slide
          title={clonedSlide.title}
          ref={clonedSlideRef}
          onAnimationEnd={handleAnimationEnd}
          className="absolute inset-0"
          src={clonedSlide.poster}
        />
        {/* <img
          ref={clonedSlideRef}
          onAnimationEnd={handleAnimationEnd}
          className="aspect-video object-cover absolute inset-0"
          src={clonedSlide.poster}
          alt=""
        /> */}

        <SlideShowController
          onNextClick={handleOnNextClick}
          onPrevClick={handleOnPrevClick}
        />
      </div>
      {/* Up Next Section */}
      <div className="w-1/5 md:block hidden px-3 space-y-3">
        <h1 className="text-2xl font-semibold dark:text-white text-primary">
          Up Next
        </h1>
        {upNext.map(({ poster, id }) => {
          return (
            <img
              src={poster}
              key={id}
              className="aspect-video object-cover rounded"
            />
          );
        })}
      </div>
    </div>
  );
}

const SlideShowController = ({ onNextClick, onPrevClick }) => {
  const btnClass =
    "bg-primary rounded border-2 text-white text-xl p-2 outline-none ";
  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between px-2 z-20">
      <button onClick={onPrevClick} className={btnClass} type="button">
        <AiOutlineDoubleLeft />
      </button>
      <button onClick={onNextClick} className={btnClass} type="button">
        <AiOutlineDoubleRight />
      </button>
    </div>
  );
};

const Slide = forwardRef((props, ref) => {
  const { title, id, src, className = "", ...rest } = props;
  return (
    <Link
      to={`/movie/${id}`}
      ref={ref}
      className={"w-full cursor-pointer block " + className}
      {...rest}
    >
      {src ? <img className="aspect-video object-cover" src={src} /> : null}
      {title ? (
        <div className="absolute inset-0 flex flex-col justify-end py-3 bg-gradient-to-t from-white via-transparent dark:from-primary dark:via-transparent">
          <h1 className="font-semibold  text-4xl text-highlight dark:text-highlight-dark">
            {title}
          </h1>
        </div>
      ) : null}
    </Link>
  );
});
