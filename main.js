nodeManager
  .getRemoveCheckedButtonNode()
  .addEventListener("click", () => removeCheckedTodos());

nodeManager
  .getAddButtonNode()
  .addEventListener("click", () => addTodoItem(nodeManager.getInputNode()));
