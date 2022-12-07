//Déclaration de la variable "savePanier" pour récupérer les données du LocalStorage dans laquelle on met la key "panier" et les values ("choixProduitUser")qui sont dans le localStorage
//JSON.parse = Convertir les données du localStorage de JSON en Objet JS
let savePanier = JSON.parse(localStorage.getItem("panier"));
//console.log(savePanier);


/*---------------------AFFICHER LES PRODUITS DU PANIER (Etape 8)----------------------*/ 
if (savePanier === null || savePanier == 0) { //si le panier est vide ou égal 0
    console.log("Panier vide");
} 
else { //s'il y a des produits dans le panier
    console.log("Je ne suis pas vide")  

    for(let i = 0; i <savePanier.length; i++){ //on fait une boucle pour récupérer les produits du panier

        fetch(`http://localhost:3000/api/products/${savePanier[i].idProduit}`) //et on requête l'API avec l'Id du produit du panier pour afficher ses différentes données
            .then((res) => res.json()) 
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
/*// TEST 5 ____marche pas :(

//Pour chaque cart-item, je regarde le data-id et data-color pour savoir si c'est le même
//si c'est le même et qu'on clique pour changer la quantité
//on enregistre la nouvelle quantité

let cartItem = document.getElementsByClassName("cart__item"); //sélection de cart item 
console.log (cartItem)

for (let item of cartItem){
    if (item.id == data-id && item.color == data-color){ // si le produit a le même id ET la même couleur
        //let input = document.querySelector(".itemQuantity");
        item.input.addEventListener("input", (event) => {  //ne marche  ni avec "change" ni avec "input"
        console.log("change");
        console.log(event.target.value);
        })
    }else{
    console.log("Une erreur est survenue")
   }
} //fin for let
*/


/* //TEST 7 :(
let quantity = document.getElementsByClassName("itemQuantity")

for (let updateQuantity of quantity){
    updateQuantity.addEventListener("change", (e) =>{
    console.log ("change") 
    console.log(e.target.value)
    })
}
*/


/*//TEST 3 :(
let changeQuantity = document.querySelector(".itemQuantity"); //sélection des inputs qui gèrent la quantité => querySelectorAll déclenche changeQuantity.... is not a function
console.log(changeQuantity); // ne fonctionne que sur le premier produit

changeQuantity.addEventListener("change", (e) => { 
    console.log("change");
    console.log(e.target.value);
});*/


/* TEST 1 :(
//Changer la quantité d'un produit sur la page panier
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



/*---------------------SUPPRIMER UN PRODUIT (Etape 9)----------------------*/


//document.querySelectorAll('.deleItem').forEach(element => {
//   element<ta logique ici>
//});
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
};
*/
           /* }) //fin .then 
    } //fin for let i
} //fin du else*/



/*---------------------CALCULER LA QUANTITE TOTALE ET LE PRIX TOTAL (Etape 9)----------------------*/

/*-------totalQuantity-------*/



/*-------totalPrice-------*/




 /*---------------------PASSER LA COMMANDE (Etape 10)----------------------*/
 
 