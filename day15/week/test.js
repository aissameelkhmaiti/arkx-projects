function generateUniqueId() {
    const timestamp = new Date().getTime(); // Obtient le timestamp actuel
    const randomValue = Math.floor(Math.random() * 1000); // Valeur aléatoire entre 0 et 999
  
    const uniqueId = `${timestamp}${randomValue}`;
  
    return uniqueId;
  }
  
  // Exemple d'utilisation pour générer un identifiant unique
  const userId = generateUniqueId();
  console.log(userId);
  function generateRandomFourDigitNumber() {
    const min = 1000; // Le nombre minimum à générer (inclusif)
    const max = 9999; // Le nombre maximum à générer (inclusif)
  
    // Générer un nombre aléatoire entre min et max
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return randomNumber;
  }
  
  // Exemple d'utilisation
  const randomFourDigitNumber = generateRandomFourDigitNumber();
  console.log(randomFourDigitNumber);
  
  