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

    /*var slice1 = PIXI.Sprite.fromFrame('edge_01');
    slice1.position.x=32;
    slice1.position.y=64;
    this.stage.addChild(slice1);

    var slice2 = PIXI.Sprite.fromFrame("decoration_03");
    slice2.position.x = 128;
    slice2.position.y = 64;
    this.stage.addChild(slice2);*/
  };

  var main = new Main();




}); //end $ready
