<template>
  <div class="container">
    <div id="form">
      <h1 align="center">
        Welcome to the Collectvest registration wizard!
        <p>
          To learn more please visit our website
          <a href="https://collectvest.co.za/" target="_blank"
            >Collectvest.co.za</a
          >
        </p>
      </h1>

      <div id="signup_form">
        <div class="row signup">
          <div
            class="col-lg-6 col-md-6 bg-blue d-flex flex-column justify-content-between p-5"
          >
            <div>
              <asset-summaries />

              <h3 align="left" class="mt-2">ZAR <span>1000,000</span></h3>
            </div>

            <div class="already_login font-weight-normal text-center">
              Already have an account?
              <nuxt-link to="/login" class="font-weight-bold">Log In</nuxt-link>
            </div>
          </div>

          <div class="col-lg-6 col-md-6 rightbg">
            <form action="action_page.php" @submit.prevent="userRegister">
              <div>
                <p>All Fields are mandatory.</p>

                <div class="form-group">
                  <label>Email Address</label>
                  <input
                    v-model="formData.email"
                    type="text"
                    placeholder="Enter your email address here"
                    name="email"
                    required
                  />
                </div>
                <div class="form-group">
                  <label>Phone Number</label>
                  <vue-tel-input
                    v-bind="bindProps"
                    v-model="formData.mobile"
                  ></vue-tel-input>
                </div>

                <div class="form-group">
                  <label for="psw">Password</label>
                  <input
                    v-model="formData.password"
                    type="password"
                    id="psw"
                    name="psw"
                    placeholder="xxxxx"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                    title="Password must contain between 6-12 characters, with atleast one capitalized letter, a number and a symbol."
                    required
                  />
                  <client-only>
                    <Password
                      v-model="formData.password"
                      :strengthMeterOnly="true"
                    ></Password>
                  </client-only>
                  <!--                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"-->
                  <p>
                    Password must contain between 6-12 characters, with atleast
                    one capitalized letter, a number and a symbol.
                  </p>
                </div>

                <div class="form-group terms">
                  <input
                    v-model="formData.accept_term"
                    type="checkbox"
                    checked="checked"
                    name="remember"
                  />
                  I Accept<a
                    href="https://collectvest.co.za/legal"
                    target="_blank"
                    >Terms and Conditions</a
                  >
                  of Collectvest
                  <br />
                  <br />
                  <input
                    v-model="formData.acknowledge"
                    type="checkbox"
                    checked="checked"
                    name="remember"
                  />
                  I acknowledge my information will be used in accordance with
                  <a href="https://collectvest.co.za/legal" target="_blank"
                    >Privacy Policy</a
                  >
                </div>
                <div class="clearfix" align="center">
                  <input
                    type="submit"
                    class="bt-blue shadow"
                    :class="{
                      'bt-disabled': !(
                        this.formData.accept_term && this.formData.acknowledge
                      )
                    }"
                    value="Sign Up"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Password from "vue-password-strength-meter";

export default {
  data() {
    return {
      strengthMeterOnly: true,
      bindProps: {
        autoFormat: true,
        enabledFlags: false,
        defaultCountry: "ZA",
        inputOptions: {
          showDialCode: true
        }
      },
      formData: {
        email: "",
        mobile: "",
        password: "",
        confirm_password: "",
        accept_term: false,
        acknowledge: false
      }
    };
  },
  auth: false,
  mounted() {},
  methods: {
    async userRegister() {
      
      this.formData.confirm_password = this.formData.password;
      if (!(this.formData.accept_term && this.formData.acknowledge)) {
        this.makeToast(
          "warning",
          "Please accept Terms & Conditions to continue"
        );
      } else {
        this.$store
          .dispatch(`signup/registerUser`, { user: this.formData })
          .then(async response => {
            let user = await this.$auth.loginWith("local", {
              data: { user: this.formData }
            });
            console.log(user);
          });
      }
    }
  },
  components: {
    Password
  }
};
</script>
