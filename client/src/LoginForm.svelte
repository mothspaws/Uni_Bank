<script>
    import * as axios from "axios";
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
                "https://unibank.herokuapp.com/api/login",
                {
                    username,
                    password,
                }
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
        placeholder="username"
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
        background-color: white;
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);
        border-radius: 5px;
    }

    .login-form h2 {
        margin-bottom: 1rem;
        text-align: center;
    }

    .error-message {
        color: #ff4d4f;
        text-align: center;
        margin-bottom: 1rem;
    }

    .login-form input {
        margin-bottom: 1rem;
        padding: 0.5rem;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
    }

    .login-form input:focus {
        border-color: #40a9ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }

    .login-form button {
        padding: 0.5rem;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.2s;
    }

    .login-form button:hover {
        background-color: #0056b3;
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
