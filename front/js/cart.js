let lePanierLocal = JSON.parse(localStorage.getItem("basket"));

// permet de recuperer l'emplacement dans l'html pour creer les produits du panier
const emplacementPanier = document.getElementById("cart__items");

//Expression regulieres pour verif formulaire
const regexTexte = /^[A-ZÄÂÉÈËÊÏÎÔÔÜÛÇa-zäâàéèëêüïîüûç -]+$/i;
const regexAdresse = /^[1-9][0-9]{0,3}(?:[\s-][a-zéèêïçA-Z\-]+)*$/;
const regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

//constante pour la partie formulaire
const btnCommander = document.getElementById("order");
const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const adresse = document.getElementById("address");
const ville = document.getElementById("city");
const email = document.getElementById("email");

// Verif si le LocalStorage est vide ou plein
if (lePanierLocal === 0 || lePanierLocal === null) {
  console.log("le local storage est vide");
  panierVide();
} else {
  console.log(lePanierLocal);
  allProductsPrice();
  commanderEvent();
}

// fonction qui creer un message quand le panier est vide
function panierVide() {
  let panierLocalVide = document.getElementById("cart__items");
  const texteVide = document.createElement("p");
  texteVide.innerText = "Votre Panier est vide";
  panierLocalVide.appendChild(texteVide);
  return panierLocalVide;
}

// fonction pour ajouter le prix au contenu du LS
function updateBasketPrice(toutProduits) {
  toutProduits.forEach((element) => {
    lePanierLocal.forEach((element2) => {
      if (element._id == element2.id) {
        element2.price = element.price;
      }
    });
  });
}

//function qui recupere les porduits de l'API
function allProductsPrice() {
  fetch("http://localhost:3000/api/products/")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      console.log(value);
      initBasket(value);
    })

    .catch(function (err) {
      console.log("ERREUR");
      return 0;
      //une erreur est survenue
    });
}

function initBasket(products) {
  updateBasketPrice(products);
  creerElementDom();
  prixFinal();
}
// fonction qui creer les emplacements html
function creerElementDom() {
  lePanierLocal.forEach((produits) => {
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
    addChangeEvent(inputSet, produits);
    addSupprEvent(texteDelete, articleNode, produits);
    return articleNode;
  });
}

//fonction pour afficher la quantite totale
function quantiteTotale() {
  let laQuantiteTotale = 0;
  lePanierLocal.forEach((produits) => {
    console.log(produits.quantity);
    laQuantiteTotale += Number(produits.quantity);
  });
  console.log("La quantité totale est de " + laQuantiteTotale);
  return laQuantiteTotale;
}

//fonction pour afficher le prix Total
function prixTotal() {
  let lePrixTotal = 0;
  lePanierLocal.forEach((produits) => {
    console.log(produits.price);
    lePrixTotal += produits.price * produits.quantity;
  });
  console.log("le Prix total est de " + lePrixTotal);
  return lePrixTotal;
}

//fonction qui calcul le prix total du panier et affiche celui ci
function prixFinal() {
  let finalPrice = prixTotal();
  console.log(finalPrice);
  const endroitQte = document.getElementById("totalQuantity");
  endroitQte.innerHTML = quantiteTotale();
  const endroitPrix = document.getElementById("totalPrice");
  endroitPrix.innerHTML = finalPrice;
}

//fonction pour supprimer un produit du panier
function addSupprEvent(texteDeleteNode, productRow, element) {
  texteDeleteNode.addEventListener("click", () => {
    productRow.remove();
    let newBasket = lePanierLocal.filter(
      (product) => product.id != element.id && product.option != element.option
    );
    console.log(newBasket);
    lePanierLocal = newBasket;
    console.log(lePanierLocal);
    updateBasketStorage();
    prixFinal();
  });
}

//fonction qui ecoute la quantite et la met a jour ainsi que le prix
function addChangeEvent(input, element) {
  input.addEventListener("change", () => {
    console.log(input.value);
    console.log(element);
    element.quantity = input.value;
    updateBasketStorage();
    prixFinal();
  });
}
//fonction qui sert a mettre le local storage a jour
function updateBasketStorage() {
  localStorage.setItem("basket", JSON.stringify(lePanierLocal));
}

/* pour POST faire un tableau d'id avec map */

//declaration d'un tableau vide pour ensuite enregistrer les valeurs du formulaire dedans

function commanderEvent() {
  btnCommander.addEventListener("click", (e) => {
    e.preventDefault();

    if (
      verifPrenom() &&
      verifNom() &&
      verifAdresse() &&
      verifVille() &&
      verifEmail()
    ) {
      commander();
    } else {
      console.log("Formulaire incorrect");
    }
  });
}

function setContact() {
  return {
    firstName: prenom.value.trim(),
    lastName: nom.value.trim(),
    address: adresse.value.trim(),
    city: ville.value.trim(),
    email: email.value.trim(),
  };
}

function setProductID() {
  return lePanierLocal.map((product) => product.id);
}
function verifPrenom() {
  const firstNameValue = prenom.value.trim();
  if (firstNameValue === "") {
    document.querySelector("#firstNameErrorMsg").textContent =
      "Merci de remplir ce champs";
    return false;
  } else if (!isText(firstNameValue)) {
    document.querySelector("#firstNameErrorMsg").textContent =
      "Merci d'indiquer un prénom valide";
    return false;
  } else {
    // contact["prenom"] = firstNameValue;
    return true;
  }
}

function verifNom() {
  const nameValue = nom.value.trim();
  if (nameValue === "") {
    document.querySelector("#lastNameErrorMsg").textContent =
      "Merci de remplir ce champs";
    return false;
  } else if (!isText(nameValue)) {
    document.querySelector("#lastNameErrorMsg").textContent =
      "Merci d'indiquer un nom valide";
    return false;
  } else {
    // contact["nom"] = nameValue;
    return true;
  }
}

function verifAdresse() {
  const adressValue = adresse.value.trim();
  if (adressValue === "") {
    document.querySelector("#adressErrorMsg").textContent =
      "Merci de remplir ce champs";
    return false;
  } else if (!isAdress(adressValue)) {
    document.querySelector("#adressErrorMsg").textContent =
      "Merci d'indiquer une adresse valide";
    return false;
  } else {
    // contact["adresse"] = adressValue;
    return true;
  }
}

function verifVille() {
  const cityValue = ville.value.trim();
  if (cityValue === "") {
    document.querySelector("#cityErrorMsg").textContent =
      "Merci de remplir ce champs";
    return false;
  } else if (!isText(cityValue)) {
    document.querySelector("#cityErrorMsg").textContent =
      "Merci d'indiquer votre ville";
    return false;
  } else {
    // contact["ville"] = cityValue;
    return true;
  }
}

function verifEmail() {
  const emailValue = email.value.trim();
  if (emailValue === "") {
    document.querySelector("#emailErrorMsg").textContent =
      "Merci de remplir ce champs";
    return false;
  } else if (!isEmail(emailValue)) {
    document.querySelector("#emailErrorMsg").textContent =
      "Merci d'indiquer une adresse EMAIL valide";
    return false;
  } else {
    // contact["email"] = emailValue;
    return true;
  }
}

// fonction qui teste la valeur texte
function isText(valeur) {
  return regexTexte.test(valeur);
}

// fonction qui teste la valeur adresse
function isAdress(adress) {
  return regexAdresse.test(adress);
}

// fonction qui test la valeur email
function isEmail(email) {
  return regexEmail.test(email);
}

//fonction qui envoie la commande au back et nettoie le localsotrage
function commander() {
  let contact = setContact();
  let products = setProductID();
  let commande = { contact, products };
  console.log(commande);
  fetch("http://localhost:3000/api/products/order", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(commande),
  })
    .then((reponse) => reponse.json())
    .then(function (value) {
      console.log(value);
      localStorage.clear();
      window.location.href = "./confirmation.html?id=" + value.orderId;
    })
    .catch(function (err) {
      console.log(err);
    });
}
