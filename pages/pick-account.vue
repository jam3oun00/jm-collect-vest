<template>
  <layout id="deposit_money">
    <div class="col-lg-12 col-md-12">
      <div class="row">
        <div class="container">
          <div class="box shadow">
            <h3 class="blue padd_top_20">
              <a @click="goBack"> <i class="fa fa-arrow-left"></i></a> Withdraw
              Money from Your Virtual Wallet
            </h3>

            <div class="col-lg-4 col-md-4 col-xs-12">
              <div class="padding">
                <div class="form-group">
                  <label
                    ><input name="pick" type="radio" value="" /> Pick Connected
                    Account</label
                  >
                </div>
                <div class="form-group">
                  <label
                    ><input name="newaccount" type="radio" value="" /> Create
                    New Account</label
                  >
                </div>
                <div class="form-group" align="right">
                  <input
                    @click="nextScreen"
                    name=""
                    type="button"
                    class="bt bt-blue"
                    value="Next"
                  />
                </div>
              </div>
            </div>

            <div class="col-lg-8 col-md-8 col-xs-12">
              <div
                id="balance"
                class="shadow col-lg-5 col-xs-12"
                align="center"
              >
                <div class="price"><strong>234</strong> ZAR</div>
                <span>Available Balance</span>
              </div>
            </div>

            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
export default {
  name: "withdraw",
  methods: {
    nextScreen() {
      this.$router.push("pick-account");
    },
  },
  mounted() {
    //console.log("current route", this.$router.currentRoute.path);
  },
};
</script>

<style scoped>
</style>
