const { createApp } = Vue;

const CART_KEY = "cc_cart_v1";

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

createApp({
  data() {
    return {
      isLoggedIn: localStorage.getItem("loggedIn") === "true",
      cart: loadCart(),
      billing: {
        name: "",
        email: localStorage.getItem("email") || "",
        address: "",
        city: "",
        postal: "",
        method: "Credit / Debit Card",
        card: "",
        exp: "",
        cvc: "",
      },
      status: "",
    };
  },
  mounted() {
    window.addEventListener("storage", () => {
      this.isLoggedIn = localStorage.getItem("loggedIn") === "true";
      this.cart = loadCart();
    });
  },
  computed: {
    total() {
      return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    },
  },
  methods: {
    complete() {
      this.status = "";

      if (this.cart.length === 0) {
        this.status = "Your cart is empty. Add items first.";
        return;
      }
      if (!this.billing.name || !this.billing.email.includes("@")) {
        this.status = "Please enter your name and a valid email.";
        return;
      }

      const order = {
        id: "CC-" + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString(),
        items: this.cart,
        total: this.total,
        billing: this.billing,
        status: "Completed",
      };

      localStorage.setItem("cc_last_order", JSON.stringify(order));
      saveCart([]); // clear cart after purchase
      window.location.href = "receipt.html";
    },
  },
}).mount("#app");
