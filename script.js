// Get references to HTML elements
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// Add event listener to "Add" button
addButton.addEventListener("click", addTask);

// Add event listener for keyboard inputs on the task input field
taskInput.addEventListener("keyup", function (event) {
  // If Enter key is pressed, add the task
  if (event.key === "Enter") {
    addTask();
  }
  // If Escape key is pressed, clear the input
  else if (event.key === "Escape") {
    clearInput();
  }
});

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    // Call function to create task element
    createTaskElement(taskText);
    // Clear the task input field
    taskInput.value = "";
  }
}

// Function to clear the task input field
function clearInput() {
  taskInput.value = "";
}

// Function to create a new task element
function createTaskElement(taskText) {
  // Create a new list item for the task
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");

  // Create a span for the task content
  const taskContent = document.createElement("span");
  taskContent.textContent = taskText;

  // Create a div for the task buttons
  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");

  // Create the "Done" button
  const doneButton = document.createElement("button");
  doneButton.textContent = "Done";
  doneButton.className = "done-button";
  doneButton.addEventListener("click", function () {
    // Toggle the "done" class on the task item
    taskItem.classList.toggle("done");
    // Update the "Date & Time" button text
    updateDateTimeButton(taskItem, taskText);
  });

  // Create the "Date & Time" button
  const dateTimeButton = document.createElement("button");
  dateTimeButton.textContent = "Date & Time";
  dateTimeButton.className = "date-time-button";
  dateTimeButton.addEventListener("click", function () {
    // Determine whether the task is done or not
    const dateTimeMessage = taskItem.classList.contains("done")
      ? "This work was done."
      : "This work is not done yet.";
    // Get the current date and time
    const dateTime = new Date();
    // Show an alert with the appropriate message and timestamp
    alert(`${dateTimeMessage} Marked on ${dateTime.toLocaleString()}`);
  });

  // Create the "Delete" button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete";
  deleteButton.addEventListener("click", function () {
    // Remove the task item from the list
    taskList.removeChild(taskItem);
  });

  // Append buttons to the buttons div
  buttonsDiv.appendChild(doneButton);
  buttonsDiv.appendChild(dateTimeButton);
  buttonsDiv.appendChild(deleteButton);

  // Append task content and buttons div to the task item
  taskItem.appendChild(taskContent);
  taskItem.appendChild(buttonsDiv);

  // Append the task item to the task list
  taskList.appendChild(taskItem);
}

// Function to update the "Date & Time" button text
function updateDateTimeButton(taskItem, taskText) {
  const dateTimeButton = taskItem.querySelector(".date-time-button");
  // Determine the appropriate message based on task completion status
  const dateTimeMessage = taskItem.classList.contains("done")
    ? `This work "${taskText}" was done.`
    : `This work "${taskText}" is not done yet.`;

  // Update the button text
  dateTimeButton.textContent = dateTimeMessage;
}
