<template>
  <layout id="deposit_money">
    <div class="col-lg-12 col-md-12">
      <div class="row">
        <div class="container">
          <div class="box shadow">
            <h3 class="blue padd_top_20">
              <a @click="goBack"><i class="fa fa-arrow-left"></i></a>
              Deposit Money in Your Virtual Wallet
            </h3>
            <div class="" style="width: 30%">
              <b-form ref="form">
                <b-form-group label="Card Type" label-for="input-lazy">
                  <b-form-select
                    v-model="formData.card_type"
                    :options="options"
                    :state="!!formData.card_type"
                  ></b-form-select>
                </b-form-group>
                <b-form-group label="Card Numbrer" label-for="input-lazy">
                  <b-form-input
                    id="input-lazy"
                    v-model="formData.card_number"
                    :state="!!formData.card_number"
                    placeholder="Enter your card number"
                    type="number"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Cvv" label-for="input-lazy">
                  <b-form-input
                    id="input-lazy"
                    type="number"
                    v-model="formData.cvv"
                    placeholder="123"
                    :state="!!formData.cvv"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Month" label-for="input-lazy">
                  <b-form-input
                    id="input-lazy"
                    v-model="formData.expiry_month"
                    type="number"
                    placeholder="22"
                    :state="!!formData.expiry_month"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Year" label-for="input-lazy">
                  <b-form-input
                    id="input-lazy"
                    v-model="formData.expiry_year"
                    placeholder="12"
                    type="number"
                    :state="!!formData.expiry_year"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Account Holder Name"
                  label-for="input-lazy"
                >
                  <b-form-input
                    id="input-lazy"
                    type="text"
                    v-model="formData.card_holder"
                    :state="!!formData.card_holder"
                    placeholder="Enter your name"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Amount"
                  label-for="input-lazy"
                  v-if="this.$router.currentRoute.query.v == 'add'"
                >
                  <b-form-input
                    id="input-lazy"
                    v-model="formData.amount"
                    placeholder="i.e 10.0"
                    type="number"
                    :state="!!formData.amount"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-button type="button" @click="onSubmit" variant="primary"
                  >Submit</b-button
                >
              </b-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>
<script>
export default {
  data: () => ({
    formData: {},
    formState: false,
    options: [
      { value: null, text: "Please select card" },
      { value: "visa", text: "Visa" },
      { value: "mastercard", text: "Master Card" },
    ],
  }),
  mounted() {
    //console.log(this.$router.currentRoute.query);
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.formState = valid;
      return valid;
    },
    async onSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      try {
        let response = {};
        if (this.$router.currentRoute.query.v == "add") {
          response = await this.$axios.$post("pay_genius/deposits", {
            card: this.formData,
          });
        } else {
          response = await this.$axios.$post("pay_genius/cards", {
            card: this.formData,
          });
        }
        this.makeToast("info", response.message);
        if (response.token) this.$router.push("pick-connected-account");
      } catch (err) {
        this.makeToast("danger", "error");
      }
    },
  },
};
</script>
