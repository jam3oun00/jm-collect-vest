<template>
  <div class="col-lg-5 col-md-5">
    <div class="form shadow" id="profile_info">
      <h4 class="blue padding_bottom20">Profile Setting</h4>
      <div class="form-group-lg padding_bottom">
        <label><i class="fa fa-edit"></i>Full Name <span>{{userData.title}} {{userData.first_name}}{{userData.surName}}</span></label>
        <label><i class="fa fa-edit"></i>Email <span>{{currentUser.email}}</span></label>
        <label><i class="fa fa-edit"></i>Mobile <span>{{userData.mobile}}</span></label>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        computed: {
            userData() {
                return this.$auth.user || {}
            },
            currentUser(){return this.$store.state.profile.currentUser;}
        },
        methods: {
            async logout() {
                await this.$auth.logout();
            }
        },
        mounted(){
        }
    }
</script>
<style scoped>

</style>
