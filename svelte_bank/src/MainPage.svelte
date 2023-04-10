<script>
    import { onMount } from "svelte";
  
    let currentCurrency = "USD";
    let userCurrencies = ["USD", "EUR", "CZK"]; // Replace with actual user currencies
    let operations = []; // Replace with actual operation history for the current currency
  
    function changeCurrency() {
      const currentIndex = userCurrencies.indexOf(currentCurrency);
      currentCurrency = userCurrencies[(currentIndex + 1) % userCurrencies.length];
      // Update operations with the new currency data
    }
  
    function handlePayment() {
      // Implement payment functionality
    }
  
    onMount(() => {
      
    });
  </script>
  
  <div class="main-page">
    <div class="header-container"> <!-- Add this wrapper -->
      <h2>Current currency: {currentCurrency}</h2>
      <div>
        <button on:click={handlePayment}>Payment</button>
        <button on:click={changeCurrency}>Change currency</button>
      </div>
    </div> <!-- Close the wrapper -->
  
    <div class="operations">
      <h3>Operation history</h3>
      {#each operations as operation}
        <div class="operation">
          {
            operation.type === "payment"
              ? `Payment of ${operation.amount} ${operation.currency} to ${operation.recipient}`
              : `Received payment of ${operation.amount} ${operation.currency} from ${operation.sender}`
          }
        </div>
      {/each}
    </div>
  </div>    
  
  <style>
    .main-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
  
  
  
  