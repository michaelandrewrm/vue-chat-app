import VUser from '@views/VUser.vue';

export default [
	{
		path: '/',
		name: 'user',
		component: VUser,
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: () => import('@views/VDashboard.vue'),
	},
];
