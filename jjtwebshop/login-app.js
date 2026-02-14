const { createApp } = Vue;

createApp({
  data() {
    return {
      isLoggedIn: localStorage.getItem("loggedIn") === "true",
      user: "",
      pass: "",
      error: "",
    };
  },
  mounted() {
    window.addEventListener("storage", () => {
      this.isLoggedIn = localStorage.getItem("loggedIn") === "true";
    });
  },
  methods: {
    login() {
      this.error = "";

      if (this.user.length < 3 || this.pass.length < 6) {
        this.error = "Invalid login format";
        return;
      }

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("username", this.user);

      this.isLoggedIn = true;
      window.location.href = "profile.html";
    },
  },
}).mount("#app");
