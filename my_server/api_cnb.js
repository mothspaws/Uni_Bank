const dbase = require("./dbase.js");
const cron = require('node-cron');

async function fetchAndStoreRates() {
  try {
    const date = new Date();
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    const response = await fetch(
      `https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt?date=${formattedDate}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    const lines = data.split("\n");

    for (let i = 2; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === "") continue;
      const [country, currency, quantity, code, rate] = line.split("|");
      const parsedQuantity = parseInt(quantity);
      const parsedRate = parseFloat(rate.replace(",", "."));

      dbase.insertRate(formattedDate, country, currency, parsedQuantity, code, parsedRate);
    }

    console.log("Exchange rates fetched and stored successfully.");
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
  }
}

const task = cron.schedule('09 16 * * *', fetchAndStoreRates);
// Run the function immediately fetchAndStoreRates();

// Schedule the function to run every day at 14:35
// scheduleJob("35 14 * * *", async () => {
//   await fetchAndStoreRates();
// });
