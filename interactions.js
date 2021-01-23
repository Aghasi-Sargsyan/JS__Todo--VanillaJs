function checkTodoItem(todoItem){
	const { editButton } = nodeManager.getTodoItemChildNodes(todoItem);
	if (editButton.isSave){
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

function editTodoItem(todoItem){
	const { checkbox, editButton, text } = nodeManager.getTodoItemChildNodes(todoItem)
	const editInput = document.createElement('input');

	if (checkbox.checked) {
		uncheckTodoItem(todoItem)
		checkbox.checked = false;
		editProgress();
	}

	editInput.className = `editInput${todoItem.index}`
	editInput.value = text.innerText;
	todoItem.removeChild(text)
	todoItem.insertBefore(editInput, editButton)
	editButton.innerText = 'save';
	editButton.isSave = true;
}

function saveTodoItem(todoItem){
	const text = document.createElement('span');
	const editInput = document.querySelector(`.editInput${todoItem.index}`);
	const { editButton } = nodeManager.getTodoItemChildNodes(todoItem);

	text.className = 'todo-item-text';
	editButton.innerText = 'edit';
	editButton.isSave = false;
	text.innerText = editInput.value;
	todoItem.insertBefore(text, editButton);
	todoItem.removeChild(editInput);
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

function editProgress(){
	const { children } = nodeManager.getTodoItemListContainerNode();
	const todoItems = [ ...children ];
	const totalItems = todoItems.length;
	const checkedItemsCount = todoItems.reduce((acc, el)=> acc+=Number(nodeManager.getTodoItemChildNodes(el).checkbox.checked), 0);

	nodeManager.getProgressbarNode().innerText = `${checkedItemsCount} of ${totalItems} tasks done`;
}
