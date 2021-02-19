<template>
  <div class="form shadow">
    <div class="col-sm-6">
      <h4 class="blue padding_bottom20">
        <i class="fa fa-arrow-left" @click="goBack"></i> Assets Name
      </h4>
      <a href="#x"><img src="http://placehold.it/350x350" alt="Image" width="100%" height="100%"/></a>
      <br/>
      <input name="" type="button" class="bt bt-white" value="View More"/>
    </div>
    <div class="col-sm-6" id="bid">
      <div class="price padding_bottom20" align="right">ZAR <strong>1000.00</strong></div>
      <div class="value shadow">
        <nuxt-link to="/select-payment-gateway">
          <input name="" type="button" class="bt-green bt" value="Deposit">
        </nuxt-link>
        <div class="price padd_top">Available Balance <strong class="ft_right">ZAR {{wallet.amount}}</strong></div>
      </div>
      <buy-sell v-if="isConfirmation" :text="formData.isBuy ? 'Buy' : 'Sell'" :isBuy="formData.isBuy"
                @buyOrSell="buyOrSell"/>
      <div v-if="!isConfirmation">
        <div class="value shadow">
          <div class="price padd_top">Percentage for Sale <strong class="ft_right">2.4%</strong></div>
        </div>
        <div class="value shadow">
          <div class="price padd_top">Unit Owned <strong class="ft_right">{{currentData.currently_owned_units}}</strong>
          </div>
        </div>
        <div>
          <b-form ref="form" @submit.stop.prevent="toggleConfirmation">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td colspan="2"><h5>Select One Option</h5>
                  <input name="" type="button" class="buy shadow" value="Buy"
                         @click="updateFormData({value: true, name: 'isBuy'})">
                  <input name="" type="button" class="shadow sell" value="Sell"
                         @click="updateFormData({value: false, name: 'isBuy'})"></td>
              </tr>
              <tr>
                <td>
                  <b-form-input
                    name="" type="number" placeholder="Enter Units" class="textbox"
                    :state="!!formData.units"
                    :disabled="!!formData.amount"
                    v-model="formData.units" required>
                  </b-form-input>
                </td>
                <td width="10%" align="center">Or</td>
                <td>
                  <b-form-input
                    name="" type="text" placeholder="Enter Amount" class="textbox"
                    :state="!!formData.amount" required
                    :disabled="!!formData.units"
                    v-model="formData.amount">
                  </b-form-input>
                </td>
              </tr>
            </table>
            <div class="form-group" align="center">
              <input name="" type="submit" :class="formData.isBuy ? 'shadow buy': 'sell shadow'" :value="buttonText">
            </div>
          </b-form>
        </div>
      </div>
    </div>

    <div class="clearfix"></div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                isConfirmation: false,
                formState: false,
                formData: {
                    isBuy: true,
                    units: '',
                    unit_price: '6.4',
                    amount: '',
                },
                buttonText: 'Buy'
            }
        },
        computed: {
            currentData() {
                //console.log(this.$store.state.activity.activityLog.find(item => item.asset_id === this.assetId));
                return this.$store.state.activity.activityLog.find(item => item.asset_id === this.assetId);
            },
            assetId() {
                return this.$router.currentRoute.query.id;
            },
            sell() {
                return this.$router.currentRoute.query.s === "sell";
            },
        },
        methods: {
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity();
                this.formState = valid;
                return valid;
            },
            async buyOrSell() {
                let transaction = {
                    asset_id: this.assetId,
                    units: parseInt(this.formData.units),
                    unit_price: parseFloat(this.formData.unit_price),
                    amount: parseFloat(this.formData.amount),
                };
                let response;
                if (this.formData.isBuy) {
                    try {
                        response = await this.$axios.$post('transactions/purchase_requests', {transaction: transaction});
                        this.makeToast("success", response.message);
                    } catch (e) {
                        console.log(e);
                        this.makeToast("danger", 'Something went wrong.');
                    }

                } else {
                    try {
                        response = await this.$axios.$post('transactions/sell_requests', {transaction: transaction})
                        this.makeToast("success", response.messages[0]);
                    } catch (e) {
                        console.log(e);
                        this.makeToast("danger", 'Something went wrong.');
                    }
                }
            },
            updateFormData(event) {
                if (event.value) {
                    this.formData.isBuy = event.value;
                    this.buttonText = 'Buy'
                } else {
                    this.formData.isBuy = event.value;
                    this.buttonText = 'Sell'
                }
            },
            toggleConfirmation() {
                if (!this.checkFormValidity()) {
                    return;
                }
                this.isConfirmation = true;
            }
        },
        mounted() {
            if (this.sell) {
                this.formData.isBuy = false;
                this.buttonText = 'Sell';
            }
        }
    }
</script>
