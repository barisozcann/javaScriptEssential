// 1. HTML Elementlerine Erişim
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// 2. Veri Depolama (Görevler dizisi)
let tasks = [];

// 3. Fonksiyonlar
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false }); // Görev objesi ekle
        taskInput.value = ""; // Giriş alanını temizle
        displayTasks();
    }
}

function displayTasks() {
    taskList.innerHTML = ""; // Listeyi sıfırla
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}>
            <label for="task-${index}">${task.text}</label>
        `;
        // Checkbox değiştiğinde durumu güncelle
        li.querySelector("input").addEventListener("change", () => toggleTask(index));
        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed; // true ise false, false ise true yap
    displayTasks();
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed); // Sadece tamamlanmamış olanları tut
    displayTasks();
}

// 4. Olay İzleyiciler (Event Listeners)
addTaskBtn.addEventListener("click", addTask);
clearCompletedBtn.addEventListener("click", clearCompletedTasks);

// Başlangıçta listeyi göster
displayTasks();