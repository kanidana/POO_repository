
// Classe d'objet pour le produit afin de stocker les propriétés pour l'id, le nom et le prix du produit.
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// Classe d'objet pour l'élément du panier d'achat afin de stocker les propriétés pour le produit et sa quantité.
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    // Méthode pour calculer le prix total.
    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Définition de la classe ShoppingCart pour gérer le panier d'achat
    class ShoppingCart {
        constructor() {
            // Sélection de l'élément affichant le prix total
            this.totalPriceElement = document.getElementById("total");
            // Sélection de tous les éléments avec la classe "card"
            this.cards = document.querySelectorAll(".card");
            // Initialisation des événements
            this.init();
        }

        // Méthode pour initialiser les événements sur chaque carte
        init() {
            this.cards.forEach(card => {
                // Sélection des boutons et éléments de la carte
                const plus = card.querySelector(".fa-plus-circle");
                const moins = card.querySelector(".fa-minus-circle");
                const trash = card.querySelector(".fa-trash-alt");
                const quantite = card.querySelector(".quantity");
                const heart = card.querySelector(".fa-heart");

                // Ajout des événements de clic pour chaque bouton
                plus.addEventListener("click", () => this.incrementQuantity(quantite));
                moins.addEventListener("click", () => this.decrementQuantity(quantite));
                trash.addEventListener("click", () => this.removeCard(card));
                heart.addEventListener("click", () => this.toggleHeart(heart));
            });
        }

        // Méthode pour augmenter la quantité d'un article
        incrementQuantity(quantite) {
            let quantity = parseInt(quantite.textContent);
            quantity++;
            quantite.textContent = quantity;
            this.updateTotal();
        }

        // Méthode pour diminuer la quantité d'un article
        decrementQuantity(quantite) {
            let quantity = parseInt(quantite.textContent);
            if (quantity > 0) {
                quantity--;
                quantite.textContent = quantity;
                this.updateTotal();
            }
        }

        // Méthode pour supprimer une carte
        removeCard(card) {
            card.remove();
            this.updateTotal();
        }

        // Méthode pour basculer l'état du cœur (favori)
        toggleHeart(heart) {
            heart.classList.toggle("clicked");
        }

        // Méthode pour mettre à jour le prix total
        updateTotal() {
            let total = 0;
            // Calcul du total en fonction des quantités et des prix unitaires
            document.querySelectorAll(".card").forEach(card => {
                const quantity = parseInt(card.querySelector(".quantity").textContent);
                const price = parseInt(card.querySelector(".unit-price").textContent);
                total += quantity * price;
            });
            // Mise à jour de l'affichage du prix total
            this.totalPriceElement.textContent = total + "$";
        }
    }

    // Création d'une instance de ShoppingCart pour initialiser le panier
    new ShoppingCart();
});
