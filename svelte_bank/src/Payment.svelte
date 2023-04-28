<script>
    import { navigate } from "svelte-routing";
    import { onMount } from "svelte";

    let amount = 0;
    let currency = "";

    onMount(async () => {
        try {
            // request server to amount and currency
            const url = `http://localhost:3001/api/generate-payments`;
            console.log("Requesting URL:", url); // Log the requested URL
            const response = await fetch(url, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            const data = await response.json();
            amount = data.amount;
            currency = data.currency;
            console.log("amount:", amount)
            console.log("currency:", currency)
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    });

    function handleOk() {
        // Handle the "Ok" button click event
        console.log("Payment accepted");
    }

    function handleReject() {
        // Handle the "Reject" button click event
        console.log("Payment rejected");
        navigate("/main");
    }
</script>

<div class="payment-container">
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
