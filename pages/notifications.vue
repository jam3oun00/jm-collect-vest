<template>
  <layout id="notifications">
    <h2 class="blue" align="center">Notifications</h2>
    <div class="row">
      <div class="container">
        <div id="explore_categories">
          <div class="tabs" style="border: none">
            <ul>
              <div class="search col-lg-3 col-sm-3 col-xs-8">
                <i class="fa fa-search"></i
                ><input
                  name=""
                  type="text"
                  class="searchbox"
                  placeholder="Search"
                />
              </div>
              <div class="filter col-md-1 col-xs-3">
                <i class="fa fa-filter"></i> Filter
              </div>
              <div class="filter_popup col-md-3 col-xs-12">
                <div class="shadow">
                  <table
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                    width="100%"
                  >
                    <tr>
                      <td align="center" width="10%">
                        <input name="" type="checkbox" checked value="" />
                      </td>
                      <td align="left">Transactions</td>
                    </tr>

                    <tr>
                      <td align="center">
                        <input name="" type="checkbox" checked value="" />
                      </td>
                      <td align="left">Requests</td>
                    </tr>

                    <tr>
                      <td align="center">
                        <input name="" type="checkbox" value="" />
                      </td>
                      <td align="left">Withdrawals</td>
                    </tr>

                    <tr>
                      <td align="center">
                        <input name="" type="checkbox" value="" />
                      </td>
                      <td align="left">Deposits</td>
                    </tr>

                    <tr>
                      <td align="center">
                        <input name="" type="checkbox" value="" />
                      </td>
                      <td align="left">Login Activity</td>
                    </tr>
                  </table>

                  <div class="clearfix"></div>
                </div>
              </div>
            </ul>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="row">
          <div class="container">
            <div class="col-md-12 col-xs-12">
              <div class="history">
                <div class="col-md-10 col-xs-12">
                  <h1>Today</h1>

                  <div class="preview now">
                    You have requested to buy 200 ZAR of CarVest Asset No.
                    33487. The transaction is currently pending. You will get
                    notified as soon as the status of the request changes.
                    <span>Just Now</span>
                  </div>

                  <div class="preview">
                    Your request to buy 15 ZAR of Asset Mercedes was succesful!

                    <span>30 mins ago</span>
                  </div>
                </div>
              </div>

              <div class="history">
                <div class="col-md-10 col-xs-12">
                  <h1>Yesterday</h1>

                  <div class="preview">
                    Your request to buy 15 ZAR of Asset Mercedes was succesful!

                    <span>11:20 AM</span>
                  </div>
                </div>
              </div>

              <div class="history">
                <div class="col-md-10 col-xs-12">
                  <h1>10/11/2020</h1>

                  <div class="preview">
                    Your request to buy 15 ZAR of Asset Mercedes was succesful!

                    <span>12:59 PM</span>
                  </div>

                  <div class="preview">
                    You have a new login activity Today at 10:18 AM in
                    Barcelona, Spain.

                    <span>12:59 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    userData() {
      return this.$auth.user || {};
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>

<style scoped>
</style>
