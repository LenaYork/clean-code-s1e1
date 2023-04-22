var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incompleted-tasks");//ul of #incompleteTasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks

//New task list item
var createNewTaskElement=function(taskString){
    var listItem=document.createElement("li");
    listItem.classList.add("main_incompleted__item", "item");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image
    deleteButtonImg.classList.add("button__img");
    deleteButtonImg.setAttribute("alt", "remove icon");

    label.innerText=taskString;
    label.classList.add("item__label", "task");

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.classList.add("item__input", "item__checkbox");
    editInput.type="text";
    editInput.classList.add("item__input", "item__input_text", "task");
    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.classList.add("item__edit-button", "button");

    deleteButton.classList.add("item__delete-button", "button");
    deleteButtonImg.src='./remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";
}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem=this.parentNode;

    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelectorAll("button")[0];
    var containsClass=listItem.classList.contains("edit-block");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
        label.classList.remove("edit-block__label");
        label.classList.add("item__label");
        editInput.classList.remove("edit-block__input", "edit-block__input_text", "input_text", "edit-block__item");
        editInput.classList.add("item__input", "item__input_text");
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
        label.classList.add("edit-block__label");
        label.classList.remove("item__label");
        editInput.classList.add("edit-block__input", "edit-block__input_text", "input_text", "edit-block__item");
        editInput.classList.remove("item__input", "item__input_text");
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("edit-block");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
    listItem.querySelector("label").classList.add("item__label_completed");
}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
    listItem.querySelector("label").classList.remove("item__label_completed");
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
//addButton.onclick=addTask;   //иначе срабатывает 2 раза
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".item__checkbox");
    var editButton=taskListItem.querySelectorAll("button")[0];
    var deleteButton=taskListItem.querySelectorAll("button")[1];


    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

// cycle over incompleteTaskHolder ul list items
// for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.