let lePanierLocal = JSON.parse(localStorage.getItem("basket"));
console.log(lePanierLocal);

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
  //laCreation();
  console.log("le local storage contient des elements");
  console.log(lePanierLocal);
}
/*
// fonction pour creer les elements produit dans l'html
function laCreation() {
  const emplacement = document.getElementById("cart__items");
  console.log(lePanierLocal);
  updateBasketPrice();
  lePanierLocal.forEach((produits) => {
    let injecterCode = `<article class="cart__item" data-id="${produits.id}" data-color="${produits.option}"> <div class="cart__item__img"> <img src="${produits.image}" alt="${produits.altTxt}"> </div><div class="cart__item__content"><div class="cart__item__content__description"><h2>${produits.name}</h2><p>${produits.option}</p><p>${produits.price} €</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>Qté : ${produits.quantity}</p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42"></div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div></div></div></article>`;
    console.log(produits.option);
    emplacement.innerHTML += injecterCode;
  });
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
      console.log("prout");
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
*/
