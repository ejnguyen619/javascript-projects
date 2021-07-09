var svgNS = "http://www.w3.org/2000/svg";
var src = document.getElementById("palette");
var target = document.getElementById("space");
var msg = document.getElementById("msg");
var draggedID;

// Number of corresponding shape
var rect_num = 0;
var cir_num = 0;
var tri_num = 0;
var arrow_num = 0;

target.ondragenter = handleDrag;
target.ondragover = handleDrag;

target.ondrop = function(e) {
  var x = event.clientX - 131;
  var y = event.clientY - 57;
  var newElem = "";
  var newText = "";
  switch(draggedID){
    case "rectangle":
      newElem = document.createElementNS(svgNS,"rect");
      newElem.setAttributeNS(null,"id","myrectangle");
      newElem.setAttributeNS(null,"width",60);
      newElem.setAttributeNS(null,"height",45);
      newElem.setAttributeNS(null,"x",x-30);
      newElem.setAttributeNS(null,"y",y-22);
      newText = createText(((rect_num >= 10) ? x-25 : x-23), y+3);
      break;
    case "circle":
      newElem = document.createElementNS(svgNS,"circle");
      newElem.setAttributeNS(null,"id","mycircle");
      newElem.setAttributeNS(null,"cx",x);
      newElem.setAttributeNS(null,"cy",y);
      newElem.setAttributeNS(null,"r",30);
      newText = createText(x-15, y+3);
      break;
    case "triangle":
      newElem = document.createElementNS(svgNS,"polygon");
      newElem.setAttributeNS(null,"id","mytriangle");
      newElem.setAttributeNS(null,"points","30,15 45,45 15,45");
      var coords = [{x:x, y:y-30},{x:x+30, y:y+30},{x:x-30, y:y+30}];
      polygonPoints(newElem, coords);
      newText = createText(x-20, y+10);
      break;
    case "arrow":
      newElem = document.createElementNS(svgNS,"polygon");
      newElem.setAttributeNS(null,"id","myarrow");
      newElem.setAttributeNS(null,"points","30,15 45,30 30,45 30,38 15,38 15,22 30,22");
      var coords = [];
      coords.push({x:x, y:y-30},{x:x+30, y:y},{x:x, y:y+30});
      coords.push({x:x, y:y+15},{x:x-30, y:y+15},{x:x-30, y:y-15},{x:x, y:y-15});
      polygonPoints(newElem, coords);
      newText = createText(((arrow_num >= 10) ? x-19 : x-17), y+3);
      break;
  }
  newElem.setAttributeNS(null,"fill","white");
  newElem.setAttributeNS(null,"stroke","#CAD9E9");
  newText.innerHTML = shapeText(draggedID);
  target.appendChild(newElem);
  target.appendChild(newText);
  e.preventDefault();
}

src.ondragstart = function(e) {
  draggedID = e.target.id;
  e.target.classList.add("dragged");
}

src.ondragend = function(e) {
  var elems = document.querySelectorAll(".dragged");
  for (var i = 0; i < elems.length; i++) {
  elems[i].classList.remove("dragged");
  }
}

function handleDrag(e) {
  e.preventDefault();
}

// Change points in polygon
function polygonPoints(newElem, array){
  var j = 0;
  for (var i = 0; i < newElem.points.length; i++) {
    var p = newElem.points.getItem(i);
    p.x = array[j].x;
    p.y = array[j].y;
    j++;
  }
}

// Create SVG Text Element
function createText(coordX,coordY) {
  var text = document.createElementNS(svgNS,"text");
  text.setAttributeNS(null,"x", coordX);
  text.setAttributeNS(null,"y", coordY);
  text.setAttributeNS(null,"font-size",9);
  return text;
}

// Return text inside shape
function shapeText(index) {
  var text = "";
  switch(index) {
    case "rectangle":
      rect_num++;
      text = "Rectangle " + rect_num.toString();
      break;
    case "circle":
      cir_num++;
      text = "Circle " + cir_num.toString();
      break;
    case "triangle":
      tri_num++;
      text = "Triangle " + tri_num.toString();
      break;
    case "arrow":
      arrow_num++;
      text = "Arrow " + arrow_num.toString();
      break;
  }
  return text;
}

// Reset screen
function reset() {
  rect_num = 0;
  cir_num = 0;
  tri_num = 0;
  arrow_num = 0;
  var node= target;
  while (node.firstChild) {
      node.removeChild(node.firstChild);
  }
}
