const quantite = document.getElementById("quantity");
//recuperation de l'url
let RecupUrl = window.location.href;
console.log(RecupUrl);
//Récupération de l'ID
let url = new URL(RecupUrl);
let id = url.searchParams.get("id");
console.log(id);
let ensembleKanap;
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
}
// afficher les couleur du produit sur la page
function genererCouleurNode(colors) {
  const couleursProduit = document.createElement("option");
  couleursProduit.setAttribute("value", colors);
  couleursProduit.innerText = colors;
  return couleursProduit;
}

function afficherBonProduit(reponse) {
  ensembleKanap = reponse;
  const emplacementCouleur = document.getElementById("colors");
  const classImg = document.querySelector(".item__img");
  //Pour generer l'image en fonction du resultat du fetch
  const endroitImg = genererImageNode(
    ensembleKanap.imageUrl,
    ensembleKanap.altTxt
  );
  classImg.appendChild(endroitImg);
  //Pour generer le texte en fonction du resultat du fetch
  genererTexteNode(
    ensembleKanap.name,
    ensembleKanap.price,
    ensembleKanap.description
  );

  ensembleKanap.colors.forEach((laCouleur) => {
    emplacementCouleur.appendChild(genererCouleurNode(laCouleur));
  });
  //fonction en plus qui fait la meme chose que forEach
  /* for (let i = 0; i < reponse.colors.length; i++) {
    let choixCouleur = reponse.colors[i];
    console.table(choixCouleur);
    let leChoix = genererCouleurNode(choixCouleur);
    emplacementCouleur.appendChild(leChoix);
  }*/
  const clic = document.getElementById("addToCart");
  clic.addEventListener("click", () => {
    checkForm();
  });
}

// Fonction qui recupere la couleur pour pouvoir la traiter ensuite.
function getColor() {
  let colorSelect = document.getElementById("colors");
  return colorSelect.value;
}

// fonction qui sert a ajouter dans le local storage les informations ID NAME COLORS et la quantité
function addBasket() {
  let newProduct = {
    id: ensembleKanap._id,
    name: ensembleKanap.name,
    option: getColor(),
    quantity: Number(quantite.value),
    description: ensembleKanap.description,
    image: ensembleKanap.imageUrl,
    altTxt: ensembleKanap.altTxt,
    price: 0
    };
  let basket = JSON.parse(localStorage.getItem("basket"));
  console.log(newProduct);
  console.log(basket);
  if (Array.isArray(basket) && basket.length > 0) {
    let existe = false;
    basket.forEach((element) => {
      if (element.id == newProduct.id && element.option == newProduct.option) {
        element.quantity += Number(newProduct.quantity);
        existe = true;
      }
    });
    if (!existe) {
      basket.push(newProduct);
    }
  } else {
    basket = [newProduct];
  }
  console.table(basket);
  localStorage.setItem("basket", JSON.stringify(basket));
}

// Fonction qui sert a comparer les inputs dans le formulaire afin d'en controler la validité
function checkForm() {
  let choix = getColor();
  console.log(choix.length);
  if (
    Number(quantite.value) < 100 &&
    Number(quantite.value) > 0 &&
    choix.length > 0
    
  ) 
  {
    window.alert("L'article a été ajouté au panier")
    addBasket();
  }
  else {
    window.alert(
      "Merci de choisir une couleur, ou une quantité comprise entre 1 et 100"
    );
  }
}
