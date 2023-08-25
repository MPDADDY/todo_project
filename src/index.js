import './style.css';
import { AddNewTask } from './functionality.js';

const AddButton = document.getElementById('add');
AddButton.addEventListener('click', AddNewTask)