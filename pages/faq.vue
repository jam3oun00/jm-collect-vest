<template>
  <layout id="faq">
    <h1 class="blue padding_bottom30" align="center">
      Frequently Asked Questions
    </h1>
    <div class="row">
      <div class="container">
        <div class="col-lg-6 col-md-6">
          <div align="left">
            <input
              type="text"
              value="Search FAQ"
              class="textbox"
              style="
                background: #eeeffd;
                width: 200px;
                border: #aaacc2 solid 1px;
              "
            />
          </div>
          <div class="panel-group" id="accordion">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a
                    class="accordion-toggle"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseOne"
                    >Is account registration required?</a
                  >
                </h4>
              </div>
              <div id="collapseOne" class="panel-collapse collapse in">
                <div class="panel-body">
                  Account registration at <strong>PrepBootstrap</strong> is only
                  required if you will be selling or buying themes. This ensures
                  a valid communication channel for all parties involved in any
                  transactions.
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseTen"
                    >Can I submit my own Bootstrap templates or themes?</a
                  >
                </h4>
              </div>
              <div id="collapseTen" class="panel-collapse collapse">
                <div class="panel-body">
                  A lot of the content of the site has been submitted by the
                  community. Whether it is a commercial element/template/theme
                  or a free one, you are encouraged to contribute. All credits
                  are published along with the resources.
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseEleven"
                    >What is the currency used for all transactions?</a
                  >
                </h4>
              </div>
              <div id="collapseEleven" class="panel-collapse collapse">
                <div class="panel-body">
                  All prices for themes, templates and other items, including
                  each seller's or buyer's account balance are in
                  <strong>USD</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
export default {
  auth: false,
  data() {
    return {};
  },
  mounted() {
    console.log("base url ", process.env.baseUrl);
  },
};
</script>
