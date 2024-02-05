const readline = require('readline');
//algorithme
// enter 1 => addcontact
//enter 2 => displaycontact
//enter 3  => searchcontact
//enter 4 => quiter
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
listcontact=[];

function addcontact(){
 
  
  //ajouter les input
  rl.question('Enter name: ', (name) => {
    
    rl.question('Enter number: ', (number) => {
      
       listcontact.push({name,number});
       console.log(`Contact ajouter: ${name} - ${number}`);
       tousFonction();
    });
  });
}
function  displaycontact(){
  if(listcontact.lenght===0){
    console.log("pas de contact ");
  }
  else{
    console.log("mes  contact ");


listcontact.forEach(function(value) {
  listcontact.forEach((contact, index) => {
    console.log(`${index + 1}. ${contact.name} - ${contact.number}`);
  });
});

  }
  tousFonction();
}
function searchcontact(){
  rl.question('Enter le nom a chercher: ', (namerech) => {
    const existContact = listcontact.find(contact => contact.name.toLowerCase() === namerech.toLowerCase());
    if(existContact){
      console.log(`Contact exist: ${existContact.name} - ${existContact.number}`);
    }
    else{
      console("contact n'exist pas:",namerech);
    }
    tousFonction();

  }
  );
  
}
function quiter(){
  console.log('quiter le programme');
  rl.close();
}
function tousFonction() {
  console.log('\nOperations:');
  console.log('1. ajouter le contact');
  console.log('2. afficher les contact');
  console.log('3. recherche un contact');
  console.log('4. quiter');
  rl.question('choisir un nombre entre 1-4: ', (c) => {
    switch (c) {
      case '1':
        addcontact();
        break;
      case '2':
        displaycontact();
        break;
      case '3':
        searchcontact();
        break;
      case '4':
        quiter();
        break;
      default:
        console.log('selectionner le nombre entre 1-4 !');
        tousFonction();
        break;
    }
  });
}
tousFonction();







