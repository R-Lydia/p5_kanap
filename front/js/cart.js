//Déclaration de la variable "savePanier" pour récupérer les données du LocalStorage dans laquelle on met la key "panier" et les values ("choixProduitUser")qui sont dans le localStorage
//JSON.parse = Convertir les données du localStorage de JSON en Objet JS
let savePanier = JSON.parse(localStorage.getItem("panier"));
console.log(savePanier);


//Affichage des produits du panier
let pagePanier = [];

if (savePanier === null) {
    console.log("Panier vide");
} else {
    console.log("je ne suis pas vide") 
    for(let i = 0; i <savePanier.length; i++){
        document.querySelector("#cart__items").innerHTML += `<article class="cart__item" data-id="${savePanier[i].idProduit}" data-color="${savePanier[i].colorProduit}">
        <div class="cart__item__img">
          <img src="${savePanier[i].imageUrl}" alt="${savePanier[i].altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>Nom du produit</h2>
            <p>Vert</p>
            <p>42,00 €</p>
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
        //console.log(savePanier[i]);
    }
};




























//Pour chaque produit présent dans le localStorage afficher les éléménets suivants 
/*if (savePanier === null){
    console.log("je suis vide")
}else{
    let pagePanier = [];*/
    /*fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
      .then((data) => {
        let pagePanier =data.product;
    for(i=0; i < savePanier.length; i++){
        document.querySelector("#cart__item").innerHTML += `<article class="cart__item" data-id="${product-ID}" data-color="${product-color}">
        <div class="cart__item__img">
          <img src="${data.imageUrl}" alt="${data.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>Nom du produit</h2>
            <p>Vert</p>
            <p>42,00 €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
        </article>`;
    } 
});*/
//}

/*//Affichage  des produits du panier
//Sélection de la classe où on va injecter le code html
const cart = document.querySelector("#cart__items").innerHTML += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
<div class="cart__item__img">
  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>Nom du produit</h2>
    <p>Vert</p>
    <p>42,00 €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`;*/




/*
//Test qui marche pas et je ne ssais pas pourquoi!!!
function addPanier(produit){
    let panier = getPanier();
    let foundProduit = panier.find(p => p.id == produit.id)//est-ce que le produit est déjà dans le panier?
    
    if(foundProduit != undefined){ //s'il est différent de undefined, ça veut dire qu'il existe déjà
        foundProduit.quantity++; //j'ajoute 1 à la quantité
        
    }else{
        quantity.value = 1; // définit la quantité à 1 par défaut
        panier.push(produit); //.push = ajouter le produit
        
    }
    savePanier(panier);
}*/

/*
//Enregistrer le panier dans localStorage
function saveBasket (basket){
    localStorage.setItem("basket", JSON.stringify(basket)); //JSON.stringify = convertir les objets JS en chaînes de caractère
}
//Récupérer? le panier dans localStorage
function getBasket(){
    let basket = localStorage.getItem("basket"); 
    if (basket == null){ //si le panier n'existe pas : retourner un tableau vide
        return [];
    }else{
        return JSON.parse(basket); // si le panier existe : JSON.parse = convertir les données du localStorage de JSON en Objet JS
    }
    
}

//Ajouter au panier et enregistrer
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

//Retirer un produit du panier
function removeFromBasket(product){
    let basket = getBasket();
    basket = basket.filter(p => p.id != product.id); // filtrer le produit pour le supprimer
    saveBasket(basket);
}

//Changer la quantité
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

//Calculer la quantité de produits qu'il y a dans le panier
function getNumberProduct(){
    let basket = getBasket(); //récupérer le panier
    let number = 0;
    for(let product of basket){
        number += product.quantity;
    }
    return number;
}

//Calculer le total du prix
function getTotalPrice(){
    let basket = getBasket(); //récupérer le panier
    let total = 0;
    for(let product of basket){
        total += product.quantity * product.price;
    }
    return total;
}

*/

/*
// J'execute une premiere fois
let optionsProduct =
    {
        productId : 1,
        quantity : 2,
        color : 3
    }
    let productInLocalStorage = JSON.parse(localStorage.getItem("product"))
    // s'il y a un produit dans le local storage  //
    // if there's product(s) in local Storage, pusht in json format //
    if(productInLocalStorage){
        productInLocalStorage.push(optionsProduct)
        localStorage.setItem("product", JSON.stringify(productInLocalStorage))
    }
    // s'il n'y a pas un produit dans le local storage  //
    // if there's not product in local Storage, create an array and push it //
    else{
        productInLocalStorage = []
        productInLocalStorage.push(optionsProduct)
        console.log(productInLocalStorage)
        localStorage.setItem("product", JSON.stringify(productInLocalStorage))
    }
 
// Puis une seconde fois ceci
let optionsProduct =
    {
        productId : 2,
        quantity : 4,
        color : 3
    }
    let productInLocalStorage = JSON.parse(localStorage.getItem("product"))
    // s'il y a un produit dans le local storage  //
    // if there's product(s) in local Storage, pusht in json format //
    if(productInLocalStorage){
        productInLocalStorage.push(optionsProduct)
        localStorage.setItem("product", JSON.stringify(productInLocalStorage))
    }
    // s'il n'y a pas un produit dans le local storage  //
    // if there's not product in local Storage, create an array and push it //
    else{
        productInLocalStorage = []
        productInLocalStorage.push(optionsProduct)
        console.log(productInLocalStorage)
        localStorage.setItem("product", JSON.stringify(productInLocalStorage))
    }
 
 
// Je fais dans ma console
localStorage.getItem("product")
//Resultat:
'[{"productId":1,"quantity":2,"color":3},{"productId":2,"quantity":4,"color":3}]'

*/