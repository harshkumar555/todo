// script.js

let tasks = JSON.parse(localStorage.getItem('tasks')) || { incomplete: [], completed: [] };

// Render tasks on page load
window.onload = () => {
  renderTasks();
};

// Add a new task
function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskName = taskInput.value.trim();

  if (taskName) {
    const newTask = { name: taskName, id: Date.now() };
    tasks.incomplete.push(newTask);
    saveTasks();
    taskInput.value = '';  // Clear the input field
    renderTasks();
  }
}

// Delete a task
function deleteTask(taskId, isCompleted) {
  if (isCompleted) {
    tasks.completed = tasks.completed.filter(task => task.id !== taskId);
  } else {
    tasks.incomplete = tasks.incomplete.filter(task => task.id !== taskId);
  }
  saveTasks();
  renderTasks();
}

// Mark a task as complete
function completeTask(taskId) {
  const task = tasks.incomplete.find(task => task.id === taskId);
  tasks.incomplete = tasks.incomplete.filter(task => task.id !== taskId);
  tasks.completed.push(task);
  saveTasks();
  renderTasks();
}

// Mark a task as incomplete
function incompleteTask(taskId) {
  const task = tasks.completed.find(task => task.id === taskId);
  tasks.completed = tasks.completed.filter(task => task.id !== taskId);
  tasks.incomplete.push(task);
  saveTasks();
  renderTasks();
}

// Render the tasks on the page
function renderTasks() {
  // Render incomplete tasks
  const incompleteTasksContainer = document.getElementById('incomplete-tasks');
  incompleteTasksContainer.innerHTML = '';
  tasks.incomplete.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${task.name}
      <div>
        <button class="complete" onclick="completeTask(${task.id})">Complete</button>
        <button class="delete" onclick="deleteTask(${task.id}, false)">Delete</button>
      </div>
    `;
    incompleteTasksContainer.appendChild(li);
  });

  // Render completed tasks
  const completedTasksContainer = document.getElementById('completed-tasks');
  completedTasksContainer.innerHTML = '';
  tasks.completed.forEach(task => {
    const li = document.createElement('li');
    li.classList.add('complete');
    li.innerHTML = `
      ${task.name}
      <div>
        <button class="complete" onclick="incompleteTask(${task.id})">Mark as Incomplete</button>
        <button class="delete" onclick="deleteTask(${task.id}, true)">Delete</button>
      </div>
    `;
    completedTasksContainer.appendChild(li);
  });
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
