var canvas;
var context;
var canvasWidth=300;
var canvasHeight=300;
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint=false;



function prepareCanvas()
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	var canvasDiv = document.getElementById('canvasDiv');
	canvas = document.createElement('canvas');
	canvas.setAttribute('height', canvasWidth);
	canvas.setAttribute('width', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d");
	
	
	$('#canvas').mousedown(function(e){
   
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    paint = true;
    //addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    //redraw();
  });
  
  $('#canvas').mousemove(function(e){
    if(paint){
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw();
    }
  });
  
  $('#canvas').mouseup(function(e){
    paint = false;
  });
  
  $('#canvas').mouseleave(function(e){
    paint = false;
  });
  
  function addClick(x, y, dragging)
  {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  }
  
  function redraw(){
    canvas.width = canvas.width; // Clears the canvas

    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;

    for(var i=0; i < clickX.length; i++)
    {		
      context.beginPath();
      if(clickDrag[i] && i){
        context.moveTo(clickX[i-1], clickY[i-1]);
       }else{
         context.moveTo(clickX[i]-1, clickY[i]);
       }
       context.lineTo(clickX[i], clickY[i]);
       context.closePath();
       context.stroke();
    }
  }
}

