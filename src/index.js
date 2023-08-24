import './style.css';

const todos = [
  {
    description: 'Wash the dishes',
    completed: true,
    index: 1,
  },
  {
    description: 'complete todo list project',
    completed: true,
    index: 2,
  },
  {
    description: 'fix car',
    completed: true,
    index: 3,
  },
];

function populateList() {
  const mylist = document.getElementById('list');

  for (let i = 0; i < todos.length; i += 1) {
    const div = document.createElement('div');
    div.className = 'listElement';
    const description = document.createElement('p');
    description.innerText = todos[i].description; // Fix typo here
    const completeTask = document.createElement('div');
    completeTask.className = 'completeTask';
    const completeButton = document.createElement('button');
    completeTask.appendChild(completeButton);
    completeButton.innerText = 'c';
    completeButton.className = 'completeButton';

    const remove = document.createElement('button');
    remove.className = 'removeBtn';
    remove.innerText = 'X'; // Set button text using innerText property

    div.appendChild(completeTask);
    div.appendChild(description);
    div.appendChild(remove);

    mylist.appendChild(div);
  }
}

document.addEventListener('DOMContentLoaded', populateList);
