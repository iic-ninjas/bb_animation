window.allSlides = window.allSlides || {};

(function() {

  function Sync() {
  }

  Sync.prototype.init = function(container) {
    this.container = container;
    this.box = container.querySelector(".box_container");
    this.content = container.querySelector(".content");
    this.items = container.querySelectorAll("li");
    this.buttons = container.querySelectorAll(".button");
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
    t = Animator.partitionAnimation(t, 0.1, 0.9);
    this.box.style.height = Animator.lerp(t, 50, 360);
    for (var i = 0; i < this.items.length; ++i) {
      this.items[i].style.opacity = Animator.partitionAnimation(t, (i+0.5)*0.1, (i+1.5)*0.1);
    }

    for (var i = 0; i < this.buttons.length; ++i) {
      this.buttons[i].style.opacity = Animator.partitionAnimation(t, 0.9, 1.0);
    }
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

  window.allSlides["slide_sync3"] = sync;

})();
