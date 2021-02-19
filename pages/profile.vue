<template>
  <layout id="my_profile">
    <h1 class="blue padding_bottom30" align="center">My Profile</h1>
    <div class="row">
      <div class="container">
        <div class="col-lg-3 col-md-3">
          <div class="user_photo">
            <img
              src="~/assets/images/no-image.png"
              class="img-responsive"
              width="150"
              height="120"
            />
            <a href="#"><i class="fa fa-camera"></i></a>
          </div>
          <div class="blue">
            {{ userData.title }} {{ userData.first_name }}
            {{ userData.surName }}
          </div>
          <div v-if="isVerified" class="verified">
            <i class="fa fa-check-circle"></i> Verified User
          </div>
          <div v-if="!isVerified" class="verified">
            <i class="fa fa-close"></i> User Not Verified
          </div>
        </div>
        <NuxtChild />
        <div class="col-lg-4 col-md-4">
          <div id="account_buttons">
            <div class="button shadow">
              <nuxt-link to="/profile/notfication"
                ><i class="fa fa-bell-o"></i>Notification Settings</nuxt-link
              >
            </div>
            <div class="button shadow">
              <nuxt-link to="/profile/change-password"
                ><i class="fa fa-lock"></i>Change Password</nuxt-link
              >
            </div>
            <div class="button shadow">
              <nuxt-link to="/profile"
                ><i class="fa fa-info-circle"></i>Compliance Info</nuxt-link
              >
            </div>
            <div class="logout" @click="logout()">
              <nuxt-link to="/profile"
                ><i class="fa fa-sign-out"></i> logout</nuxt-link
              >
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
    isVerified() {
      if (this.currentUser) return this.currentUser.user_type === "verified";
      return false;
    },
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
