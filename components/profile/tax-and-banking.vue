<template>
  <div class="col-lg-10 col-md-10">
    <div class="rightbg" id="verification">
      <div>
        <p>
          <input type="button" @click="$emit('skipStep')" class="bt bt-grey shadow ft_right" value="Skip Step">
          All following FICA documentation is required for you to become a verified CV user in line with the
          guidelines outlined in the Financial Intelligence Centre ACT, 38 of 201 (FICA)act.<br><br>All Fields are
          mandatory to get Verified.
        </p>
        <b-form ref="form" @submit.stop.prevent="updateBankAccount()">
          <div class="form-group">
            <div class="col-lg-3 col-md-3 padding_right">
              <label><b>Bank Name</b></label>
              <b-form-input
                type="text" placeholder="Bank Name" name="bankName" id="bankName" class="textbox"
                :state="!!formData.name" v-model="formData.name" required>
              </b-form-input>
            </div>
            <div class="col-lg-3 col-md-3  padding_right">
              <label><b>Bank Code</b></label>
              <b-form-input
                type="text" placeholder="Bank Code" name="bankCode" id="bankCode" class="textbox"
                :state="!!formData.branch_code" v-model="formData.branch_code" required>
              </b-form-input>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-3 col-md-3 padding_right">
              <label><b>Account Type</b></label>
              <b-form-select
                v-model="formData.account_type"
                :options="accountTypes"
                :state="!!formData.account_type"
              ></b-form-select>
            </div>
            <div class="col-lg-4 col-md-4  padding_right">
              <label><b>Account Number</b></label>
              <b-form-input
                type="text" placeholder="Indentification Number" name="accountNumber" id="accountNumber" class="textbox"
                :state="!!formData.account_number" v-model="formData.account_number" required>
              </b-form-input>
            </div>

          </div>
          <div class="form-group">
            <div class="form-group padd_0"><br>
              <br>
              <input @click="$emit('prev')" type="button" class="bt-white shadow ft_left mar_0" value="Previous">
              <b-button type="submit" class="bt-blue shadow ft_right" :disabled="loading">
                Next
                <b-spinner small type="grow" v-if="loading"></b-spinner>
              </b-button>
              <br>
            </div>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                formState: false,
                accountTypes: [
                    {value: "current", text: "Current"},
                    {value: "savings", text: "Savings"},
                    {value: "money_market", text: "Money Market"},
                    {value: "cheque", text: "Cheque"},
                    {value: "leveraged", text: "Leveraged"},
                ],
                loading: false,
            }
        },
        computed: {
            formData() {
                return this.$store.state.profile.bankAccount || {};
            },
        },
        methods: {
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity();
                this.formState = valid;
                return valid;
            },
            // async getBankAccounts() {
            //     try {
            //         let response = await this.$axios.$get('users/bank_accounts');
            //         this.$store.commit("profile/setBankAccount", response);
            //     } catch (e) {
            //         console.log(e);
            //     }
            // },
            async updateBankAccount() {
                if (!this.checkFormValidity()) {
                    return;
                }
                try {
                    this.loading = true;
                    this.loading = true;
                    let formBuilder = new FormData();
                    for (let key in this.formData) {
                        formBuilder.append(`bank_account[${key}]`, this.formData[key])
                    }
                    let response = await this.$axios.$post("users/bank_accounts", formBuilder);
                    this.makeToast("info", response.message);
                    this.loading = false;
                    this.$emit('redirect');
                } catch (err) {
                    this.makeToast("danger", 'Error');
                    this.loading = false;
                }
            }
        },
        mounted() {
            // this.getBankAccounts();
        },
    }
</script>

<style scoped>
</style>
