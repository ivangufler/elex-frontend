import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import Vote from '../views/Vote.vue';
import ElectionList from '../views/ElectionList.vue';
import NewElection from '../components/NewElection.vue'
import ElectionDetail from '../views/ElectionDetail.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},

	{
		path: '/election',
		name: 'ElectionList',
		component: ElectionList,
		children: [
			{
				name: 'New',
				path: 'new',
				component: NewElection
			}

		]
	},

	{
		path: '/election/:id',
		name: 'ElectionDetail',
		component: ElectionDetail,
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