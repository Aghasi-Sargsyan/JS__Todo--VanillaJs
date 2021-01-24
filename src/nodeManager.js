const nodeManager = {
  todoItemIndex: 0,

  createTodoItemNode(text) {
    const todoItem = document.createElement("li");
    const checkbox = document.createElement("input");
    const itemText = document.createElement("span");
    const editButton = document.createElement("button");
    const removeButton = document.createElement("button");
    const dragButton = document.createElement("button");
    const todoItemLeftWrapper = document.createElement("div");
    const todoItemRightWrapper = document.createElement("div");

    todoItemLeftWrapper.classList.add("todo-item-left-wrapper");
    todoItemRightWrapper.classList.add("todo-item-right-wrapper");

    todoItem.classList.add("todo-item", "edit-state");
    todoItem.index = String(this.todoItemIndex++);

    checkbox.type = "checkbox";
    checkbox.classList.add("todo-item-checkbox");

    itemText.innerText = text;
    itemText.classList.add("todo-item-text");

    editButton.classList.add("todo-item-edit-button");

    removeButton.classList.add("todo-item-remove-button");

    dragButton.classList.add("todo-item-drag-button");

    todoItemLeftWrapper.append(checkbox, itemText);
    todoItemRightWrapper.append(dragButton, editButton, removeButton);
    todoItem.append(todoItemLeftWrapper, todoItemRightWrapper);

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

  getProgressbarChildNodes: () => {
    const progressTextNode = document.querySelector(".progress-text");
    const progressLoadingNode = document.querySelector(".progress-bar");

    return { progressTextNode, progressLoadingNode };
  },

  getTodoItemChildNodes(todoItem) {
    const text = todoItem.querySelector(".todo-item-text");
    const editButton = todoItem.querySelector(".todo-item-edit-button");
    const checkbox = todoItem.querySelector(".todo-item-checkbox");
    const dragButton = todoItem.querySelector(".todo-item-drag-button");
    const leftWrapper = todoItem.querySelector(".todo-item-left-wrapper");
    const rightWrapper = todoItem.querySelector(".todo-item-right-wrapper");

    return {
      text,
      editButton,
      checkbox,
      dragButton,
      leftWrapper,
      rightWrapper,
    };
  },
};
