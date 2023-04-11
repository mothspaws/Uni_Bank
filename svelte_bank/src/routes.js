import LoginForm from "./LoginForm.svelte";
import Authentication from "./Authentication.svelte";
import MainPage from "./MainPage.svelte";

const routes = [
    { name: "/", component: LoginForm },
    { name: "authentication", component: Authentication },
    { name: "main", component: MainPage },
];

export default routes;
