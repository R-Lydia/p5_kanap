//Déclaration de la variable "panier" pour récupérer les données du localStorage
//JSON.parse = Convertir les données du localStorage de JSON en Objet JS
let panier = JSON.parse(localStorage.getItem("panier"));

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


// Function pour afficher la page Panier
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

// Function pour modifier la quantité
function updateQuantity(idProduit, colorProduit, value) {
    quantityProduit = (Number(value));   
    console.log(quantityProduit);

    updatePanier(idProduit, colorProduit, quantityProduit)
}

// Function pour mettre à jour le panier avec le changement de quantité
function updatePanier(idProduit, colorProduit, quantityProduit) {
    // récupérer le panier
    let panier = localStorage.getItem("panier")
    
    let choixProduitUser = {
        idProduit : idProduit,
        quantityProduit : quantityProduit,
        colorProduit : colorProduit
    };
    // convertir le panier de JSON à objet JS
    let panierJson = JSON.parse(panier); 

    panierJson.forEach(item => {  
        // si le produit a le même id ET la même couleur   
        if (item.idProduit == choixProduitUser.idProduit && item.colorProduit == choixProduitUser.colorProduit){  
            item.quantityProduit = choixProduitUser.quantityProduit;
        } 
    }) 
    localStorage.setItem("panier", JSON.stringify(panierJson));
    totalProduits()
    totalPrice();
}

/*---------------------SUPPRIMER UN PRODUIT (Etape 9)----------------------*/

// Function pour supprimer un Kanap du panier et de l'affichage (DOM)
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

// Function pour calculer la quantité de produits qu'il y a dans le panier
function totalProduits() {
    let totalArticle = 0;
    const cart = document.querySelectorAll(".cart__item");

    cart.forEach((cart) => {                   
        let quantityProduit = Number(cart.querySelector(".itemQuantity").value);
        totalArticle += quantityProduit;
    })
    document.getElementById("totalQuantity").innerHTML = totalArticle;
}

// Function pour calculer le prix total des produits dans le panier
function totalPrice() {
    let totalQuantityPrice = 0;
    const cart = document.querySelectorAll(".cart__item");

    cart.forEach((cart) => {
        let productPrice = Number(cart.dataset.price);                            
        let quantityProduit = Number(cart.querySelector(".itemQuantity").value);

        totalQuantityPrice += quantityProduit * productPrice;
    })
    document.getElementById("totalPrice").innerHTML = totalQuantityPrice;
}


 /*---------------------PASSER LA COMMANDE (Etape 10)----------------------*/

//  Sélection du formulaire
let form = document.querySelector(".cart__order__form");

 /* ------- FIRSTNAME ------*/
//  Ecouter la modification de l'input FIRSTNAME
form.firstName.addEventListener("change", function() {
    validFirstName(this);
});
const validFirstName = function(inputFirstName) {
    //création de la regex pour  validation firstName
    let firstNameRegExp = new RegExp("^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ-]{2,40}$","g");
    //test de la regex
    let testFirstName = firstNameRegExp.test(inputFirstName.value); // retourne true ou false
    //récupération du p avec msg erreur
    let textMsg = inputFirstName.nextElementSibling;
    if(testFirstName == true) {
        textMsg.innerHTML = "";
        form.firstName.style.border = "3px solid lightgreen";
        return true;
    }else {
        textMsg.innerHTML = "Prénom non valide";
        form.firstName.style.border = "3px solid red";
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
    let lastNameRegExp = new RegExp("^[ a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\\'-]{2,40}$","g");
    let testLastName = lastNameRegExp.test(inputLastName.value); // retourne true ou false
    let textMsg = inputLastName.nextElementSibling;
    //console.log(testLastName);
    if(testLastName == true) {
        textMsg.innerHTML = "";
        form.lastName.style.border = "3px solid lightgreen";
        return true;
    }else {
        textMsg.innerHTML = "Nom non valide";
        form.lastName.style.border = "3px solid red";
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
    let addressRegExp = new RegExp("^[ 0-9a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿ\\'-]{2,50}$","g");
    let testAddress = addressRegExp.test(inputAddress.value); // retourne true ou false
    let textMsg = inputAddress.nextElementSibling;
    //console.log(testAddress);
    if(testAddress == true) {
        textMsg.innerHTML = "";
        form.address.style.border = "3px solid lightgreen";
        return true;
    }else {
        textMsg.innerHTML = "Adresse non valide";
        form.address.style.border = "3px solid red";
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
    let cityRegExp = new RegExp("^[ a-zA-Z-áàâäãåçéèêëíìîïñóòôöõúùûüýÿ]{2,45}$","g");
    let testCity = cityRegExp.test(inputCity.value); // retourne true ou false
    let textMsg = inputCity.nextElementSibling;
    //console.log(testCity);
    if(testCity == true) {
        textMsg.innerHTML = "";
        form.city.style.border = "3px solid lightgreen";
        return true;
    }else {
        textMsg.innerHTML = "Ville non valide";
        form.city.style.border = "3px solid red";
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
    let emailRegExp = new RegExp("^[a-zA-Z0-9._//-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$","g");
    //Test de l'expression régulière
    let testEmail = emailRegExp.test(inputEmail.value); // retourne true ou false
    let textMsg = inputEmail.nextElementSibling;
    //console.log(testEmail);
    if(testEmail == true) {
        textMsg.innerHTML = "";
        form.email.style.border = "3px solid lightgreen";
        return true;
    } else {
        textMsg.innerHTML = "Email non valide";
        form.email.style.border = "3px solid red";
        return false;
    }
};

/* ------------ ENVOI FORMULAIRE -----------*/

// Ecouter la soumission du FORMULAIRE
form.addEventListener("submit", function(e) {
    e.preventDefault();
    // Objet contact contenant les informations du formulaire à envoyer à l'API
    const contact = {
        firstName : form.firstName.value, 
        lastName : form.lastName.value,
        address : form.address.value,
        city : form.city.value,
        email : form.email.value
    }
    console.log("contact")
    console.log(contact);

    // Si tous les champs du formulaire sont valides = true
    if(validFirstName(form.firstName) &&
    validLastName(form.lastName) &&
    validAddress(form.address) &&
    validCity(form.city) &&
    validEmail(form.email)) {
        console.log("L'envoi du formulaire est en cours de validation");
        // Mettre l'objet contact dans le localStorage
        localStorage.setItem("contact", JSON.stringify(contact));
    } else {
        console.log("Le formulaire n'est pas rempli correctement");
    } 
    
    // Tableau avec les Id des produits du panier à envoyer à l'API
    let products = []
    for (i = 0; i < panier.length; i++) {
        products.push(panier[i].idProduit)
    }
    console.log(products)


    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            commandeClient = {
                contact,
                products  
            }
        )
    })
        .then((res) => res.json())
        .then((data) => {
            // Renvoyer à la page confirmation
            window.location.href =  `./confirmation.html?orderId=${data.orderId}`;
            // Effacer les données dans le localStorage
            localStorage.clear();
            console.log(data);
        })
        .catch(function (err) {
            console.log(err);
            alert("erreur");
        });
  
}); //fin du form.addEventListener
