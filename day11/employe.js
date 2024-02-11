// Importation des modules nécessaires
const XLSX = require('xlsx');
const fs = require('fs');

// Fonction pour lire le fichier Excel
function readExcel(filePath) {
  try {
    // Lecture du fichier Excel
    const workbook = XLSX.readFile(filePath);

    // Extraction du nom de la première feuille de calcul
    const sheetName = workbook.SheetNames[0];
    console.log(sheetName);

    // Obtention de la feuille de calcul correspondante
    const worksheet = workbook.Sheets[sheetName];
    console.log(worksheet);

    // Conversion de la feuille de calcul en format JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log(jsonData);

    // Traitement des données et création d'un nouvel ensemble de données
    const updatedData = jsonData.slice(1).map((empl) => {
      // Extraction et conversion du salaire annuel en nombre
      let annualSalary = parseFloat(empl[1]);

      // Vérification si le salaire annuel est un nombre valide
      annualSalary = isNaN(annualSalary) ? 0 : annualSalary;

      let percentage, amount;

      // Calcul du pourcentage et du montant en fonction du salaire annuel
      if (annualSalary < 50000) {
        percentage = 5;
        amount = annualSalary * 0.05;
      } else if (annualSalary >= 50000 && annualSalary <= 100000) {
        percentage = 7;
        amount = annualSalary * 0.07;
      } else {
        percentage = 10;
        amount = annualSalary * 0.1;
      }

      // Retourne un tableau avec les données mises à jour pour chaque employé
      return [empl[0], annualSalary, percentage, amount];
    });

    // Ajout des en-têtes au début du nouvel ensemble de données
    updatedData.unshift(['EmployeeID', 'AnnualSalary', 'Percentage', 'Amount']);

    // Affichage des données mises à jour
    console.log(updatedData);

  } catch (error) {
    // Gestion des erreurs lors de la lecture du fichier Excel
    console.error('Error reading Excel file:', error.message);
  }
}

// Exemple d'utilisation de la fonction avec le chemin du fichier Excel
const excelFilePath = 'C:/challenge arx/excel/employee_data_.xlsx';
readExcel(excelFilePath);
 

