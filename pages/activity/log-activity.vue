<template>
  <div class="form shadow" id="table">
    <table class="table table-condensed table-responsive">
      <tbody>
        <tr v-for="(item, index) in loginActivities" :key="index">
          <td width="30%">{{ item.operating_system || "-" }}</td>
          <td width="30%">{{ item.mac_address || "-" }}</td>
          <td width="30%">{{ item.ip_address }}</td>
          <td>{{ item.created_at }}</td>
        </tr>
      </tbody>
    </table>

    <div class="clearfix"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    search() {
      return this.$store.state.activity.search;
    },
    loginActivities() {
      // console.log(this.search != '')
      if (this.search != '')
        return (this.$store.state.activity.activityLog || []).filter(
          (x) =>
            (x.operating_system || "").startsWith(this.search) ||
            (x.mac_address || "").startsWith(this.search) ||
            (x.ip_address || "").startsWith(this.search)
        );
     return this.$store.state.activity.activityLog;
    },
  },
  methods: {
    async getUserLoginActivities() {
      try {
        let response = await this.$axios.$get("users/login_activities");
        this.$store.commit("activity/setActivityLogs", response);
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.getUserLoginActivities();
  },
};
</script>
