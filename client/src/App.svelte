<script>
    import { Router, Route } from "svelte-routing";
    import routes from "./routes.js";
</script>

<Router>
    {#each routes as { name, component }}
        <Route path="{name}" let:params>
            <svelte:component this="{component}" {params} />
        </Route>
    {/each}
</Router>
