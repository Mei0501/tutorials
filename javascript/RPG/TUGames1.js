"use strict";


var TUG = TUG || {}
TUG.GR = {};

TUG.mCurrentFrame = 0;
TUG.mFPS = 60;
TUG.mHeight = 120;
TUG.mWidth = 128;


TUG.onTimer = function(){}

TUG.init = function()
{
  TUG.GR.mCanvas = document.createElement("canvas");
  TUG.GR.mCanvas.width = TUG.mWidth;
  TUG.GR.mCanvas.height = TUG.mHeight;
  TUG.GR.mG = TUG.GR.mCanvas.getContext("2d");

  requestAnimationFrame( TUG.wmTimer);
}
//IE対応文
  

TUG.Sign = function( val )
{
  if( val == 0){
    return(0);
  }
  if( val < 0){
    return( -1 );
  }
  return( 1 );
}

TUG.wmTimer = function()
{
  if( !TUG.mCurrentStart){
    TUG.mCurrentStart = performance.now();
  }

  let  d = Math.floor((performance.now() - TUG.mCurrentStart) * TUG.mFPS / 1000) - TUG.mCurrentFrame;
  if( d > 0){
  TUG.onTimer(d);
  TUG.mCurrentFrame += d;

  }

  requestAnimationFrame( TUG.wmTimer);
  
}
