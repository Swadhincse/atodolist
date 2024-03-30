document.addEventListener("DOMContentLoaded", function() {
    const addItemSection = document.getElementById("addItemSection");
    const todaysTasksSection = document.getElementById("todaysTasksSection");
    const futureTasksSection = document.getElementById("futureTasksSection");
    const completedTasksSection = document.getElementById("completedTasksSection");

    let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

    function renderTodoList() {
        todaysTasksSection.innerHTML = "";
        futureTasksSection.innerHTML = "";
        completedTasksSection.innerHTML = "";

        todoList.forEach((item, index) => {
            const itemCard = document.createElement("div");
            itemCard.classList.add("item-card");

            if (item.completed) {
                itemCard.classList.add("completed");
            }

            itemCard.innerHTML = `
                <p>Name: ${item.name}</p>
                <p>Date: ${item.date}</p>
                <p>Priority: ${item.priority}</p>
                <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
                <button class="complete-btn" onclick="toggleCompleted(${index})">${item.completed ? 'Undo' : 'Complete'}</button>
            `;

            const currentDate = new Date();
            const itemDate = new Date(item.date);

            if (itemDate.toDateString() === currentDate.toDateString()) {
                todaysTasksSection.appendChild(itemCard);
            } else if (itemDate < currentDate && !item.completed) {
                itemCard.classList.add("overdue");
                futureTasksSection.appendChild(itemCard);
            } else if (item.completed) {
                completedTasksSection.appendChild(itemCard);
            } else {
                futureTasksSection.appendChild(itemCard);
            }
        });
    }

    function addItem() {
        const itemName = document.getElementById("itemName").value;
        const itemDate = document.getElementById("itemDate").value;
        const itemPriority = document.getElementById("itemPriority").value;

        if (itemName && itemDate && itemPriority) {
            todoList.push({ name: itemName, date: itemDate, priority: itemPriority, completed: false });
            localStorage.setItem("todoList", JSON.stringify(todoList));
            renderTodoList();
            clearAddItemForm();
        } else {
            alert("Please fill in all fields.");
        }
    }

    function deleteItem(index) {
        todoList.splice(index, 1);
        localStorage.setItem("todoList", JSON.stringify(todoList));
        renderTodoList();
    }

    function toggleCompleted(index) {
        todoList[index].completed = !todoList[index].completed;
        localStorage.setItem("todoList", JSON.stringify(todoList));
        renderTodoList();
    }

    function clearAddItemForm() {
        document.getElementById("itemName").value = "";
        document.getElementById("itemDate").value = "";
        document.getElementById("itemPriority").value = "high";
    }

    renderTodoList();
});
