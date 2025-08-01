document.addEventListener("DOMContentLoaded", function () {
    const profileBtn = document.getElementById("profile-btn");
    const profilePopup = document.getElementById("profile-popup");
    const nameInput = document.getElementById("name-input");
    const saveNameBtn = document.getElementById("save-name");
    const usernameDisplay = document.getElementById("username");
    const coinDisplay = document.getElementById("coinCount");
  
    let currentPlayer = localStorage.getItem("currentPlayer") || "Guest";
    usernameDisplay.textContent = currentPlayer;
    nameInput.value = currentPlayer;
  
    let currentCoins = parseInt(localStorage.getItem("coins")) || 0;
    coinDisplay.textContent = currentCoins;
  
    profileBtn.addEventListener("click", () => {
      profilePopup.classList.add("show");
    });
  
    saveNameBtn.addEventListener("click", () => {
      let newName = nameInput.value.trim();
      if (newName) {
        localStorage.setItem("currentPlayer", newName);
        usernameDisplay.textContent = newName;
        updatePlayerData(newName, 0, 0);
        profilePopup.classList.remove("show");
      } else {
        alert("Please enter a valid name.");
      }
    });
  
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
  
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', function () {
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
      });
    });
  
    updateLeaderboard();
  });
  
  function updatePlayerData(name, win = 0, money = 0) {
    let players = JSON.parse(localStorage.getItem("players")) || [];
    let existingPlayer = players.find(p => p.name === name);
  
    if (existingPlayer) {
      existingPlayer.wins += win;
      existingPlayer.money += money;
      if (name === localStorage.getItem("currentPlayer")) {
        let updatedCoins = (parseInt(localStorage.getItem("coins")) || 0) + money;
        localStorage.setItem("coins", updatedCoins);
        document.getElementById("coinCount").textContent = updatedCoins;
      }
    } else {
      players.push({ name, wins: win, money: money });
      if (name === localStorage.getItem("currentPlayer")) {
        localStorage.setItem("coins", money);
        document.getElementById("coinCount").textContent = money;
      }
    }
  
    localStorage.setItem("players", JSON.stringify(players));
  }
  
  function updateLeaderboard() {
    console.log("Leaderboard updated.");
  }

  function loadCoins() {
    let coins = localStorage.getItem("coins");
    if (!coins) {
      coins = 0;
      localStorage.setItem("coins", coins);
    }
    return parseInt(coins);
  }

  function updateCoinsDisplay() {
    const coins = loadCoins();
    document.getElementById("coinsDisplay").textContent = `Coins: ${coins}`;
  }

  document.addEventListener("DOMContentLoaded", updateCoinsDisplay);

  document.addEventListener("DOMContentLoaded", () => {
    updateCoinsDisplay();
  });
  
  function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const container = document.getElementById("leaderboardContainer");
    container.innerHTML = `<h2>🏆 LEADERBOARD 🏆</h2>`;
  
    leaderboard.forEach((player, index) => {
      const entry = document.createElement("div");
      entry.className = "leaderboard-entry";
  
      entry.innerHTML = `
        <span class="rank">${index + 1}</span>
        <div class="player-info">
          <img src="avatar.png" class="avatar" alt="avatar">
          <span>${player.name}</span>
        </div>
        <img src="trophy.png" class="trophy" alt="trophy">
        <span>${player.coins.toLocaleString()}</span>
      `;
  
      container.appendChild(entry);
    });
  }
  
  document.addEventListener("DOMContentLoaded", loadLeaderboard);
  
  function updateLeaderboardFromProfile() {
    const playerName = localStorage.getItem("playerName");
    const coins = parseInt(localStorage.getItem("coins")) || 0;
  
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  
    const existing = leaderboard.find(p => p.name === playerName);
    if (existing) {
      if (coins > existing.coins) {
        existing.coins = coins;
      }
    } else {
      leaderboard.push({ name: playerName, coins });
    }
  
    leaderboard.sort((a, b) => b.coins - a.coins);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }
  
  function slowDownMusic() {
    document.getElementById('musicFrame').contentWindow.postMessage("slow", "*");
  }

  function normalSpeed() {
    document.getElementById('musicFrame').contentWindow.postMessage("normal", "*");
  }

  function pauseMusic() {
    document.getElementById('musicFrame').contentWindow.postMessage("pause", "*");
  }

  function playMusic() {
    document.getElementById('musicFrame').contentWindow.postMessage("play", "*");
  }

  const music = document.getElementById("bg-music");
  const volumeSlider = document.getElementById("volume-slider");

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

  window.onload = function () {
    // Try opening the music popup automatically
    let musicWin = window.open('music.html', 'bgMusicWindow', 'width=1,height=1,left=9999,top=9999');
  };
