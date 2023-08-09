const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    addTask();
  } else if (event.key === 'Escape') {
    clearInput();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    createTaskElement(taskText);
    taskInput.value = '';
  }
}

function clearInput() {
  taskInput.value = '';
}

function createTaskElement(taskText) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');
  
  const taskContent = document.createElement('span');
  taskContent.textContent = taskText;
  
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('buttons');
  
  const doneButton = document.createElement('button');
  doneButton.textContent = 'Done';
  doneButton.className = 'done-button';
  doneButton.addEventListener('click', function() {
    taskItem.classList.toggle('done');
    updateDateTimeButton(taskItem, taskText);
  });

  const dateTimeButton = document.createElement('button');
  dateTimeButton.textContent = 'Date & Time';
  dateTimeButton.className = 'date-time-button';
  dateTimeButton.addEventListener('click', function() {
    const dateTimeMessage = taskItem.classList.contains('done')
      ? 'This work was done.'
      : 'This work is not done yet.';
    
    const dateTime = new Date();
    alert(`${dateTimeMessage} Marked on ${dateTime.toLocaleString()}`);
  });
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete';
  deleteButton.addEventListener('click', function() {
    taskList.removeChild(taskItem);
  });
  
  buttonsDiv.appendChild(doneButton);
  buttonsDiv.appendChild(dateTimeButton);
  buttonsDiv.appendChild(deleteButton);
  
  taskItem.appendChild(taskContent);
  taskItem.appendChild(buttonsDiv);
  taskList.appendChild(taskItem);
}

function updateDateTimeButton(taskItem, taskText) {
  const dateTimeButton = taskItem.querySelector('.date-time-button');
  const dateTimeMessage = taskItem.classList.contains('done')
    ? `This work "${taskText}" was done.`
    : `This work "${taskText}" is not done yet.`;
  
  dateTimeButton.textContent = dateTimeMessage;
}
