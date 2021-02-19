<template>
  <layout id="verification">
    <div class="rightbg" id="verification">
      <form>
        <div>
          <div>
            <h1 class="blue padding_bottom">
              Welcome, {{ (this.$auth.user || {}).first_name }}!
            </h1>
          </div>

          <div class="col-lg-7 col-md-7 padd_0 blue">
            <div class="row">
              <!-- <div class="col-lg-3 col-md-3 padd_0 blue">
                <img
                  src="~/assets/images/no-image.png"
                  class="img-responsive"
                  width="150"
                  height="120"
                />
              </div> -->
              <div class="col-lg-9 col-md-9 blue">
                You are seeing this page as an unverified Collectvest user. For
                now, we are reviewing the documents you sent us as fast as we
                can. You can check the progress anytime in the STATUS
                section.<br />
                <br />

                <table
                  v-if="!isVerified"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  width="100%"
                >
                  <tr>
                    <td>
                      Click the button below inorder to continue the
                      verification process.
                    </td>
                    <td width="80">
                      <nuxt-link to="personal-info">
                        <input
                          name=""
                          type="button"
                          class="bt bt-blue ft_left"
                          value="Get Verified"
                        />
                      </nuxt-link>
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <div class="row padd_top_30">
              Until you get verified, you can still browse and view listings,
              add them to your wishlist and monitor the activity. You will not
              be able to bid or sell.
            </div>

            <div class="row">
              <div class="col-md-11 whitebg sliders">
                <h4>Explore Categories</h4>
                <div id="myCarousel" class="carousel slide">
                  <!-- Carousel items -->
                  <div class="carousel-inner">
                    <div
                      class="item"
                      :class="index === 0 ? 'active' : ''"
                      v-for="(items, index) in templates"
                      :key="index"
                    >
                      <div class="row">
                        <div
                          class="col-sm-3"
                          v-for="asset in items"
                          :key="asset.id"
                        >
                          <a href="#x"
                            ><img
                              :src="base_URL + asset.image_links[0]"
                              onerror="this.src = 'http://placehold.it/250x250'"
                              alt="Image"
                              class="img-responsive"
                          /></a>
                          {{ asset.name }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--/carousel-inner-->
                  <a
                    class="left carousel-control"
                    href="#myCarousel"
                    data-slide="prev"
                    >‹</a
                  >
                  <a
                    class="right carousel-control"
                    href="#myCarousel"
                    data-slide="next"
                    >›</a
                  >
                </div>
                <!--/well-->
              </div>
            </div>
          </div>

          <div class="col-lg-5 col-md-5 blue">
            <div id="dashboard_menu">
              <ul>
                <li class="shadow" v-if="!isVerified">
                  <img src="~/assets/images/ic1.png" width="32"  />
                  <span>STATUS</span>
                </li>
                <li class="shadow">
                  <img src="~/assets/images/ic2.png" width="32" />
                  <span>Wishlist</span>
                </li>
                <li class="shadow" v-if="isVerified">
                  <img src="~/assets/images/status.png" width="32" />
                  <span>Status</span>
                </li>
              </ul>

              <div class="clearfix"></div>
            </div>

            <div id="document_list" class="shadow">
              <div align="right"><i class="fa fa-close grey"></i></div>
              <h5>
                <strong>We have received the following from you.</strong><br />
                <br />
              </h5>

              <div class="list">
                <i class="fa fa-close"></i>Identification Card
              </div>
              <div class="list">
                <i class="fa fa-check-circle-o"></i>Address Proof
              </div>
              <div class="list">
                <i class="fa fa-check-circle-o"></i>Address of account
              </div>
              <div class="list">
                <i class="fa fa-check-circle-o"></i>Tax Clearance Certificate
              </div>
              <div class="list">
                <i class="fa fa-check-circle-o"></i>Identification Card
              </div>
            </div>

            <div id="assets" class="shadow blue">
              <h2>
                Latest Requests
                <p>
                  This is a preview. After you get verified, Your own requests
                  will be shown up here.
                </p>
              </h2>

              <ul>
                <li class="shadow">
                  <div class="col-lg-3 padd_0">
                    <img
                      src="http://placehold.it/250x250"
                      alt="Image"
                      class="img"
                    />
                  </div>
                  <div class="col-lg-9">
                    <h4>Assets Name</h4>
                    <div class="blue">
                      <i class="fa fa-check-circle-o"></i> Successfull
                    </div>
                  </div>
                  <div class="clearfix"></div>
                </li>

                <li class="shadow">
                  <div class="col-lg-3 padd_0">
                    <img
                      src="http://placehold.it/250x250"
                      alt="Image"
                      class="img"
                    />
                  </div>
                  <div class="col-lg-9">
                    <h4>Assets Name</h4>
                    <div class="blue">
                      <i class="fa fa-check-circle-o"></i> Successfull
                    </div>
                  </div>
                  <div class="clearfix"></div>
                </li>

                <li class="shadow">
                  <div class="col-lg-3 padd_0">
                    <img
                      src="http://placehold.it/250x250"
                      alt="Image"
                      class="img"
                    />
                  </div>
                  <div class="col-lg-9">
                    <h4>Assets Name</h4>
                    <div class="blue">
                      <i class="fa fa-check-circle-o"></i> Successfull
                    </div>
                  </div>
                  <div class="clearfix"></div>
                </li>
              </ul>
            </div>
          </div>
          <br />
          <br />
        </div>
      </form>
    </div>
  </layout>
</template>

<script>
export default {
  data() {
    return {
      assetSummaries: [],
      templates: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.profile.currentUser || {};
    },
    isVerified() {
      return this.currentUser.user_type === "verified";
    },
  },
  methods: {
    async getAssetSummaries() {
      this.assetSummaries = await this.$axios.$get("asset_summaries");
      let templates = this.assetSummaries || [];
      let counter = 1;
      let pairLength = 4;
      let templatePairs = [];
      templates.forEach((item) => {
        templatePairs.push(item);
        if (counter === pairLength) {
          this.templates.push(templatePairs);
          templatePairs = [];
          counter = 0;
        }
        counter++;
      });
      if (templatePairs.length) {
        this.templates.push(templatePairs);
      }
      //console.log(this.templates);
    },
  },
  mounted() {
    //console.log("url", process.env.baseResourceUrl);
    //console.log("url", process.env.baseUrl);
    this.getAssetSummaries();
  },
};
</script>
