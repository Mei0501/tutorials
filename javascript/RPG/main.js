"use strict";

const CHRHEIGHT = 9;
const CHRWIDTH = 8;
const FONT = "12px monospace";
const FONTSTYLE = "#ffffff";
const HEIGHT = 120;
const WIDTH = 128;
const MAP_WIDTH = 32;
const MAP_HEIGHT = 32;
const SCR_HEIGHT = 8;
const SCR_WIDTH = 8;
const SMOOTH = 0;
const START_X =15;
const START_Y = 17;
const TILECOLUMN = 4;
const TILEROW = 4;
const TILESIZE = 8;
const WNDSTYLE = "rgba(0,0,0, 0.75)";

const gKey = new Uint8Array(0x100); //キー入力バッファ

let gFrame = 0;
let gHeight;
let gWidth;
let gMoveX = 0;
let gMoveY = 0;
let gImgMap;
let gImgPlayer;
let gPlayerX = START_X * TILESIZE + TILESIZE / 2;
let gPlayerY = START_Y * TILESIZE + TILESIZE /2;
let gScreen;

const gFileMap = "img/map.png"
const gFilePlayer = "img/player.png"

const gMap = [
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 3, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 3, 6, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 3, 3, 6, 6, 7, 7, 7, 2, 2, 2, 7, 7, 7, 7, 7, 7, 7, 6, 3, 0, 0, 0, 3, 3, 0, 6, 6, 6, 0, 0, 0,
 0, 0, 3, 3, 6, 6, 6, 7, 7, 2, 2, 2, 7, 7, 2, 2, 2, 7, 7, 6, 3, 3, 3, 6, 6, 3, 6,13, 6, 0, 0, 0,
 0, 3, 3,10,11, 3, 3, 6, 7, 7, 2, 2, 2, 2, 2, 2, 1, 1, 7, 6, 6, 6, 6, 6, 3, 0, 6, 6, 6, 0, 0, 0,
 0, 0, 3, 3, 3, 0, 3, 3, 3, 7, 7, 2, 2, 2, 2, 7, 7, 1, 1, 6, 6, 6, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 7, 7, 7, 7, 2, 7, 6, 3, 1, 3, 6, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 7, 2, 7, 6, 3, 1, 3, 3, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 0, 3, 3, 3, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 3,12, 3, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 7, 7, 6, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 6, 6, 6, 6, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 6, 6, 3, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 5, 3, 3, 3, 6, 6, 6, 3, 3, 3, 1, 1, 1, 1, 1, 3, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 8, 9, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3, 1, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 3, 3, 3, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0,
 7,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0,
 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7,
];


function DrawMain()
{
  const g = gScreen.getContext("2d")

  let mx = Math.floor(gPlayerX / TILESIZE);
  let my = Math.floor(gPlayerY / TILESIZE);

  for ( let dy = -SCR_HEIGHT; dy <= SCR_HEIGHT; dy++ ) {
    let ty = my + dy;
      let py = (ty + MAP_HEIGHT ) % MAP_HEIGHT;
    for ( let dx = -SCR_WIDTH; dx <= SCR_WIDTH; dx++ ) {
      let tx = mx + dx;
      let px = (tx + MAP_WIDTH) % MAP_WIDTH;
      DrawTile( g,
        tx * TILESIZE + WIDTH / 2 - gPlayerX,
        ty * TILESIZE + HEIGHT / 2 - gPlayerY,
        gMap[ py * MAP_WIDTH + px ]);
    }
  }
  g.fillStyle = "#ff0000";
  g.fillRect(0,HEIGHT / 2-1, WIDTH, 2);
  g.fillRect(WIDTH /2 -1 ,0,2, HEIGHT);

  g.drawImage(gImgPlayer,
              CHRWIDTH, 0, CHRWIDTH, CHRHEIGHT,
              WIDTH / 2 - CHRWIDTH /2, HEIGHT / 2 - CHRHEIGHT + TILESIZE /2, CHRWIDTH, CHRHEIGHT);

  g.fillStyle = WNDSTYLE;
  g.fillRect(10, 103, 105, 15);

  g.font = FONT;
  g.fillStyle = FONTSTYLE;
  g.fillText("x=" + gPlayerX +" y=" +gPlayerY + "m=" +gMap[my * MAP_WIDTH + mx],25, 115);
}

function DrawTile(g, x, y, idx)
{
  const ix = ( idx % TILECOLUMN ) * TILESIZE;
  const iy = Math.floor( idx / TILECOLUMN ) * TILESIZE;
  g.drawImage( gImgMap, ix, iy, TILESIZE, TILESIZE, x, y, TILESIZE, TILESIZE )
}

function LoadImage()
{
  gImgMap = new Image(); gImgMap.src = gFileMap;
  gImgPlayer = new Image(); gImgPlayer.src = gFilePlayer;
}
//フィールド進行処理
function TickField()
{

  if( gMoveX != 0 || gMoveY != 0){}

  else if(gKey[37]) gMoveX =  -TILESIZE;  // left
  else if(gKey[38]) gMoveY =  -TILESIZE;  // up
  else if(gKey[39]) gMoveX =  TILESIZE;  // right
  else if(gKey[40]) gMoveY = TILESIZE;  // down

  gPlayerX += Math.sign(gMoveX);
  gPlayerY += Math.sign(gMoveY);
  gMoveX -= Math.sign(gMoveX);
  gMoveY -= Math.sign(gMoveY);

  gPlayerX += (MAP_WIDTH * TILESIZE);
  gPlayerX %= (MAP_WIDTH * TILESIZE);
  gPlayerY += (MAP_WIDTH * TILESIZE);
  gPlayerY %= (MAP_WIDTH * TILESIZE);
}

function WmPaint()
{
  DrawMain();

  const ca = document.getElementById("main"); // get element of main canvas
  const g = ca.getContext("2d");  // get 2D context
  g.drawImage(gScreen, 0, 0, gScreen.width, gScreen.height, 0, 0, gWidth, gHeight);
}

function WmSize()
{
  const ca = document.getElementById("main"); // get element of main canvas
  ca.width = window.innerWidth;
  ca.height = window.innerHeight;

  const g = ca.getContext("2d")
  g.imageSmoothingEnabled = g.msImageSmoothingEnabled = SMOOTH;

  gWidth = ca.width;
  gHeight = ca.height;
  if (gWidth / WIDTH < gHeight / HEIGHT) {
    gHeight = gWidth * HEIGHT / WIDTH;
  } else {
    gWidth = gHeight * WIDTH / HEIGHT;
  }
}

function WmTimer()
{
  gFrame++;
  TickField();
  WmPaint();
}

// input key
window.onkeydown = function(ev)
{
  let c = ev.keyCode;

  gKey[c] = 1;


}
window.onkeyup = function( ev )
{
  gKey[ev.keyCode] = 0;
}


// evoke browser
window.onload = function()
{
  LoadImage();
  gImgMap = new Image(); gImgMap.src = "img/map.png";

  gScreen = document.createElement("canvas");
  gScreen.width = WIDTH;
  gScreen.height = HEIGHT;

  WmSize()
  window.addEventListener("resize", function() { WmSize() });
  setInterval( function() { WmTimer() }, 33 );
}
