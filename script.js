let gallery = document.getElementById("gallery");
let nclickedCircke = true;
let target;

function randomColor() {
  let a = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let c = Math.floor(Math.random() * 255);

  let color = `rgb(${a} ${b} ${c})`;
  return color;
}

function doubleclick(event) {
  let div = document.createElement("div");
  div.className = "circle";
  div.style.backgroundColor = randomColor();
  let widthAndHeigh = Math.floor(Math.random() * (100 - 20) + 20);
  div.style.width = widthAndHeigh + "px";
  div.style.height = widthAndHeigh + "px";

  div.style.left = event.pageX - widthAndHeigh / 2 + "px";
  div.style.top = event.pageY - widthAndHeigh / 2 + "px";
  console.log(event.pageX);
  console.log(event.pageY);
  gallery.append(div);
}

gallery.addEventListener("dblclick", doubleclick);

// 2

const cancel = document.getElementById("cancel");
const update = document.getElementById("update");

function updateWidthAndColor(event) {
  console.log(event.target);
  let width = document.getElementById("width");
  console.log(width.value);
  if (width.value < 20 || width.value > 200) {
    alert("введіть число від 20 до 200");
  } else {
    target.style.width = width.value + "px";
    target.style.height = width.value + "px";
  }
  let color = document.getElementById("color").value;
  console.log(color);
  if (color !== "#ffffff") {
    target.style.backgroundColor = color;
  } else {
    alert("Оберіть будь який колір окрім білого");
  }
}

function cancelModal() {
  document.getElementById("width").value = "";
  document.getElementById("color").value = "";
  document.querySelector(".wrapper").style.display = "none";
}

cancel.addEventListener("click", cancelModal);
update.addEventListener("click", updateWidthAndColor);

gallery.addEventListener("contextmenu", function contextmenu(event) {
  event.preventDefault();
  if (event.target.className == "circle") {
    document.querySelector(".wrapper").style.display = "block";
    target = event.target;
  }
});

// 3

function moveCircleTime(width, circle, mouse) {
  circle.style.left = mouse.pageX - width + "px";
  circle.style.top = mouse.pageY - width + "px";
}

function moveCircle(event) {
  event.preventDefault();
  function removeListener(event) {
    gallery.removeEventListener("mousemove", mouseMove);
    gallery.removeEventListener("mouseleave", removeListener);
    nclickedCircke = true;
  }

  if (event.target.className == "circle" && nclickedCircke == true) {
    nclickedCircke = false;
    let width = event.target.style.width.replace("px", "") / 2;
    let circle = event.target;
    circle.style.pointerEvents = "none";
    circle.style.filter = "blur(10px)";
    mouseMove = function (mouse) {
      moveCircleTime(width, circle, mouse);
    };
    gallery.addEventListener("mousemove", mouseMove);
    gallery.addEventListener("mouseleave", removeListener);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        circle.style.filter = "";
        circle.style.pointerEvents = "auto";
        removeListener();
      }
    });
  }
}

gallery.addEventListener("click", moveCircle);
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (document.querySelector(".wrapper").style.display == "block") {
      cancelModal();
    }
  }
});
