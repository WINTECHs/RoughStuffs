//Add new todo show

var todo_add_show_hide_checker = 0

function todo_add_show_hide() {

    if (todo_add_show_hide_checker === 0) {
        document.getElementsByClassName('top')[0].style.height = "80%";
        document.getElementsByClassName('todo_add')[0].style.height = "100%";
        todo_add_show_hide_checker = 1;

        document.getElementById('add_btn').style.display = "block";
        document.getElementById('todo_subject').value = null;
        document.getElementById('todo_desc').value = null
        document.getElementsByClassName('todo_edit_contain')[0].style.cssText = "display:none";
    }
    else {
        document.getElementsByClassName('top')[0].style.height = "30%";
        document.getElementsByClassName('todo_add')[0].style.height = "0";
        todo_add_show_hide_checker = 0;
    }
}


// Store todo in local storage

const store = () => {
    let todo_subject = document.getElementById('todo_subject').value;
    let todo_desc = document.getElementById('todo_desc').value;
    let group = "TODOS";

    // Retrieve existing data from local storage
    let existingData = JSON.parse(localStorage.getItem(group)) || [];

    // Create a new to-do item
    let newTodo = {
        subject: todo_subject,
        description: todo_desc
    };

    // Add the new to-do item to the existing data
    existingData.push(newTodo);

    // Store the updated data back to local storage
    localStorage.setItem(group, JSON.stringify(existingData));
    alert("Successfully Added.");
    window.location.reload();
}

// Show todo in list

const displayTodos = () => {
    let group = "TODOS";
    let existingData = JSON.parse(localStorage.getItem(group)) || [];
    let todoContainer = document.getElementsByClassName('middle')[0];

    // Clear previous todos
    // todoContainer.innerHTML = '';

    // Create a new space for each todo item
    existingData.forEach((todo, index) => {
        let slno = index++;

        //creating div for todo_contain
        let todo_contain = document.createElement('div');
        todo_contain.className = 'todo_contain';
        todo_contain.id = 'todo_contain' + slno;
        todoContainer.appendChild(todo_contain);

        //creating div for todo_title(Child of todo_contain)
        let todo_title = document.createElement('div');
        todo_title.className = 'todo_title';
        todo_title.id = 'todo_title' + slno;
        todo_contain.appendChild(todo_title);

        //creating div for todo_body(Child of todo_contain)
        let todo_body = document.createElement('div');
        todo_body.className = 'todo_body';
        todo_body.id = 'todo_body' + slno;
        todo_contain.appendChild(todo_body);

        //creating spans for todo_title child
        let subject = document.createElement('span');
        let edit = document.createElement('span');
        let delet = document.createElement('span');
        subject.className = 'subject';
        subject.id = 'subject' + slno;
        subject.innerHTML = todo.subject;
        edit.className = 'edit';
        edit.id = 'edit' + slno;
        edit.innerHTML = `<input type="button" value="&#9998" id="edit${slno}" onclick="edittodo(this.id)">`;
        delet.className = 'delete';
        delet.id = 'delete' + slno;
        delet.innerHTML = `<input type="button" value="&#128465" id="delete${slno}" onclick="deletetodo(this.id)">`;
        todo_title.appendChild(subject);
        todo_title.appendChild(edit);
        todo_title.appendChild(delet);

        //creating span for todo_body child
        let description = document.createElement('span');
        description.className = 'description';
        description.id = 'description' + slno;
        description.innerHTML = todo.description;
        todo_body.appendChild(description);

    });
}
displayTodos(); // Call the function to display todos


// To delete a todo
const deletetodo = (idn) => {

    // catching idsl
    let slno = idn.charAt(idn.length - 1);

    // Retrieve the array from local storage
    let group = "TODOS";
    let existingData = JSON.parse(localStorage.getItem(group));

    // Take confirmation
    if (confirm(`Are you sure to DELETE ${existingData[slno].subject}?`)) {

        // Check if the array exists and has at least 7 elements
        if (existingData && existingData.length >= existingData.length) {

            // Remove the nth element
            existingData.splice(slno, 1);

            // Save the updated array back to local storage
            localStorage.setItem(group, JSON.stringify(existingData));
            alert("TODO Deleted.");
            window.location.reload();
        } else {
            console.error('Array does not exist or does not have enough elements.');
        }
    }
}

// To edit a todo
const edittodo = (idn) => {
    // catching idsl
    let slno = idn.charAt(idn.length - 1);

    // Retrieve the array from local storage
    let existingData = JSON.parse(localStorage.getItem("TODOS"));

    //Showing Edit Panel
    todo_add_show_hide();

    // Passing data to edit
    document.getElementById('todo_subject').value = existingData[slno].subject;
    document.getElementById('todo_desc').value = existingData[slno].description;
    document.getElementById('update_btn').setAttribute('onclick',`todoUpdate(${slno})`);

    // Showing Update,Cancel button and hiding Add button
    document.getElementById('add_btn').style.display = "none";
    document.getElementsByClassName('todo_edit_contain')[0].style.cssText = "display:flex";

}

const todoUpdate = (slno) => {
    // Getting Updated values
    let todo_subject = document.getElementById('todo_subject').value;
    let todo_desc = document.getElementById('todo_desc').value;

    // Retrieve the array from local storage
    let group = "TODOS";
    let existingData = JSON.parse(localStorage.getItem(group));

    // creating object for updated to-do
    let newTodo = {
        subject: todo_subject,
        description: todo_desc
    };

    // Updating to-do item to the existing data
    existingData[slno] = newTodo;

    // Store the updated data back to local storage
    localStorage.setItem(group, JSON.stringify(existingData));
    alert("TODO Updated.");
    window.location.reload();

}

const todoUpdateCancel = () => {
    todo_add_show_hide();
}