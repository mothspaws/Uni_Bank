<script>
  import { onMount } from "svelte";
  let username = localStorage.getItem("username");
  let currencies = [];
  let currentCurrencyIndex = 0;
  let existing_currencies = [];
  let errorMessage = "";
  let amount;
  let currency;

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

  function formatDate(timeStamp) {
    const date = new Date(timeStamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we add 1
    const year = date.getFullYear();

    const time = date.toLocaleTimeString("cs-CZ", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return { date: `${day}.${month}.${year}`, time };
  }

  async function getStory() {
    // request server to amount and currency
    try {
      const url = `https://unibank.herokuapp.com/api/user-data/${username}`;
      // localhost
      // const url = `http://localhost:3001/api/user-data/${username}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      currencies = data.currencies;
      console.log(currencies[0].transaction);
    } catch (error) {
      console.error("Error fetching user data:", error);
      errorMessage = "Error fetching user data";
    }
    // request server to existing currencies
    try {
      const url = `https://unibank.herokuapp.com/api/currencies`;
      // localhost
      // const url = `http://localhost:3001/api/currencies`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      existing_currencies = data.currencies;

    } catch (error) {
      console.error("Error fetching currencies:", error);
      errorMessage = "Error fetching currencies";
    }
  }

  onMount(async () => {
    getStory();
  });

  async function makePayment(amount, currency) {
    if (amount && currency) {
      // convert amount to a number
      amount = Number(amount);
      try {
        // const url = "http://localhost:3001/api/payment";
        const url = "https://unibank.herokuapp.com/api/payment";
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
          getStory();
        } else {
          console.log("Payment failed");
          errorMessage = "Transaction was not successful";
        }
      } catch (error) {
        console.error("Error making payment:", error);
      }
    }
  }

  async function changeCurrency() {
    currentCurrencyIndex = (currentCurrencyIndex + 1) % currencies.length;
  }
</script>

<div class="main-page">
  <div class="header-container">
    <h1>Uni Bank transactions</h1>
    <p class="error-message">{errorMessage}</p>
  </div>
  {#if currencies.length > 0}
    <div class="balance-and-change-currency">
      <h2>
        {currencies[currentCurrencyIndex].balance}
        {getCurrencySymbol(currencies[currentCurrencyIndex].currency)}
      </h2>
      <button class="change-currency" on:click={() => changeCurrency()}>
        Change currency
      </button>
    </div>
    <div class="operations">
      <div class="title-and-input">
        <h3>Transaction history:</h3>
        <div class="input-container">
          <input
            required=""
            placeholder="Amount"
            inputmode="numeric"
            maxlength="10"
            pattern="^[0-9]+([-.][0-9]+)?$"
            bind:value={amount}
          />
          <select bind:value={currency}>
            {#each existing_currencies as cur}
              <option value={cur.code}>
                {cur.code} ({getCurrencySymbol(cur.code)})
              </option>
            {/each}
          </select>
          <button
            class="invite-btn"
            type="button"
            on:click={() => makePayment(amount, currency)}
          >
            Pay
          </button>
        </div>
      </div>
      <table class="history">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {#each currencies[currentCurrencyIndex].transactions as transaction}
            <tr>
              <td>{formatDate(transaction.dateTime).date}</td>
              <td>{formatDate(transaction.dateTime).time}</td>
              <td
                class:positive={transaction.amount >= 0}
                class:negative={transaction.amount < 0}>{transaction.amount}</td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <div>Loading...</div>
  {/if}
</div>

<style>
  .main-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
    box-sizing: border-box;
    background-color: white;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    border-radius: 5px;
  }

  .header-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
  }

  .error-message {
    color: #ff4d4f;
    text-align: center;
    margin-bottom: 1rem;
  }

  .balance-and-change-currency {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
  }

  .balance-and-change-currency h2 {
    color: #4b6584;
    font-size: 1.5rem auto;
  }

  .change-currency {
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.2s;
  }

  .change-currency:hover {
    background-color: #0056b3;
  }

  .operations {
    width: 100%;
    margin-bottom: 1rem;
  }

  .title-and-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .input-container {
    position: relative;
    display: flex;
    height: 2.2rem;
    width: 100%;
    min-width: 200px;
    max-width: 250px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.05);
    margin-left: 1rem;
  }

  .input-container input,
  .input-container select {
    height: 100%;
    width: 100%;
    border-radius: 8px;
    border: 1px solid rgb(176 190 197);
    background-color: transparent;
    /* padding: 0.2rem 70px 0.2rem 0.75rem;*/ /* Adjust top and bottom padding */
    font-size: 0.9rem; /* Adjust font size */
    line-height: 1.25rem;
    font-weight: 400;
    color: rgb(69 90 100);
    outline: none;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .input-container input:focus,
  .input-container select:focus {
    border: 1px solid rgb(236 72 153);
  }

  .input-container input {
    width: 50%; /* Adjust the width of the input element */
    /* padding: 0.2rem 50px 0.2rem 0.75rem; Adjust the right padding */
  }

  .input-container select {
    width: 50%; /* Adjust the width of the select element */
  }

  .invite-btn {
    position: absolute;
    margin: auto;
    width: 50px; /* Adjust the width of the button */
    right: 4px;
    top: 4px;
    bottom: 4px;
    z-index: 10;
    border-radius: 4px;
    background-color: rgb(236 72 153);
    color: #fff;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    text-align: center;
    vertical-align: middle;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    border: none;
    transition: 0.6s ease;
  }

  .invite-btn:hover {
    right: 2px;
    top: 2px;
    bottom: 2px;
    border-radius: 8px;
  }

  .input-container input:placeholder-shown ~ .invite-btn {
    pointer-events: none;
    background-color: rgb(161, 161, 161);
    opacity: 0.5;
  }

  .history {
    width: 100%;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    border-collapse: collapse;
  }

  .history td,
  .history th {
    padding: 12px 15px;
  }

  .history tbody td {
    font-size: 13px;
  }

  .history tr:nth-child(even) {
    background: #f3f3f3;
  }

  .history thead {
    background: #007bff;
  }

  .history thead th {
    font-size: 17px;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
  }

  .history tfoot td {
    font-size: 14px;
  }

  .positive {
    color: green;
  }

  .negative {
    color: red;
  }

  /* Responsive styles */
  @media (min-width: 768px) {
    .main-page {
      width: 70%;
    }
  }

  @media (min-width: 992px) {
    .main-page {
      width: 50%;
    }
  }
</style>
