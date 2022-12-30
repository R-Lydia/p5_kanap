// Récupérer l'id selon l'URL
const UrlId = window.location.search; 
const urlSearchParams = new URLSearchParams(UrlId);
const id = urlSearchParams.get("id");

// Afficher le produit grâce à son id
fetch(`http://localhost:3000/api/products/${id}`)
.then((res) => res.json())
  .then((data) => {     
    document.querySelector(".item__img").innerHTML += `<img src="${data.imageUrl}"  alt="${data.altTxt}">`;    
    document.querySelector("#title").innerHTML += `${data.name}`;
    document.querySelector("#price").innerHTML += `${data.price}`;
    document.querySelector("#description").innerHTML += `${data.description}`;
    //Récupérer les couleurs dans le tableau colors
    let optionColors = data.colors;
    for (let i = 0; i <optionColors.length; i++) {
        document.querySelector("#colors").innerHTML += `<option value="${optionColors[i]}">${optionColors[i]}</option>`;
    }
  });


/*----------------- GESTION DU PANIER------------------*/

// Sélectionner le bouton "Ajouter au panier" 
const boutonPanier = document.querySelector("#addToCart")

// Ecouter le bouton "Ajouter au panier"
boutonPanier.addEventListener("click", (event) => {
    event.preventDefault();

    //Récupérer les choix sélectionnés par l'user
    let choixProduitUser = {
        idProduit : id,
        quantityProduit : quantity.value,
        colorProduit : colors.value
    };

    // Gérer les quantités négatives et supérieures à 100
    if (quantity.value < 1 || quantity.value > 100 || quantity.value === undefined || colors.value === "" || colors.value === undefined) {
    alert ("Veuillez renseigner une couleur et une quantité entre 1 et 100 pour ajouter cet article")
    } 
    else {

        /*----------Gestion du LOCALSTORAGE (à l'intérieur du addEventListener)----------*/
        // Déclarer la variable "panier" pour récupérer les données du LocalStorage
        let panier = localStorage.getItem("panier")

        // SI le panier n'existe pas
        if (panier == null) { 
            // Créer un panier (tableau) contenant le choix de mon user
            let panier = [choixProduitUser]
            // Enregistrer le panier dans localStorage en convertissant les objets JS en chaînes de caractère (JSON) 
            localStorage.setItem("panier", JSON.stringify(panier)) 
        }

        // SINON le panier existe
        else { 
            // Déclarer la variable itemTrouve avec paramètre false par défaut
            let itemTrouve = false; 
            // Convertir le panier de JSON à objet JS
            let panierJson = JSON.parse(panier) 
            // Vérifier que pour chaque produit
            panierJson.forEach(item => {    
                // SI le produit a le même id ET la même couleur 
                if (item.idProduit == choixProduitUser.idProduit && item.colorProduit == choixProduitUser.colorProduit) {  
                    // Modifier string à number pour item.quantityProduit
                    item.quantityProduit = Number(item.quantityProduit)
                    // Additionner et passer de string à number 
                    item.quantityProduit += Number(choixProduitUser.quantityProduit);
                    // Passer itemTrouve à true  
                    itemTrouve = true; 
                } 
            }) 
            // SI on n'a pas trouvé de produit identique
            if (itemTrouve == false) {
                // Ajouter au panier  
                panierJson.push(choixProduitUser) 
            }

            // Convertir les objets JS en chaînes de caractère (JSON)
            panier = JSON.stringify(panierJson)
            //Enregistrer le panier dans localStorage
            localStorage.setItem("panier", panier) 
        } 
    }     
}); //fin addEventListener
