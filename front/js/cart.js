//Déclaration de la variable "savePanier" pour récupérer les données du LocalStorage dans laquelle on met la key "panier" et les values ("choixProduitUser")qui sont dans le localStorage
//JSON.parse = Convertir les données du localStorage de JSON en Objet JS
let savePanier = JSON.parse(localStorage.getItem("panier"));
console.log(savePanier);


/*---------------------AFFICHER LES PRODUITS DU PANIER (Etape 8)----------------------*/ 
if (savePanier === null || savePanier == 0) {
    console.log("Panier vide");
} 
else {
    console.log("Je ne suis pas vide")

    for(let i = 0; i <savePanier.length; i++){

        fetch(`http://localhost:3000/api/products/${savePanier[i].idProduit}`)
            .then((res) => res.json()) //pour récupérer la réponse au format json
            .then((data) => {
            console.log(data);
            
                document.querySelector("#cart__items").innerHTML += `<article class="cart__item" data-id="${savePanier[i].idProduit}" data-color="${savePanier[i].colorProduit}">
                <div class="cart__item__img">
                <img src="${data.imageUrl}"  alt="${data.altTxt}">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${savePanier[i].colorProduit}</p>
                    <p>${data.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${savePanier[i].quantityProduit}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
                </div>
                </article>`;
        }) //fin .then   
    } //fin for let i
} //fin du else


/*---------------------CHANGER LA QUANTITE - input page panier (Etape 9)----------------------*/
/*
//Changer la quantité d'un produit sur la page panier -test3- 
const changeQuantity = document.getElementsByClassName(".itemQuantity"); //sélection des inputs qui gèrent la quantité
console.log(changeQuantity);

changeQuantity.addEventListener("change", (event) => { 
    //event.preventDefault();
    //const changeQuantitySelect = document.querySelector(".itemQuantity");
    //changeQuantitySelect.textContent = `${event.target.value}`
    //console.log("change");
    console.log(event.target.value);
});

//}
*/

/*//Changer la quantité d'un produit sur la page panier -test2-
const changeQuantity = document.querySelectorAll(".itemQuantity"); //sélection des inputs qui gèrent la quantité
console.log(changeQuantity);

changeQuantity.addEventListener("change", updateValue 
    //event.preventDefault();
);
function updateValue(e){
    value = e.target.value;
}*/

/*
//Changer la quantité d'un produit sur la page panier -test1-
const changeQuantity = document.querySelectorAll(".itemQuantity"); //sélection des inputs qui gèrent la quantité
console.log(changeQuantity);

for (let i = 0; i< changeQuantity.length; i++){ //
    changeQuantity[i].addEventListener("change", (event) =>{
        event.preventDefault();
        let changeQuantitySelect = savePanier[i].quantityProduit; //sélection du produit(par son id) à supprimer au clic
        console.log(changeQuantitySelect);
    });

};
*/
/*//Changer la quantité -idée de base -
function changeQuantity(product,quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if(foundProduct != undefined){ 
        foundProduct.quantity += quantity; 
        if(foundProduct.quantity <= 0){
            removeFromBasket(foundProduct);
        }else{
            saveBasket(basket);
        }
    } 
}*/




/*---------------------SUPPRIMER UN PRODUIT (Etape 9)----------------------*/
//document.querySelectorAll('.deleItem').forEach(element => {
//   element<ta logique ici>
//});



//Supprimer un élément/produit du panier - test3 - Fonctionne
/*const deleteItem = document.querySelectorAll(".deleteItem");
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

/*//Retirer un produit du panier - test1
function removeFromPanier(product){
    let panier = getPanier();
    panier = panier.filter(p => p.id != product.id); // filtrer le produit pour le supprimer
    savePanier(panier);
}
//Supprimer un élément du panier - test2
const deletItem = document.querySelectorAll(".deleteItem");
console.log(deletItem);
deletItem.forEach((btn,i) => {
    btn.addEventListener('click', e => {
        deletItemSelect(i);
    });
});*/


/*----------------------------ENREGISTRER LE PANIER DANS LE LOCALSTORAGE-----------------------------*/
/*
//Enregistrer le panier dans localStorage - idée de base !
function saveBasket (basket){
    localStorage.setItem("basket", JSON.stringify(basket)); //JSON.stringify = convertir les objets JS en chaînes de caractère
}

//Récupérer le panier dans localStorage - idée de base !
function getBasket(){
    let basket = localStorage.getItem("basket"); 
    if (basket == null){ //si le panier n'existe pas : retourner un tableau vide
        return [];
    }else{
        return JSON.parse(basket); // si le panier existe : JSON.parse = convertir les données du localStorage de JSON en Objet JS
    }   
}


//Ajouter au panier et enregistrer - idée de base !
function addBasket(product){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id )//est-ce que le produit est déjà dans le panier?
    if(foundProduct != undefined){ //s'il est différent de undefined, ça veut dire qu'il existe déjà
        foundProduct.quantity++; //j'ajoute 1 à la quantité
    }else{
        product.quantity = 1; // définit la quantité à 1 par défaut
        basket.push(product); //.push = ajouter le produit
    }
    saveBasket(basket);
}


//Retirer un produit du panier -idée de base !
function removeFromBasket(produit){
    let basket = getBasket();
    basket = basket.filter(p => p.id != product.id); // filtrer le produit pour le supprimer
    saveBasket(basket);
}


//Changer la quantité - idée de base !
function changeQuantity(product,quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if(foundProduct != undefined){ 
        foundProduct.quantity += quantity; 
        if(foundProduct.quantity <= 0){
            removeFromBasket(foundProduct);
        }else{
            saveBasket(basket);
        }
    } 
}

//Calculer la quantité de produits qu'il y a dans le panier - idée de base !
function getNumberProduct(){
    let basket = getBasket(); //récupérer le panier
    let number = 0;
    for(let product of basket){
        number += product.quantity;
    }
    return number;
}

//Calculer le total du prix - idée de base !
function getTotalPrice(){
    let basket = getBasket(); //récupérer le panier
    let total = 0;
    for(let product of basket){
        total += product.quantity * product.price;
    }
    return total;
}

*/


 /*---------------------PASSER LA COMMANDE (Etape 10)----------------------*/
 