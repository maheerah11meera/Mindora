document.addEventListener("DOMContentLoaded", () => {
    updateCoinsDisplay();
    loadLeaderboard();
  });
  
  // Save player name and coins
  function savePlayerData() {
    const nameInput = document.getElementById("playerName");
    const name = nameInput.value.trim();
  
    if (!name) {
      alert("Please enter your name!");
      return;
    }
  
    const coins = loadCoins(); // from coinManager.js
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  
    const existingPlayer = leaderboard.find(player => player.name === name);
  
    if (existingPlayer) {
      if (coins > existingPlayer.coins) {
        existingPlayer.coins = coins;
      }
    } else {
      leaderboard.push({ name, coins });
    }
  
    leaderboard.sort((a, b) => b.coins - a.coins);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  
    const rank = leaderboard.findIndex(player => player.name === name) + 1;
    alert(`🎉 Your name is saved!\nRank: #${rank}`);
  
    showLeaderboard();
  }
  
  // Load and display the leaderboard
  function showLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const list = document.getElementById("styledLeaderboard");
    list.innerHTML = "";
  
    leaderboard.forEach((player, index) => {
      const item = document.createElement("li");
      item.classList.add("leaderboard-item");
  
      item.innerHTML = `
        <span class="rank">${index + 1}</span>
        <div class="avatar"></div>
        <span class="player-name">${player.name}</span>
        <span class="trophy-icon">🏆</span>
        <span class="coins">${player.coins.toLocaleString()}</span>
      `;
  
      list.appendChild(item);
    });
  }
  
  function loadLeaderboard() {
    showLeaderboard();
  }
  
  // Coin management helpers
  function loadCoins() {
    let coins = localStorage.getItem("coins");
    if (!coins) {
      coins = 0;
      localStorage.setItem("coins", coins);
    }
    return parseInt(coins);
  }
  
  function saveCoins(coins) {
    localStorage.setItem("coins", coins);
  }
  
  function updateCoinsDisplay() {
    // Optional: add coin display if you want
  }
  
  function showLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const list = document.getElementById("styledLeaderboard");
    list.innerHTML = "";
  
    leaderboard.forEach((player, index) => {
      const item = document.createElement("li");
      item.classList.add("leaderboard-item");
  
      let medal = "";
      if (index === 0) medal = "🥇";
      else if (index === 1) medal = "🥈";
      else if (index === 2) medal = "🥉";
  
      item.innerHTML = `
        <span class="rank">${medal || `#${index + 1}`}</span>
        <div class="avatar"></div>
        <span class="player-name">${player.name}</span>
        <span class="trophy-icon">🏆</span>
        <span class="coins">${player.coins.toLocaleString()}</span>
      `;
  
      list.appendChild(item);
    });
  }

  const settingsBtn = document.getElementById("settings-btn");
    const settingsPopup = document.getElementById("settings-popup");
  
    settingsBtn.addEventListener("click", () => {
      settingsPopup.classList.add("show");
    });
  
    document.querySelectorAll(".close-popup").forEach(button => {
      button.addEventListener("click", function () {
        this.closest(".popup").classList.remove("show");
      });
    });
  
    window.addEventListener("click", function (e) {
      if (e.target.classList.contains("popup")) {
        e.target.classList.remove("show");
      }
    });

    const volumeSlider = document.getElementById("volume-slider");
    const brightnessSlider = document.getElementById("brightness-slider");
  
    const savedBrightness = localStorage.getItem("brightness") || "100";
    brightnessSlider.value = savedBrightness;
    document.querySelector(".background").style.filter = `brightness(${savedBrightness}%)`;
  
    brightnessSlider.addEventListener("input", () => {
      localStorage.setItem("brightness", brightnessSlider.value);
      document.querySelector(".background").style.filter = `brightness(${brightnessSlider.value}%)`;
    });
  
    volumeSlider.addEventListener("input", () => {
      console.log("Volume:", volumeSlider.value);
    });

  const music = document.getElementById("bg-music");
  const volume_Slider = document.getElementById("volume-slider");

  // Initial volume setup after page loads
  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      music.muted = false;
      music.volume = volumeSlider.value;
      music.play().catch(err => console.log("Autoplay error:", err));
    }, 500);
  });

  // Update music volume when slider moves
  volumeSlider.addEventListener("input", () => {
    music.volume = volumeSlider.value;
  });


  