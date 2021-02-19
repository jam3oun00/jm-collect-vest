<template>
  <layout id="bid">
    <h2 class="blue" align="center">Activity</h2>
    <div class="row">
      <div class="container">
        <div id="explore_categories">
          <div class="tabs">
            <ul>
              <li
                class="padd_left col-lg-2 col-xs-12"
                :class="{active: this.$router.currentRoute.path == '/activity',}"
              >
                <nuxt-link to="/activity">Assets&nbsp;Holdings</nuxt-link>
              </li>
              <li
                class="col-lg-2 col-xs-12"
                :class="{ active: this.$router.currentRoute.path == '/activity/request',}">
                <nuxt-link to="/activity/request">Requests</nuxt-link>
              </li>
              <li class="col-lg-2 col-xs-12"
                  :class="{active:this.$router.currentRoute.path == '/activity/transaction',}">
                <nuxt-link to="/activity/transaction">Transactions</nuxt-link>
              </li>
              <li
                class="col-lg-2 col-xs-12"
                :class="{
                  active:
                    this.$router.currentRoute.path == '/activity/log-activity',
                }"
              >
                <nuxt-link to="/activity/log-activity"
                >Login&nbsp;Activity
                </nuxt-link>
              </li>
              <div class="search col-lg-3 col-sm-3 col-xs-12">
                <i class="fa fa-search"></i>
                <input
                  name=""
                  type="text"
                  class="searchbox"
                  @input="Search"
                  placeholder="Search"
                />
              </div>
            </ul>
          </div>
          <div class="clearfix"></div>
        </div>
        <nuxt-child></nuxt-child>
      </div>
    </div>
  </layout>
</template>

<script>
    export default {
        name: "activity",
        methods: {
            Search(value) {
                this.$store.commit("activity/setSearch", value.target.value);
            },
        },
        mounted() {
            // console.log("current route", this.$router.currentRoute.path);
        },
    };
</script>

<style scoped>
</style>
