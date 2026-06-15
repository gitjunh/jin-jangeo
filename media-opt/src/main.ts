import './style.css';
import { initApp } from './App';

const root = document.getElementById('app');
if (!root) throw new Error('#app element not found');

initApp(root);
