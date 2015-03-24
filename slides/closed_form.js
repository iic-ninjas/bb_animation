window.allSlides = window.allSlides || {};

(function() {

  function ClosedForm() {
  }

  ClosedForm.prototype.init = function(container) {
    this.container = container;
    this.el = container.querySelector(".box");
    this.val = container.querySelector(".box_val");
    this.visible = false;
    this.animator = new Animator(this.animate.bind(this));
    this.animator.setDuration(2000);
    this.animator.setVal(1);
  };

  ClosedForm.prototype.show = function() {
    this.visible = true;
    this.toggle();
  };

  ClosedForm.prototype.hide = function() {
    this.visible = false;
    this.animator.stop();
  };

  ClosedForm.prototype.animate = function(t) {
    this.el.style.opacity = t;
    this.val.textContent = "t = " + t.toFixed(3);
  };

  ClosedForm.prototype.toggle = function() {
    var promise = null;
    if (this.animator.playDirection == 1) {
      promise = this.animator.playBackwards();
    } else {
      promise = this.animator.playForward();
    }
    var self = this;
    promise.then(function() {
      if (self.visible) {
        self.toggle();
      }
    });
  };


  var closedForm = new ClosedForm();

  window.allSlides["slide_closed_form"] = closedForm;

})();
