/* algo
1 je dois recup l'url
2 je dois comparer l'id de l'url avec l'id du tableau
3 en fonction des resultat je dois afficher les parametres de cet id
*/

//recuperation de l'url
let RecupUrl = window.location.href;
console.log(RecupUrl);
//Récupération de l'ID
let url = new URL(RecupUrl);
let id = url.searchParams.get("id");
console.log(id);

// bloc de code qui permet de recuperer dans l'API les info d'un produit en fonction de son ID
const getIdProduct = fetch("http://localhost:3000/api/products/" + id)
  .then((reponse) => reponse.json())
  .then(function (value) {
    console.table(value);
    afficherBonProduit(value);
  })
  .catch(function (err) {
    //une erreur est survenue
  });

//afficher le contenu du produit sur la page besoin de source image + alt / nom produit / prix / description / les couleurs

function genererEmplacement(urlImage, altTxt) {
  //creation de l'emplacement de l'img
  const imageProduit = document.createElement("img");
  imageProduit.src = urlImage;
  imageProduit.setAttribute("alt", altTxt);
}

function afficherBonProduit(resultat) {
  if (resultat.length > 0) {
    const ensembleKanap = resultat[0];
    const endroitImg = genererEmplacement(
      ensembleKanap.urlImage,
      ensembleKanap.altTxt
    );

    const classImg = document.getElementsByClassName("item__img");
    classImg.appendChild(endroitImg);
  }
}
