const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const jsonFilePath = 'contacts.json';
let contactList = [];

// Check if the JSON file already exists
if (fs.existsSync(jsonFilePath)) {
  // Read the existing JSON file and parse its contents
  const existingData = fs.readFileSync(jsonFilePath, 'utf-8');
  contactList = JSON.parse(existingData);

  // Display the existing data
  console.log('Existing contacts:', contactList);
}

// Prompt for the first input (name)
rl.question('Enter name: ', (name) => {
  // Prompt for the second input (number) after receiving the name
  rl.question('Enter number: ', (number) => {
    // Push the collected data into the array
    const contact = { name, number };
    contactList.push(contact);

    // Log the collected data
    console.log('Data collected:', contactList);

    // Convert the array to JSON and write to a file
    const jsonData = JSON.stringify(contactList, null, 2);
    fs.writeFileSync(jsonFilePath, jsonData, 'utf-8');

    // Close the readline interface
    rl.close();
  });
});

