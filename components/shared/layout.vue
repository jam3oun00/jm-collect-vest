<template>
  <div class="">
    <div id="form" class="dashboard">
      <div id="signup_form">
        <div class="row signup">
          <div
            class="col-lg-3 col-md-3 bg-blue"
            id="menu"
            style="height: 950px"
          >
            <div class="account_menu">
              <div class="top_menu">
                <div>
                  <i
                    @click="showNotification = true"
                    class="fa fa-bell-o"
                    data-toggle="dropdown"
                  ></i>
                  <img src="~/assets/images/no-image.png" class="img" />  {{ userData.first_name }} {{ userData.surName }}
                </div>
                <div class="wallet">
                  <div class="wallet_button shadow">
                    <nuxt-link to="/wallet">
                      <i class="fa fa-money"></i>Wallet
                    </nuxt-link>
                  </div>
                  <div class="balance">
                    <Span>{{ wallet.amount }} ZAR {{ wallet.currency_id }}</Span
                    >Available Balance
                  </div>
                </div>
              </div>
              <ul>
                <li>
                  <nuxt-link :to="{ name: 'index' }">Dashboard</nuxt-link>
                  <span class="active"></span>
                </li>

                <li class="">
                  <nuxt-link to="/profile">Profile</nuxt-link>
                </li>

                <li class="">
                  <nuxt-link to="/activity">Activity</nuxt-link>
                </li>

                <li class="">
                  <nuxt-link to="/categories">Explore Categories</nuxt-link>
                </li>

                <li class="">
                  <nuxt-link to="/faq">FAQs</nuxt-link>
                </li>

                <li class="">
                  <nuxt-link to="/support">Support</nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-9 col-md-9">
            <div class="rightbg padd_0" :id="id">
              <div id="notifications" v-if="showNotification">
                <div class="notification_popup">
                  <div class="shadow col-md-6 col-xs-12">
                    <h1>
                      <a href="#"
                        ><i
                          @click="showNotification = false"
                          class="fa fa-close"
                        ></i></a
                      >Notifications
                    </h1>

                    <div class="preview now">
                      You have requested to buy 200 ZAR of CarVest Asset No.
                      33487. The transaction is currently pending. You will get
                      notified as soon as the status of the request changes.
                      <span>Just Now</span>
                    </div>

                    <div class="preview">
                      Your request to buy 15 ZAR of Asset Mercedes was
                      succesful!

                      <span>30 mins ago</span>
                    </div>

                    <div class="preview">
                      You have a new login activity Today at 10:18 AM in
                      Barcelona, Spain.

                      <span>30 mins ago</span>
                    </div>

                    <div align="right">
                      <nuxt-link to="/notifications">
                        <input
                          name=""
                          type="button"
                          value="SEE ALL"
                          class="bt-green"
                        />
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "layout",
  data: () => ({ showNotification: false }),
  props: {
    id: { default: "" },
  },
  computed: {
    userData() {
      return this.$auth.user || {};
    },
  },
};
</script>
<style scoped>
</style>
