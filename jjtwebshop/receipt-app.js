const { createApp } = Vue;

createApp({
  data() {
    let order = null;
    try {
      order = JSON.parse(localStorage.getItem("cc_last_order"));
    } catch {
      order = null;
    }
    return {
      isLoggedIn: localStorage.getItem("loggedIn") === "true",
      order,
    };
  },
  mounted() {
    window.addEventListener("storage", () => {
      this.isLoggedIn = localStorage.getItem("loggedIn") === "true";
    });
  },
}).mount("#app");
