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
    increase(item) {
      item.qty += 1;
      saveCart(this.cart);
    },
    decrease(item) {
      item.qty -= 1;
      if (item.qty <= 0) this.cart = this.cart.filter((x) => x.id !== item.id);
      saveCart(this.cart);
    },
    remove(item) {
      this.cart = this.cart.filter((x) => x.id !== item.id);
      saveCart(this.cart);
    },
  },
}).mount("#app");
