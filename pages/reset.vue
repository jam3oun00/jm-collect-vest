<template>
  <div class="container">
    <div class="col-lg-4 col-md-4"></div>
    <div id="center_form" class="col-lg-4 col-md-4 shadow">
      <h2 align="center">Reset Password</h2>
      <form @submit.prevent="onResetSubmit">
        <div>
          <div class="form-group">
            <label for="email"><b>Email</b></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              v-model="user.email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password"><b>New Password</b></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your new password here"
              v-model="user.password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="Password must contain between 6-12 characters, with atleast one capitalized letter, a number and a symbol."
              required
            />
          </div>
          <div class="form-group">
            <label for="confirmPassword"><b>Confirm Password</b></label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Enter your new password here"
              v-model="user.confirm_password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="Password must contain between 6-12 characters, with atleast one capitalized letter, a number and a symbol."
              required
            />
            <p>
              Password must contain between 6-12 characters, with atleast one
              capitalized letter, a number and a symbol.
            </p>
          </div>
          <div class="clearfix" align="center">
            <input type="submit" class="bt-blue shadow" value="Reset" />
          </div>
        </div>
      </form>
    </div>

    <div class="col-lg-4 col-md-4"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        confirm_password: "",
        reset_password_code: this.$route.query.token,
      },
    };
  },
  mounted() {},
  methods: {
    async onResetSubmit() {
      this.$axios
        .patch("/users/forgot_password", {
          user: this.user,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
