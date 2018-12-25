var submitBtn = document.getElementById('todo-submit');
var todoCount = document.querySelector('.todo-count');
var todoList = document.querySelector('.todo-list');
var todoInput = document.getElementById('todo-input');

submitBtn.addEventListener('click', submitTodo);
todoInput.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        submitBtn.click();
    }
});

function submitTodo(e) {
    var todo = document.getElementById('todo-input').value;
    if (todo != '') {
        errorPara = document.querySelector('.error');
        if (todoList.contains(errorPara))
            todoList.removeChild(errorPara);
        var todoItem = document.createElement('li');
        todoItem.appendChild(document.createTextNode(todo));
        var addRemoveIcon = document.createElement("div");
        addRemoveIcon.setAttribute('class', 'remove');
        todoItem.appendChild(addRemoveIcon);
        todoCount.innerText = parseInt(todoCount.innerText) + 1;
        // console.log(todoItem);
        todoList.appendChild(todoItem);
        // console.dir(todo.todoList);
        document.getElementById('todo-input').value = "";
    } else {
        errorPara = document.querySelector('.error');
        if (todoList.contains(errorPara))
            return;
        else {
            var error = document.createElement("P");
            error.setAttribute('class', 'error');
            error.innerText = "Please Enter something first!";
            todoList.appendChild(error);
        }
    }
}

document.querySelector('body').addEventListener('click', function (event) {
    var removeBtn = document.querySelectorAll('.remove');
    if (removeBtn.length > 0) {
        removeTodo();
    }
});

function removeTodo() {
    var removeBtn = document.querySelectorAll('.remove');
    removeBtn.forEach(function (elem) {
        elem.addEventListener("click", function (e) {
            //this function does stuff
            this.parentNode.parentNode.removeChild(this.parentNode);
            todoCount.innerText = parseInt(todoCount.innerText) - 1;
        });
    });
}