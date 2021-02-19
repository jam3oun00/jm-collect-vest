<template>
  <div class="col-lg-5 col-md-5">
    <div class="form shadow">
      <h4 class="blue padding_bottom20">Notification Setting</h4>

      <div class="form-group-lg padding_bottom lineheight">
        <label class="switch">
          <input type="checkbox" v-model="formData.in_app_notifications"/>
          <span class="slider round"></span>
        </label>
        In App Notifications
      </div>

      <div class="form-group-lg padding_bottom lineheight">
        <label class="switch">
          <input type="checkbox" v-model="formData.push_notifications"/>
          <span class="slider round"></span>
        </label>
        Push Notification
      </div>

      <div class="form-group-lg padding_bottom lineheight">
        <label class="switch">
          <input type="checkbox" v-model="formData.email_on_login"/>
          <span class="slider round"></span>
        </label>
        Email Login Activity
      </div>

      <div class="form-group-lg padding_bottom lineheight">
        <label class="switch">
          <input type="checkbox" v-model="formData.email_on_transaction">
          <span class="slider round"></span>
        </label> Email Transactions
      </div>
      <div class="form-group-lg padding_bottom lineheight text-center">
        <input type="submit" class="bt-green shadow" value="Update" @click="updateProfile()">
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
            formData() {
                return this.userData;
            },
        },
        methods: {
            updateProfile() {
                this.$axios.$patch('users/profiles', this.formData).then(response => {
                    this.makeToast("success", "Profile Update Successfully");
                }).catch(error => {
                    this.makeToast("danger", error);
                })
            }
        },
    };
</script>

<style scoped>
</style>
