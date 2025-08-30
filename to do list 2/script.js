
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const emptyImage = document.querySelector(".empty-image");
const inputArea = document.querySelector(".input-area");

const counter = document.createElement("p");
counter.className = "task-counter";
document.querySelector(".todo-app").appendChild(counter);

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

inputArea.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask(taskInput.value);
});

function addTask(taskText, completed = false) {
  taskText = taskText.trim();
  if (taskText === "") return; 

  const task = { text: taskText, completed: completed };
  tasks.push(task);
  saveTasks();
  renderTasks();

  taskInput.value = "";
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = "task-text";
    if (task.completed) span.classList.add("completed");

    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
    completeBtn.className = "complete-btn";
    completeBtn.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateEmptyState();
  updateCounter();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateEmptyState() {
  emptyImage.style.display = tasks.length === 0 ? "block" : "none";
}

function updateCounter() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  counter.textContent = `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
}

renderTasks();
