<script>
    import { navigate } from "svelte-routing";
    import { onMount } from "svelte";

    const API_URL = "https://unibank.herokuapp.com";
    let amount = 0;
    let currency = "";
    let errorMessage = "";
    let username = localStorage.getItem("username");
    function getCurrencySymbol(currency) {
        const currencySymbols = {
            EUR: "€",
            INR: "₹",
            ILS: "₪",
            JPY: "¥",
            KRW: "원",
            USD: "$",
            GBP: "£",
            CZK: "Kč",
        };
        return currencySymbols[currency] || currency;
    }
    onMount(async () => {
        try {
            // request server to amount and currency
            const url = `${API_URL}/api/generate-payments`;
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
            const url = `${API_URL}/api/payment`;
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
        <div class="payment-info">
            {amount}
            {getCurrencySymbol(currency)}
        </div>
        <div class="button-wrapper">
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
        position: relative;
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

    .payment-container h1 {
        margin-bottom: 1rem;
        text-align: center;
    }

    .error-message {
        color: #ff4d4f;
        text-align: center;
        margin-bottom: 1rem;
    }

    .payment-info {
        margin-bottom: 20px;
        font-size: 1.5em;
        font-weight: bold;
        text-align: center;
        color: #4b6584;
    }

    .button-wrapper {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 10px;
    }

    button {
        font-size: 1em;
        padding: 8px 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #007bff;
        color: #ffffff;
        transition: background-color 0.2s;
    }

    button.reject {
        background-color: #ff5e5e;
    }

    button:hover {
        background-color: #0056b3;
    }

    button.reject:hover {
        background-color: #e63636;
    }

    /* Responsive styles */
    @media (min-width: 768px) {
        .payment-container {
            width: 50%;
        }
    }

    @media (min-width: 992px) {
        .payment-container {
            width: 30%;
        }
    }
</style>
