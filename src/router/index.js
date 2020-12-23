import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import Vote from '../views/Vote.vue';
import Admin from '../views/Admin.vue';
import NewElection from '../components/NewElection.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},

	{
		path: '/admin',
		name: 'Admin',
		component: Admin,
		children: [
			{
				name: 'New',
				path: 'new',
				component: NewElection
			}

		]
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