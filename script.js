// JavaScript code for drag functionality
const dragBar = document.querySelector(".drag-bar");
const phoneContent = document.querySelector(".phone-background-container");
const bottomBar = document.querySelector(".bottom-bar");
const listItems = Array.from(document.querySelectorAll(".list-item-images"));
const middleHeader = document.querySelector(".middle-header");
const aftercard = document.querySelector(".after-card");
const beforecard = document.querySelector(".before-card");

let isDragging = false;
let startX = 0;
let startRight = 0;

dragBar.addEventListener("mousedown", startDrag);
dragBar.addEventListener("touchstart", startDrag);

function startDrag(event) {
  event.preventDefault();
  isDragging = true;
  startX = event.pageX || event.touches[0].pageX;
  startRight = parseInt(getComputedStyle(dragBar).right);
}

document.addEventListener("mousemove", drag);
document.addEventListener("touchmove", drag);

function drag(event) {
  if (!isDragging) return;

  const currentX = event.pageX || event.touches[0].pageX;
  const offsetX = currentX - startX;
  const newRight = startRight - offsetX;

  if (
    newRight >= 0 &&
    newRight <= dragBar.parentNode.offsetWidth - dragBar.offsetWidth
  ) {
    dragBar.style.right = newRight + "px";
    const progress =
      newRight / (dragBar.parentNode.offsetWidth - dragBar.offsetWidth);
    phoneContent.style.opacity = progress;
    if (progress >= 0.5) {
      phoneContent.classList.add("active");
      bottomBar.classList.add("active");
      middleHeader.classList.add("active");
      aftercard.classList.add("active");
      beforecard.classList.add("active");
      listItems.forEach((listItem) => {
        listItem.classList.add("active");
      });
    } else {
      phoneContent.classList.remove("active");
      bottomBar.classList.remove("active");
      middleHeader.classList.remove("active");
      aftercard.classList.remove("active");
      beforecard.classList.remove("active");
      listItems.forEach((listItem) => {
        listItem.classList.remove("active");
      });
      phoneContent.style.opacity = 1;
    }
  }
}

document.addEventListener("mouseup", stopDrag);
document.addEventListener("touchend", stopDrag);

function stopDrag() {
  isDragging = false;
}
