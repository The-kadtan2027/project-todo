$(document).ready(function (e) {
    
    renderItem();
    
});

  $("#todo-form").on("submit", function (e) {
    e.preventDefault();
    let todoValue = $("#inputText").val();
    if (!todoValue) {
        alert("fill the todo");
        return;
      }
    
    var uid = (
      "0000" + ((Math.random() * Math.pow(36, 4)) << 0).toString(36)
    ).slice(-4);

    let todo = {
      id: uid,
      value: todoValue,
      isTrue: false,
    };

    
    localStorage.setItem(uid, JSON.stringify(todo));
    $("#todos").append(`<div class="todo" data-itemid="${uid}">
     <div class="content">
     <input type="text" class="text" data-itemid="${uid}" value="${todoValue}" readonly />
     <div class="actions">
     <button class="edit btn">Edit</button>
     <button class="delete btn">Delete</button>
     </div
     </div>
     </div>`);

    $("#inputText").val("");
  });

  $("#todos").on("click", ".edit", function (e) {
    let todoInput = $(this).parents(".content").children(".text");
    const todoId = todoInput.attr('data-itemid');
    const oldTodo = JSON.parse(localStorage.getItem(todoId));
    let newTodo = {
        id: oldTodo.id,
        value: todoInput.val(),
        isTrue: oldTodo.isTrue
    }
    

    if ($(this).text().toLowerCase() == "edit") {
      todoInput.removeAttr("readonly").focus();
        
      $(this).text("Save");
    } else {
        localStorage.setItem(todoId, JSON.stringify(newTodo));
      todoInput.attr("readonly", "readonly");

      $(this).text("Edit");
    }
  });

  $("#todos").on("click", ".delete", function () {
    const todo = $(this).parents(".todo");
    const todo_id = todo.attr('data-itemid');
    localStorage.removeItem(todo_id);
    todo.remove();

  });
  function renderItem() {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = JSON.parse(localStorage.getItem(key));

      $("#todos").append(`<div class="todo" data-itemid="${value.id}">
     <div class="content">
     <input type="text" class="text" data-itemid="${value.id}" value="${value.value}" readonly />
     <div class="actions">
     <button class="edit btn">Edit</button>
     <button class="delete btn">Delete</button>
     </div
     </div>
     </div>`);
        

    }
  }

$('#todos').on('click','.text', function () {
    console.log($(this));
    
    $(this).toggleClass('strike');
});
