<template>
  <div class="col-lg-10 col-md-10">
    <div class="rightbg" id="verification">
      <!--  <div id="uploading_popup" class="shadow">-->
      <!--        <div align="right">-->
      <!--          <a href="close"><i class="fa fa-close"></i></a></div>-->
      <!--        <div class="drag">Drag File here<br>-->
      <!--          Or <a href="#">Browse</a></div>-->
      <!--        <p><i class="fa fa-file-o"></i> Addressproof.pdf</p>-->
      <!--        <div align="center"><input type="submit" class="bt-green shadow" value="Upload"></div>-->
      <!--      </div>-->
      <b-form ref="form" @submit.stop.prevent="updateProfile()">
        <div>
          <p>
            <input type="button" @click="$emit('skipStep')" class="bt bt-grey shadow ft_right" value="Skip Step">
            All following FICA documentation is required for you to become a verified CV user in line with the
            guidelines outlined in the Financial Intelligence Centre ACT, 38 of 201 (FICA)act.<br>
            <br>
            All Fields are mandatory to get Verified.</p>
          <div class="form-group">
            <label><b>Phone Number</b></label>
            <div class="col-lg-5 col-md-5 padd_0">
              <b-form-input
                id="input-lazy"
                v-model="formData.mobile"
                placeholder="xxx-xxx-xxxx"
                type="text"
              ></b-form-input>
            </div>
            <div class="col-lg-5 col-md-5" v-if="!isVerified && currentUser.user_type !== 'verified'">
              <b-button type="button" @click="SendCodeOnMobileNumber()" class="bt-green shadow"
                        :disabled="!formData.mobile" v-if="!resendCode"
              >Send Code
              </b-button>
              <no-ssr v-if="resendCode">
                <vac :end-time="new Date().getTime() + 60000" @finish="resendCode = false">
                  <span
                    slot="process"
                    slot-scope="{ timeObj }">
                    <b-button type="button" @click="SendCodeOnMobileNumber()" class="bt-green shadow"
                              :disabled="!formData.mobile"
                    >Resend Code  {{timeObj.s}}
                    </b-button>
                  </span>
                </vac>
              </no-ssr>
            </div>
            <div class="col-lg-5 col-md-5 verified" v-if="currentUser.user_type === 'verified'">
              <i class="fa fa-check-circle"></i> Verified User
            </div>
          </div>
          <div class="form-group" v-if="isCodeSend && !isVerified">
            <label><b>Verify Your Mobile Number</b></label>
            <div class="col-lg-5 col-md-5 padd_0">
              <b-form-input
                id="input-lazy"
                v-model="formData.otp"
                type="text"
              ></b-form-input>
            </div>
            <div class="col-lg-5 col-md-5">
              <b-button type="button" @click="VerifyMobileNumber()" :disabled="!formData.otp" class="bt-green shadow"
                        value="Verify">Verify
              </b-button>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-2 col-md-2 padding_right">
              <label><b>Title</b></label>
              <b-form-select
                v-model="formData.title"
                :options="options"
                :state="!!formData.title"
                required
              ></b-form-select>
            </div>
            <div class="col-lg-4 col-md-4  padding_right">
              <label><b>First Name</b></label>
              <b-form-input
                id="input-lazy"
                v-model="formData.firstName"
                :state="!!formData.firstName"
                required
                placeholder="First Name"
                type="text"
              ></b-form-input>
            </div>
            <div class="col-lg-4 col-md-4 padding_right">
              <label><b>Last Name</b></label>
              <b-form-input
                id="input-lazy"
                v-model="formData.surname"
                :state="!!formData.surname"
                required
                placeholder="Last Name"
                type="text"
              ></b-form-input>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-4 col-md-4  padding_right">
              <label><b>Indentification Number</b></label>
              <b-form-input
                id="input-lazy"
                v-model="formData.id_number"
                :state="!!formData.id_number"
                required
                placeholder="Indentification Number"
                type="text"
              ></b-form-input>
            </div>
            <div class="col-lg-3 col-md-3"><br>
              <input id="id_passport" name="file" required ref="fileInput" type="file">
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-5 col-md-5 padding_right"><label><b>Physical Address</b></label>
              <b-form-input
                id="input-lazy"
                v-model="formData.physical_address"
                :state="!!formData.physical_address"
                required
                placeholder="Address Line 1"
                type="text"
              ></b-form-input>
            </div>
            <div class="col-lg-5 col-md-5 padding_right" v-if="isChecked == 'true'">
              <label><b>Postal Address</b></label>
              <b-form-input
                id="input-lazy"
                v-model="formData.physical_address"
                required
                :disabled="true"
                placeholder="Address Line 1"
                type="text"
              ></b-form-input>
            </div>
            <div class="col-lg-5 col-md-5 padding_right" v-if="isChecked == 'false'">
              <label><b>Postal Address</b></label>
              <b-form-input
                id="input-lazy"
                v-model="formData.postalAddress"
                :state="!!formData.postal_address"
                required
                placeholder="Address Line 1"
                type="text"
              ></b-form-input>
            </div>
          </div>
          <div class="form-group terms">
            <b-form-checkbox
              id="checkbox-1"
              v-model="isChecked"
              name="checkbox-1"
              value="true"
              unchecked-value="false"
            >Use this address as Postal Address.
            </b-form-checkbox>
          </div>
          <div class="clearfix" align="right">
            <b-button type="submit" class="bt-blue shadow ft_right" :disabled="loading">
              Next
              <b-spinner small type="grow" v-if="loading"></b-spinner>
            </b-button>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                formState: false,
                isChecked: "false",
                loading: false,
                options: [{value: 'Sir', text: 'Mr'}, {value: 'Mrs', text: 'Mrs'}, {value: 'Miss', text: 'Miss'}],
                resendCode: false,
                isCodeSend: false,
                isVerified: false,
                keys: ['mobile', 'first_name', 'surname', 'id_number', 'physical_address', 'postal_address', 'id_passport', 'title']
            }
        },
        computed: {
            formData() {
                return this.userData || {};
            }
        },
        methods: {
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity();
                this.formState = valid;
                return valid;
            },
            async updateProfile() {
                if (!this.checkFormValidity()) {
                    return;
                }
                try {
                    this.loading = true;
                    if (this.isChecked == 'true')
                        this.formData.postal_address = this.formData.physical_address;

                    let formBuilder = new FormData();
                    let file = document.querySelector('#id_passport');
                    formBuilder.append("profile[id_passport]", file.files[0]);
                    for (let key in this.formData) {
                        if (this.keys.includes(key))
                            formBuilder.append(`profile[${key}]`, this.formData[key])
                    }
                    let response = await this.$axios.$patch("users/profiles", formBuilder, {headers: {'Content-Type': 'multipart/form-data'}});
                    this.makeToast("info", 'Persoanl Info Updated');
                    this.loading = false;
                    this.$emit('redirect');
                } catch (e) {
                    this.makeToast("danger", 'Error');
                    this.loading = false;
                }
            },
            SendCodeOnMobileNumber() {
                try {
                    this.$axios.$post(`/users/mobile_verification`, {
                        user: {mobile_number: this.formData.mobile}
                    }).then(response => {
                        if (response.success) {
                            this.resendCode = true;
                            this.isCodeSend = response.success;
                        }
                    })
                } catch (e) {
                    console.log(e);
                }

            },
            async VerifyMobileNumber() {
                try {
                    let response = await this.$axios.$patch(`/users/mobile_verification`, {
                        user: {otp: this.formData.otp}
                    });
                    this.makeToast("success", response.response);
                    this.resendCode = false;
                    this.isCodeSend = false;
                    this.isVerified = true;

                } catch (e) {
                    this.makeToast("danger", e.response.data.response.mobile_verification_code[0]);
                    console.log(e);
                }
            },
        }

    }
</script>

<style scoped>

</style>
