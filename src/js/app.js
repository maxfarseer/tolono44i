'use strict';

$(function() {

  // create an new instance of a pixi stage
  var stage = new PIXI.Stage(0x66FF99);
  // make it interactive
  stage.interactive = true;

  // create a renderer instance
  var renderer = PIXI.autoDetectRenderer(400, 300);

  // add the renderer view element to the DOM
  document.body.appendChild(renderer.view);

  requestAnimFrame( animate );

  var texture = PIXI.Texture.fromImage("i/tolon150.png");

  createBunny(190,101);

  function animate() {
    requestAnimFrame( animate );
    renderer.render(stage);

    count+=0.15;
    countingText.setText("Толон подумал, \nчто ты СМТ: ".toUpperCase() + (count | 0) + " раз");

    if (count > 10) {
      countingText.setText("Толон загнобил тебя! \n Действуй быстрее! \n Задобри, Толона!");
    }
  }

  function createBunny(x, y) {
    // create our little bunny friend..
    var bunny = new PIXI.Sprite(texture);

    // enable the bunny to be interactive.. this will allow it to respond to mouse and touch events
    bunny.interactive = true;
    // this button mode will mean the hand cursor appears when you rollover the bunny with your mouse
    bunny.buttonMode = true;

    // center the bunnys anchor point
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // use the mousedown and touchstart
    bunny.mousedown = bunny.touchstart = function(data)
    {
        // stop the default event...
        //data.preventDefault();

        // store a reference to the data
        // The reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = data;
        this.alpha = 0.8;
        this.dragging = true;
    };

    // set the events for when the mouse is released or a touch is released
    bunny.mouseup = bunny.mouseupoutside = bunny.touchend = bunny.touchendoutside = function(data)
    {
        this.alpha = 1
        this.dragging = false;
        // set the interaction data to null
        this.data = null;

    };

    // set the callbacks for when the mouse or a touch moves
    bunny.mousemove = bunny.touchmove = function(data)
    {
        if(this.dragging)
        {
            var newPosition = this.data.getLocalPosition(this.parent);
            this.position.x = newPosition.x;
            this.position.y = newPosition.y;
        }
    }

    // move the sprite to its designated position
    bunny.position.x = x;
    bunny.position.y = y;

    // add it to the stage
    stage.addChild(bunny);
  }

  // create a text object that will be updated..
  var countingText = new PIXI.Text("loading", {font: 'bold 20px Arial', fill: 'black', align: 'center'});
  countingText.position.x = $('canvas').width() / 2;
  countingText.position.y = $('canvas').height();
  countingText.anchor.x = 0.5;
  countingText.anchor.y = 1;
  var count = 0;

  stage.addChild(countingText);


}); //end $ready
