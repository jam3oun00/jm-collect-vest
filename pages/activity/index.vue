<template>
  <div class="form shadow" id="table">
    <table class="table table-condensed table-responsive">
      <tbody>
      <tr v-for="item in assetHoldings">
        <td width="50%">{{item.asset_id}}</td>
        <td class="price">1000 ZAR</td>
        <td>
          <nuxt-link :to='`/activity/buy-sell?id=${item.asset_id}&s=buy`'>
            <input name="" type="button" class="buy shadow" value="Buy"/>
          </nuxt-link>
        </td>
        <td>
          <nuxt-link :to='`/activity/buy-sell?id=${item.asset_id}&s=sell`'>
            <input name="" type="button" class="sell shadow" value="Sell"/>
          </nuxt-link>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="clearfix"></div>
  </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        computed: {
            assetHoldings() {
                return this.$store.state.activity.activityLog || [];
            },
            search() {
                return this.$store.state.activity.search;
            }
        },
        methods: {
            async getUserAssetShare() {
                try {
                    let response = await this.$axios.$get('users/asset_shares');
                    this.$store.commit("activity/setActivityLogs", response);
                } catch (e) {
                    console.log(e);
                }
            }
        },
        mounted() {
            this.getUserAssetShare();
        }
    }
</script>
