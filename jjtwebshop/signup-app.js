const { createApp } = Vue;

createApp({
  data() {
    return {
      isLoggedIn: localStorage.getItem("loggedIn") === "true",
      user: "",
      email: "",
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
    signup() {
      this.error = "";

      if (this.user.length < 3) {
        this.error = "Username must be at least 3 characters.";
        return;
      }
      if (!this.email.includes("@")) {
        this.error = "Please enter a valid email.";
        return;
      }
      if (this.pass.length < 6) {
        this.error = "Password must be at least 6 characters.";
        return;
      }

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("username", this.user);
      localStorage.setItem("email", this.email);

      this.isLoggedIn = true;
      window.location.href = "profile.html";
    },
  },
}).mount("#app");
