// variable declare 
var NUM_OF_POINTS = 9;
var NUM_OF_COL = 3;
var pointList = [];
var STAGE_NAME = "popUpStage"
var IMG_SIZE = 130;
var stage;
var is_click_able = true;
var STAGE_WIDTH = 500;
var STAGE_HEIGHT = 300;
var button_img_data={
    images: ["buttonImg.jpg"],
    frames:[
        [45, 30, IMG_SIZE, IMG_SIZE],
        [205, 30, IMG_SIZE, IMG_SIZE],
        [365, 30, IMG_SIZE, IMG_SIZE]
    ],
    animations:{
        opened: [0, false],
        selected: [1, false],
        unopened: [2, false]
    }
};

var spriteSheet = new createjs.SpriteSheet(button_img_data);

// class declare

function point() {
    this.x_coordinate = 0;
    this.y_coordinate = 0;
    this.is_open = false;
    this.is_clear = false;
    // this.sprite_sheet = new createjs.Sprite(spriteSheet, "unopened");
    // this.button_helper = new createjs.ButtonHelper(target=this.sprite_sheet);
    this.sprite_sheet;
    this.button_helper;
    // this.sprite_sheet.addEventListener("click", buttonClick);
};

function line() {
    this.color = "#CCEEFF";
    this.is_clear = false;
};

function buttonClick() {
    if (is_click_able) {
        is_click_able = false;
        popup();
    };
};

function popup() {
    alert("yayayayay");
    is_click_able = true;
};

function display_map(_stage, _pointList) {
    // STAGE_WIDTH = document.getElementById(STAGE_NAME).width;
    // STAGE_HEIGHT = document.getElementById(STAGE_NAME).height;
    
    var width_itor = Math.floor(STAGE_WIDTH * 0.3);
    var width_margin = Math.floor(STAGE_WIDTH * 0.05);
    var height_itor = Math.floor(STAGE_HEIGHT * 0.3);
    var height_margin = Math.floor(STAGE_HEIGHT * 0.05);
    
    for (var i = 0; i < NUM_OF_POINTS; i++) {
        var box_size = STAGE_WIDTH * 0.1;
        var set_child = _stage.getChildAt(i);
        var x_translated = (_pointList[i].x_coordinate * width_itor ) + width_margin;
        var y_translated = (_pointList[i].y_coordinate * height_itor ) + height_margin;
        set_child.x = x_translated;
        set_child.y = y_translated;
        // set_child.button_helper.target = set_child.sprite_sheet;
    }
};

function handleTick(event) {
    display_map(stage, pointList);
    stage.update(event);
};

function init() {
    stage = new createjs.Stage(STAGE_NAME);
    stage.enableMouseOver(50);

    STAGE_WIDTH = document.getElementById(STAGE_NAME).width;
    STAGE_HEIGHT = document.getElementById(STAGE_NAME).height;
   
    for (var i = 0; i < NUM_OF_POINTS; i++) {
        var childPoint = new point();
        childPoint.x_coordinate = i % NUM_OF_COL;
        childPoint.y_coordinate = Math.floor(i / NUM_OF_COL);
        pointList.push(childPoint);
        pointList[i].sprite_sheet = new createjs.Sprite(spriteSheet, "unopened");
        // alert("1");
        var box_size = STAGE_WIDTH * 0.1;
        pointList[i].sprite_sheet.scaleX = box_size / IMG_SIZE;
        pointList[i].sprite_sheet.scaleY = box_size / IMG_SIZE;
        // alert("2");
        // pointList[i].button_helper = new createjs.ButtonHelper(pointList[i].sprite_sheet);
        pointList[i].sprite_sheet.addEventListener("click", buttonClick);
        stage.addChild(pointList[i].sprite_sheet);
    };
    
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(50);
};