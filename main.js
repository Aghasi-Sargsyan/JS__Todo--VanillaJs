nodeManager.getRemoveCheckedButton().addEventListener('click', ()=>{
	removeCheckedTodos();
})

nodeManager.getAddButton().addEventListener('click', ()=>{
	const inputNode = nodeManager.getInput();
	addTodoItem(inputNode)
})


