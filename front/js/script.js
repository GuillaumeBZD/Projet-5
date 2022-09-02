// récup des valeurs produits
const lesCanaps = fetch("http://localhost:3000/api/products/")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    console.log(value);
    affichageProduit(value);
  })
  .catch(function (err) {
    //une erreur est survenue
  });

//affichage des élements produit
function affichageProduit(resultat) {
  if (resultat.length > 0) {
    const kanap01 = resultat[0];

    const lienProduit = genererProduit(
      kanap01._id,
      kanap01.imageUrl,
      kanap01.name,
      kanap01.description
    );

    //récupération de l'élément du DOM qui acceuillera les fiches
    const emplacementProduit = document.getElementById("items");

    //Ajout des elements produit crees dans le DOM
    emplacementProduit.appendChild(lienProduit);
  }
}

function genererProduit(urlProduit, urlImage, name, description) {
  const baliseA = document.createElement("a");
  baliseA.setAttribute("href", "./product.html?id=" + urlProduit);
  const articleProduit = document.createElement("article");
  const imageProduit = document.createElement("img");
  imageProduit.src = urlImage;

  const nomProduit = document.createElement("h3");
  nomProduit.innerText = name;

  const descriptionProduit = document.createElement("p");
  descriptionProduit.innerText = description ?? "aucune description";

  baliseA.appendChild(articleProduit);
  articleProduit.appendChild(imageProduit);
  articleProduit.appendChild(nomProduit);
  articleProduit.appendChild(descriptionProduit);
  return baliseA;
}

// generation des fiche produit avec une boucle for
