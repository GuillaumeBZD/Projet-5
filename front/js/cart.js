let lePanierLocal = JSON.parse(localStorage.getItem("basket"));

// permet de recuperer l'emplacement dans l'html pour creer les produits du panier
const emplacementPanier = document.getElementById("cart__items");

// fonction qui creer un message quand le panier est vide
function panierVide() {
  let panierLocalVide = document.getElementById("cart__items");
  const texteVide = document.createElement("p");
  texteVide.innerText = "Votre Panier est vide";
  panierLocalVide.appendChild(texteVide);
  return panierLocalVide;
}

// Verif si le LocalStorage est vide ou plein
if (lePanierLocal === 0 || lePanierLocal === null) {
  console.log("le local storage est vide");
  panierVide();
} else {
  // laCreation();
  console.log(lePanierLocal);
  creerElementDom();
  prixFinal();
}

function getPrice(id) {
  fetch("http://localhost:3000/api/products/" + id)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      console.log(value.price);
      return value.price;
    })
    .catch(function (err) {
      console.log("ERREUR");
      return 0;
      //une erreur est survenue
    });
}

// fonction pour ajouter le prix au contenu du LS
function updateBasketPrice() {
  lePanierLocal.forEach((product) => {
    product.price = getPrice(product.id);
  });
}

// fonction qui creer les emplacements html
function creerElementDom() {
  lePanierLocal.forEach((produits) => {
    updateBasketPrice();
    // Creation de l'article
    const articleNode = document.createElement("article");
    articleNode.className = "cart__item";
    articleNode.setAttribute("data-id", `${produits.id}`);
    articleNode.setAttribute("data-color", `${produits.option}`);

    // creation de la div img
    const divImg = document.createElement("div");
    divImg.className = "cart__item__img";

    // creation de l'img
    const imgNode = document.createElement("img");
    imgNode.src = `${produits.image}`;
    imgNode.setAttribute("alt", `${produits.altTxt}`);

    //creation de la div du contenu du panier (nom etc)
    const divItemContent = document.createElement("div");
    divItemContent.className = "cart__item__content";
    // creation de la div contenant les info produit
    const divItemContentDesc = document.createElement("div");
    divItemContentDesc.className = "cart__item__content__description";
    // creation du titre produit
    const h2Node = document.createElement("h2");
    h2Node.innerHTML = `${produits.name}`;
    // creation place de la couleur
    const texteCouleur = document.createElement("p");
    texteCouleur.innerHTML = `${produits.option}`;
    // creation place du prix
    const textePrix = document.createElement("p");
    textePrix.innerHTML = `${produits.price}` + " €";
    // creation de la div englobant les div qte et supr
    const divItemContentSettings = document.createElement("div");
    divItemContentSettings.className = "cart__item__content__settings";
    //creation de la div contenant la qte et l'input
    const divItemContentSettingsQuantity = document.createElement("div");
    divItemContentSettingsQuantity.className =
      "cart__item__content__settings__quantity";
    //creation du texte pour la quantite
    const texteQuantite = document.createElement("p");
    texteQuantite.innerHTML = "Qté : ";
    //creation de l'input
    const inputSet = document.createElement("input");
    inputSet.className = "itemQuantity";
    inputSet.setAttribute("type", "number");
    inputSet.setAttribute("name", "itemQuantity");
    inputSet.setAttribute("min", "1");
    inputSet.setAttribute("max", "100");
    inputSet.setAttribute("value", `${produits.quantity}`);
    //creation de la div delete
    const divDelete = document.createElement("div");
    divDelete.className = "cart__item__content__settings__delete";
    //creation du p de la div delete
    const texteDelete = document.createElement("p");
    texteDelete.className = "deleteItem";
    texteDelete.innerHTML = "Supprimer";

    //attibution des emplacements en fonction du parent
    emplacementPanier.appendChild(articleNode);
    articleNode.appendChild(divImg);
    divImg.appendChild(imgNode);
    articleNode.appendChild(divItemContent);
    divItemContent.appendChild(divItemContentDesc);
    divItemContentDesc.appendChild(h2Node);
    divItemContentDesc.appendChild(texteCouleur);
    divItemContentDesc.appendChild(textePrix);
    divItemContent.appendChild(divItemContentSettings);
    divItemContentSettings.appendChild(divItemContentSettingsQuantity);
    divItemContentSettingsQuantity.appendChild(texteQuantite);
    divItemContentSettingsQuantity.appendChild(inputSet);
    divItemContentSettings.appendChild(divDelete);
    divDelete.appendChild(texteDelete);
    return articleNode;
  });
}

//fonction pour afficher la quantite totale
function quantiteTotale() {
  let laQuantiteTotale = 0;
  lePanierLocal.forEach((produits) => {
    laQuantiteTotale = laQuantiteTotale + produits.quantity;
  });
  console.log("La quantié totale est de " + laQuantiteTotale);
  return laQuantiteTotale;
}

//fonction pour afficher le prix Total
function prixTotal() {
  let lePrixTotal = 0;
  lePanierLocal.forEach((produits) => {
    lePrixTotal = lePrixTotal + produits.price;
  });
  console.log("le Prix total est de " + lePrixTotal);
  return lePrixTotal;
}

//fonction qui calcul le prix total du panier et affiche celui ci
function prixFinal() {
  let finalPrice = quantiteTotale() * prixTotal();
  console.log(finalPrice);
  const endroitQte = document.getElementById("totalQuantity");
  endroitQte.innerHTML = quantiteTotale();
  const endroitPrix = document.getElementById("totalPrice");
  endroitPrix.innerHTML = finalPrice;
}

// fonction pour creer les elements produit dans l'html
/* function laCreation() {
  const emplacement = document.getElementById("cart__items");
  console.log(lePanierLocal);
  updateBasketPrice();
  lePanierLocal.forEach((produits) => {
    let injecterCode = `<article class="cart__item" data-id="${produits.id}" data-color="${produits.option}"> <div class="cart__item__img"> <img src="${produits.image}" alt="${produits.altTxt}"> </div><div class="cart__item__content"><div class="cart__item__content__description"><h2>${produits.name}</h2><p>${produits.option}</p><p>${produits.price} €</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>Qté : ${produits.quantity}</p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42"></div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div></div></div></article>`;
    console.log(produits.option);
    emplacement.innerHTML += injecterCode;
  });
}
 */
