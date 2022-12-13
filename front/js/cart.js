//Déclaration de la variable "savePanier" pour récupérer les données du LocalStorage dans laquelle on met la key "panier" et les values ("choixProduitUser")qui sont dans le localStorage
//JSON.parse = Convertir les données du localStorage de JSON en Objet JS
let savePanier = JSON.parse(localStorage.getItem("panier"));
//console.log(savePanier);


/*---------------------AFFICHER LES PRODUITS DU PANIER (Etape 8)----------------------*/ 

if (savePanier === null || savePanier == 0) { //si le panier est vide ou égal 0
    console.log("Panier vide");
} 
else { //s'il y a des produits dans le panier
    console.log("Je ne suis pas vide");  

    for(let i = 0; i <savePanier.length; i++) { //on fait une boucle pour récupérer les produits du panier

        fetch(`http://localhost:3000/api/products/${savePanier[i].idProduit}`) //et on requête l'API avec l'Id du produit du panier pour afficher ses différentes données
            .then((res) => res.json()) 
            .then((data) => {
           // console.log(data);
            displayCartItem(data, savePanier[i]); 
            addQuantityListener(savePanier[i].idProduit, savePanier[i].colorProduit);   
        }) 
    }    
}           



//function afficher cartItem

function displayCartItem (data, savePanier) {
    console.log(data);
    document.querySelector("#cart__items").innerHTML += `<article class="cart__item" data-id="${savePanier.idProduit}" data-color="${savePanier.colorProduit}">
                <div class="cart__item__img">
                <img src="${data.imageUrl}"  alt="${data.altTxt}">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${savePanier.colorProduit}</p>
                    <p>${data.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${savePanier.quantityProduit}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
                </div>
                </article>`;
}

//function avec addEventListener pour modifier la quantité

function addQuantityListener (idProduit, colorProduit) {
    let cartItem = document.getElementsByClassName("cart__item"); //sélection de cart item 
    console.log(idProduit);
    console.log(colorProduit);
            
    for (let item of cartItem){
        console.log(item)
        if (item.dataset.id == idProduit && item.dataset.color == colorProduit){ // si le produit a le même id ET la même couleur
            let itemQuantities = item.getElementsByClassName("itemQuantity");
            console.log(itemQuantities);

            itemQuantities[0].addEventListener("change", (event) => {  
                console.log("change");
                console.log(event.target.value);
            })
                    //j'enregistre la modification de l'input quantity dans le localStorage

                    //localStorage.setItem("panier", JSON.stringify(savePanier)); //on envoie la key "panier" dans le localStorage   

        } 
    }
}

//function avec addEventListener pour supprimer le canapé

            
/*---------------------CHANGER LA QUANTITE - input page panier (Etape 9)----------------------*/

                
              



/*---------------------SUPPRIMER UN PRODUIT (Etape 9)----------------------*/
/*
                //Supprimer un élément/produit du panier 
                const deleteItem = document.querySelectorAll(".deleteItem"); 
                console.log(deleteItem);

                for (let i = 0; i< deleteItem.length; i++){
                    deleteItem[i].addEventListener("click", (e) =>{
                    e.preventDefault();
                    if (deleteItem[i].id == data.id && deleteItem[i].color == data.color){    
                    let deleteItemSelect = savePanier[i].idProduit; //sélection du produit(par son id) à supprimer au clic
                    console.log(deleteItemSelect);

                    savePanier = savePanier.filter (p => p.idProduit != deleteItemSelect); //on garde tous les éléments sauf celui qui a été cliqué
                    console.log(savePanier);

                    localStorage.setItem("panier", JSON.stringify(savePanier)); //on envoie la key "panier" dans le localStorage pour enlever le produit
                    window.location.href = "cart.html"; // on réactualise l'affichage en rafraichissant la page du panier
                    });
                }
                };
*/




    


/*Dans chaque article "cart__item",
quand je clique sur "l'input de la quantité",
si l'article a le même id et la même couleur,
je change la quantité et l'enregistre dans mon panier */


//Pour chaque cart-item, je regarde le data-id et data-color pour savoir si c'est le même
//si c'est le même et qu'on clique pour changer la quantité
//on enregistre la nouvelle quantité









/*---------------------SUPPRIMER UN PRODUIT (Etape 9)----------------------*/

/*Dans chaque article "cart__item", 
quand je clique sur "supprimer", 
si l'article a le même id et la même couleur, 
je supprime l'article du DOM et du localStorage*/

/*let cartItem = document.getElementsByClassName("cart__item"); //sélection de cart item 
console.log (cartItem);

for (let item of cartItem){
    
    if (item.id == data.id && item.color == data.color){ // si le produit a le même id ET la même couleur

        let deleteItem = document.querySelector(".deleteItem");
        deleteItem.addEventListener("click", (e) => {  // au clic, j'écoute pour supprimer
        e.preventDefault();
        console.log (deleteItem) 

        localStorage.setItem("panier", JSON.stringify(savePanier)); //on envoie la key "panier" dans le localStorage pour enlever le produit
        window.location.href = "cart.html"; // on réactualise l'affichage en rafraichissant la page du panier
       })
    }
}
*/

/*
//Supprimer un élément/produit du panier - test3 - Ne Fonctionne pas vraiment...Essayer autre chose
const deleteItem = document.querySelectorAll(".deleteItem"); // fonctionne trop aléatoirement!!!
console.log(deleteItem);

for (let i = 0; i< deleteItem.length; i++){
    deleteItem[i].addEventListener("click", (e) =>{
        e.preventDefault();

        let deleteItemSelect = savePanier[i].idProduit; //sélection du produit(par son id) à supprimer au clic
        console.log(deleteItemSelect);

        savePanier = savePanier.filter (p => p.idProduit != deleteItemSelect); //on garde tous les éléments sauf celui qui a été cliqué
        console.log(savePanier);

        localStorage.setItem("panier", JSON.stringify(savePanier)); //on envoie la key "panier" dans le localStorage pour enlever le produit
        window.location.href = "cart.html"; // on réactualise l'affichage en rafraichissant la page du panier
    });
};*/

           /* }) //fin .then 
    } //fin for let i
} //fin du else*/











/*---------------------CALCULER LA QUANTITE TOTALE ET LE PRIX TOTAL (Etape 9)----------------------*/

/*-------totalQuantity-------*/
//let totalQuantity =


/*-------totalPrice-------*/
















 /*---------------------PASSER LA COMMANDE (Etape 10)----------------------*/

//  Sélection du formulaire
 let form = document.querySelector(".cart__order__form");

 /* ------- FIRSTNAME ------*/
//  Ecouter la modification de l'input FIRSTNAME
form.firstName.addEventListener("change", function() {
    validFirstName(this);
});

const validFirstName = function (inputFirstName){
    //création de la regex pour  validation firstName
    let firstNameRegExp = new RegExp (
        "^[a-zA-Z-]{2,20}$","g"
    );
    //test de la regex
    let testFirstName = firstNameRegExp.test(inputFirstName.value); // retourne true ou false
    //récupération du p avec msg erreur
    let textMsg = inputFirstName.nextElementSibling;
    //console.log(testFirstName);
    if(testFirstName == true) {
        textMsg.innerHTML = "Prénom valide";
        return true;
    }else{
        textMsg.innerHTML = "Prénom non valide";
        return false;
    }
};

/* ------- LASTNAME ------*/
//  Ecouter la modification de l'input LASTNAME
form.lastName.addEventListener("change", function() {
    validLastName(this);
});

const validLastName = function (inputLastName){
    //création de la regex pour  validation lastName
    let lastNameRegExp = new RegExp (
        "^[a-zA-Z-]{2,20}$","g"
    );
    //(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
    let testLastName = lastNameRegExp.test(inputLastName.value); // retourne true ou false
    let textMsg = inputLastName.nextElementSibling;
    //console.log(testLastName);
    if(testLastName == true) {
        textMsg.innerHTML = "Nom valide";
    }else{
        textMsg.innerHTML = "Nom non valide";
    }
};

/* ------- ADDRESS ------*/
//  Ecouter la modification de l'input ADDRESS
form.address.addEventListener("change", function() {
    validAddress(this);
});

const validAddress = function (inputAddress){
    //création de la regex pour  validation address
    let addressRegExp = new RegExp (
        "^[a-zA-Z-]{2,20}$","g"
    );
    let testAddress = addressRegExp.test(inputAddress.value); // retourne true ou false
    let textMsg = inputAddress.nextElementSibling;
    //console.log(testAddress);
    if(testAddress == true) {
        textMsg.innerHTML = "Adresse valide";
    }else{
        textMsg.innerHTML = "Adresse non valide";
    }
};
/* ------- CITY ------*/
//  Ecouter la modification de l'input CITY
form.city.addEventListener("change", function() {
    validCity(this);
});

const validCity = function (inputCity){
    //création de la regex pour  validation city
    let cityRegExp = new RegExp (
        "^[a-zA-Z-]{2,25}$","g"
    );
    let testCity = cityRegExp.test(inputCity.value); // retourne true ou false
    let textMsg = inputCity.nextElementSibling;
    //console.log(testCity);
    if(testCity == true) {
        textMsg.innerHTML = "Ville valide";
    }else{
        textMsg.innerHTML = "Ville non valide";
    }
};

/* ------- EMAIL ------*/
//  Ecouter la modification de l'input EMAIL
form.email.addEventListener("change", function() {
    validEmail(this);
});

const validEmail = function (inputEmail){
    //création de la regex pour  validation email
    let emailRegExp = new RegExp (
        "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$","g"
    );
    //Test de l'expression régulière
    let testEmail = emailRegExp.test(inputEmail.value); // retourne true ou false
    let textMsg = inputEmail.nextElementSibling;
    //console.log(testEmail);
    if(testEmail == true) {
        textMsg.innerHTML = "Email valide";
        return true;
    } else{
        textMsg.innerHTML = "Email non valide";
        return false;
    }
};


/* ------------ ENVOI FORMULAIRE -----------*/

//Objet contact contenant les informations du formulaire à envoyer à l'API
const contact = {
    firstName : firstName.value,
    lastName : lastName.value,
    address : address.value,
    city : city.value,
    email : email.value
}
console.log("contact");
console.log(contact);


//  Ecouter la soumission du FORMULAIRE
form.addEventListener("submit", function(e) {
    e.preventDefault(); //on arrête le comportement par défaut

    if (validEmail(form.email) && validFirstName(form.firstName)){  // !!!!!!!MANQUE les autres éléments du formulaire
        console.log("L'envoi du formulaire est en cours de validation");
        form.submit();

        //Mettre l'objet contact dans le localStorage
        localStorage.setItem ("contact", JSON.stringify(contact));

    } else {
        console.log("Le formulaire n'est pas rempli correctement");
    } 
});



/*Pour les routes POST, l’objet contact envoyé au serveur doit contenir les champs firstName,
lastName, address, city et email. Le tableau des produits envoyé au back-end doit être un
array de strings product-ID. Les types de ces champs et leur présence doivent être validés
avant l’envoi des données au serveur*/

//Mettre les informations du formulaire et les produits sélectionnés dans un objet à envoyer à l'API
/*const aEnvoyer = {
    savePanier,
    contact
};
console.log("aEnvoyer")
console.log(aEnvoyer)*/