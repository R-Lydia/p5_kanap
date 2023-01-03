//Déclaration de la variable "panier" pour récupérer les données du localStorage
//JSON.parse = Convertir les données du localStorage de JSON en Objet JS
let panier = JSON.parse(localStorage.getItem("panier"));

/*--------------------- AFFICHER LES PRODUITS DU PANIER ----------------------*/ 
    var totalQuantityPrice = 0;
    // SI le panier est vide ou égal 0
    if(panier == null || panier == 0) { 
        document.querySelector("h1").innerHTML = "Votre panier est vide";
    } 
    // S'IL y a des produits dans le panier
    else {   
        // Récupérer les produits du panier avec une boucle
        for(let i = 0; i <panier.length; i++) { 
            // Requêter l'API avec l'Id du produit du panier pour afficher ses différentes données
            fetch(`http://localhost:3000/api/products/${panier[i].idProduit}`) 
                .then((res) => res.json()) 
                .then((data) => {
                displayCartItem(data, panier[i]); 
                deleteItemListener(panier[i].idProduit, panier[i].colorProduit); 
                totalPrice(data, panier); 
            }) 
        }    
    }           

// Function pour afficher la page Panier
function displayCartItem(data, panier) {
    document.querySelector("#cart__items").innerHTML += `<article class="cart__item" data-id="${panier.idProduit}" data-color="${panier.colorProduit}" >
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
}





/*--------------------- CHANGER LA QUANTITE - input page panier ----------------------*/

// Function pour modifier la quantité
function updateQuantity(idProduit, colorProduit, value) {   
    quantityProduit = (Number(value));

    // SI la quantité inférieure à 1 ou supérieure à 100
    if (quantityProduit < 1 || quantityProduit > 100) {
        alert ("Veuillez renseigner une quantité entre 1 et 100 pour ajouter cet article")
        // Réactualiser l'affichage en rafraichissant la page du panier
        window.location.reload(); 
    } 
    else if (quantityProduit >= 1 || quantityProduit <= 100) {   
        updatePanier(idProduit, colorProduit, quantityProduit)
    }
}





// Function pour mettre à jour le panier avec le changement de quantité
function updatePanier(idProduit, colorProduit, quantityProduit) {
    // Récupérer le panier
    let panier = localStorage.getItem("panier")
    
    let choixProduitUser = {
        idProduit : idProduit,
        quantityProduit : quantityProduit,
        colorProduit : colorProduit
    };
    // Convertir le panier de JSON à objet JS
    let panierJson = JSON.parse(panier); 

    panierJson.forEach(item => {  
        // SI le produit a le même id ET la même couleur         
        if (item.idProduit == choixProduitUser.idProduit && item.colorProduit == choixProduitUser.colorProduit){  
            item.quantityProduit = choixProduitUser.quantityProduit;
        }
    }) 
    localStorage.setItem("panier", JSON.stringify(panierJson));
    //totalQuantityPrice = 0;
    totalProduits()
    totalPrice(data);
}






/*--------------------- SUPPRIMER UN PRODUIT ----------------------*/

// Function pour supprimer un Kanap du panier et de l'affichage (DOM)
function deleteItemListener() { 
    //totalQuantityPrice = 0;
    // Sélection du bouton suppression
    const deleteCartItem = document.querySelectorAll(".deleteItem");
    
    for(let item of deleteCartItem) {
        // Ecouter le bouton suppression
        item.addEventListener("click", (e) => {
            if(window.confirm("Etes-vous sûr de vouloir supprimer ce Kanap?")) {
                let article = item.closest("article");
                // Supprimer l'article du DOM
                article.remove();
                for(let i = 0, a = panier.length; i < a; i++) {
                    let foundProduct = panier.find((p) =>
                        p.idProduit == article.dataset.id &&
                        p.colorProduit == article.dataset.color
                    );
                    // Filtre du PANIER, garder les produits où on n'a pas cliqué
                    panier = panier.filter((p) => p != foundProduct);
                    localStorage.panier = JSON.stringify(panier);
                }
                totalProduits()
                totalPrice(data);
            }
        });
    }  
}


/*--------------------- CALCULER LA QUANTITE TOTALE ET LE PRIX TOTAL ----------------------*/

// Function pour calculer la quantité de produits qu'il y a dans le panier
function totalProduits() {
    let totalArticle = 0;
    const cart = document.querySelectorAll(".cart__item");

    // Récupérer pour chaque cart, la valeur de la quantité
    cart.forEach((cart) => {                   
        let quantityProduit = Number(cart.querySelector(".itemQuantity").value);
        totalArticle += quantityProduit;
    })
    document.getElementById("totalQuantity").innerHTML = totalArticle;
}


// Function pour calculer le prix total des produits dans le panier
function totalPrice(data) {
    console.log("data =", data)
    //var totalQuantityPrice = 0;
    const cart = document.querySelectorAll(".cart__item");

    // Récupérer pour chaque cart, la valeur de la quantité et le prix et multiplier
    //Pour chaque produit
    cart.forEach((cart) => {  
            //Si l'id du produit est égal à l'id du produit du data
        if(cart.dataset.id == data._id){

            console.log("cart =", cart) 
            console.log("data_id =", data._id)
            console.log("cart.idProduit =", cart.dataset.id)

            // on récupère le prix dans le data
            let productPrice = data.price;
            //on récupère la valeur de l'input quantité
            let quantityProduit = Number(cart.querySelector(".itemQuantity").value);
            // on multiplie la quantité et le prix pour chaque produit et on additionne
            totalQuantityPrice = totalQuantityPrice + quantityProduit * productPrice;
            
            console.log("quantityProduit =", quantityProduit)
            console.log("productPrice =", productPrice)
            console.log("totalQuantityPrice =", totalQuantityPrice)      
        }  
           
    })
    document.getElementById("totalPrice").innerHTML = totalQuantityPrice;   
}










 /*--------------------- VERIFIER LE FORMULAIRE ----------------------*/

// Sélection du formulaire
let form = document.querySelector(".cart__order__form");

 /* ------- FIRSTNAME ------*/
// Ecouter la modification de l'input FIRSTNAME
form.firstName.addEventListener("change", function() {
    validFirstName(this);
});
const validFirstName = function(inputFirstName) {
    // Création de la regex pour  validation firstName
    let firstNameRegExp = new RegExp("^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ-]{2,40}$","g");
    // Test de la regex
    let testFirstName = firstNameRegExp.test(inputFirstName.value); // retourne true ou false
    // Récupération du p avec msg erreur
    let textMsg = inputFirstName.nextElementSibling;
    if(testFirstName == true) {
        textMsg.innerHTML = "";
        form.firstName.style.border = "3px solid lightgreen";
        return true;
    } else {
        textMsg.innerHTML = "Prénom non valide";
        form.firstName.style.border = "3px solid red";
        return false;
    }
};

/* ------- LASTNAME ------*/
// Ecouter la modification de l'input LASTNAME
form.lastName.addEventListener("change", function() {
    validLastName(this);
});
const validLastName = function(inputLastName) {
    let lastNameRegExp = new RegExp("^[ a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\\'-]{2,40}$","g");
    let testLastName = lastNameRegExp.test(inputLastName.value);
    let textMsg = inputLastName.nextElementSibling;
    if(testLastName == true) {
        textMsg.innerHTML = "";
        form.lastName.style.border = "3px solid lightgreen";
        return true;
    } else {
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
    let addressRegExp = new RegExp("^[ 0-9a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿ\\'-]{2,50}$","g");
    let testAddress = addressRegExp.test(inputAddress.value);
    let textMsg = inputAddress.nextElementSibling;
    if(testAddress == true) {
        textMsg.innerHTML = "";
        form.address.style.border = "3px solid lightgreen";
        return true;
    } else {
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
    let cityRegExp = new RegExp("^[ a-zA-Z-áàâäãåçéèêëíìîïñóòôöõúùûüýÿ]{2,45}$","g");
    let testCity = cityRegExp.test(inputCity.value);
    let textMsg = inputCity.nextElementSibling;
    if(testCity == true) {
        textMsg.innerHTML = "";
        form.city.style.border = "3px solid lightgreen";
        return true;
    } else {
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
const validEmail = function(inputEmail) {
    let emailRegExp = new RegExp("^[a-zA-Z0-9._//-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$","g");
    let testEmail = emailRegExp.test(inputEmail.value);
    let textMsg = inputEmail.nextElementSibling;
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

    // Si tous les champs du formulaire sont valides = true
    if(validFirstName(form.firstName) &&
    validLastName(form.lastName) &&
    validAddress(form.address) &&
    validCity(form.city) &&
    validEmail(form.email)) {
        // Mettre l'objet contact dans le localStorage
        localStorage.setItem("contact", JSON.stringify(contact));
    }  

    // Tableau avec les Id des produits du panier à envoyer à l'API
    let products = []
    for (i = 0; i < panier.length; i++) {
        products.push(panier[i].idProduit)
    }

    // Requêter l'API avec méthode POST (envoi objet contact et tableau products)
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
        })
        .catch(function (err) {
            alert("erreur");
        });
  
}); //fin du form.addEventListener
