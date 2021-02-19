<template>
  <layout id="support">
    <div class="col-lg-6 col-md-6 col-xs-12">
      <h2 class="blue" align="center">How can we help you?</h2>
      <div class="row">
        <div class="form shadow" v-if="!addTicket">
          <h1 style="cursor: pointer">
            <i class="fa fa-plus" @click="addTicket = !addTicket"></i>Opened
            tickets
          </h1>
          <table
            border="0"
            cellspacing="0"
            cellpadding="0"
            class="table table-responsive"
          >
            <tr v-for="(item, index) in tickets" :key="index">
              <td width="20%" align="left">{{ item.id }}</td>
              <td width="30%" align="left">{{ item.properties.content }}</td>
              <td align="right">
                <strong>In Progress</strong>
                <span>{{ item.properties.createdate | formatDate }}</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="form shadow" v-if="addTicket">
          <h1 style="cursor: pointer">
            <i class="fa fa-close" @click="addTicket = !addTicket"></i>Open a
            Ticket
          </h1>
          <div class="form-group">
            <label>Ticket Name</label>
            <input
              v-model="formData.subject"
              name=""
              type="text"
              class="textbox"
              placeholder="Enter ticket name here..."
            />
          </div>
          <div class="form-group">
            <label>Ticket Description</label>
            <textarea
              name=""
              v-model="formData.content"
              type="text"
              class="textbox"
              placeholder="Enter your description about your problem..."
              rows="4"
            ></textarea>
          </div>
          <div align="left">
            <input v-if="!loading" @click="addTickets" name="" type="button" value="Submit" class="bt-blue" />
              <input disabled v-if="loading" @click="addTickets" name="" type="button" value="Submit" class="bt-blue" />
              <b-spinner small type="grow" v-if="loading"></b-spinner>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-md-6 col-xs-12">
      <h2 class="blue" align="center">App Feedback</h2>
      <div class="row">
        <div class="container">
          <div class="form shadow">
            <h1>
              We are constantly trying to make our app better for our customers!
              Rate your experience to help us get better.
            </h1>
            <div class="progress_bar">
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 75%"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div class="p_bar" style="margin-left: 75%"></div>
            </div>
            <div class="form-group">
              <label>Your Feedback</label>
              <textarea
                name=""
                type="text"
                class="textbox"
                placeholder="Enter your feedback here..."
                rows="4"
              ></textarea>
            </div>

            <div align="left">
              <input  name="" type="button" value="Submit" class="bt-blue" />

            </div>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
export default {
  name: "support",
  data: () => ({
    addTicket: false,
    tickets: [],
    formData: {},
    loading:false,
  }),
  methods: {
    async addTickets() {
      try {
        if(!(this.formData.subject && this.formData.content)) {
          this.makeToast('success','Please fill the form.');
          return ;
        }
        this.loading =true;
        let response =await this.$axios.$post("create_ticket", this.formData);
        this.formData ={};
        this.addTicket= false;
        this.getAllOpenedTickets();
        this.loading =false;
        this.makeToast('success','Ticket Added');
      } catch (err) {
        this.loading =false;
        this.makeToast('danger','Something went wrong.');
      }
    },
    getAllOpenedTickets() {
      try {
        this.$axios.$get("tickets").then((response) => {
          this.tickets = (JSON.parse(response.response) || {}).results || [];
          //console.log('tickets', this.tickets);
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.getAllOpenedTickets();
  },
};
</script>

<style scoped>
</style>
