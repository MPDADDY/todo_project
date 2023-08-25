let savedLists = JSON.parse(localStorage.getItem("savedLists")) || [];
const atricle = document.getElementById('list');
const clearCompleted = document.getElementById('clearCompleted');

export const AddNewTask = (event) => {
  event.preventDefault();
  const input = document.getElementById('todoInput');
  const inputDescription = input.value.trim();

  if (inputDescription) {
    const newTask = {
      id: savedLists.length,
      description: inputDescription,
      completed: false
    };

    savedLists.push(newTask);
    PopulateLocalStorage();
    renderLists();
    input.value = "";
  }
}

const PopulateLocalStorage = () => {
  localStorage.setItem("savedLists", JSON.stringify(savedLists));
}

const renderLists = () => {
  atricle.innerHTML = "";

  savedLists.forEach((list, index) => {
    const completeTask = document.createElement('div');
    completeTask.className = 'completeTask';
    const completeButton = document.createElement('button');
    completeButton.innerText = 'c';
    // add an event listener to the complete button
    completeButton.addEventListener('click', () => {
      markComplete(index);
      renderLists(); // Re-render the list after marking as complete
    });
    const task = document.createElement('p');
    task.innerText = list.description;

    task.addEventListener('click', () => {
      editTask(index, task);
    });
    // adding clear completed functionality
    clearCompleted.addEventListener('click', () => {
      clearCompletedClickHandler();
    })

    const remove = document.createElement('button');
    remove.className = 'removeBtn';
    remove.innerText = 'X';
    remove.setAttribute('draggable', true);

    // Dragstart event listener for the remove button
    remove.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', index.toString());
    });

    remove.addEventListener('click', () => {
      removeTask(index);
      renderLists();
    });

    completeTask.appendChild(completeButton);
    completeTask.appendChild(task);
    completeTask.appendChild(remove);

    atricle.appendChild(completeTask);
  });
}

const editTask = (index, taskElement) => {
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.value = taskElement.innerText;

  newInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      saveEditedTask(index, newInput);
    }
  });

  // Replace task element with the input field
  taskElement.parentNode.replaceChild(newInput, taskElement);

  newInput.focus(); // Focus the input for editing
};

//clear complete
const clearCompletedClickHandler = () => {
  savedLists = savedLists.filter(item => !item.completed);
  PopulateLocalStorage();
  // Re-render the task list
  renderLists();
  savedLists.forEach((task, newIndex) => {// update the id after task removal
    task.id = newIndex;
  });
}

//save edited task function
const saveEditedTask = (index, inputElement) => {
  const updatedDescription = inputElement.value.trim();

  if (updatedDescription) {
    savedLists[index].description = updatedDescription;
    PopulateLocalStorage();
    renderLists();
  }
}
//mark complete function
const markComplete = (index) => {
  if (index >= 0 && index < savedLists.length) {
    savedLists[index].completed = true
    PopulateLocalStorage();
  }
}
// remove task function
const removeTask = (index) => {
  if (index >= 0 && index < savedLists.length) {
    savedLists.splice(index, 1);
   
    savedLists.forEach((task, newIndex) => {// update the id after task removal
      task.id = newIndex;
    });

    PopulateLocalStorage();
  }
}

window.onload = () => {
  renderLists();
}
