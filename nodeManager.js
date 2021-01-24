const nodeManager = {
  todoItemIndex: 0,

  createTodoItemNode(text) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item", "edit-state");
    todoItem.index = String(this.todoItemIndex++);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-item-checkbox");
    const itemText = document.createElement("span");
    itemText.innerText = text;
    itemText.classList.add("todo-item-text");
    const editButton = document.createElement("button");
    editButton.classList.add( "todo-item-edit-button");
    const removeButton = document.createElement("button");
    removeButton.classList.add("todo-item-remove-button");
    todoItem.append(checkbox);
    todoItem.append(itemText);
    todoItem.append(editButton);
    todoItem.append(removeButton);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        checkTodoItem(todoItem);
      } else {
        uncheckTodoItem(todoItem);
      }
      editProgress();
    });

    removeButton.addEventListener("click", () => removeTodoItem(todoItem));

    editButton.addEventListener("click", () => {
      if (!todoItem.classList.contains("save-state")) {
        editTodoItem(todoItem);
      } else {
        saveTodoItem(todoItem);
      }
    });

    return todoItem;
  },

  getAddButtonNode: () => document.querySelector(".add-button"),

  getInputNode: () => document.querySelector(".main-input"),

  getTodoItemListContainerNode: () =>
    document.querySelector(".todo-item-container"),

  getRemoveCheckedButtonNode: () =>
    document.querySelector(".remove-checked-button"),

  getProgressbarNode: () => document.querySelector(".progress"),
  getProgressbarTextNode: () => document.querySelector(".progress-text"),
  getProgressbarLoadingNode: () => document.querySelector(".progress-bar"),

  getTodoItemChildNodes(todoItem) {
    const text = todoItem.querySelector(".todo-item-text");
    const editButton = todoItem.querySelector(".todo-item-edit-button");
    const checkbox = todoItem.querySelector(".todo-item-checkbox");

    return { text, editButton, checkbox };
  },
};
