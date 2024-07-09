// script.js

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const taskDate = document.getElementById('task-date');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskActions);

    function addTask() {
        const taskText = taskInput.value;
        const taskDateTime = taskDate.value;

        if (taskText === '' || taskDateTime === '') {
            alert('Please enter both task and date/time.');
            return;
        }

        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${taskText} - ${new Date(taskDateTime).toLocaleString()}</span>
            <div class="task-actions">
                <button class="complete-task">Complete</button>
                <button class="edit-task">Edit</button>
                <button class="delete-task">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
        taskInput.value = '';
        taskDate.value = '';
    }

    function handleTaskActions(event) {
        const target = event.target;
        const taskItem = target.closest('.task-item');

        if (target.classList.contains('complete-task')) {
            taskItem.classList.toggle('completed');
        } else if (target.classList.contains('edit-task')) {
            editTask(taskItem);
        } else if (target.classList.contains('delete-task')) {
            taskItem.remove();
        }
    }

    function editTask(taskItem) {
        const taskText = prompt('Edit your task:', taskItem.firstElementChild.textContent.split(' - ')[0]);
        const taskDateTime = prompt('Edit your date and time:', new Date().toISOString().slice(0, 16));

        if (taskText !== null && taskDateTime !== null) {
            taskItem.firstElementChild.textContent = `${taskText} - ${new Date(taskDateTime).toLocaleString()}`;
        }
    }
});
