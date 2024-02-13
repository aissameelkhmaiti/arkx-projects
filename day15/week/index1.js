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
        console.error('Error writing user or transaction data:', error);
    }
}

async function addUser(name) {
    const Id = generateUniqueId();
    const pin = generateRandomFourDigitNumber();
    const newUser = {
        "Account ID": Id,
        "name": name,
        "pin": pin.toString(),
        "balance": 0,
        "transactions": []
    };

    try {
        const userData = await fs.readFile('users.json', 'utf8');
        const users = JSON.parse(userData);
        users.push(newUser);
        await saveUserData(users, []);
        console.log(`User ${name} added successfully. Your Account ID is ${newUser['Account ID']} and your PIN is ${pin}.`);
    } catch (error) {
        console.error('Error creating user:', error);
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

async function deposit(user, amount) {
    try {
        const userData = await fs.readFile('users.json', 'utf8');
        const users = JSON.parse(userData);
        const currentUser = users.find(u => u['Account ID'] === user['Account ID']);
        currentUser.balance += amount;
        currentUser.transactions.push({ type: 'deposit', amount: amount, date: new Date().toLocaleDateString() });
        await saveUserData(users, currentUser.transactions);
        console.log(`Deposited ${amount} into ${user.name}'s account.`);
    } catch (error) {
        console.error('Error during deposit:', error);
    }
}

async function withdraw(user, amount) {
    try {
        const userData = await fs.readFile('users.json', 'utf8');
        const users = JSON.parse(userData);
        const currentUser = users.find(u => u['Account ID'] === user['Account ID']);

        if (currentUser.balance < amount) {
            throw new Error('Insufficient funds');
        }

        currentUser.balance -= amount;
        currentUser.transactions.push({ type: 'withdraw', amount: amount, date: new Date().toLocaleDateString() });
        await saveUserData(users, currentUser.transactions);
        console.log(`Withdrawal of ${amount} from ${user.name}'s account.`);
    } catch (error) {
        console.error('Error during withdrawal:', error);
    }
}

function checkBalance(user) {
    console.log(`Current balance of ${user.name}: ${user.balance}`);
}

function viewTransactions(user) {
    console.log(`Transaction history of ${user.name}:`);
    console.log(user.transactions);
}

async function Connection(user) {
    console.log(`Welcome, ${user.name}!`);
    
    while (true) {
        console.log('1. Check Balance');
        console.log('2. Deposit Money');
        console.log('3. Withdraw Money');
        console.log('4. View Transactions');
        console.log('5. Logout');

        const operation = await askQuestion('Enter your choice (1-5): ');

        switch (operation) {
            case '1':
                checkBalance(user);
                break;
            case '2':
                const depositAmount = parseFloat(await askQuestion('Enter the amount to deposit: '));
                await deposit(user, depositAmount);
                break;
            case '3':
                const withdrawAmount = parseFloat(await askQuestion('Enter the amount to withdraw: '));
                await withdraw(user, withdrawAmount);
                break;
            case '4':
                viewTransactions(user);
                break;
            case '5':
                console.log('Logout successful.');
                return;
            default:
                console.log('Invalid choice. Please enter a number between 1-5.');
        }
    }
}

async function main() {
    let exit = false;

    while (!exit) {
        console.log('Enter 1 for connection and 2 to create an account:');

        const choice = await askQuestion('Choose a number between 1-2: ');

        if (choice === '1') {
            // Implement authentication logic here
            const accountID = await askQuestion('Enter the Account ID: ');
            const pin = await askQuestion('Enter the PIN: ');

            const user = await authenticateUser(accountID, pin);
            if (user) {
                console.log('Authentication successful.');
                await Connection(user);
            } else {
                console.log('Authentication failed.');
            }
        } else if (choice === '2') {
            const name = await askQuestion('Enter your name: ');
            await addUser(name);
        } else {
            console.log('Invalid choice. Please enter 1 or 2.');
        }

        const continueChoice = await askQuestion('Do you want to continue? (y/n): ');
        exit = continueChoice.toLowerCase() !== 'y';
    }

    rl.close();
}

main();

