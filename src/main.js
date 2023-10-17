import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Istockmall Front-and',
		dev: 'dev 1.0',
	}
});

export default app;