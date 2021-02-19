<template>
  <div class="col-lg-10 col-md-10 col-sm-10">
    <div class="rightbg" id="verification">
      <b-form ref="form" @submit.stop.prevent="updateProfile()">
        <div>
          <p><input @click="$emit('skipStep')" type="button" class="bt bt-grey shadow ft_right" value="Skip Step">We
            would like to get to know you
            bit better. All is Optional.<br></p>
          <div class="ratings">
            <h4>What is your investment Experience?</h4>
            <ul>
              <li v-for="i in 10">
                <i :class="{active:i <= formData.investment_experience}"
                   @click="setPoints(i, 'investment_experience')">{{i}}</i>
                <span v-if="i === 1">very Low</span>
                <span v-if="i === 10">very High</span>
              </li>
            </ul>
          </div>
          <div class="ratings">
            <h4>What is your investment Knowledge?</h4>
            <ul>
              <li v-for="i in 10">
                <i :class="{active:i <= formData.investment_knowledge}"
                   @click="setPoints(i, 'investment_knowledge')">{{i}}</i>
                <span v-if="i === 1">very Low</span>
                <span v-if="i === 10">very High</span>
              </li>
            </ul>
          </div>
          <div class="ratings padd_0">
            <h4>What are your personal goals?</h4>
            <b-form-checkbox-group
              value="formData.personal_goals"
              @change="updateGoals"
            >
              <b-form-checkbox value="Save Money">Save Money</b-form-checkbox>
              <b-form-checkbox value="Invest">Investment</b-form-checkbox>
              <b-form-checkbox value="Learn about trading">Learn about trading</b-form-checkbox>
            </b-form-checkbox-group>
            <!--            <input @input="updateInput" type="checkbox" value="Save Money" name="remember">&nbsp;Save Money-->
            <!--            <input @input="updateInput" type="checkbox" value="Invest" name="remember">&nbsp;Investment-->
            <!--            <input @input="updateInput" type="checkbox" value="Learn about trading" name="remember">&nbsp;Learn-->
            <!--            More-->
          </div>
          <br>
          <br>
          <div class="form-group">
            <div class="col-lg-5 col-md-5 padding_right">
              <label><b>What is your employement Status?</b></label>
              <b-form-select
                v-model="formData.employement_status"
                :options="employeeStatus"
                :state="!!formData.employement_status"
                required
              ></b-form-select>
            </div>
            <div class="col-lg-5 col-md-5  padding_right">
              <label><b>How many dependendts do you have?</b></label>
              <b-form-select
                v-model="formData.dependants"
                :options="dependants"
                :state="!!formData.dependants"
                required
              ></b-form-select>
            </div>
          </div>
          <div class="form-group padd_0"><br>
            <br>
            <input @click="$emit('prev')" type="submit" class="bt-white shadow ft_left mar_0" value="Previous">
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
                loading: false,
                employeeStatus: [
                    {value: 'student', text: 'Student'},
                    {value: 'unemployed', text: 'Un Employed'},
                    {value: 'self_employed', text: 'Self Employed'},
                    {value: 'employed', text: 'Employed'},
                    {value: 'retired', text: 'Retired'},
                ],
                dependants: [
                    {value: 'zero', text: '0'},
                    {value: 'one', text: '1'},
                    {value: 'two', text: '2'},
                    {value: 'three', text: '3'},
                    {value: 'four_or_more', text: '4+'},
                ],
                keys: ['investment_experience', 'investment_knowledge', 'dependants', 'personal_goals', 'employement_status']
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
            setPoints(points, name) {
                this.formData[name] = points;
                this.$forceUpdate();
            },
            async updateProfile() {
                console.log(this.formData.personal_goals)
                if (!this.checkFormValidity()) {
                    return;
                }
                try {
                    this.loading = true;
                    let formBuilder = new FormData();
                    for (let key in this.formData) {
                        if (this.keys.includes(key))
                            formBuilder.append(`profile[${key}]`, this.formData[key])
                    }
                    let response = await this.$axios.$patch("users/profiles", formBuilder);
                    this.makeToast("info", 'Optional Information Updated');
                    this.loading = false;
                    this.$emit('redirect');
                } catch (e) {
                    this.makeToast("danger", e.response.data.error);
                    this.loading = false;
                }
            },
            updateGoals(event) {
                this.formData.personal_goals = event;
                this.$forceUpdate();
            },
        },
        mounted() {
        }
    }
</script>

