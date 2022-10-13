// récup des valeurs produits via l'api
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
    console.log(err); //une erreur est survenue
  });

// Fonction qui a pour but de creer les élements dans le HTML celon le modèle present dans le HTML
function genererProduit(urlProduit, urlImage, altTxt, name, description) {
  //creation de la balise <a> dans le DOM
  const baliseA = document.createElement("a");
  baliseA.setAttribute("href", "./product.html?id=" + urlProduit);
  //creation de la balise <article> dans le DOM
  const articleProduit = document.createElement("article");

  const imageProduit = document.createElement("img");
  imageProduit.src = urlImage;
  //ajout de l'attribut ALT a IMG
  imageProduit.setAttribute("alt", altTxt);

  const nomProduit = document.createElement("h3");
  nomProduit.innerText = name;

  const descriptionProduit = document.createElement("p");
  // Ajout d'un parametre au cas ou la description soit inexistante sur le produit avec ??
  descriptionProduit.innerText = description ?? "Aucune description";

  baliseA.appendChild(articleProduit);
  articleProduit.appendChild(imageProduit);
  articleProduit.appendChild(nomProduit);
  articleProduit.appendChild(descriptionProduit);
  return baliseA;
}

//affichage des élements produit
function affichageProduit(resultat) {
  for (let i = 0; i < resultat.length; i++) {
    const kanap = resultat[i];
    const lienProduit = genererProduit(
      kanap._id,
      kanap.imageUrl,
      kanap.altTxt,
      kanap.name,
      kanap.description
    );
    //récupération de l'élément du DOM qui acceuillera les fiches
    const emplacementProduit = document.getElementById("items");
    //Ajout des elements produit crees dans le DOM
    emplacementProduit.appendChild(lienProduit);
  }
}