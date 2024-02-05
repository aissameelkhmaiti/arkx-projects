const readline = require('readline');

// Create interface for reading input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Contact collection
const contacts = [];

// Function to add a contact
function addContact() {
  rl.question('Enter name: ', (name) => {
    rl.question('Enter phone number: ', (phoneNumber) => {
      const contact = { name, phoneNumber };
      contacts.push(contact);
      console.log(`Contact added: ${name} - ${phoneNumber}`);
      showMenu();
    });
  });
}

// Function to view all contacts
function viewContacts() {
  if (contacts.length === 0) {
    console.log('No contacts found.');
  } else {
    console.log('All Contacts:');
    contacts.forEach((contact, index) => {
      console.log(`${index + 1}. ${contact.name} - ${contact.phoneNumber}`);
    });
  }
  showMenu();
}

// Function to search for a contact
function searchContact() {
  rl.question('Enter name to search: ', (searchName) => {
    const foundContact = contacts.find(contact => contact.name.toLowerCase() === searchName.toLowerCase());

    if (foundContact) {
      console.log(`Contact found: ${foundContact.name} - ${foundContact.phoneNumber}`);
    } else {
      console.log(`Contact not found for name: ${searchName}`);
    }
    showMenu();
  });
}

// Function to exit the application
function exitApp() {
  console.log('Exiting the application.');
  rl.close();
}

// Function to show the main menu
function showMenu() {
  console.log('\nMenu:');
  console.log('1. Add a contact');
  console.log('2. View all contacts');
  console.log('3. Search for a contact');
  console.log('4. Exit');

  rl.question('Select an option (1-4): ', (choice) => {
    switch (choice) {
      case '1':
        addContact();
        break;
      case '2':
        viewContacts();
        break;
      case '3':
        searchContact();
        break;
      case '4':
        exitApp();
        break;
      default:
        console.log('Invalid choice. Please select an option from the menu.');
        showMenu();
        break;
    }
  });
}

// Start the application
console.log('Welcome to the Contact List App!');
showMenu();
