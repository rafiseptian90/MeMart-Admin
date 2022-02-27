<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full mb-4">
        <span class="block mb-2 text-sm">Username</span>
        <vs-input
          v-validate="'required'"
          data-vv-validate-on="blur"
          name="username"
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          v-model="username"
          class="w-full"
        />
        <span class="text-danger text-sm">{{ errors.first("username") }}</span>
      </div>

      <div class="vx-col w-full">
        <span class="block text-sm mb-2">
          Password
        </span>
        <vs-input
          data-vv-validate-on="blur"
          v-validate="'required'"
          type="password"
          name="password"
          icon-no-border
          icon="icon icon-lock"
          icon-pack="feather"
          v-model="password"
          class="w-full"
        />
        <span class="text-danger text-sm">{{ errors.first("password") }}</span>
      </div>
    </div>

    <div class="flex flex-wrap justify-between my-5">
      <vs-checkbox v-model="checkbox_remember_me" class="mb-3"
        >Remember Me</vs-checkbox
      >
      <router-link to="/forgot-password">Forgot Password?</router-link>
    </div>
    <div class="flex flex-wrap justify-start mb-3">
      <vs-button :disabled="!validateForm" @click="loginJWT">Login</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      checkbox_remember_me: false,
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.username !== "" && this.password !== "";
    },
  },
  methods: {
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: "Login Attempt",
          text: "You are already logged in!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning",
        });

        return false;
      }
      return true;
    },
    
    loginJWT() {
      if (!this.checkLogin()) return;

      // Loading
      this.$vs.loading();

      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          username: this.username,
          password: this.password,
        },
      };

      this.$store
        .dispatch("auth/loginJWT", payload)
        .then(() => {
          this.$vs.loading.close();
        })
        .catch((error) => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: "Error",
            text: error.message,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
        });
    }
  }
};
</script>
