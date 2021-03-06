var todoController = (function () {
    var todo = function (id, value) {
        this.id = id;
        this.value = value;
    };

    var allTodos = [];

    return {
        addTodo: function (todoValue) {
            var newTodo, ID, todoObj;
            if (allTodos.length === 0) {
                ID = 0;
            } else {
                ID = allTodos[allTodos.length - 1].id + 1;
            }

            newTodo = new todo(ID, todoValue);

            todoObj = {
                id: ID,
                value: todoValue
            };

            allTodos.push(todoObj);

            return newTodo;
        },
        deleteTodo: function (ID) {
            var index;

            allTodos.forEach(function (current, i) {
                if (current.id === ID) {
                    index = i;
                }
            });

            allTodos.splice(index, 1);

            return ID;
        },
        removeAllTodos: function () {
            allTodos = [];
        }
    };
})();

var UIController = (function () {
    var DOMElements = {
        submitTodo: '.todo-submit',
        removeAllTodo: '.todo-remove-all',
        todoInput: '.todo-text',
        todoContainer: '.todo-list',
        allTodos: '.todo-item'
    };

    return {
        displayTodo: function (todoObj) {
            var html, newHtml;

            html = '<div id="%id%" class="todo-item"><h3 class="todo-value">%value%</h3><svg class="todo-delete"><use xlink:href="icons/sprite.svg#icon-delete"></use></svg></div>';

            newHtml = html.replace('%id%', todoObj.id);
            newHtml = newHtml.replace('%value%', todoObj.value);

            document.querySelector(DOMElements.todoContainer).insertAdjacentHTML('beforeend', newHtml);

        },
        deletedTodo: function (ID) {
            document.getElementById("" + ID).parentNode.removeChild(document.getElementById(ID));

        },
        removeAllTodos: function () {
            var list;

            list = document.querySelectorAll(DOMElements.allTodos);

            list.forEach(function (current) {
                current.parentNode.removeChild(current);
            });
        },
        getElements: function () {
            return DOMElements;
        }
    };
})();

var appController = (function (todoCtrl, UICtrl) {

    var initializeHandlers = function () {
        var elements = UICtrl.getElements();
        document.querySelector(elements.submitTodo).addEventListener('click', addTodo);

        document.addEventListener('click', deleteTodo);

        document.querySelector(elements.removeAllTodo).addEventListener('click', removeAllTodos);

    };

    var addTodo = function (e) {
        var newTodo, elements, todoInput;
        elements = UICtrl.getElements();
        e.preventDefault();

        todoInput = document.querySelector(elements.todoInput);

        if (todoInput.value.trim().length > 0) {
            newTodo = todoCtrl.addTodo(todoInput.value);

            UICtrl.displayTodo(newTodo);

            todoInput.value = "";
        }
    };

    var deleteTodo = function (e) {
        var todo, ID;

        if (e.target.parentNode.classList[0] === "todo-delete") {
            todo = e.target.parentNode.parentNode;

            ID = parseInt(todo.getAttribute('id'));

            ID = todoCtrl.deleteTodo(ID);

            UICtrl.deletedTodo(ID);
        }
    };

    var removeAllTodos = function () {
        todoCtrl.removeAllTodos();

        UICtrl.removeAllTodos();
    };

    return {
        init: function () {
            console.log('Application has started');
            initializeHandlers();
        }
    };
})(todoController, UIController);

appController.init();