<template>
  <layout id="deposit_money">
    <div class="col-lg-12 col-md-12">
      <div class="row">
        <div class="container">
          <div class="box shadow">
            <h3 class="blue padd_top_20">
              <a @click="goBack">
                <i class="fa fa-arrow-left"></i>
              </a>
              Pick Connected Account
            </h3>
            <div class="col-lg-6 col-md-6 col-xs-12">
              <div class="padding">
                <h5>Select one of your connected account</h5>
                <div v-if="cards.length">
                  <div
                    class="form-group"
                    v-for="card in cards"
                    :key="card.card.token"
                  >
                    <label>
                      <!-- <img src="~/assets/images/paypal.png" width="150"
                             class="ft_right" align="absmiddle"> -->
                      <input
                        v-model="formData.token"
                        name="pick"
                        type="radio"
                        :value="card.card.token"
                      />{{ card.card.cardHolder }}({{ card.card.type }})
                    </label>
                  </div>
                </div>
                <div class="form-group" v-else>
                  <label>
                    <b-spinner
                      style="width: 3rem; height: 3rem"
                      label="Large Spinner"
                    ></b-spinner>
                  </label>
                </div>
                <div class="form-group" v-if="formData.token">
                  <label
                    ><h4 class="blue">Amount</h4>
                    <b-form-input
                      v-model="formData.amount"
                      placeholder="Enter deposit amount"
                    ></b-form-input>
                  </label>
                </div>
                <div class="form-group" v-if="formData.token">
                  <label
                    ><h4 class="blue">Pick Currency</h4>
                    <select v-model="formData.currency" name="">
                      <option>Euro</option>
                      <option>USD</option>
                    </select></label
                  >
                </div>
                <div class="form-group" align="right" v-if="cards.length">
                  <input
                    v-if="!loading"
                    @click="withdraw ? withdrawAmount() : deposit()"
                    name=""
                    type="button"
                    class="bt bt-blue"
                    :value="withdraw ? 'Withdraw' : 'Deposit'"
                  />
                  <input
                    disabled
                    v-if="loading"
                    name=""
                    type="button"
                    :value="withdraw ? 'Withdraw' : 'Deposit'"
                    class="bt-blue"
                  />
                  <b-spinner small type="grow" v-if="loading"></b-spinner>
                </div>
                <div class="form-group" align="right">
                  <input
                    @click="addAccount"
                    name=""
                    type="button"
                    class="bt bt-blue"
                    value="Add Account"
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
  name: "pick-connected-account",
  data: () => ({ formData: { currency: "USD" }, cards: [], loading: false }),
  computed: {
    withdraw() {
      return this.$router.currentRoute.query.s == "w";
    },
    wallet() {
      return this.$store.state.profile.wallet || {};
    },
  },
  async fetch() {
    this.cards = await this.$axios.$get("users/cards");
    console.log("cards", this.cards);
  },
  methods: {
    async withdrawAmount() {
      try {
        this.formData.wallet_id = this.wallet.id;
        this.loading = true;
        let response = await this.$axios.$post(
          "/transactions/withdrawal_requests",
          {transaction:this.formData}
        );
        this.loading = false;
        if (response.success) {
          this.makeToast("success", response.message);
        } else {
          this.makeToast("danger", response.error);
        }
      } catch (error) {
        this.loading = false;
        this.makeToast("danger", error.error || "Somthing went wrong.");
      }
    },
    addAccount() {
      this.$router.push("add-card");
    },
    async deposit() {
      try {
        this.formData.wallet_id = this.wallet.id;
        this.loading = true;
        let response = await this.$axios.$post(
          "/pay_genius/deposits",
          this.formData
        );
        this.loading = false;
        if (response.success) {
          this.makeToast("success", response.message);
        } else {
          this.makeToast("danger", response.error);
        }
      } catch (error) {
        this.loading = false;
        this.makeToast("danger", error.error || "Somthing went wrong.");
      }
    },
  },
};
</script>

<style scoped>
</style>
