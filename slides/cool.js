window.allSlides = window.allSlides || {};

(function() {

  function Cool() {
  }

  Cool.prototype.init = function(container) {
    this.container = container;
    this.mokojinContainer = container.querySelector(".mokojin_container");
    this.pagesContainer = container.querySelector(".pages_container");
    this.pages = [];
    this.visible = false;
    for (var i = 0; i < 5; ++i) {
      var moko = new Mokojin();
      this.mokojinContainer.appendChild(moko.getContainer());
    }

    var colors = [
      "red",
      "yellow",
      "lightblue",
      "green",
      "black"
    ];

    for (var i = 0; i < 5; ++i) {
      var page = new Page(
          0, i*55,
          50, 50,
          75, 0,
          400, 600,
          this.onOpen.bind(this),
          colors[i]
      );
      this.pages.push(page);
      this.pagesContainer.appendChild(page.getContainer());
    }
  };

  Cool.prototype.onOpen = function(page) {
    if (this.currentPage && this.currentPage != page) {
      this.currentPage.close();
    }
    this.currentPage = page;
  };

  Cool.prototype.show = function() {
    this.visible = true;
  };

  Cool.prototype.hide = function() {
    this.visible = false;
  };

  Cool.prototype.click = function() {
    this.toggle();
  };

  Cool.prototype.animate = function(t) {
  };

  Cool.prototype.toggle = function() {
    var promise = null;
    if (this.animator.playDirection == 1) {
      promise = this.animator.playBackwards();
    } else {
      promise = this.animator.playForward();
    }
    var self = this;
    //promise.then(function() {
      //if (self.visible) {
        //self.toggle();
      //}
    //});
  };


  var cool = new Cool();

  window.allSlides["slide_cool"] = cool;

})();



