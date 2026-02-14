const { createApp } = Vue;

createApp({
  data() {
    return {
      isLoggedIn: localStorage.getItem("loggedIn") === "true",
    };
  },
  mounted() {
    // Updates when localStorage changes in another tab/window
    window.addEventListener("storage", () => {
      this.isLoggedIn = localStorage.getItem("loggedIn") === "true";
    });
  },
}).mount("#app");
