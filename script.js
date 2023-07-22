const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a new task to the list
function addTask() {
  if (inputBox.value.trim() === "") {
    alert("You Must Add Something");
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

// Event listener to toggle checked class for tasks and save data
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});

// Function to save the list of tasks to local storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Function to show the tasks from local storage when the page loads
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

// Function to clear all tasks from the list and local storage
function clearAllTasks() {
  listContainer.innerHTML = "";
  saveData();
}

// Function to check all tasks in the list
function checkAllTasks() {
  const tasks = listContainer.querySelectorAll("li");
  tasks.forEach(task => task.classList.add("checked"));
  saveData();
}

// Function to uncheck all tasks in the list
function uncheckAllTasks() {
  const tasks = listContainer.querySelectorAll("li");
  tasks.forEach(task => task.classList.remove("checked"));
  saveData();
}

// Function to delete all checked tasks
function deleteCheckedTasks() {
  const checkedTasks = listContainer.querySelectorAll("li.checked");
  checkedTasks.forEach(task => task.remove());
  saveData();
}

// Function to delete all unchecked tasks
function deleteUncheckedTasks() {
  const uncheckedTasks = listContainer.querySelectorAll("li:not(.checked)");
  uncheckedTasks.forEach(task => task.remove());
  saveData();
}

// Function to sort the tasks alphabetically
function sortTasks() {
  const tasks = Array.from(listContainer.querySelectorAll("li"));
  tasks.sort((a, b) => a.innerHTML.localeCompare(b.innerHTML));
  listContainer.innerHTML = "";
  tasks.forEach(task => listContainer.appendChild(task));
  saveData();
}

// Function to count the number of tasks in the list
function countTasks() {
  const tasks = listContainer.querySelectorAll("li");
  const totalCount = tasks.length;
  const checkedCount = listContainer.querySelectorAll("li.checked").length;
  const uncheckedCount = totalCount - checkedCount;
  alert(`Total Tasks: ${totalCount}\nChecked Tasks: ${checkedCount}\nUnchecked Tasks: ${uncheckedCount}`);
}

// Function to filter tasks based on their status (checked or unchecked)
function filterTasks(filter) {
  const tasks = listContainer.querySelectorAll("li");
  tasks.forEach(task => {
    if (filter === "checked") {
      task.style.display = task.classList.contains("checked") ? "block" : "none";
    } else if (filter === "unchecked") {
      task.style.display = task.classList.contains("checked") ? "none" : "block";
    } else {
      task.style.display = "block";
    }
  });
}

showTask();
