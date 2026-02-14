const { createApp } = Vue;

createApp({
  data() {
    return {
      isLoggedIn: localStorage.getItem("loggedIn") === "true",
      username: localStorage.getItem("username") || "PlaceholderUser",
      email: localStorage.getItem("email") || "placeholder@email.com",
    };
  },
  mounted() {
    window.addEventListener("storage", () => {
      this.isLoggedIn = localStorage.getItem("loggedIn") === "true";
    });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.isLoggedIn = false;
      window.location.href = "login.html";
    },
  },
}).mount("#app");
