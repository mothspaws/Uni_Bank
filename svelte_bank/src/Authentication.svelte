<script>
    import axios from "axios";
    import { navigate } from "svelte-routing";

    let code = "";
    let errorMessage = "";

    async function handleSubmit() {
        const username = localStorage.getItem("username");

        try {
            const response = await axios.post(
                "http://localhost:3001/api/authenticate",
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
    }

    .auth-form input {
        margin-bottom: 1rem;
        padding: 0.5rem;
    }

    .auth-form button {
        padding: 0.5rem;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
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
