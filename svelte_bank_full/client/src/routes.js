import LoginForm from "./LoginForm.svelte";
import Authentication from "./Authentication.svelte";
import MainPage from "./MainPage.svelte";
import Payment from "./Payment.svelte"

const routes = [
    { name: "/", component: LoginForm },
    { name: "authentication", component: Authentication },
    { name: "main", component: MainPage },
    { name: "payment", component: Payment }
];

export default routes;
