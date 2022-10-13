//recuperation de l'url
let RecupUrl = window.location.href;
//Récupération de l'ID
let url = new URL(RecupUrl);
let id = url.searchParams.get("id");
//affichage du numero de commande sur la page
const numCom = document.querySelector("#orderId");
numCom.innerHTML = id;
