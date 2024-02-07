const XLSX = require('xlsx');
const fs = require('fs');

function readExcel(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    console.log(sheetName)
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    console.log(jsonData);

     
    const updatedData = jsonData.slice(1).map((empl) => {
      let annualSalary = parseFloat(empl[1]);

      annualSalary = isNaN(annualSalary) ? 0 : annualSalary;

      let percentage, amount;

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

       
      return [empl[0], annualSalary, percentage, amount];
    });

    
    updatedData.unshift(['EmployeeID', 'AnnualSalary', 'Percentage', 'Amount']);

    console.log(updatedData);

  } catch (error) {
    console.error('Error reading Excel file:', error.message);
  }
}

// Example usage
const excelFilePath = 'C:/challenge arx/excel/employee_data_.xlsx';
readExcel(excelFilePath);


