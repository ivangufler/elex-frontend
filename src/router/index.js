import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import Vote from '../views/Vote.vue';
import ElectionList from '../views/ElectionList.vue';
import NewElection from '../components/NewElection.vue'
import ElectionDetail from '../views/ElectionDetail.vue'
import AfterVote from '../views/AfterVote.vue'
import ErrorVote from '../views/ErrorVote.vue'



const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},

	{
		path: '/:pathMatch(.*)*',
		redirect: '/'
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

	{
		path: '/after',
		name: 'After',
		component: AfterVote,
	},

	{
		path: '/error',
		name: 'Error',
		component: ErrorVote,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;