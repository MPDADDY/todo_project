const myApp = () => {
  let savedLists = JSON.parse(localStorage.getItem('savedLists')) || [];
  const atricle = document.getElementById('list');
  const clearCompleted = document.getElementById('clearCompleted');
  const PopulateLocalStorage = () => {
    localStorage.setItem('savedLists', JSON.stringify(savedLists));
  };

  const removeTask = (index) => {
    if (index >= 0 && index < savedLists.length) {
      savedLists.splice(index, 1);

      savedLists.forEach((task, newIndex) => { // update the id after task removal
        task.id = newIndex;
      });

      PopulateLocalStorage();
    }
  };

  const markComplete = (index, completed) => {
    if (index >= 0 && index < savedLists.length) {
      savedLists[index].completed = completed;
      PopulateLocalStorage();
    }
  };

  const renderLists = () => {
    const AddButton = document.getElementById('add');
    atricle.innerHTML = '';

    const AddNewTask = (event) => {
      event.preventDefault();
      const input = document.getElementById('todoInput');
      const inputDescription = input.value.trim();

      if (inputDescription) {
        const newTask = {
          id: savedLists.length,
          description: inputDescription,
          completed: false,
        };

        savedLists.push(newTask);
        PopulateLocalStorage();
        renderLists();
        input.value = '';
      }
    };

    savedLists.forEach((list, index) => {
      const completeTask = document.createElement('div');
      completeTask.className = 'completeTask';

      // Create a checkbox for marking tasks as complete
      const completeCheckbox = document.createElement('input');
      completeCheckbox.type = 'checkbox';
      completeCheckbox.checked = list.completed;

      completeCheckbox.addEventListener('change', (event) => {
        markComplete(index, event.target.checked);
        renderLists(); // Re-render the list after marking as complete
      });

      const task = document.createElement('p');
      task.innerText = list.description;

      const editTask = (index, taskElement) => {
        // ... your existing editTask code ...
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.value = taskElement.innerText;

        // save edited task function
        const saveEditedTask = (index, inputElement) => {
          const updatedDescription = inputElement.value.trim();

          if (updatedDescription) {
            savedLists[index].description = updatedDescription;
            PopulateLocalStorage();
            renderLists();
          }
        };

        // ... your existing task click event listener ...
        newInput.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            saveEditedTask(index, newInput);
          }
        });
        // Replace task element with the input field
        taskElement.parentNode.replaceChild(newInput, taskElement);

        newInput.focus(); // Focus the input for editing
      };

      task.addEventListener('click', () => {
        editTask(index, task);
      });

      // ... your existing clear completed functionality ...
      const clearCompletedClickHandler = () => {
        savedLists = savedLists.filter((item) => !item.completed);
        PopulateLocalStorage();
        // Re-render the task list
        renderLists();
        savedLists.forEach((task, newIndex) => { // update the id after task removal
          task.id = newIndex;
        });
      };
      // adding clear completed functionality
      clearCompleted.addEventListener('click', () => {
        clearCompletedClickHandler();
      });

      const remove = document.createElement('button');
      remove.className = 'removeBtn';
      remove.innerText = 'X';
      remove.setAttribute('draggable', true);

      // ... your existing remove event listener ...
      remove.addEventListener('click', () => {
        removeTask(index);
        renderLists();
      });

      completeTask.appendChild(completeCheckbox);
      completeTask.appendChild(task);
      completeTask.appendChild(remove);

      atricle.appendChild(completeTask);
    });

    AddButton.addEventListener('click', AddNewTask);
  };

  window.onload = () => {
    renderLists();
  };
};

export default myApp;