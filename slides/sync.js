window.allSlides = window.allSlides || {};

(function() {

  function Sync() {
  }

  Sync.prototype.init = function(container) {
    this.container = container;
    this.box = container.querySelector(".box_container");
    this.content = container.querySelector(".content");
    this.visible = false;
    this.animator = new Animator(this.animate.bind(this));
    this.animator.setDuration(2000);
    this.animator.setVal(1);
  };

  Sync.prototype.show = function() {
    this.visible = true;
    this.toggle();
  };

  Sync.prototype.hide = function() {
    this.visible = false;
    this.animator.stop();
  };

  Sync.prototype.animate = function(t) {
    this.box.style.height = Animator.lerp(t, 50, 360);
    this.content.style.opacity = Animator.partitionAnimation(t, 0.7, 1);
  };

  Sync.prototype.toggle = function() {
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


  var sync = new Sync();
  var sync2 = new Sync();

  window.allSlides["slide_sync"] = sync;
  window.allSlides["slide_sync2"] = sync2;

})();



