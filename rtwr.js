/*
Note: this version is for Werner Randelshofer's cube simulator 

This script is a workaround for cheerpj to extend rotation outside of the
cube area (for desktop browsers).
  n = # cubes on page
  i = interval in milliseconds
  m = max times to run
*/
var canvsPerCube = 10;
var rtCubes, rtInt, rtMax, rtCount, rtCanvIx, rtCube, rtMouseDown;
var rtApp = document.getElementsByTagName('object');
var rtCanv = document.getElementsByTagName('canvas');
var rtText = document.getElementsByTagName('textarea');
function rt(n, i, m) {
  rtCubes = n;
  rtInt = i;
  rtMax = m;
  rtCount = 0;
  rt2();
}
function rt2() {
  if (rtCanv.length == rtCubes*canvsPerCube)
    rt3();
  else if (rtCount++ < rtMax)
    setTimeout(rt2, rtInt);
}
function rt3() {
  for (var i=0; i < rtCanv.length; i++) {
    rtCanv[i].n = i;
    rtCanv[i].addEventListener('mousedown', mousedown);
    rtCanv[i].addEventListener('mouseup', mouseup);
    rtCanv[i].addEventListener('contextmenu', contextmenu);
  }
  document.addEventListener('mouseup', mouseup);
  document.addEventListener('pointermove', pointermove);
  console.log('rt done');
}
function mousedown(e) {
  rtCanvIx = e.target.n;
  rtCube = Math.floor(rtCanvIx/canvsPerCube);
  rtMouseDown = true;
  pointerEventsOtherApps('none');
  if (e.button == 2)
    parent.document.addEventListener('contextmenu', contextmenu);
}
function mouseup(e) {
  if (rtMouseDown) {
    rtMouseDown = false; 
    pointerEventsOtherApps('auto');
  }
  if (e.button == 2)
    setTimeout(removeParentListener, 100);
}
function contextmenu(e) {
  e.preventDefault();
}
function pointermove(e) {
  if (rtMouseDown) {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('mousemove', true, false);
    evt.buttons = e.buttons;
    evt.clientX = e.clientX; 
    evt.clientY = e.clientY;
    rtCanv[rtCanvIx].dispatchEvent(evt);
  }
}
function pointerEventsOtherApps(s) {
  for (var i=0; i < rtApp.length; i++) {
    if (i != rtCube) {
      rtApp[i].style.pointerEvents = s;
      rtApp[i].children[2].style.pointerEvents = s;
      rtText[i].style.pointerEvents = s;
    }
  }
  // also do textarea for current app
  rtText[rtCube].style.pointerEvents = s;
}
function removeParentListener() {
  parent.document.removeEventListener('contextmenu', contextmenu);
}
