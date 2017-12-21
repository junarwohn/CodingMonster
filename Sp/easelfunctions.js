var stage, animation;
var data={
    images: ["Char.png"],
    frames: {width:28, height:32, count:10, regX:3, regY:6, spacing:2},
    animations: {
        stand:0,
        hurray:[2,6],
        find:1,
        stand:3,
    }
};
function init(move) {
    stage = new createjs.Stage("demoCanvas");
    stage.addChild(animation);
    createjs.Ticker.setFPS(10);
}
function move(move_x, move_y) {
    animation.x = animation.x + move_x;
    animation.y = animation.y + move_y;
    if (animation.y > stage.canvas.height) { animation.y = 0; }
    if (animation.y < 0) { animation.y = stage.canvas.height - 1;}
    if (animation.x > stage.canvas.width) { animation.x = 0; }
    if (animation.x < 0) { animation.x = stage.canvas.width - 1;}
    stage.update(event); // important!!
}

window.addEventListener('keydown', check,false);
function sibal(){
    alert("sibal");
}
function check(e) {
    var code = e.keyCode;
    switch (code) {
        case 37: move(-10, 0); break;//Left key
        case 38: move(0, -10); break;//Up key
        case 39: move(10, 0); break;//Right key
        case 40: move(0, 10); break; //Down key
    }
}
var spriteSheet = new createjs.SpriteSheet(data);
var animation = new createjs.Sprite(spriteSheet, "stand");