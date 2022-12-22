/* Récupérer l'orderId et afficher le numéro de commande sur la page de confirmation */

// Récupérer l'orderId selon l'URL
const orderId = new URL(window.location).searchParams.get("orderId");

// Function pour afficher le numéro de commande
function displayOrderId(numOrderId) {
    document.getElementById("orderId").innerText = `${numOrderId}`;
}
displayOrderId(orderId);
