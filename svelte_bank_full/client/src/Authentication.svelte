<script>
    import axios from "axios";
    import { navigate } from "svelte-routing";
    
    const API_URL = "https://unibank.herokuapp.com";

    let code = "";
    let errorMessage = "";

    async function handleSubmit() {
        const username = localStorage.getItem("username");

        try {
            const response = await axios.post(
                `${API_URL}/api/authenticate`,
                {
                    username,
                    code,
                }
            );

            if (response.data.success) {
                console.log("Authenticated");
                navigate("/main");
            } else {
                console.log("Not Authenticated");
                errorMessage = "Wrong code";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
</script>

<div class="auth-form">
    <h2>Authentication</h2>
    <p class="error-message">{errorMessage}</p>
    <input
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        minlength="6"
        maxlength="6"
        placeholder="6-digit code"
        bind:value={code}
        required
    />
    <button on:click={handleSubmit}>Authenticate</button>
</div>

<style>
    .auth-form {
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

    .auth-form h2 {
        margin-bottom: 1rem;
        text-align: center;
    }

    .error-message {
        color: #ff4d4f;
        text-align: center;
        margin-bottom: 1rem;
    }

    .auth-form input {
        margin-bottom: 1rem;
        padding: 0.5rem;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
    }

    .auth-form input:focus {
        border-color: #40a9ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }

    .auth-form button {
        padding: 0.5rem;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.2s;
    }

    .auth-form button:hover {
        background-color: #0056b3;
    }

    /* Responsive styles */
    @media (min-width: 768px) {
        .auth-form {
            width: 50%;
        }
    }

    @media (min-width: 992px) {
        .auth-form {
            width: 30%;
        }
    }
</style>
