<template>
  <layout id="deposit_money">
    <div class="col-lg-12 col-md-12">
      <div class="row">
        <div class="container">
          <div class="box shadow">
            <h3 class="blue padd_top_20">
              <a @click="goBack"><i class="fa fa-arrow-left"></i></a>
              {{ withdraw ? "Withdraw" : "Deposit" }} Money in Your Virtual
              Wallet
            </h3>
            <div class="col-lg-4 col-md-4 col-xs-12">
              <div class="padding">
                <div class="form-group">
                  <label>
                    <input
                      v-model="option"
                      name="acount"
                      type="radio"
                      value="pick"
                    />
                    Pick Connected Account
                  </label>
                </div>
                <div class="form-group">
                  <label>
                    <input
                      v-model="option"
                      name="acount"
                      type="radio"
                      value="new"
                    />
                    Create New Account
                  </label>
                </div>
                <div class="form-group" v-if="!withdraw">
                  <label>
                    <input
                      v-model="option"
                      name="acount"
                      type="radio"
                      value="new_add"
                    />
                    Make Deposit With Card Details (Once Off)
                  </label>
                </div>
                <div class="form-group" align="right">
                  <input
                    name=""
                    type="button"
                    class="bt bt-blue"
                    @click="redirectTo"
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
                <div class="price">
                  <strong>{{ wallet.amount }}</strong> ZAR
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
  name: "deposit",
  data: () => ({
    option: "pick",
  }),
  computed: {
    withdraw() {
      return this.$router.currentRoute.query.s == "withdraw";
    },
    wallet() {
      return this.$store.state.profile.wallet || {};
    },
  },
  methods: {
    redirectTo() {
      if (this.option == "pick") {
        this.$router.push(
          `pick-connected-account?s=${this.withdraw ? "w" : "d"}`
        );
      } else if (this.option == "new") {
        this.$router.push("add-card");
      } else {
        this.$router.push("add-card?v=add");
      }
    },
  },
};
</script>

<style scoped>
</style>
