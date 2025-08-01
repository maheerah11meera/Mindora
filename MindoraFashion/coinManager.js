function loadCoins() {
    let coins = localStorage.getItem("coins");
    if (!coins) {
      coins = 0;
      localStorage.setItem("coins", coins);
    }
    return parseInt(coins);
  }
  
  function saveCoins(newAmount) {
    localStorage.setItem("coins", newAmount);
    updateCoinsDisplay();
  }
  
  function updateCoinsDisplay() {
    const coins = loadCoins();
    const coinElements = document.querySelectorAll(".coinCount, #coinCount, #coinsDisplay");
    coinElements.forEach(el => {
      el.textContent = `Coins: ${coins}`;
    });
  }
  
  function earnCoins(amount) {
    let coins = loadCoins();
    coins += amount;
    saveCoins(coins);
    alert(`You earned ${amount} coins!`);
  }
  
  function spendCoins(amount) {
    let coins = loadCoins();
    if (coins >= amount) {
      coins -= amount;
      saveCoins(coins);
      return true;
    } else {
      alert("Not enough coins!");
      return false;
    }
  }
  