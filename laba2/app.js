let taskList = [];

const createTask = (taskArray, taskText) => [...taskArray, { id: Date.now(), text: taskText, completed: false }];

const updateTaskStatus = (taskArray, taskId) =>
	taskArray.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task);

const removeTask = (taskArray, taskId) => taskArray.filter(task => task.id !== taskId);

const getFilteredTasks = (taskArray, filterType) => {
	switch (filterType) {
		case 'completed': return taskArray.filter(task => task.completed);
		case 'pending': return taskArray.filter(task => task.completed);
		default: return taskArray;
	}
};

const displayTasks = (taskArray, filterType = 'all') => {
	const taskContainer = document.getElementById('taskList');
	const visibleTasks = getFilteredTasks(taskArray, filterType);
	taskContainer.innerHTML = visibleTasks.map(task => `
    <li class="task-item ${task.completed ? 'completed' : ''}">
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTaskStatus(${task.id})">✓</button>
        <button onclick="deleteTask(${task.id})">🗑️</button>
      </div>
    </li>
  `).join('');
};

document.getElementById('addTask').addEventListener('click', () => {
	const taskInputField = document.getElementById('taskInput');
	if (taskInputField.value.trim() !== '') {
		taskList = createTask(taskList, taskInputField.value.trim());
		taskInputField.value = '';
		displayTasks(taskList);
	}
});

document.querySelectorAll('.filters button').forEach(button => {
	button.addEventListener('click', () => displayTasks(taskList, button.dataset.filter));
});

window.toggleTaskStatus = (taskId) => {
	taskList = updateTaskStatus(taskList, taskId);
	displayTasks(taskList);
};

window.deleteTask = (taskId) => {
	taskList = removeTask(taskList, taskId);
	displayTasks(taskList);
};
