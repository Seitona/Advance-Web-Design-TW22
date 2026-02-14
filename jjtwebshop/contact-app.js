const { createApp } = Vue;

createApp({
  data() {
    return {
      isLoggedIn: localStorage.getItem("loggedIn") === "true",
      username: "",
      message: "",
      status: "",
    };
  },
  mounted() {
    window.addEventListener("storage", () => {
      this.isLoggedIn = localStorage.getItem("loggedIn") === "true";
    });
  },
  methods: {
    submitForm() {
      if (this.username.length < 3) {
        this.status = "Username must be at least 3 characters.";
        return;
      }
      if (!this.message) {
        this.status = "Please write a message.";
        return;
      }

      const payload = {
        username: this.username,
        message: this.message,
        submittedAt: new Date().toISOString(),
      };
      localStorage.setItem("cc_contact_last", JSON.stringify(payload));

      this.status = "Submitted!";
      this.username = "";
      this.message = "";
    },
  },
}).mount("#app");
