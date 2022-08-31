// récup des valeurs produits
const lesCanaps = fetch("http://127.0.0.1:5500/back/models/Product.js")
  .then(function (res) {
    if (res.ok) {
      return response.json();
    }
  })
  .then(function (value) {
    console.log(value);
  })
  .catch(function (err) {
    //une erreur est survenue
  });

const produits = res.json();

//affichage des élements produit
const kanap01 = produits[0];

const imageProduit = document.createElement("img");
imageProduit.src = kanap01.imageUrl;

const nomProduit = document.createElement("h3");
nomProduit.innerText = kanap01.name;

const descriptionProduit = document.createElement("p");
descriptionProduit.innerText = kanap01.description ?? "aucune description";

//récupération de l'élément du DOM qui acceuillera les fiches

const emplacementProduit = document.getElementById("items");

//Ajout des elements produit crees dans le DOM

emplacementProduit.appendChild(imageProduit);
emplacementProduit.appendChild(nomProduit);
emplacementProduit.appendChild(descriptionProduit);
