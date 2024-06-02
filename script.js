function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
    }

}

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add task onclick
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
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

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
// Typed text
let input = document.querySelector(".input");
let slider_box = document.querySelector(".slider_box");
let slider = document.querySelector(".slider");
let placeholder = document.querySelector(".placeholder");

let list = ["Fitness Routine", "Groceries", "Events", "Pomodoro"];
let i = 0;
text_animation();
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

function authenticateWithGoogle() {
    window.location.href = `${googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
}

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.setAttribute("draggable", "true");
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        li.addEventListener("dragstart", dragStart);
        li.addEventListener("dragover", dragOver);
        li.addEventListener("drop", drop);
        li.addEventListener("dragend", dragEnd);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Drag and Drop for priority

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    document.querySelectorAll('li').forEach(item => {
        item.setAttribute("draggable", "true");
        item.addEventListener("dragstart", dragStart);
        item.addEventListener("dragover", dragOver);
        item.addEventListener("drop", drop);
        item.addEventListener("dragend", dragEnd);
        saveData()
    });
}

showTask();

function dragStart(event) {
    event.target.classList.add('dragging');
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', event.target.innerHTML);
    saveData()
}

function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    saveData()
}

function drop(event) {
    event.preventDefault();
    event.stopPropagation();

    const draggingElement = document.querySelector('.dragging');
    const targetElement = event.target.closest('li');

    if (draggingElement && targetElement && draggingElement !== targetElement) {
        const targetIndex = [...targetElement.parentNode.children].indexOf(targetElement);
        const draggingIndex = [...draggingElement.parentNode.children].indexOf(draggingElement);

        if (draggingIndex < targetIndex) {
            targetElement.parentNode.insertBefore(draggingElement, targetElement.nextSibling);
        } else {
            targetElement.parentNode.insertBefore(draggingElement, targetElement);
        }

        saveData();
    }
}

function dragEnd(event) {
    event.target.classList.remove('dragging');
    saveData()
}


