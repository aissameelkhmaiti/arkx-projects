const fs = require('fs').promises;
const { stdin, stdout } = require('process');
const readline = require('readline');
const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

async function saveUserData(users, transactions) {
    try {
        await fs.writeFile('users.json', JSON.stringify(users, null, 2));
        await fs.writeFile('transactions.json', JSON.stringify(transactions, null, 2));
    } catch (error) {
        console.error('Erreur lors de l\'écriture des données utilisateur ou des transactions:', error);
    }
}

async function addUser(name) {
    const Id = generateUniqueId();
    const pin = generateRandomFourDigitNumber();
    const newUser = {
        "ID de compte": Id,
        "nom": name,
        "épingle": pin.toString(),
        "solde": 0,
        "transactions": []
    };

    try {
        const userData = await fs.readFile('users.json', 'utf8');
        const users = JSON.parse(userData);
        users.push(newUser);
        await saveUserData(users, []);
        console.log(`Utilisateur ${name} ajouté avec succès. Votre ID de compte est ${newUser['ID de compte']} et votre PIN est ${pin}.`);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
    }
}

async function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

function generateRandomFourDigitNumber() {
    const min = 1000;
    const max = 9999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomValue = Math.floor(Math.random() * 1000);
    const uniqueId = `${timestamp}${randomValue}`;
    return uniqueId;
}
async function authenticateUser(accountID, pin) {
    try {
        const usersData = await fs.readFile('users.json', 'utf8');
        const users = JSON.parse(usersData);
        return users.find(u => u['ID de compte'] === accountID && u['épingle'] === pin);
    } catch (error) {
        console.error('Erreur lors de l\'authentification de l\'utilisateur:', error);
        return null;
    }
}

async function Connexion(accountID,pin) {
    
     
    console.log("Connection logic goes here.");
}

async function main() {
    let exit = false;

    while (!exit) {
        console.log("Enter 1 for connection and 2 for créer compte:");

        const choice = await askQuestion('Choose a number between 1-2: ');

        if (choice === "1") {
            await Connexion();
        } else if (choice === "2") {
            const name = await askQuestion('Enter your name: ');
            await addUser(name);
        } else {
            console.log("Invalid choice. Please enter 1 or 2.");
        }

        const continueChoice = await askQuestion('Do you want to continue? (y/n): ');
        exit = continueChoice.toLowerCase() !== 'y';
    }

    rl.close();
}

main();
