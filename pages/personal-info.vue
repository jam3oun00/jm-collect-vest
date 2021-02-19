<template>
  <div class="container">
    <div id="form">
      <h1 align="center">Verification
        <p>Sign up to start trading on SA' first Marketplace Platform. <a href="#">Click Here</a> to find out </p></h1>
      <div id="signup_form">
        <div class="row signup">
          <div class="col-lg-2 col-md-2 bg-blue" id="menu" style="height:900px">
            <ul>
              <li :class="step === 1 ? 'active' : ''" @click="step=1" class="cursor-pointer">
                <i>1</i>
                <p><a>Personal Information</a></p>
              </li>
              <li @click="step=2" :class="step === 2 ? 'active' : ''" class="cursor-pointer">
                <i>2</i>
                <p><a>Tax and Banking</a></p>
              </li>
              <li @click="step=3" :class="step === 3 ? 'active' : ''" class="cursor-pointer">
                <i>3</i>
                <p><a>Optional
                  Information</a></p>
              </li>
              <li @click="step=4" :class="step === 4 ? 'active' : ''" class="cursor-pointer">
                <i>4</i>
                <p><a>Review and Finish</a></p>
              </li>
            </ul>
            <div id="bottom_actions">
              <!--              <a><i class="fa fa-save"></i> Save Progress</a>-->
              <nuxt-link to="/"><a href=""><i class="fa fa-list"></i> Dashboard</a></nuxt-link>
            </div>
          </div>
          <personal-info-tab v-show="step === 1" @skipStep="skipStep()" @redirect="redirectToNextStep()"/>
          <tax-and-banking v-show="step === 2" @prev="previousStep()" @skipStep="skipStep()"
                           @redirect="redirectToNextStep()"/>
          <optional-information v-show="step === 3" @prev="previousStep()" @skipStep="skipStep()"
                                @redirect="redirectToNextStep()"/>
          <review-and-finish v-show="step === 4" @prev="previousStep()"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

    export default {
        data() {
            return {
                step: 1,
            }
        },
        computed: {
            formData() {
                return this.$store.state.profile.formData || {};
            }
        },

        methods: {
            previousStep() {
                this.step--;
            },
            redirectToNextStep() {
                this.step++;
            },
            skipStep() {
                this.step++;
            },
            // updateProfile() {
            //     let formBuilder = new FormData();
            //     for (let key in this.formData) {
            //         formBuilder.append(`profile[${key}]`, this.formData[key])
            //     }
            //     console.log(formBuilder.values);
            //     let file = document.querySelector('#id_passport');
            //     console.log(file.files[0]);
            //     formBuilder.append("profile[id_passport]", file.files[0]);
            //
            //     file = document.querySelector('#proof_of_bank_account');
            //     formBuilder.append("profile[proof_of_bank_account]", file.files[0]);
            //
            //     this.$axios.$patch('users/profiles', formBuilder, {
            //         headers: {'Content-Type': 'multipart/form-data'}
            //     }).then(response => {
            //         console.log(response);
            //     });
            // }
        }
    }
</script>
<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
</style>
