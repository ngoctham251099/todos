var list = document.getElementById('list');
var input = document.getElementById('input');

var CHECK = "fa-check-circle";
var UNCHECK = "fa-circle";
var LINE_THROUGH = "lineThrough";

var LIST, id;

//get localStogare
var data = localStorage.getItem("TODO");

if(data)
{
	LIST = JSON.parse(data);
	id = LIST.length;
	LIST.forEach(function(item)
		{
			addTodo(item.name, item.id, item.done, item.trash);
		});
}else
{
	LIST = [];
	id = 0;
}

function addTodo(todo, id, done, trash)
{
	var DONE = done ? CHECK : UNCHECK;
	var LINE = done ? LINE_THROUGH : "";


	var item = `<li class="item">
                <i class="far ${DONE} co" option="complete" id=${id}></i>
                <p class="text" ${LINE} id="myP">${todo}</p>
                <i class="fas fa-trash-alt de" option="delete" id=${id}></i>
                `;
    var position = "beforeend";
    list.insertAdjacentHTML(position, item);

    	if(trash)
	{
		return;
	};

    //add item to localStorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
}

//add item to the list user the enter key
input.addEventListener("keyup",function(event)
{
	if(event.keyCode == 13)
	{
		var inputValue = input.value;

		if(inputValue)
		{
			addTodo(inputValue, id, false,false);
			LIST.push(
			{
				name: inputValue,
				id: id,
				done: false,
				trash: false
			});
			//add item to localStorage
   			localStorage.setItem("TODO", JSON.stringify(LIST));
			id++;
		}else
		{
			alert("You must write something!!!");
		}
		input.value = "";
	}
});

//add item to the list user the click 
var addInput = document.getElementById('addInput');
addInput.addEventListener("click", function(event)
{
	var inputValue = input.value;

	if(inputValue)
	{
		addTodo(inputValue, id, false,false);
		LIST.push(
		{
			name: inputValue,
			id: id,
			done: false,
			trash: false
		});
		//add item to localStorage
   	 	localStorage.setItem("TODO", JSON.stringify(LIST));
   	 	id++;
	}else
	{
		alert("You must write something!!!");
	}

	input.value = "";
});

//complete to do
function completeTodo(element)
{
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

	LIST.element.id.done = LIST.element.id.done ? false : true;

	localStorage.setItem("TODO", JSON.stringify(LIST));
}

//remove todo
function removeTodo(element)
{
	element.parentNode.parentNode.removeChild(element.parentNode);
	var id = LIST[element.id];
	LIST.splice(id, 1);
	localStorage.setItem("TODO", JSON.stringify(LIST));
};

//click item
list.addEventListener("click", function(event)
{
	var element = event.target;
	var elementOption = element.attributes.option.value;

	if(elementOption == "complete")
	{
		completeTodo(element);
	}else
	{
		if(elementOption == "delete")
		{
			removeTodo(element);
		}
	}

})
//addTodo("cofee", 1, true, true);