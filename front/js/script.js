// Requêter l'API pour demander l'ensemble des produits
fetch("http://localhost:3000/api/products")
  // Pour récupérer la réponse au format json
  .then((res) => res.json()) 
  .then((data) => {

    // Utiliser une boucle pour créer les éléments pour chaque produit
    data.forEach(produit => {
      document.querySelector("#items").innerHTML += `<a href="./product.html?id=${produit._id}">
                                                        <article>
                                                          <img src="${produit.imageUrl}"  alt="${produit.altTxt}">
                                                          <h3 class="productName" >${produit.name}</h3>
                                                          <p class="productDescription">${produit.description}</p>
                                                        </article>
                                                    </a>`;
    });
  }) 
  .catch(function(err) {
    alert("Une erreur est survenue")
  });