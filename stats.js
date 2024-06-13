document.addEventListener("DOMContentLoaded", function() {
    function updateStatisticsDisplay(userData) {
        var usernameElement = document.getElementById("username");
        var levelElement = document.getElementById("level");
        var speedElement = document.getElementById("speed");
        var strengthElement = document.getElementById("strength");
        var intelligenceElement = document.getElementById("intelligence");
        var agilityElement = document.getElementById("agility");
        var pointsElement = document.getElementById("points");

        usernameElement.textContent = userData.username;
        levelElement.textContent = userData.level.toFixed(2);
        speedElement.textContent = userData.speed;
        strengthElement.textContent = userData.strength;
        intelligenceElement.textContent = userData.intelligence;
        agilityElement.textContent = userData.agility;
        pointsElement.textContent = userData.points;
    }

    function adjustAttribute(attribute, change) {
        var userData = JSON.parse(localStorage.getItem("userData"));
        if (userData && userData.points > 0) {
            userData[attribute] += change;
            userData.points--;
            localStorage.setItem("userData", JSON.stringify(userData));
            window.dispatchEvent(new Event('levelUpdate'));
        }
    }

    let currentLevel = parseFloat(localStorage.getItem("level")) || 1;
    document.getElementById("user-level").textContent = currentLevel.toFixed(2);

    function updateLevelPoints(points) {
        const levelElement = document.getElementById("level");
        const currentLevel = parseFloat(levelElement ? levelElement.innerText : 0);
        const newLevel = currentLevel + points;
        if (levelElement) {
            levelElement.innerText = newLevel.toFixed(2);
        }
        var userData = JSON.parse(localStorage.getItem("userData"));
        if (userData) {
            userData.level = newLevel;
            userData.points += 1; // Ajouter un point de compétence lorsqu'un niveau est gagné
            localStorage.setItem("userData", JSON.stringify(userData));
            window.dispatchEvent(new Event('levelUpdate'));
        }
    }

    const questsContainer = document.getElementById("quests-container");

    function loadQuests() {
        questsContainer.innerHTML = "";

        const today = new Date().toISOString().split("T")[0];

        const filteredQuests = quests.filter(quest => quest.date === today);

        if (filteredQuests.length > 0) {
            const ul = document.createElement("ul");
            filteredQuests.forEach(quest => {
                const li = document.createElement("li");
                li.textContent = quest.text;

                if (quest.completed) {
                    li.style.textDecoration = "line-through";
                } else {
                    const completeButton = document.createElement("button");
                    completeButton.textContent = "Terminer";
                    completeButton.addEventListener("click", function() {
                        if (!quest.completed) {
                            updateLevelPoints(0.15);
                            quest.completed = true;
                            li.style.textDecoration = "line-through";
                            completeButton.disabled = true;
                            saveQuests();
                        }
                    });
                    li.appendChild(completeButton);
                }

                ul.appendChild(li);
            });
            questsContainer.appendChild(ul);
        } else {
            questsContainer.textContent = "Aucune quête disponible pour aujourd'hui.";
        }
    }

    function saveQuests() {
        localStorage.setItem("quests", JSON.stringify(quests));
    }

    loadQuests();

    var userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
        updateStatisticsDisplay(userData);
    }

    window.addEventListener('storage', function(event) {
        if (event.key === "userData") {
            var updatedUserData = JSON.parse(event.newValue);
            if (updatedUserData) {
                updateStatisticsDisplay(updatedUserData);
            }
        }
    });

    window.addEventListener('levelUpdate', function(event) {
        var updatedUserData = JSON.parse(localStorage.getItem("userData"));
        if (updatedUserData) {
            updateStatisticsDisplay(updatedUserData);
        }
    });

    document.getElementById("increaseSpeed").addEventListener("click", function() {
        adjustAttribute("speed", 1);
    });

    document.getElementById("decreaseSpeed").addEventListener("click", function() {
        adjustAttribute("speed", -1);
    });

    document.getElementById("increaseStrength").addEventListener("click", function() {
        adjustAttribute("strength", 1);
    });

    document.getElementById("decreaseStrength").addEventListener("click", function() {
        adjustAttribute("strength", -1);
    });

    document.getElementById("increaseIntelligence").addEventListener("click", function() {
        adjustAttribute("intelligence", 1);
    });

    document.getElementById("decreaseIntelligence").addEventListener("click", function() {
        adjustAttribute("intelligence", -1);
    });

    document.getElementById("increaseAgility").addEventListener("click", function() {
        adjustAttribute("agility", 1);
    });

    document.getElementById("decreaseAgility").addEventListener("click", function() {
        adjustAttribute("agility", -1);
    });
});

var userData = JSON.parse(localStorage.getItem("userData"));
if (userData) {
    var usernameElement = document.getElementById("username");
    usernameElement.textContent = userData.username;
    var levelElement = document.getElementById("level");
    levelElement.innerText = userData.level;
}

function showNotification() {
    if ('Notification' in window) {
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          var options = {
            body: " L'heure des quêtes est arrive, Arise !",
            icon: 'Image/logo.jpeg',
            // Ajoutons quelques options non standard pour personnaliser l'apparence
            color: '#7e57c2',  // Couleur violet (#7e57c2 est un exemple de violet)
            badge: 'Image/OIG2-removebg-preview.png',  // Optionnel : un badge pour la notification
            vibrate: [200, 100, 200]  // Optionnel : vibration de la notification
          };
  
          var notification = new Notification('Bonjour !', options);
  
          notification.onclick = function() {
            // Action à effectuer lors du clic sur la notification
            window.focus(); // Rediriger vers l'application web
          };
        }
      });
    } else {
      console.log('Notifications not supported');
    }
  }
  
  // Vérifier l'heure toutes les minutes
  setInterval(checkTimeAndNotify, 60000); // 60000 ms = 1 minute
  