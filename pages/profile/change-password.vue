<template>
  <div class="col-lg-5 col-md-5">
    <div class="form shadow">
      <h4 class="blue padding_bottom20">Change password</h4>
      <b-form ref="form">
        <div class="form-group-lg">
          <label>Current Password</label>
          <b-form-input
            v-model="formData.current_password"
            type="text"
            :state="!!formData.current_password"
            class="textbox"
            required
            placeholder="Enter old password here"
          >
          </b-form-input>
        </div>

        <div class="form-group-lg">
          <label>Password</label>
          <b-form-input
            v-model="formData.new_password"
            type="text"
            :state="!!formData.new_password"
            class="textbox"
            required
            placeholder="Enter New password"
          >
          </b-form-input>
        </div>

        <div class="form-group-lg">
          <label>Confirm New Password</label>
          <b-form-input
            v-model="formData.confirm_password"
            type="text"
            required
            :state="formData.confirm_password == formData.new_password"

            placeholder="Enter Current password here"
          >
          </b-form-input>
        </div>

        <div class="form-group-lg">
          <b-button @click="changePassword" type="button" class="bt-blue shadow" :disabled="loading">
              Change
              <b-spinner small type="grow" v-if="loading"></b-spinner>
            </b-button>
          <!-- <input
            name=""
            type="button"
            @click="changePassword"
            value="Change"
            class="bt bt-blue"
          /> -->
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading:false,
    state: null,
    formData: { email: "", current_password: "", new_password: "" },
  }),
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.state = valid;
      return valid;
    },
    async changePassword() {
      //debugger
       if (!this.checkFormValidity()) {
        return;
      }
      if (this.formData.new_password && this.formData.new_password == this.formData.confirm_password) {
        try{
        this.formData.email = this.currentUser.email;
        this.loading= true;
        let response =await this.$axios.$patch("users/change_password", { user: this.formData });
        this.loading= false;
        this.makeToast("success", response.message);
        }catch(err){
          this.loading= false;
          this.makeToast("danger", 'Something went wrong.');
        }
      } else {
        this.makeToast("danger", "Please match passord");
      }
    },
  },
};
</script>
