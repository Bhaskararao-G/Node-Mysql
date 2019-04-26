$(document).ready(function () {
	getTodos();
});

var todos_data = '',todos_arr = [];

function getTodos() {
	$.get( "/get_todos", (res) => {
		if (res.data.length > 0) {
			loopTodos(res.data);
		}
	})
}

function loopTodos(data) {
	for (var i = 0; i < data.length; i++) {
		todos_data += '<div class="alert alert-success">'+ data[i].name +'<span class="close_icon" onclick="deleteTodo('+data[i].id+')">&times;</span></div>';
	}
	$("#todos_list").html(todos_data);
}

function onEnterTodo(e) {
	if (e.keyCode == 13) {
		var data = { name: e.target.value };

		$.post("/insert",data, (res)=>{
		    if (res.data.length > 0) {
		    	todos_data = '';
		    	e.target.value = '';
				loopTodos(res.data);
			}
		});
	}
}

function deleteTodo(id) {
	var data = { id: id };

	$.post("/delete",data, (res)=>{
	    if (res.data.length > 0) {
	    	todos_data = '';
			loopTodos(res.data);
		}
	});
}

