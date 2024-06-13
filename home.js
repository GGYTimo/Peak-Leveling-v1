document.addEventListener("DOMContentLoaded", function() {
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
            localStorage.setItem("userData", JSON.stringify(userData));
            window.dispatchEvent(new CustomEvent('levelUpdate', { detail: { newLevel: newLevel } }));
        }
    }

    const quests = [
        { text: "Faire une balade à vélo de 10 km", date: "2024-06-12" },
        { text: "Explorer la ville en trottinette pendant 1 heure", date: "2024-06-12" },
        { text: "Faire du vélo elliptique pendant 30 minutes", date: "2024-06-12" },
        { text: "Faire une sortie en VTT en montagne", date: "2024-06-13" },
        { text: "Faire une randonnée à vélo de 15 km", date: "2024-06-13" },
        { text: "Faire une balade en trottinette électrique dans le parc", date: "2024-06-13" },
        { text: "Faire du roller pendant 1 heure dans le quartier", date: "2024-06-14" },
        { text: "Faire une promenade à vélo le long d'une rivière", date: "2024-06-14" },
        { text: "Explorer la ville en skateboard pendant 1 heure", date: "2024-06-14" },
        { text: "Faire une sortie en VTT sur des sentiers techniques", date: "2024-06-15" },
        { text: "Faire une balade en trottinette tout-terrain", date: "2024-06-15" },
        { text: "Faire du vélo de route pendant 20 km", date: "2024-06-15" },
        { text: "Faire une balade en vélo pliant dans le quartier", date: "2024-06-16" },
        { text: "Faire une exploration urbaine en trottinette électrique", date: "2024-06-16" },
        { text: "Faire du vélo elliptique pendant 30 minutes", date: "2024-06-16" },
        { text: "Faire une randonnée à vélo de 25 km", date: "2024-06-17" },
        { text: "Faire une balade en trottinette dans le parc", date: "2024-06-17" },
        { text: "Faire du vélo de montagne sur des sentiers difficiles", date: "2024-06-17" },
        { text: "Faire une exploration en roller le long de la plage", date: "2024-06-18" },
        { text: "Faire une balade à vélo électrique en campagne", date: "2024-06-18" },
        { text: "Faire du vélo elliptique pendant 30 minutes", date: "2024-06-18" },
        { text: "Faire une sortie en VTT sur des chemins forestiers", date: "2024-06-19" },
        { text: "Faire une balade en trottinette électrique en ville", date: "2024-06-19" },
        { text: "Faire une randonnée à vélo de 30 km", date: "2024-06-19" },
        { text: "Faire une promenade en roller dans le quartier", date: "2024-06-20" },
        { text: "Faire une exploration urbaine en vélo pliant", date: "2024-06-20" },
        { text: "Faire du vélo elliptique pendant 30 minutes", date: "2024-06-20" },
        { text: "Faire une sortie en VTT sur des sentiers côtiers", date: "2024-06-21" },
        { text: "Faire une balade en trottinette électrique dans le parc", date: "2024-06-21" },
        { text: "Faire une balade à vélo de 15 km", date: "2024-06-21" },
        { text: "Faire une exploration en roller dans le centre-ville", date: "2024-06-22" },
        { text: "Faire une balade à vélo électrique en campagne", date: "2024-06-22" },
        { text: "Faire du vélo elliptique pendant 30 minutes", date: "2024-06-22" },
        { text: "Faire une sortie en VTT sur des sentiers montagneux", date: "2024-06-23" },
        { text: "Faire une balade en trottinette électrique en ville", date: "2024-06-23" },
        { text: "Faire une randonnée à vélo de 20 km", date: "2024-06-23" },
        { text: "Faire une promenade en roller le long du canal", date: "2024-06-24" },
        { text: "Faire une exploration urbaine en vélo pliant", date: "2024-06-24" },
        { text: "Faire du vélo elliptique pendant 30 minutes", date: "2024-06-24" },
        { text: "Faire une balade à vélo de 10 km", date: "2024-06-25" },
        { text: "Faire une balade en trottinette électrique dans le parc", date: "2024-06-25" },
        { text: "Faire du vélo de route pendant 15 km", date: "2024-06-25" },
        { text: "Faire une exploration en roller dans le quartier", date: "2024-06-26" },
        { text: "Faire une balade à vélo électrique en campagne", date: "2024-06-26" },
        { text: "Faire du vélo elliptique pendant 30 minutes", date: "2024-06-26" },
        { text: "Faire une sortie en VTT sur des sentiers forestiers", date: "2024-06-27" },
        { text: "Faire une balade en trottinette électrique en ville", date: "2024-06-27" },
        { text: "Faire une randonnée à vélo de 25 km", date: "2024-06-27" },
        { text: "Faire une promenade en roller le long de la plage", date: "2024-06-28" },
        { text: "Faire une exploration urbaine en vélo pliant", date: "2024-06-28" },
        { text: "Faire du vélo elliptique pendant 30 minutes", date: "2024-06-28" },
        { text: "Faire une balade à vélo de 15 km", date: "2024-06-29" },
        { text: "Faire une balade en trottinette électrique dans le parc", date: "2024-06-29" },
        { text: "Faire une sortie en VTT sur des sentiers côtiers", date: "2024-06-29" },
        { text: "Faire une exploration en roller dans le centre-ville", date: "2024-06-30" },
        { text: "Faire une balade à vélo électrique en campagne", date: "2024-06-30" },
        { text: "Faire du vélo elliptique pendant 30 minutes", date: "2024-06-30" },
        { text: "Faire une balade en trottinette électrique à travers la ville", date: "2024-07-01" },
        { text: "Faire une randonnée à vélo de 20 km", date: "2024-07-01" },
        { text: "Faire une promenade en roller le long du canal", date: "2024-07-01" },
        { text: "Faire une sortie en VTT sur des sentiers montagneux", date: "2024-07-02" },
        { text: "Faire une balade en trottinette électrique en bord de mer", date: "2024-07-02" },
        { text: "Faire une exploration urbaine à vélo pliant", date: "2024-07-02" },
        { text: "Faire une balade à vélo de 10 km", date: "2024-07-03" },
        { text: "Faire une randonnée en trottinette électrique dans la campagne", date: "2024-07-03" },
        { text: "Faire une sortie en VTT sur des sentiers forestiers", date: "2024-07-03" },
        { text: "Faire une promenade en roller dans le parc", date: "2024-07-04" },
        { text: "Faire une balade à vélo électrique en ville", date: "2024-07-04" },
        { text: "Faire une exploration urbaine à trottinette électrique", date: "2024-07-04" }
    ];

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
                } else if (quest.disabled) {
                    li.style.textDecoration = "line-through";
                    li.className = "disabled";
                } else {
                    const completeButton = document.createElement("button");
                    completeButton.textContent = "Terminer";
                    completeButton.className = "complete";
                    completeButton.addEventListener("click", function() {
                        let completedCount = parseInt(localStorage.getItem(`questsCompletedCount_${today}`)) || 0;
                        if (completedCount < 3) {
                            updateLevelPoints(0.15);
                            quest.completed = true;
                            li.style.textDecoration = "line-through";
                            completeButton.disabled = true;
                            saveQuests();
    
                            // Récupérer le niveau actuel stocké dans le stockage local
                            let currentLevel = parseFloat(localStorage.getItem("level")) || 0;
                            
                            // Ajouter 0,10 point au niveau actuel
                            currentLevel += 0.10;
                            
                            // Stocker le nouveau niveau dans le stockage local
                            localStorage.setItem("level", currentLevel.toString());
    
                            // Augmenter le nombre de quêtes complétées aujourd'hui
                            completedCount += 1;
                            localStorage.setItem(`questsCompletedCount_${today}`, completedCount.toString());
    
                            // Désactiver les quêtes restantes pour la journée
                            filteredQuests.forEach(q => q.disabled = true);
                        } else {
                            alert("Vous ne pouvez terminer que trois quêtes par jour.");
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
        var usernameElement = document.getElementById("username");
        usernameElement.textContent = userData.username;
        var levelElement = document.getElementById("level");
        levelElement.innerText = userData.level;
    }

    window.addEventListener("storage", function(event) {
        if (event.key === "userData") {
            var updatedUserData = JSON.parse(event.newValue);
            if (updatedUserData) {
                levelElement.innerText = updatedUserData.level;
            }
        }
    });

    window.addEventListener('levelUpdate', function(event) {
        var newLevel = event.detail.newLevel;
        localStorage.setItem("userLevel", newLevel.toFixed(2));
    });
});

function checkTimeAndNotify() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
  
    // Vérifier si c'est 8 heures du matin
    if (hours === 8 && minutes === 0) {
      // Afficher la notification
      showNotification();
    }
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
  