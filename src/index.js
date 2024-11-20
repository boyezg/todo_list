import "./index.css";

// Select DOM elements
const addTaskBtn = document.getElementById("add-task-btn");
const taskFormContainer = document.getElementById("task-form-container");
const cancelTaskBtn = document.getElementById("cancel-task-btn");
const taskForm = document.getElementById("task-form");
const taskTableBody = document.getElementById("task-table-body");

// Task storage
let tasks = [];

// Open the task form modal
function openTaskForm() {
    taskFormContainer.style.display = "flex";
}

// Close the task form modal
function closeTaskForm() {
    taskFormContainer.style.display = "none";
    taskForm.reset();
}

// Add task to the table and the task list
function addTask(event) {
    event.preventDefault();

    const taskName = document.getElementById("task-name").value;
    const taskDate = document.getElementById("task-date").value;
    const taskDesc = document.getElementById("task-desc").value;
    const taskPriority = document.getElementById("task-priority").value;

    const newTask = { taskName, taskDate, taskDesc, taskPriority, completed: false };
    tasks.push(newTask);
    updateTaskTable();
    closeTaskForm();
}

// Update the task table with the latest tasks
function updateTaskTable() {
    taskTableBody.innerHTML = "";

    tasks.forEach((task, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.taskName}</td>
            <td>${task.taskDate}</td>
            <td>${task.taskDesc}</td>
            <td>${task.taskPriority}</td>
            <td><input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTaskCompletion(${index})"></td>
            <td><button class="secondary-btn remove-task-btn" data-index="${index}">Remove</button></td>
        `;
        taskTableBody.appendChild(row);
    });

    // Attach event listeners to remove buttons
    const removeButtons = document.querySelectorAll(".remove-task-btn");
    removeButtons.forEach((button) =>
        button.addEventListener("click", (e) => {
            const taskIndex = e.target.getAttribute("data-index");
            removeTask(taskIndex);
        })
    );
}

// Toggle task completion status
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskTable();
}

// Remove a task from the task list
function removeTask(index) {
    tasks.splice(index, 1);
    updateTaskTable();
}

// Event listeners
addTaskBtn.addEventListener("click", openTaskForm);
cancelTaskBtn.addEventListener("click", closeTaskForm);
taskForm.addEventListener("submit", addTask);
