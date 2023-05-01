<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  const API_URL = "https://unibank.herokuapp.com";
  let username = localStorage.getItem("username");
  let currencies = [];
  let currentCurrencyIndex = 0;
  let errorMessage = "";

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
      const url = `${API_URL}/api/user-data/${username}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      currencies = data.currencies;
    } catch (error) {
      console.error("Error fetching user data:", error);
      errorMessage = "Error fetching user data";
    }
  });

  async function makePayment() {
    navigate("/payment");
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
      <h3>
        Transaction history:
        <button class="payment" on:click={() => makePayment()}>
          Payment
        </button>
      </h3>
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
              <td>{transaction.dateTime.slice(0, 11)}</td>
              <td>{transaction.dateTime.slice(12, 20)}</td>
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

  .change-currency,
  .payment {
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.2s;
  }

  .change-currency:hover,
  .payment:hover {
    background-color: #0056b3;
  }

  .operations {
    width: 100%;
    margin-bottom: 1rem;
  }

  .operations h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
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
