import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import Vote from '../views/Vote.vue';
import Login from '../views/Login.vue';
import Admin from '../views/Admin.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},

	{
		path: '/login',
		name: 'Login',
		component: Login,
	},

	{
		path: '/admin',
		name: 'Admin',
		component: Admin,
	},
	
	{
		path: '/vote/:token',
		name: 'Vote',
		component: Vote,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;