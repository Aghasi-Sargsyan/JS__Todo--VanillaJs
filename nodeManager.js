const nodeManager = {
	todoItemIndex: 0,

	createTodoItemNode(text){
		const todoItem = document.createElement('div');
		todoItem.className = 'todo-item'
		todoItem.index = String(this.todoItemIndex++);
		const checkbox = document.createElement('input')
		checkbox.type = 'checkbox'
		checkbox.className = 'todo-item-checkbox'
		const itemText = document.createElement('span')
		itemText.innerText = text;
		itemText.className = 'todo-item-text'
		const editButton = document.createElement('button')
		editButton.innerText = 'edit';
		editButton.className = 'todo-item-edit-button'
		editButton.isSave = false;
		const removeButton = document.createElement('button')
		removeButton.innerText = 'remove';
		removeButton.className = 'todo-item-remove-button'
		todoItem.append(checkbox)
		todoItem.append(itemText)
		todoItem.append(editButton)
		todoItem.append(removeButton)

		checkbox.addEventListener('change', ()=>{
			if (checkbox.checked){
				checkTodoItem(todoItem);
			}else {
				uncheckTodoItem(todoItem)
			}
			editProgress()
		})

		removeButton.addEventListener('click', ()=> removeTodoItem(todoItem))

		editButton.addEventListener('click', ()=>{
			if (!editButton.isSave){
				editTodoItem(todoItem)
			}else {
				saveTodoItem(todoItem)
			}
		})

		return todoItem;
	},

	getAddButtonNode: ()=> document.querySelector('.add-button'),

	getInputNode: ()=> document.querySelector('.main-input'),

	getTodoItemListContainerNode: ()=> document.querySelector('.todo-item-container'),

	getRemoveCheckedButtonNode: ()=> document.querySelector('.remove-checked-button'),

	getProgressbarNode: ()=> document.querySelector('.progress'),

	getTodoItemChildNodes(todoItem) {
		const text = todoItem.querySelector('.todo-item-text')
		const editButton = todoItem.querySelector('.todo-item-edit-button')
		const checkbox = todoItem.querySelector('.todo-item-checkbox')

		return {text, editButton, checkbox}
	}


}
