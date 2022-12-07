//Récupérer l'id selon l'URL
const UrlId = window.location.search; 
//console.log(UrlId); // donne le résultat ?id=...

const urlSearchParams = new URLSearchParams(UrlId);
//console.log(urlSearchParams); //donne l'Id sans le point d'interrogation

const id = urlSearchParams.get("id");
console.log(id); //donne l'id

//Afficher le produit grâce à son id
fetch(`http://localhost:3000/api/products/${id}`)
.then((res) => res.json())
  .then((data) => {
    console.log(data);     
    document.querySelector(".item__img").innerHTML += `<img src="${data.imageUrl}"  alt="${data.altTxt}">`;    
    document.querySelector("#title").innerHTML += `${data.name}`;
    document.querySelector("#price").innerHTML += `${data.price}`;
    document.querySelector("#description").innerHTML += `${data.description}`;
    //Récupération des couleurs dans le tableau colors
    let optionColors = data.colors;
    for (let i = 0; i <optionColors.length; i++){
        //console.log (optionColors[i])
        document.querySelector("#colors").innerHTML += `<option value="${optionColors[i]}">${optionColors[i]}</option>`;
    }
  });


  /*----------------- GESTION DU PANIER------------------*/

//Sélectionner le bouton "Ajouter au panier" 
const boutonPanier = document.querySelector("#addToCart")
//console.log(boutonPanier);

///Ecouter le bouton "Ajouter au panier"
boutonPanier.addEventListener("click", (event) => {
    event.preventDefault();

//Récupérer les choix sélectionnés par l'user
let choixProduitUser = {
    idProduit : id,
    quantityProduit : quantity.value,
    colorProduit : colors.value
};
console.log(choixProduitUser);

/*----------Gestion du LOCALSTORAGE (à l'intérieur du addEventListener)----------*/

//Déclaration de la variable "panier" pour récupérer les données du LocalStorage
let panier = localStorage.getItem("panier")

    if (panier == null) { //SI le panier n'existe pas
        let panier = [choixProduitUser] //je créé un panier (tableau) contenant le choix de mon user
        localStorage.setItem("panier", JSON.stringify(panier)) //j'enregistre le panier dans localStorage en convertissant les objets JS en chaînes de caractère (JSON)
        console.log(panier);
    }
    else { //SINON le panier existe
        let itemTrouve = false; // déclaration de la variable itemTrouve avec paramètre false par défaut

        let panierJson = JSON.parse(panier) //on convertit le panier de JSON à objet JS
        console.log(panierJson)

        panierJson.forEach(item => {     // et je vérifie que pour chaque produit
            if (item.idProduit == choixProduitUser.idProduit && item.colorProduit == choixProduitUser.colorProduit){  // si le produit a le même id ET la même couleur
                item.quantityProduit = Number(item.quantityProduit) //"passage de string à number pour item.quantityProduit"
                item.quantityProduit += Number(choixProduitUser.quantityProduit); // addition et passage de string à number 
                itemTrouve = true; // si ce qui est au-dessus est vérifié mon itemTrouve est true

                console.log(choixProduitUser.quantityProduit)
                console.log (item.quantityProduit)
            } 
        }) 

        if (itemTrouve == false){ //si on n'a pas trouvé de produit identique 
            panierJson.push(choixProduitUser) //on ajoute au panier
        }

        console.log(itemTrouve)

        panier = JSON.stringify(panierJson)// on convertit les objets JS en chaînes de caractère (JSON)
        localStorage.setItem("panier", panier) //j'enregistre le panier dans localStorage
        } //fin du else

}); //fin addEventListener
