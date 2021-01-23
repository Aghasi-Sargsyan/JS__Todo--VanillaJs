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

		removeButton.addEventListener('click', ()=>{
			removeTodoItem(todoItem)
		})

		editButton.addEventListener('click', ()=>{
			if (!editButton.isSave){
				editTodoItem(todoItem)
			}else {
				saveTodoItem(todoItem)
			}
		})

		return todoItem;
	},

	getAddButton(){
		return document.querySelector('.add-button');
	},

	getInput(){
		return document.querySelector('.main-input');
	},

	getTodoItemListContainer(){
		return document.querySelector('.todo-item-container');
	},

	getRemoveCheckedButton(){
		return document.querySelector('.remove-checked-button');
	},

	getProgressbar(){
		return document.querySelector('.progress');
	},

}
