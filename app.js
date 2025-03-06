document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
  
    // Cargar tareas desde localStorage y aplicar persistencia
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Renderizamos las tareas
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
          li.classList.add('completed');
        }
  
        // Botón para eliminar tarea
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', () => {
          tasks.splice(index, 1);
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
        });
  
        // Marcamos tarea como completada
        li.addEventListener('click', () => {
          task.completed = !task.completed;
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
        });
  
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    }
  
    // Agregamos una nueva tarea
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
      }
    });
  
    // Renderizamos tareas al cargar la página
    renderTasks();
});