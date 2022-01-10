//Selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


//Functions
function addTodo(event) {
    //Prevent form from submitting form
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo);
    // ADD todo to local storage
    saveLocalTodos(todoInput.value); 
    //Check mark Button
    const completedButton = document.createElement("button")
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);
    //Clear input line
    todoInput.value = ''; 
}

function deleteCheck(e){
    const item = e.target;
    //Delete todo
    if ( item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo); //remove from local storage
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })  
    } else 
    //Check mark
        if(item.classList[0] === "complete-btn"){ 
            const todo = item.parentElement;
            todo.classList.toggle("completed");
        }

}

function filterTodo(e){
    const todos = todoList.childNodes;

    todos.forEach(function(todo){
        switch(e.target.value){

            case "all":
                console.log("all");
                todo.style.display = "flex";
                break;
            case "completed":
                console.log("com");
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                console.log("un");
                if(todo.classList.contains("completed")){
                    todo.style.display = "none";
                } else{
                    todo.style.display = "flex";
                }
                break;
            default:
                console.log("default");
        }
    })
}

function saveLocalTodos(todo){
    //Check if there are todos or storage is empty, if empty create array
    let todos; 
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos')); //get storage back into an array
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos)); //push array to local storage
}

//Reload all former todos when page open
function getTodos(){
     //Check if there are todos or storage is empty, if empty create array
     let todos; 
     if(localStorage.getItem('todos') === null){
         todos = [];
     }
     else{
         todos = JSON.parse(localStorage.getItem('todos')); //get storage back into an array
     }

    todos.forEach(function(todo){
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create Li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item")
        todoDiv.appendChild(newTodo);
        //Check mark Button
        const completedButton = document.createElement("button")
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Trash Button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);
        //Clear input line
        todoInput.value = ''; 

    })
}
   
function removeLocalTodos(todo){
    let todos; 
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos')); //get storage back into an array
    }

    const todoValue = todo.childNodes[0].innerText;
    const todoIndex = todos.indexOf(todoValue);
    console.log(`remove from local storage: \nid: ${todoIndex} \nvalue: ${todoValue}`);
    todos.splice(todoIndex, 1);
    //Update local storage
    localStorage.setItem('todos',JSON.stringify(todos)); //push array to local storage
}