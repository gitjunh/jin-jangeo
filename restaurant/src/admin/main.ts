import './admin.css';
import { initAdminApp } from './AdminApp';

const root = document.getElementById('admin-app');
if (!root) throw new Error('#admin-app not found');
void initAdminApp(root);
