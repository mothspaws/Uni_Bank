<script>
    import axios from "axios";
    import { navigate } from "svelte-routing";

    let username = "";
    let password = "";
    let errorMessage = "";

    async function handleSubmit() {
        /*
        Send a POST request to the server with the username and password
        */
        try {
            const response = await axios.post(
                "http://localhost:3001/api/login",
                { username, password }
            );

            if (response.data.success) {
                localStorage.setItem("username", username); // Save the username in the localStorage
                navigate("/authentication");
            } else {
                errorMessage = "User was not found";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
</script>

<div class="login-form">
    <h2>Login</h2>
    <p class="error-message">{errorMessage}</p>
    <input
        type="username"
        placeholder="name.surename"
        bind:value={username}
        required
    />
    <input
        type="password"
        placeholder="password"
        bind:value={password}
        required
    />
    <!-- on click send request to server -->
    <button on:click={handleSubmit}>Login</button>
</div>

<style>
    .login-form {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 300px;
        margin: 0 auto;
        padding: 1rem;
        box-sizing: border-box;
    }

    .login-form input {
        margin-bottom: 1rem;
        padding: 0.5rem;
    }

    .login-form button {
        padding: 0.5rem;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }

    /* Responsive styles */
    @media (min-width: 768px) {
        .login-form {
            width: 50%;
        }
    }

    @media (min-width: 992px) {
        .login-form {
            width: 30%;
        }
    }
</style>
