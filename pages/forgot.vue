<template>
  <div class="container">
    <div class="col-lg-4 col-md-4"></div>

    <div id="center_form" class="col-lg-4 col-md-4">

      <h2 align="center">
        <nuxt-link to="/login"><i class="fa fa-arrow-left"></i></nuxt-link>
        Forgot Password?
      </h2>

      <form @submit.prevent="onForgotSubmit">

        <p>We will send a email to reset your password.</p><br>

        <div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="text" id="email" class="textbox" placeholder="Enter your email address here" name="email"
                   required v-model="user.email">
          </div>


          <div class="clearfix" align="center">
            <input type="submit" class="bt-blue shadow" value="Send">
          </div>
        </div>
      </form>
    </div>


    <div class="col-lg-4 col-md-4"></div>

  </div>
</template>


<script>
  export default {
    auth:false,
    data() {
      return {
        user: {
          email: '',
        }
      }
    },
    mounted() {
    },
    methods: {
      async onForgotSubmit() {
        try {
          let response = await this.$axios.post('/users/forgot_password', {
            user: this.user
          })
          console.log(response)
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
</script>
