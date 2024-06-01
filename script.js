const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
// add task onclick
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData()
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData()
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

let input = document.querySelector(".input");
let slider_box = document.querySelector(".slider_box");
let slider = document.querySelector(".slider");
let placeholder = document.querySelector(".placeholder");

let list = ["Fitness Routine", "Groceries", "Events", "Pomodoro"];
let i = 0;
text_animation()
let intervals = "";
setintervals();

// This below javascript line is give height to slider_box class. It won't get its inner element height (slider class), because it set to position absolute.
slider_box.style.height = slider.clientHeight + "px";

input.onfocus = function () {
    placeholder.style.display = "none";
    clearInterval(intervals);
}
input.onblur = function () {
    if (input.value == "") {
        placeholder.style.display = "flex";
        i = 0;
        text_animation();
        setintervals();
    }
}

// Functionality to animate the text;

function setintervals() {
    intervals = setInterval(() => {
        text_animation();
    }, 2500);
}


function text_animation() {
    i++;
    slider.innerHTML = list[i - 1];
    slider.style.opacity = "1";
    slider.style.left = "10px";
    setTimeout(() => {
        slider.style.opacity = "0";
        slider.style.left = "5px";
    }, 2000);
    if (list.length == i) {
        i = 0;
    }
}
