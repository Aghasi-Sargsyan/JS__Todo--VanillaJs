function checkTodoItem(todoItem) {
  const editButton = todoItem.querySelector(".todo-item-edit-button");
  if (editButton.isSave) {
    saveTodoItem(todoItem);
  }

  const listContainer = nodeManager.getTodoItemListContainer();
  const text = todoItem.querySelector(".todo-item-text");

  text.style.textDecoration = "line-through";
  if (listContainer.lastChild !== todoItem) {
    listContainer.removeChild(todoItem);
    listContainer.append(todoItem);
  }
}

function uncheckTodoItem(todoItem) {
  const listContainer = nodeManager.getTodoItemListContainer();
  const text = todoItem.querySelector(".todo-item-text");

  text.style.textDecoration = "";
  listContainer.removeChild(todoItem);
  listContainer.insertBefore(todoItem, listContainer.children[todoItem.index]);
}

function editTodoItem(todoItem) {
  const text = todoItem.querySelector(".todo-item-text");
  const editButton = todoItem.querySelector(".todo-item-edit-button");
  const checkbox = todoItem.querySelector(".todo-item-checkbox");
  const editInput = document.createElement("input");

  if (checkbox.checked) {
    uncheckTodoItem(todoItem);
    checkbox.checked = false;
  }

  editInput.className = `editInput${todoItem.index}`;
  editInput.value = text.innerText;
  todoItem.removeChild(text);
  todoItem.insertBefore(editInput, editButton);
  editButton.innerText = "save";
  editButton.isSave = true;
}

function saveTodoItem(todoItem) {
  const text = document.createElement("span");
  text.className = "todo-item-text";
  const editButton = todoItem.querySelector(".todo-item-edit-button");
  const editInput = document.querySelector(`.editInput${todoItem.index}`);

  editButton.innerText = "edit";
  editButton.isSave = false;
  text.innerText = editInput.value;
  todoItem.insertBefore(text, editButton);
  todoItem.removeChild(editInput);
}

function removeTodoItem(todoItem) {
  const listContainer = nodeManager.getTodoItemListContainer();

  listContainer.removeChild(todoItem);
  reIndexNodeList(listContainer.children);
  editProgress();
}

function addTodoItem(inputNode) {
  const text = inputNode.value;
  if (text) {
    nodeManager
      .getTodoItemListContainer()
      .append(nodeManager.createTodoItemNode(text));
    editProgress();
    inputNode.value = "";
  }
}

function removeCheckedTodos() {
  const listContainer = nodeManager.getTodoItemListContainer();
  const todoItems = [...listContainer.children];
  const checkedTodoItems = todoItems.filter((item) => {
    const checkbox = item.children[0];
    return checkbox.checked;
  });
  checkedTodoItems.forEach((item) => {
    listContainer.removeChild(item);
  });
  reIndexNodeList(listContainer.children);
  editProgress();
}

function editProgress() {
  const progressText = document.createElement("p");
  // const progressDefaultText =
  const { children } = nodeManager.getTodoItemListContainer();
  const todoItems = [...children];
  const totalItems = todoItems.length;
  const checkedItemsCount = todoItems.reduce(
    (acc, el) => (acc += Number(el.children[0].checked)),
    0
  );
  progressText.innerText = `${checkedItemsCount} of ${totalItems} tasks done`;
  nodeManager.getProgressbar().append(progressText);
}
