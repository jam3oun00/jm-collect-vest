<template>
  <div
    class="container d-flex align-items-center justify-content-center"
    style="min-height:100vh"
  >
    <div id="center_form" class="shadow-sm p-5 mx-auto" style="max-width:450px">
      <h1 class="text-center mx-auto mb-5 mt-4">Welcome back!</h1>

      <form @submit.prevent="userLogin">
        <div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              v-model="login.email"
              type="text"
              class="textbox"
              placeholder="Enter your email address here"
              id="email"
              name="email"
              required
            />
          </div>

          <div class="form-group">
            <label for="psw">Password</label>
            <input
              v-model="login.password"
              type="password"
              id="psw"
              name="psw"
              placeholder="xxxxx"
              title="Password must contain between 6-12 characters, with atleast one capitalized letter, a number and a symbol."
              required
            />
            <!-- pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" -->
          </div>
          <div class="form-group terms" align="right">
            <nuxt-link to="/forgot">Forgot Password?</nuxt-link>
          </div>
          <div class="form-group terms" align="right">
            <nuxt-link to="/terms">Terms and Conditions</nuxt-link>
          </div>
          <div class="clearfix" align="center">
            <b-button type="submit" class="bt-blue shadow" :disabled="loading">
              Log In
              <b-spinner small type="grow" v-if="loading"></b-spinner>
            </b-button>
            <!-- <input type="submit"  value="Log In"/> -->
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      },
      loading: false
    };
  },
  mounted() {
    //console.log("base url ", process.env.baseUrl);
  },
  methods: {
    async userLogin() {
      try {
        this.loading = true;
        let response = await this.$auth.loginWith("local", {
          data: { user: this.login }
        });
        if (response.status === 200) {
          let currentUser = await this.$axios.$get("current_user");
          this.$store.commit("profile/setCurrentUser", currentUser);
        }
        this.loading = false;
      } catch (err) {
        // console.log('error',JSON.stringify( err));
        // debugger
        this.makeToast("danger", err.error || "Invalide email or password.");
        this.loading = false;
      }
    }
  }
};
</script>
