'use strict';

import './gsap.blur.js';

// init scroll magic
const controller = new ScrollMagic.Controller({
  globalSceneOptions: {
      triggerHook: 'onLeave'
  }
});

// create animation for image set
const images1Animation = gsap.timeline();
images1Animation
  .from("#image-1", {x: "100vw", opacity: 0})
  .from("#image-2", {y: "-100vw", opacity: 0})
  .from("#image-3", {y: "-100vh", opacity: 0})
  .from("#image-4", {x: "50vw", y: "20vh", opacity: 0});


// create animation text and image set
const historyAnimation = gsap.timeline();
historyAnimation
  //.from("#triangle-1", {y: -300, opacity: 0})
  .from("#history img", {x: -300, opacity: 0})
  .from("#triangle-1", {rotation: -90, opacity: 0})
  .from("#history h2", {opacity: 0})
  .from("#history p", {opacity: 0, duration: 1.3}, "-=1");

// create animation for image set
const images2Animation = gsap.timeline();
images2Animation
  .from("#image-5", {x: "100vw", opacity: 0})
  .from("#image-6", {y: "-100vw", opacity: 0})
  .from("#image-7", {y: "-100vh", opacity: 0});

// animation for background shape with content
const circle1Animation = gsap.timeline();
circle1Animation.to("#circle-1", {height: "120%", width: "100%", duration: 1.3})
  .to("#content-circle-1 p", {opacity: 1, duration: 2});

// cutout image animation
const tramAnimation = gsap.timeline();
tramAnimation.from("#tram", {x: "-50vw", y: -20, scale: 0.1, blur: 8});

// construct scene data
const sceneData = [
  {element: "#image-set-1", tween: images1Animation},
  {element: "#history", tween: historyAnimation},
  {element: "#image-set-2", tween: images2Animation},
  {element: "#content-circle-1", tween: circle1Animation},
  {element: "#content-2", tween: tramAnimation}
];


// add scenes to scroll magic
sceneData.forEach(function (data) {
  new ScrollMagic.Scene({
    triggerElement: data.element,
    duration: "100%",
  })
  .setTween(data.tween)
  .setPin(data.element)
  .addTo(controller)
});
