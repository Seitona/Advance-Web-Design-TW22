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
      search: "",
      sort: "",
      products: [
        { id: "matcha", name: "Matcha Kit", desc: "Ceremonial set for daily focus.", price: 799, image: "Assets/matcha.jpg", featured: true, createdAt: "2026-01-25" },
        { id: "earphones", name: "Minimalist Earphones", desc: "Clean wired sound, zero noise.", price: 499, image: "Assets/earphones.jpg", featured: true, createdAt: "2026-01-20" },
        { id: "books", name: "Reading Kit", desc: "Curated stack for the quiet grind.", price: 999, image: "Assets/books.jpg", featured: true, createdAt: "2026-01-18" },
        { id: "desk", name: "Minimal Desk Setup", desc: "Reset your space. Lock in.", price: 1299, image: "Assets/desk.jpg", featured: false, createdAt: "2026-01-12" },
        { id: "tote", name: "Everyday Tote", desc: "Carry clean. Move silent.", price: 599, image: "Assets/tote.jpg", featured: false, createdAt: "2026-01-10" },
        { id: "bottle", name: "Hydration Bottle", desc: "Cold. Minimal. Daily.", price: 399, image: "Assets/bottle.jpg", featured: false, createdAt: "2026-01-08" },
        { id: "notebook", name: "Notebook Set", desc: "Plan it. Write it. Execute.", price: 299, image: "Assets/notebook.jpg", featured: false, createdAt: "2026-01-05" },
        { id: "cable", name: "Cable Organizer", desc: "Clean cables. Clean mind.", price: 199, image: "Assets/cable.jpg", featured: false, createdAt: "2026-01-02" },
      ],
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
    filteredProducts() {
      const q = this.search.trim().toLowerCase();

      let list = this.products.filter((p) => {
        if (!q) return true;
        return p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
      });

      if (this.sort === "featured") list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
      if (this.sort === "low") list = [...list].sort((a, b) => a.price - b.price);
      if (this.sort === "high") list = [...list].sort((a, b) => b.price - a.price);
      if (this.sort === "new") list = [...list].sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));

      return list;
    },
    cartCount() {
      return this.cart.reduce((sum, item) => sum + (item.qty || 0), 0);
    },
  },
  methods: {
    inCartQty(productId) {
      const found = this.cart.find((x) => x.id === productId);
      return found ? found.qty : 0;
    },
    addToCart(p) {
      const existing = this.cart.find((x) => x.id === p.id);
      if (existing) existing.qty += 1;
      else this.cart.push({ id: p.id, name: p.name, price: p.price, image: p.image, qty: 1 });

      saveCart(this.cart);
    },
  },
}).mount("#app");
