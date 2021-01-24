function checkTodoItem(todoItem){
	if (todoItem.classList.contains('save-state')){
		saveTodoItem(todoItem)
	}

	const { text } = nodeManager.getTodoItemChildNodes(todoItem);
	const listContainer = nodeManager.getTodoItemListContainerNode();

	text.style.textDecoration = 'line-through';
	if(listContainer.lastChild !== todoItem){
		listContainer.removeChild(todoItem)
		listContainer.append(todoItem)
	}
}

function uncheckTodoItem(todoItem){
	const listContainer = nodeManager.getTodoItemListContainerNode();
	const { text } = nodeManager.getTodoItemChildNodes(todoItem)

	text.style.textDecoration = '';
	listContainer.removeChild(todoItem)
	listContainer.insertBefore(todoItem, listContainer.children[todoItem.index])
}

function editTodoItem(todoItem) {
	const { checkbox, leftWrapper, text } = nodeManager.getTodoItemChildNodes(todoItem);
	const editInput = document.createElement("input");

	if (checkbox.checked) {
	uncheckTodoItem(todoItem);
	checkbox.checked = false;
	editProgress();
	}

	leftWrapper.replaceChild(editInput, text)
	editInput.value = text.innerText;
	editInput.classList.add('edit-input', `edit-input-${todoItem.index}`);
	todoItem.classList.replace('edit-state','save-state');
	editInput.focus();
}

function saveTodoItem(todoItem) {
	const text = document.createElement("span");
	const editInput = document.querySelector(`.edit-input-${todoItem.index}`);
	const { leftWrapper } = nodeManager.getTodoItemChildNodes(todoItem);

	text.classList.add("todo-item-text");
	todoItem.classList.replace('save-state', 'edit-state')
	text.innerText = editInput.value;

	leftWrapper.replaceChild(text, editInput);
}

function removeTodoItem(todoItem){
	const listContainer = nodeManager.getTodoItemListContainerNode();

	listContainer.removeChild(todoItem);
	reIndexNodeList(listContainer.children);
	editProgress();
}

function addTodoItem(inputNode){
	if (inputNode.value){
		nodeManager.getTodoItemListContainerNode().append(nodeManager.createTodoItemNode(inputNode.value))
		inputNode.value = ''
		editProgress();
	}
}

function removeCheckedTodos(){
	const listContainer = nodeManager.getTodoItemListContainerNode();
	const todoItems = [...listContainer.children]
	const checkedTodoItems = todoItems.filter(item => nodeManager.getTodoItemChildNodes(item).checkbox.checked)

	checkedTodoItems.forEach(item=> listContainer.removeChild(item))
	reIndexNodeList(listContainer.children);
	editProgress();
}

function editProgress() {
	const { progressLoadingNode, progressTextNode } = nodeManager.getProgressbarChildNodes();
	const { children } = nodeManager.getTodoItemListContainerNode();
	const todoItems = [...children];
	const totalItems = todoItems.length;
	const checkedItemsCount = todoItems.reduce((acc, el) => (acc += Number(nodeManager.getTodoItemChildNodes(el).checkbox.checked)), 0);
	const progress = Math.ceil((checkedItemsCount / todoItems.length) * 100);
	progressLoadingNode.style.width = `${progress}%`;
	progressTextNode.innerText = `${checkedItemsCount} of ${totalItems} tasks done`;
}
