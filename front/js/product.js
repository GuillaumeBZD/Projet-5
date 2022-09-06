//recuperation de l'url
let RecupUrl = window.location.href;
console.log(RecupUrl);
//Récupération de l'ID
let url = new URL(RecupUrl);
let id = url.searchParams.get("id");
console.log(id);

// bloc de code qui permet de recuperer dans l'API les infos d'un produit en fonction de son ID
let getIdProduct = fetch("http://localhost:3000/api/products/" + id)
  .then((reponse) => reponse.json())
  .then(function (value) {
    console.log(value);
    afficherBonProduit(value);
  })
  .catch(function (err) {
    //une erreur est survenue
  });

//afficher le contenu image du produit sur la page
function genererImageNode(urlImage, altTxt) {
  //creation de l'emplacement de l'img
  const imageProduit = document.createElement("img");
  imageProduit.src = urlImage;
  imageProduit.setAttribute("alt", altTxt);
  return imageProduit;
}

//afficher le contenu textuel produit sur la page
function genererTexteNode(name, price, description) {
  const nomProduit = document.getElementById("title");
  nomProduit.innerHTML = name;
  const prixProduit = document.getElementById("price");
  prixProduit.innerHTML = price;
  const descriptionProduit = document.getElementById("description");
  descriptionProduit.innerHTML = description ?? "Aucune description";
  return nomProduit, prixProduit, descriptionProduit; // besoin de mettres les 3 ??
}
// afficher les couleur du produit sur la page
function genererCouleurNode(colors) {
  const couleursProduit = document.createElement("option");
  couleursProduit.setAttribute(colors);
  return couleursProduit;
}

function afficherBonProduit(reponse) {
  const ensembleKanap = reponse;
  //Pour generer l'image en fonction du resultat du fetch
  const endroitImg = genererImageNode(
    ensembleKanap.imageUrl,
    ensembleKanap.altTxt
  );
  //Pour generer le texte en fonction du resultat du fetch
  genererTexteNode(
    //pas besoin d'une const / variable ??
    ensembleKanap.name,
    ensembleKanap.price,
    ensembleKanap.description
  );

  /*  for (let i = 0; i < colors.length; i++) {
    const choixCouleur = colors[i];
    const leChoix = genererCouleurNode(
      choixCouleur.colors
    );
  }*/
  const classImg = document.querySelector(".item__img");
  classImg.appendChild(endroitImg);
  // const emplacementCouleur = document.getElementById("colors");
  // emplacementCouleur.appendChild(leChoix);
}

/*
//Pour generer les options de couleurs en fonction du resultat du fetch
function laCouleur(colors) {
  for (let i = 0; i < colors.length; i++) {
    const choixCouleur = colors[i];
    const leChoix = genererCouleurNode(
      choixCouleur.colors
    );
    const emplacementCouleur = document.getElementById("colors");
    emplacementCouleur.appendChild(leChoix);
    console.log(leChoix);
  }}
*/
