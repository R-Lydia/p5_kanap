//Déclaration de la variable "savePanier" pour récupérer les données du LocalStorage dans laquelle on met la key "panier" et les values ("choixProduitUser")qui sont dans le localStorage
//JSON.parse = Convertir les données du localStorage de JSON en Objet JS
let panier = JSON.parse(localStorage.getItem("panier"));
//console.log(savePanier);


/*---------------------AFFICHER LES PRODUITS DU PANIER (Etape 8)----------------------*/ 

if(panier === null || panier == 0) { //si le panier est vide ou égal 0
    console.log("Panier vide");
    document.querySelector("h1").innerHTML = "Votre panier est vide";
} 
else { //s'il y a des produits dans le panier
    console.log("Je ne suis pas vide");  

    for(let i = 0; i <panier.length; i++) { //on fait une boucle pour récupérer les produits du panier
        fetch(`http://localhost:3000/api/products/${panier[i].idProduit}`) //et on requête l'API avec l'Id du produit du panier pour afficher ses différentes données
            .then((res) => res.json()) 
            .then((data) => {
           // console.log(data);
            displayCartItem(data, panier[i]); 
            deleteItemListener(panier[i].idProduit, panier[i].colorProduit);   
        }) 
    }    
}           


//Afficher la page Panier
function displayCartItem(data, panier) {
    //console.log(data);
    document.querySelector("#cart__items").innerHTML += `<article class="cart__item" data-id="${panier.idProduit}" data-color="${panier.colorProduit}" data-price ="${data.price}">
                <div class="cart__item__img">
                <img src="${data.imageUrl}"  alt="${data.altTxt}">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${panier.colorProduit}</p>
                    <p>${data.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier.quantityProduit}" onchange="updateQuantity('${panier.idProduit}', '${panier.colorProduit}',this.value)">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
                </div>
                </article>`;
    totalProduits();
    totalPrice();
}


/*---------------------CHANGER LA QUANTITE - input page panier (Etape 9)----------------------*/

//function pour modifier la quantité
function updateQuantity(idProduit, colorProduit, value) {
    quantityProduit = (Number(value));   
    console.log(quantityProduit);

    updatePanier(idProduit, colorProduit, quantityProduit)
}

function updatePanier(idProduit, colorProduit, quantityProduit) {
    // on récupère le panier
    let panier = localStorage.getItem("panier")
    
    let choixProduitUser = {
        idProduit : idProduit,
        quantityProduit : quantityProduit,
        colorProduit : colorProduit
    };
    // on convertit le panier de JSON à objet JS
    let panierJson = JSON.parse(panier); 

    panierJson.forEach(item => {  
        // si le produit a le même id ET la même couleur   
        if (item.idProduit == choixProduitUser.idProduit && item.colorProduit == choixProduitUser.colorProduit){  
            item.quantityProduit = choixProduitUser.quantityProduit;
        } 
    }) 
    localStorage.setItem("panier", JSON.stringify(panierJson));
    //totalProduits()
}

/*---------------------SUPPRIMER UN PRODUIT (Etape 9)----------------------*/

function deleteItemListener() { //OK
    
    // Sélection du bouton suppression
    const deleteCartItem = document.querySelectorAll(".deleteItem");
    
    for(let item of deleteCartItem) {
        // Ecoute le bouton suppression
        item.addEventListener("click", (e) => {
            if(window.confirm("Etes-vous sûr de vouloir supprimer ce Kanap?")) {
                let article = item.closest("article");
                // Supression de l'article du DOM
                article.remove();
                for(let i = 0, a = panier.length; i < a; i++) {
                    let foundProduct = panier.find((p) =>
                        p.idProduit == article.dataset.id &&
                        p.colorProduit == article.dataset.color
                    );
                    // Filtre du PANIER, on garde les produits où on n'a pas cliqué
                    panier = panier.filter((p) => p != foundProduct);
                    localStorage.panier = JSON.stringify(panier);
                    window.location.href = "cart.html"; // on réactualise l'affichage en rafraichissant la page du panier
                }
            }
        });
    }
}


/*---------------------CALCULER LA QUANTITE TOTALE ET LE PRIX TOTAL (Etape 9)----------------------*/
//Calculer la quantité de produits qu'il y a dans le panier

/*-------totalQuantity-------*/ //OK
function totalProduits() {
    let totalArticle = 0;
    for(let product of panier){
        totalArticle += Number(product.quantityProduit);
        //console.log(totalArticle);
    }
    document.getElementById("totalQuantity").innerHTML = totalArticle;
}


/*-------totalPrice-------*/ //OK
function totalPrice() {
    let totalQuantityPrice = 0;

    const cart = document.querySelectorAll(".cart__item");
    //console.log(cart);

    cart.forEach((cart) => {
        let productPrice = Number(cart.dataset.price);                        
            
        let quantityProduit = Number(cart.querySelector(".itemQuantity").value);

        totalQuantityPrice += quantityProduit * productPrice;
        //console.log(quantityProduit);
        //console.log(productPrice);
        //console.log(totalQuantityPrice);
    })
    document.getElementById("totalPrice").innerHTML = totalQuantityPrice;
}









 /*---------------------PASSER LA COMMANDE (Etape 10)----------------------*/

//  Sélection du formulaire
let form = document.querySelector(".cart__order__form");
/*
 // REGEX
 // Regex pour firstName et lastName
 let nameRegExp = new RegExp("^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ-]{2,40}$","g");
 // Regex pour address
 let addressRegExp = new RegExp("^[0-9a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿ-]{2,50}$","g");
// Regex pour city
let cityRegExp = new RegExp("^[a-zA-Z-áàâäãåçéèêëíìîïñóòôöõúùûüýÿ]{2,45}$","g");
// Regex pour email
let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$","g");
*/

 /* ------- FIRSTNAME ------*/
//  Ecouter la modification de l'input FIRSTNAME
form.firstName.addEventListener("change", function() {
    validFirstName(this);
});

const validFirstName = function(inputFirstName) {
    //création de la regex pour  validation firstName
    let firstNameRegExp = new RegExp(
        "^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ-]{2,40}$","g"
    );
    //test de la regex
    let testFirstName = firstNameRegExp.test(inputFirstName.value); // retourne true ou false
    //récupération du p avec msg erreur
    let textMsg = inputFirstName.nextElementSibling;
    //console.log(testFirstName);
    if(testFirstName == true) {
        textMsg.innerHTML = "Prénom valide";
        return true;
    }else {
        textMsg.innerHTML = "Prénom non valide";
        return false;
    }
};

/* ------- LASTNAME ------*/
//  Ecouter la modification de l'input LASTNAME
form.lastName.addEventListener("change", function() {
    validLastName(this);
});

const validLastName = function(inputLastName) {
    //création de la regex pour  validation lastName
    let lastNameRegExp = new RegExp(
        "^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ-]{2,40}$","g"
    );
    let testLastName = lastNameRegExp.test(inputLastName.value); // retourne true ou false
    let textMsg = inputLastName.nextElementSibling;
    //console.log(testLastName);
    if(testLastName == true) {
        textMsg.innerHTML = "Nom valide";
        return true;
    }else {
        textMsg.innerHTML = "Nom non valide";
        return false;
    }
};

/* ------- ADDRESS ------*/
//  Ecouter la modification de l'input ADDRESS
form.address.addEventListener("change", function() {
    validAddress(this);
});

const validAddress = function(inputAddress) {
    //création de la regex pour  validation address
    let addressRegExp = new RegExp(
        "^[ 0-9a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿ-]{2,50}$","g"
    );
    let testAddress = addressRegExp.test(inputAddress.value); // retourne true ou false
    let textMsg = inputAddress.nextElementSibling;
    //console.log(testAddress);
    if(testAddress == true) {
        textMsg.innerHTML = "Adresse valide";
        return true;
    }else {
        textMsg.innerHTML = "Adresse non valide";
        return false;
    }
};
/* ------- CITY ------*/
//  Ecouter la modification de l'input CITY
form.city.addEventListener("change", function() {
    validCity(this);
});

const validCity = function(inputCity) {
    //création de la regex pour  validation city
    let cityRegExp = new RegExp(
        "^[a-zA-Z-áàâäãåçéèêëíìîïñóòôöõúùûüýÿ]{2,45}$","g"
    );
    let testCity = cityRegExp.test(inputCity.value); // retourne true ou false
    let textMsg = inputCity.nextElementSibling;
    //console.log(testCity);
    if(testCity == true) {
        textMsg.innerHTML = "Ville valide";
        return true;
    }else {
        textMsg.innerHTML = "Ville non valide";
        return false;
    }
};

/* ------- EMAIL ------*/
//  Ecouter la modification de l'input EMAIL
form.email.addEventListener("change", function() {
    validEmail(this);
});

const validEmail = function(inputEmail){
    //création de la regex pour  validation email
    let emailRegExp = new RegExp(
        "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$","g"
    );
    //Test de l'expression régulière
    let testEmail = emailRegExp.test(inputEmail.value); // retourne true ou false
    let textMsg = inputEmail.nextElementSibling;
    //console.log(testEmail);
    if(testEmail == true) {
        textMsg.innerHTML = "Email valide";
        return true;
    } else {
        textMsg.innerHTML = "Email non valide";
        return false;
    }
};


/* ------------ ENVOI FORMULAIRE -----------*/

//Objet contact contenant les informations du formulaire à envoyer à l'API
const contact = {
    firstName : form.firstName.value, 
    lastName : form.lastName.value,
    address : form.address.value,
    city : form.city.value,
    email : form.email.value
}
//console.log("contact");
//console.log(contact);


//  Ecouter la soumission du FORMULAIRE
form.addEventListener("submit", function(e) {
    e.preventDefault();
   /* console.log(form.firstName.value);
    console.log(form.lastName.value);
    console.log(form.address.value);
    console.log(form.city.value);
    console.log(form.email.value);*/

    /*console.log(validFirstName(form.firstName));
    console.log(validLastName(form.lastName));
    console.log(validAddress(form.address));
    console.log(validCity(form.city));
    console.log(validEmail(form.email));*/

    // Si tous les champs du formulaire sont valides = true
    if(validFirstName(form.firstName) &&
    validLastName(form.lastName) &&
    validAddress(form.address) &&
    validCity(form.city) &&
    validEmail(form.email)) {
        //console.log("L'envoi du formulaire est en cours de validation");
        // Soumission du formulaire
        form.submit();
        //Mettre l'objet contact dans le localStorage
        localStorage.setItem("contact", JSON.stringify(contact));
        //console.log(contact);
    } else {
        //console.log("Le formulaire n'est pas rempli correctement");
    } 
});



/*Pour les routes POST, l’objet contact envoyé au serveur doit contenir les champs firstName,
lastName, address, city et email. Le tableau des produits envoyé au back-end doit être un
array de strings product-ID. Les types de ces champs et leur présence doivent être validés
avant l’envoi des données au serveur*/

//Mettre les informations du formulaire et les produits sélectionnés dans un objet à envoyer à l'API
const client = {
    panier,
    contact
};
/*console.log("client")
console.log(client)*/



