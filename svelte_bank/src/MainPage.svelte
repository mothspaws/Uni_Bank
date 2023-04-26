<script>
  import { onMount } from "svelte";
  let username = localStorage.getItem("username");
  let currencies = [];
  let currentCurrencyIndex = 0;

  onMount(async () => {
  try {
    const url = `http://localhost:3001/api/user-data/${username}`;
    console.log("Requesting URL:", url); // Log the requested URL
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    currencies = data.currencies;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
  });

  async function makePayment(currency, amount) {
    // Implement payment logic
  }

  async function changeCurrency() {
    currentCurrencyIndex = (currentCurrencyIndex + 1) % currencies.length;
  }
</script>

<div class="main-page">
  <div class="header-container">
    <h1>Uni Bank transactions</h1>
  </div>
  {#if currencies.length > 0}
    <div class="operation">
      <button on:click={() => makePayment(currencies[currentCurrencyIndex].currency, 10)}>
        Make a payment
      </button>
      <button on:click={() => changeCurrency()}>
        Change currency
      </button>
    </div>
    <div class="operations">
      <h2>{currencies[currentCurrencyIndex].balance} {currencies[currentCurrencyIndex].currency}</h2>
      <h3>Transaction history:</h3>
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
              <td>{transaction.dateTime.slice(0, 10)}</td>
              <td>{transaction.dateTime.slice(11, 19)}</td>
              <td>{transaction.amount}</td>
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
    align-items: center;
    margin: 0 auto;
    width: 100%;
    height: 100vh;
    padding: 1rem;
    box-sizing: border-box;
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
  }

  .operations {
    width: 100%;
    max-width: 600px;
    margin-bottom: 1rem;
  }

  .operation {
    margin-bottom: 0.5rem;
  }

  button {
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    margin-left: 0.5rem;
  }

.history {
  font-family: "Times New Roman", Times, serif;
  border: 1px solid #FFFFFF;
  width: 350px;
  height: 200px;
  text-align: center;
  border-collapse: collapse;
}
.history td, .history th {
  border: 1px solid #FFFFFF;
  padding: 3px 2px;
}
.history tbody td {
  font-size: 13px;
}
.history tr:nth-child(even) {
  background: #D0E4F5;
}
.history thead {
  background: #0B6FA4;
  border-bottom: 5px solid #FFFFFF;
}
.history thead th {
  font-size: 17px;
  font-weight: bold;
  color: #FFFFFF;
  text-align: center;
  border-left: 2px solid #FFFFFF;
}
.history thead th:first-child {
  border-left: none;
}

.history tfoot td {
  font-size: 14px;
}

  /* Responsive styles */
  @media (min-width: 768px) {
    .main-page {
      width: 50%;
    }
  }

  @media (min-width: 992px) {
    .main-page {
      width: 30%;
    }
  }
</style>
