'use strict';

$(function() {

  function Main() {

    this.stage = new PIXI.Stage(0x66FF99);
    this.stage.interactive = true;

    this.renderer = PIXI.autoDetectRenderer(512,384, document.getElementById('game-canvas'));

    this.loadSpriteSheet();
  }

  Main.SCROLL_SPEED = 1;

  Main.prototype.update = function() {
    this.scroller.moveViewportXBy(Main.SCROLL_SPEED);
    this.renderer.render(this.stage);
    requestAnimFrame(this.update.bind(this));
  };

  Main.prototype.loadSpriteSheet = function() {
    var assetsToLoad = [
        'json/wall.json',
        'i/bg-far.png',
        'i/bg-mid.png'
      ];
    var loader = new PIXI.AssetLoader(assetsToLoad);
    loader.onComplete = this.spriteSheetLoaded.bind(this);
    loader.load();
  };

  Main.prototype.spriteSheetLoaded = function() {
    this.scroller = new Scroller(this.stage);
    requestAnimFrame(this.update.bind(this));
    document.getElementById('pixi').appendChild(this.renderer.view);

    this.pool = new WallSpritesPool();
    this.wallSlices = [];

  };

  Main.prototype.borrowWallSprites = function(num) {
    for (var i = 0; i < num; i++) {

      if (i % 2 === 0) {
        var sprite = this.pool.borrowWindow();
      } else {
        var sprite = this.pool.borrowDecoration();
      }

      sprite.position.x = -32 + (i * 64);
      sprite.position.y = 128;

      this.wallSlices.push(sprite);

      this.stage.addChild(sprite);
    }
  };

  Main.prototype.returnWallSprites = function() {
    for (var i = 0; i < this.wallSlices.length; i++) {
      var sprite = this.wallSlices[i];
      this.stage.removeChild(sprite);

      if (i % 2 == 0) {
        this.pool.returnWindow(sprite);
      } else {
        this.pool.returnDecoration(sprite);
      }
    }

    this.wallSlices = [];
  };

  window.main = new Main();




}); //end $ready
