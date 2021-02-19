<template>
  <div class="container">
    <div id="form">
      <h1 align="center">
        Welcome on board!
      </h1>

      <div id="signup_form">
        <div class="row signup">
          <div class="col-lg-6 col-md-6 bg-blue">
            <h3 align="left">Asset Name</h3>

            <div id="myCarousel" class="carousel slide" data-ride="carousel">
              <!-- Indicators -->
              <ol class="carousel-indicators">
                <li
                  data-target="#myCarousel"
                  data-slide-to="0"
                  class="active"
                ></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
              </ol>

              <!-- Wrapper for slides -->
              <div class="carousel-inner">
                <div class="item active">
                  <img src="@/assets/images/banner.jpg" alt="Los Angeles" />
                </div>

                <div class="item">
                  <img src="@/assets/images/banner2.jpg" alt="Chicago" />
                </div>

                <div class="item">
                  <img src="@/assets/images/banner.jpg" alt="New York" />
                </div>
              </div>

              <!-- Left and right controls -->
              <a
                class="left carousel-control"
                href="#myCarousel"
                data-slide="prev"
              >
                <span class="glyphicon glyphicon-chevron-left"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="right carousel-control"
                href="#myCarousel"
                data-slide="next"
              >
                <span class="glyphicon glyphicon-chevron-right"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>

            <h3 align="left">ZAR <span>1000,000</span></h3>

            <div class="already_login">
              Already have an account?
              <nuxt-link to="/login">Log In</nuxt-link>
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
  },
};
</script>
