const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

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

let buttons = document.querySelectorAll(".button");

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (e) => {
        e.preventDefault(); // preventing form submitting

        let overlay = document.createElement('span'); //creating a tag(span)
        overlay.classList.add("overlay"); //adding a class inside the span

        //adding overlay tag inside the anchor tag at in HTML

        let x = e.clientX - e.target.offsetLeft; //by this we get perfect value where we will click
        let y = e.clientY - e.target.offsetTop;

        overlay.style.left = x + "px"; //changing the position of the overlay according to our clicks on the button
        overlay.style.top = y + "px";

        e.target.appendChild(overlay);

        setTimeout(() => {
            overlay.remove();
        }, 500); //

    });
}