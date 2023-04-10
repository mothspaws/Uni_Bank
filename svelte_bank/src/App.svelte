<script>
	import { Router, Route } from "svelte-routing";
	import LoginPage from "./LoginForm.svelte";
	import AuthenticationPage from "./Authentication.svelte";
	import MainPage from "./MainPage.svelte";
</script>

<Router>
	<Route path="/" component={LoginPage} />
	<Route path="/authenticate" component={AuthenticationPage} />
	<Route path="/main" component={MainPage} />
</Router>

<style>
	/* global styles here */
</style>
