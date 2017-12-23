var stage, hero, backGround, npc_cnt;
npc_cnt = 0;
var is_inputting = false;
var b_g_data={
    images: ["backGround.png"],
    frames:{width:64, height:64},
    animations: {
        grass_1 : 0,
        grass_2 : 1,
        grass_3 : 2,
        grass_4 : 5,
        grass_5 : 6,
        soil_1 : 10,
        soil_2 : 11,
    }
};
var spriteSheet = new createjs.SpriteSheet(b_g_data);
var bebe = new createjs.Sprite(spriteSheet, "grass_1");
var codingQuestion = [
    "Hello World!를 출력하는 함수 void hello()를 완성하시오",
    "두 수 a, b를 인자로 받고 그 둘의 합을 반환하는 함수 int sumab(int a, int b)를 완성하시오",
]
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // alert(" Great success! All the File APIs are supported.");
  } else {
    alert('The File APIs are not fully supported in this browser.');
}
function npc(x, y) {
    this.x = x;
    this.y = y;
    this.npc_id = npc_cnt++;
}
var is_hero_interact_able = false;
var is_text_box_interact = false;
var npc_list = [new npc(20,40), new npc(80, 100), new npc(40, 160)];
var meet_npc_id = -1;

// npc_cnt = 3;

function init(move, event) {
    stage = new createjs.Stage("demoCanvas");
    hero = new createjs.Bitmap("Char.png");
    var textBox = new createjs.Text("Hello World", "20px Arial", "#ff7700");
    hero.scaleX = 20/185;
    hero.scaleY = 20/183;
    for (var bg_x = 0; bg_x < 25; bg_x++) {
        for (var bg_y = 0; bg_y < 15; bg_y++) {
            var is_npc_pos = false;
            npc_list.forEach(element => {
                if (element.x === bg_x*20 && element.y === bg_y*20) {
                    is_npc_pos = true;
                }
            });
            if (is_npc_pos) {
                console.log("yayayaya");
                continue;
            } else {
                var bg_tile;
                if (bg_x < 15) {
                    bg_tile = new createjs.Sprite(spriteSheet, "soil_1");
                } else {
                    bg_tile = new createjs.Sprite(spriteSheet, "grass_1");
                }
                bg_tile.scaleX = 20/64;
                bg_tile.scaleY = 20/64;
                stage.addChild(bg_tile);
                bg_tile.x = bg_x*20;
                bg_tile.y = bg_y*20;
            }
        }
    }
    stage.addChild(hero);
    stage.addChild(textBox);
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(50);
    
}
function handleTick(event) {
    // Actions carried out each tick (aka frame)
    // var npc = {x : 10, y : 20};
    stage.update(event); // important!!
    // var check_interact = false;
    // if (is_hero_interact_able) {
    //     npc_list.forEach(npc_ => {
    //         if(!is_npc_reached(hero, npc_)) {
    //             console.log("Not Meet!");
    //             check_interact = false;
    //             // break;
    //         }
    //     }
    // } else {

    // }
    // npc_list.forEach(npc_ => {
    //     if(is_npc_reached(hero, npc_)) {
    //         if (!is_hero_interact_able) {
    //             console.log("Meet!");
    //             check_interact = true;
    //             // break;
    //         }
    //     }
    //     // } else {
    //     //     is_hero_interact_able = false;
    //     // }
    // });// console.log(hero.x);
    // if (check_interact) {
    //     is_hero_interact_able = true;   
    // } else {
    //     is_hero_interact_able = false;  
    // }
    // if(is_npc_reached(hero, npc)) {
    //     if (!is_hero_interact_able) {
    //         console.log("Meet!");
    //         is_hero_interact_able = true;
    //     }
    // } else {
    //     is_hero_interact_able = false;
    // }
    if (!event.paused) {
        
        // Actions carried out when the Ticker is not paused.
    }
}
function move(move_x, move_y) {
    hero.x = hero.x + move_x;
    hero.y = hero.y + move_y;
    
    if (hero.y > stage.canvas.height - 20) { hero.y = stage.canvas.height - 20; }
    if (hero.y < 0) { hero.y = 0;}
    if (hero.x > stage.canvas.width - 20) { hero.x = stage.canvas.width - 20; }
    if (hero.x < 0) { hero.x = 0;}
    var check_interact = false;
    for (var i = 0; i < 3; i++) {
        if (is_npc_reached(hero, npc_list[i])) {
            check_interact = true;
            meet_npc_id = i;
        }
    }
    if (check_interact) {
        if (!is_hero_interact_able) {
            console.log("Meet!");
            is_hero_interact_able = true;
        }
    } else {
        if (is_hero_interact_able) {
            console.log("Not Meet");
            is_hero_interact_able = false;
            meet_npc_id = -1;
        }
    }
    stage.update(); // important!!
}

window.addEventListener('keydown', check,false);

function sibal(){
    if (is_hero_interact_able) {
        alert("jungmal hunmalhan suntackeayo!");
    }
}

function is_npc_reached(hero_, npc_) {
    var npc_x_min = npc_.x - 40;
    var npc_x_max = npc_.x + 40;
    var npc_y_min = npc_.y - 40;
    var npc_y_max = npc_.y + 40;
    if (hero_.x > npc_x_min && hero_.x < npc_x_max && hero_.y < npc_y_max && hero_.y > npc_y_min) {
        return true;
    } else {
        return false;
    }
}

function check(e) {
    var code = e.keyCode;
    if (!is_text_box_interact && !is_inputting) {
        switch (code) {
            case 37: move(-20, 0); break;//Left key
            case 38: move(0, -20); break;//Up key
            case 39: move(20, 0); break;//Right key
            case 40: move(0, 20); break; //Down key
            case 115: npc_interaction(); break;
        }        
    }
}

function npc_interaction() {
    if (is_hero_interact_able) {

        var line = Math.round(Math.random()*5)
        switch (line) {
            case 0: alert("내 마음엔... 확실히 닿았다..."); break;
            case 1: alert("김!공!익! 점호준비 끝! 충성충성^^7"); break;
            case 2: alert("세상엔 중요한 금이 세가지가 있지..황금..소금..비트코인 골드.."); break;
            case 3: alert("알고 계십니까? 토끼가 위로해주면 토닥토닥입니다!"); break;
            case 4: alert("이녀석... 포기를 모르는건가?!"); break;
            case 5: alert("뉘신데 그리 급하게 가십니까? 아! 저의 20대이군요!"); break;
        }
        var is_hero_win = codeInputOpenAndClose();
        // alert(meet_npc_id);
    }
}

function wild_monster_interaction() {
    alert("야생의 과제가 나타났다!");
    var is_hero_win = codeInputOpenAndClose();
    
}

function semifixer() {
    var s = document.getElementById("codeInput");
    s.replace(/;/g, "%3B");
    // document.getElementById("codePush").value = s;
}

function codeInputOpenAndClose() {
    // var cq = codingQuestion[Math.round(Math.random()*1)];
    // var cq = 1;
    if (document.getElementById("inputBox").style.display === 'none')
        document.getElementById("inputBox").style.display = 'block';
    else {
        document.getElementById("inputBox").style.display = 'none';
    }

    //server
//     <form action = "http://localhost:8080/form.jsp" accept-charset="utf-8" 
//     name = "person_info" method = "get"> 

// </form>

}

function sendCode() {
    alert(document.getElementById("codeInput").value);

    codeInputOpenAndClose();
}