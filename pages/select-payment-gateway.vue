<template>
  <layout id="deposit_money">
    <div class="col-lg-12 col-md-12">
      <div class="row">
        <div class="container">
          <div class="box shadow">
            <h3 class="blue padd_top_20">
              <a @click="goBack"><i class="fa fa-arrow-left"></i></a> Connact
              new account to CollectVest
            </h3>

            <div class="col-lg-5 col-md-5 col-xs-12">
              <div class="padding">
                <h5>Select one of the service below</h5>
                <!-- <div class="form-group">
                      <label
                        ><input
                          name="newaccount"
                          type="radio"
                          value="paypal" />&nbsp;<img
                          src="~/assets/images/paypal.png"
                          width="120"
                          class=""
                          align="absmiddle"
                      /></label>
                    </div> -->
                <div class="form-group">
                  <label
                    ><input
                      v-model="formData.paymentType"
                      name="newaccount"
                      type="radio"
                      value="ozow" />&nbsp;<img
                      src="~/assets/images/ozow.png"
                      width="120"
                      align="absmiddle"
                  /></label>
                </div>
                <div class="form-group">
                  <label
                    ><input
                      v-model="formData.paymentType"
                      name="newaccount"
                      type="radio"
                      value="strip" />&nbsp;<img
                      src="~/assets/images/paygenius-logo-colour.png"
                      width="120"
                      align="absmiddle"
                  /></label>
                </div>
                <div class="form-group" v-if="formData.paymentType == 'ozow'">
                  <label
                    ><h4 class="blue">Amount</h4>
                    <b-form-input
                      v-model="formData.amount"
                      placeholder="Enter deposit amount"
                    ></b-form-input>
                  </label>
                </div>
                <div class="form-group" v-if="formData.paymentType == 'ozow'">
                  <label
                    ><h4 class="blue">Pick Currency</h4>
                    <select v-model="formData.currency" name="">
                      <option>Euro</option>
                      <option>USD</option>
                    </select>
                  </label>
                </div>

                <div class="form-group" align="right">
                  <input
                    @click="getAccountInfo"
                    name=""
                    type="button"
                    class="bt bt-blue"
                    value="Next"
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
                <div class="price">
                  <strong>{{ wallet.amount }}</strong>
                  {{ wallet.currency_id }}
                </div>
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
  name: "selectgateway",
  data: () => ({
    formData: {
      amount: 0,
      currency: "USD",
      wallet_id: "",
      paymentType: "ozow",
    },
  }),
  computed: {
    wallet() {
      return this.$store.state.profile.wallet || {};
    },
  },
  methods: {
    async getAccountInfo() {
      if (this.formData.paymentType == "ozow") {
        this.formData.wallet_id = this.wallet.id;
        let response = await this.$axios.$post("/ozow/deposits", this.formData);
        if (response.payment_link) {
          window.open(response.payment_link);
        } else {
          this.makeToast("danger", response.error);
        }
      } else {
        this.$router.push("select-account-option");
      }
      // console.log(response);
    },
  },
};
</script>
