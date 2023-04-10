<!-- App.svelte -->
<script>
	import LoginForm from "./LoginForm.svelte";
	import Authentication from "./Authentication.svelte";
  
	let isLoggedIn = false;
  
	function handleLogin() {
	  isLoggedIn = true;
	}
  </script>
  
  
  <main>
	<h1>UniBank</h1>
	{#if !isLoggedIn}
	  <LoginForm on:login="{handleLogin}" />
	{:else}
	  <Authentication />
	{/if}
  </main>
  

<style>
	/* ADD global variables */
</style>
