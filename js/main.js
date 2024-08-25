let currenciesInpts = document.querySelectorAll(".currency");
let currencies, convertTo, convertFrom;
let dataFromFetch;

// Get names of currencies in an array
async function getCurrencies() {
  let getData = await fetch(`https://v6.exchangerate-api.com/v6/ef8a0a58f0cfa90f3cc5af56/latest/USD`);
  let data = await getData.json();
  currencies = Object.keys(data.conversion_rates);
  currency(0);
  currency(1);
}
getCurrencies();

// Make option tags with values that in currencies array
function currency(index) {
  if (index === 0) {
    let content = `<option value="USD">USD</option>`;
    currencies.splice(currencies.indexOf("USD"), 1);
    for (let i = 0; i < currencies.length; i++) {
      content += `<option value="${currencies[i]}">${currencies[i]}</option>`
    }
    currenciesInpts[index].innerHTML = content;
  } else {
    let content = `<option value="EGP">EGP</option>`;
    currencies.splice(currencies.indexOf("EGP"), 1);
    for (let i = 0; i < currencies.length; i++) {
      content += `<option value="${currencies[i]}">${currencies[i]}</option>`
    }
    currenciesInpts[index].innerHTML = content;
  }
}

async function fetchData() {
  let amount = document.querySelector("#amount");
  let getData = await fetch(`https://v6.exchangerate-api.com/v6/ef8a0a58f0cfa90f3cc5af56/latest/${convertFrom}`);
  dataFromFetch = await getData.json();
  document.querySelector(".resultText").innerHTML = `
    ${amount.value} ${convertFrom} = 
    ${(+amount.value * dataFromFetch.conversion_rates[`${convertTo}`]).toFixed(2)} 
    ${convertTo}
  `
}

// Click on convert button
document.querySelector("#convertBtn").onclick = () => {
  convertFrom = currenciesInpts[0].value;
  convertTo = currenciesInpts[1].value;
  fetchData();
}