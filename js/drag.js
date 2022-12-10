let drag = document.getElementById('drag');
let isMouseDown,initX,initY,height = drag.offsetHeight
let width = drag.offsetWidth;
drag.addEventListener('pointerdown', function(e) {
  isMouseDown = true;
  document.body.classList.add('no-select');
  initX = e.offsetX;
  initY = e.offsetY;
});
document.addEventListener('pointermove', function(e) {
  if (isMouseDown) {
    var cx = e.clientX - initX,
        cy = e.clientY - initY;
    if (cx < 0) {
      cx = 0;
    }
    if (cy < 0) {
      cy = 0;
    }
    if (window.innerWidth - e.clientX + initX < width) {
      cx = window.innerWidth - width;
    }
    if (e.clientY > window.innerHeight - height+ initY) {
      cy = window.innerHeight - height;
    }
    drag.style.left = cx + 'px';
    drag.style.top = cy + 'px';
  }
});
drag.addEventListener('pointerup', function() {
  isMouseDown = false;
  document.body.classList.remove('no-select');
});
