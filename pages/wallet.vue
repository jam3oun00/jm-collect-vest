<template>
  <layout id="wallet">
    <h2 class="blue padding_bottom30" align="center">Wallet</h2>
    <div class="">
      <div class="">
        <div class="col-lg-8 col-md-8">
          <div class="row">
            <div class="container">
              <div class="col-lg-4 col-md-4">
                <nuxt-link to="select-payment-gateway">
                  <input
                    name=""
                    type="button"
                    value="Deposit"
                    class="bt-blue shadow"
                  />
                </nuxt-link>
                <nuxt-link to="select-account-option?s=withdraw">
                  <input
                    name=""
                    type="button"
                    value="Withdraw"
                    class="bt-white shadow"
                /></nuxt-link>
              </div>

              <div class="col-lg-4 col-md-4">
                <div class="balance shadow">
                  <strong>{{ wallet.amount }}</strong>
                  ZAR {{ wallet.currency_id }}
                </div>
              </div>

              <div class="col-lg-4 col-md-4">
                <div class="balance shadow">
                  <strong>{{ wallet.amount }}</strong>
                  ZAR {{ wallet.currency_id }}
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="container">
              <div class="col-lg-12 col-md-12 padd_top_30">
                <table
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  class="table table-responsive shadow"
                >
                  <tr>
                    <th colspan="3">Latest Transactions</th>
                  </tr>

                  <tr v-for="(item, index) in latestTransactions" :key="index">
                    <td width="10%">{{ item.id }}</td>
                    <td width="40%">{{ item.transaction_type }}</td>
                    <td align="right">
                      <strong>{{ item.amount }}</strong>
                      <span>{{ item.updated_at | formatDate }}</span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-4">
          <div class="wallet_account">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td class="price">$</td>
                <td>
                  <select name="">
                    <option>USD</option>
                    <option>Euro</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td colspan="2" align="center">
                  <input
                    name=""
                    type="button"
                    class="bt-green"
                    value="Accounts"
                  />
                </td>
              </tr>

              <tr>
                <td colspan="2" align="left" class="padd_top_30">
                  <a href="#" @click="downloadFile"
                    ><i class="fa fa-download"></i> Download Report</a
                  >
                </td>
              </tr>

              <tr>
                <td colspan="2" align="left" class="padd_top_20">
                  <a href="#"
                    ><i class="fa fa-history"></i> View Full History</a
                  >
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
export default {
  name: "wallet",
  data: () => ({ latestTransactions: [] }),
  computed: {
    wallet() {
      return this.$store.state.profile.wallet || {};
    },
  },
  methods: {
    downloadFile() {
      this.$axios({
        url: "transactions/histories/call.pdf", //your url
        method: "GET",
        responseType: "blob", // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.pdf"); //or any other extension
        link.setAttribute("target", "_blank"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });

      // http://collectvest-staging.herokuapp.com/api/v1/transactions/histories/call.pdf
    },
  },
  async mounted() {
    try {
      this.latestTransactions = await this.$axios.$get("users/transactions");
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
</style>
