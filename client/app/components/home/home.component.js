import template from "./home.html";
import controller from "./home.controller";
import "./home.styl";

let homeComponent = {
  restrict: "",
  bindings: {
    redirecting: "<"
  },
  template,
  controller
};

export default homeComponent;
