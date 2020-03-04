'use strict';

//this is just an example plugin that allows us to animate a "blur" property like gsap.to(target, {blur:10}) and it'll feed that value to this plugin which will do all the necessary calculations to add/update a blur() value in the CSS "filter" property (in browsers that support it). We wrap it in an iife just so that we can declare some local variables in a private scope at the top. 
const blurProperty = gsap.utils.checkPrefix("filter");
const blurExp = /blur\((.+)?px\)/;
const getBlurMatch = target => (gsap.getProperty(target, blurProperty) || "").match(blurExp) || [];

gsap.registerPlugin({
  name: "blur",
  get(target) {
      return +(getBlurMatch(target)[1]) || 0;
  },
  init(target, endValue) {
      let data = this,
            filter = gsap.getProperty(target, blurProperty),
            endBlur = "blur(" + endValue + "px)",
            match = getBlurMatch(target)[0];
      if (filter === "none") {
          filter = "";
      }
      if (match) {
          endValue = filter.substr(0, match.index) + endBlur + filter.substr(match.index + endBlur.length);
      } else {
          endValue = filter + endBlur;
          filter += filter ? " blur(0px)" : "blur(0px)";
      }
      data.target = target; 
      data.interp = gsap.utils.interpolate(filter, endValue); 
  },
  render(progress, data) {
      data.target.style[blurProperty] = data.interp(progress);
  }
});
