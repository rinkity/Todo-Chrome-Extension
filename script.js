var taskArr = [];

const updateView = () => {
    const tasksList = document.getElementById("tasksList");
    var child = tasksList.lastChild;
    
    while(child) {
        tasksList.removeChild(child);
        child = tasksList.lastChild;
    }

    taskArr.forEach((Element, index) => {
        const newTask = document.createElement("div");

        newTask.setAttribute("class", `task ${Element.isDone ? "completed" : ""}`);

        let taskContent = document.createElement("div");

        const taskRadio = document.createElement("input");
        taskRadio.onclick = () => toggleStatus(index);
        taskRadio.setAttribute("type", "checkbox");
        taskRadio.checked = Element.isDone;

        const spanText = document.createElement("span");
        spanText.innerHTML = Element.task.charAt(0).toUpperCase() + Element.task.slice(1);

        taskContent.appendChild(taskRadio);
        taskContent.appendChild(spanText);

        newTask.appendChild(taskContent);

        taskButtons = document.createElement("div");

        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "btn task-delete");
        deleteButton.setAttribute("id", index + "delete");
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", (event) => deleteTask(event.target.id));

        const editButton = document.createElement("button");
        editButton.setAttribute("class", "btn task-edit");
        editButton.setAttribute("id", index + "edit");
        editButton.innerHTML = "Edit";
        editButton.addEventListener("click", (event) => editTask(event.target.id));

        taskButtons.appendChild(deleteButton);
        taskButtons.appendChild(editButton);

        newTask.appendChild(taskButtons);


        tasksList.appendChild(newTask);
    });
}

const addTask = (isDone) => {
    const task = document.getElementById("task-input").value;
    if(task === null || task.trim() === "") return;

    taskArr.push({ task, isDone });
    localStorage.setItem("savedTasks", JSON.stringify(taskArr));
    updateView();

    const taskInput = document.getElementById("task-input");
    taskInput.value = "";
}

const deleteTask = (id) => {
    const taskIndex = parseInt(id[0]);
    taskArr.splice(taskIndex, 1);
    localStorage.setItem("savedTasks", JSON.stringify(taskArr));
    updateView();
}

const editTask = (id) => {
    const taskIndex = parseInt(id[0]);
    const taskText = taskArr[taskIndex].task;
    taskArr.splice(taskIndex, 1);
    localStorage.setItem("savedTasks", JSON.stringify(taskArr));
    updateView();

    const taskInput = document.getElementById("task-input");
    taskInput.value = taskText;
}

const toggleStatus = (id) => {
    taskArr[id].isDone = !taskArr[id].isDone;
    localStorage.setItem("savedTasks", JSON.stringify(taskArr));
    updateView();
}

document.addEventListener("DOMContentLoaded", () => {

    const savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
    if(savedTasks !== null) taskArr = [...savedTasks];
    updateView();
})

document.getElementById("task-input").addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
        event.preventDefault();
        addTask(false);
    }
})

document.getElementById("task-clear-btn").addEventListener("click", () => {
    localStorage.clear();
    taskArr = [];
    updateView();
})