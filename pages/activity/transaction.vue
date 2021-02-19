<template>
  <div class="form shadow" id="table">
    <table class="table table-condensed table-responsive">
      <tbody>
        <tr v-for="(item, index) in transactions" :key="index">
          <td width="20%">{{ item.asset_id }}</td>
          <td width="10%" class="price">{{ item.amount }}</td>
          <td width="10%">{{ item.transaction_type }}</td>
          <td width="10%" class="price">{{ item.unit_price }}</td>
          <td width="10%" class="price">{{ item.units }}</td>
          <td width="20%" class="price">{{ item.status }}</td>
          <td>{{ item.created_at | formatDate }}</td>
        </tr>
      </tbody>
    </table>
    <div class="clearfix"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    search() {
      return this.$store.state.activity.search;
    },
    transactions() {
      if (this.search != '')
        return (this.$store.state.activity.transactions || []).filter(
          (x) =>
            (x.transaction_type || "").startsWith(this.search) ||
            (x.asset_id || "").startsWith(this.search) ||
            (x.status || "").startsWith(this.search)
        );
     return this.$store.state.activity.transactions;
    },
  },
  methods: {
    async getUserTransactions() {
      try {
        let response = await this.$axios.$get("users/transactions?start_date=2020/06/06");
        this.$store.commit("activity/setTransactions", response);
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.getUserTransactions();
  },
};
</script>
