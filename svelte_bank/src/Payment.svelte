<script>
    import { navigate } from "svelte-routing";
    import { onMount } from "svelte";

    let amount = 0;
    let currency = "";
    let errorMessage = "";
    let username = localStorage.getItem("username");

    onMount(async () => {
        try {
            // request server to amount and currency
            const url = `http://localhost:3001/api/generate-payments`;
            console.log("Requesting URL:", url); // Log the requested URL
            const response = await fetch(url, {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            const data = await response.json();
            amount = data.amount;
            currency = data.currency;
        } catch (error) {
            console.error("Error fetching user data:", error);
            errorMessage = "Error fetching user data";
        }
    });

    async function handleOk() {
        // Handle the "Ok" button click event
        console.log("Payment accepted");

        try {
            const url = `http://localhost:3001/api/payment`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    currency,
                    amount,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            const data = await response.json();
            if (data.result) {
                console.log("Payment successful");
                navigate("/main");
            } else {
                console.log("Payment failed");
                errorMessage = "Transaction was not successful";
            }
        } catch (error) {
            console.error("Error making payment:", error);
        }
    }

    function handleReject() {
        // Handle the "Reject" button click event
        console.log("Payment rejected");
        navigate("/main");
    }
</script>

<div class="payment-container">
    <h1>Payment</h1>
    <p class="error-message">{errorMessage}</p>
    {#if currency != ""}
        <div class="payment-info">Amount: {amount} {currency}</div>
        <div>
            <button class="reject" on:click={handleReject}>Reject</button>
            <button on:click={handleOk}>Ok</button>
        </div>
    {:else}
        <div>Loading...</div>
    {/if}
</div>

<style>
    .payment-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        font-family: Arial, sans-serif;
    }

    .payment-info {
        margin-bottom: 20px;
        font-size: 1.5em;
        font-weight: bold;
    }

    button {
        font-size: 1em;
        padding: 8px 16px;
        margin: 4px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        background-color: #007bff;
        color: #ffffff;
    }

    button.reject {
        background-color: #ff5e5e;
    }
</style>
