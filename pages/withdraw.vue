<template>
  <layout id="deposit_money">
    <div class="col-lg-12 col-md-12">
      <div class="row">
        <div class="container">
          <div class="box shadow">
            <h3 class="blue padd_top_20">
              <a @click="goBack"> <i class="fa fa-arrow-left"></i> </a>Pick
              Connected Account
            </h3>

            <div class="col-lg-6 col-md-6 col-xs-12">
              <div class="padding">
                <h5>Select one of your connected account</h5>
                <div class="form-group">
                  <label
                    ><img
                      src="images/paypal.png"
                      width="150"
                      class="ft_right"
                      align="absmiddle"
                    /><input name="pick" type="radio" value="" /> Main Deposit
                    Account</label
                  >
                </div>
                <div class="form-group">
                  <label
                    ><img
                      src="images/paypal.png"
                      width="150"
                      class="ft_right"
                      align="absmiddle"
                    /><input name="newaccount" type="radio" value="" /> Joseph
                    Paypal UK</label
                  >
                </div>
                <div class="form-group">
                  <label
                    ><img
                      src="images/paypal.png"
                      width="150"
                      class="ft_right"
                      align="absmiddle"
                    /><input name="saving" type="radio" value="" /> Saving
                    Account</label
                  >
                </div>

                <div class="form-group">
                  <label
                    ><h4 class="blue">Pick Currency</h4>
                    <select name="">
                      <option>Euro</option>
                      <option>USD</option>
                    </select></label
                  >
                </div>

                <div class="form-group" align="right">
                  <input
                    name=""
                    type="button"
                    class="bt bt-blue"
                    value="Deposit"
                  />
                </div>
              </div>
            </div>

            <div class="col-lg-6 col-md-6 col-xs-12">
              <div
                id="balance"
                class="shadow col-lg-6 col-xs-12"
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
  name: "picaccount",
  mounted() {
    //console.log("current route", this.$router.currentRoute.path);
  },
};
</script>

<style scoped>
</style>
