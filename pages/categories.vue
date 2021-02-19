<template>
  <layout id="explore_categories">
    <h2 class="blue" align="center">Explore Categories</h2>
    <div class="row">
      <div class="container">
        <div class="col-lg-12 col-md-12">
          <div class="tabs">
            <ul>
              <li
                :class="{ active: selectAsset == '' }"
                class="col-lg-2 col-xs-3"
              >
                <a @click="setAsset('')">All</a>
              </li>
              <li
                class="padd_left col-lg-2 col-xs-3"
                :class="{ active: asset == selectAsset }"
                v-for="asset in asset_type"
                :key="asset"
              >
                <a @click="setAsset(asset)">{{ asset }}</a>
              </li>
              <!-- <li class="col-lg-2 col-xs-3"><a href="#">ArtVest</a></li>
                  <li class="col-lg-2 col-xs-3"><a href="#">Winevest</a></li> -->
              <div class="search col-lg-3 col-sm-3 col-xs-12">
                <i class="fa fa-search"></i>
                <input
                  v-model="search"
                  name=""
                  type="text"
                  class="searchbox"
                  placeholder="Search"
                />
              </div>
            </ul>

            <div class="clearfix"></div>
          </div>

          <div id="categories">
            <div class="row">
              <div class="">
                <template to="category-tab" v-for="asset in filteredAssets">
                  <div class="col-md-3 col-xs-6" :key="asset.id">
                    <div class="shadow category">
                      <h3>
                        <i
                          v-if="!wishlist.includes(asset.id)"
                          class="fa fa-heart-o"
                          @click="createWishList(asset.id)"
                        ></i>
                        <i
                          v-else
                          @click="destroyWishList(asset.id)"
                          class="fa fa-heart"
                        ></i>
                        {{ asset.name }}
                      </h3>
                      <nuxt-link to="category-tab">
                        <div class="img">
                          <img
                            :src="base_URL + asset.image_links[0]"
                            onerror="this.src = 'http://placehold.it/250x250'"
                            alt="Image"
                          />
                        </div>
                        <div class="price">
                          {{ asset.currency_code }}
                          <strong>{{ asset.unit_price }}</strong>
                        </div>
                      </nuxt-link>
                    </div>
                  </div>
                </template>
                <!-- <NuxtLink to="category-tab">
                      <div class="col-md-3 col-xs-6">
                        <div class="shadow category">
                          <h3><i class="fa fa-heart-o"></i>Audi</h3>
                          <div class="img">
                            <img
                              src="http://placehold.it/250x250"
                              alt="Image"
                            />
                          </div>
                          <div class="price">ZAR <strong>1000.00</strong></div>
                        </div>
                      </div>
                    </NuxtLink> -->
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
  name: "explorore-category",
  data: () => ({ assests: [], selectAsset: "", search: "" }),
  computed: {

    asset_type() {
      let distinctData = [];
      this.assests
        .map((x) => x.asset_type)
        .forEach((x) => {
          if (!distinctData.includes(x)) distinctData.push(x);
        });
      return distinctData;
    },
    filteredAssets() {
      if (this.selectAsset)
        return this.assests.filter((x) => x.asset_type == this.selectAsset);
      else if (this.search)
        return this.assests.filter((x) =>
          x.name.toLowerCase().startsWith(this.search.toLowerCase())
        );
      return this.assests;
    },
    wishlist() {
      return this.$store.state.profile.wishList.map((x) => x.asset_id) || [];
    },
  },
  methods: {
    setAsset(asset) {
      this.selectAsset = asset;
    },
    async createWishList(asset_id) {
      try {
        await this.$axios.$post("wishlists", {
          wishlist: {
            asset_id: asset_id,
          },
        });
        this.makeToast("info", "Wishlist Created");
        this.updateWishList();
      } catch (error) {
        console.log(error);
        this.makeToast("error", "Something went wrong.");
      }
    },

    async destroyWishList(asset_id) {
      try {
        let wishlist = this.$store.state.profile.wishList.find((x) => asset_id);
        await this.$axios.$delete(`wishlists/${wishlist.id}`);
        this.makeToast("info", "Wishlist Deleted");
        this.updateWishList();
      } catch (err) {
        console.log(err);
        this.makeToast("error", "Something went wrong.");
      }
    },
    async updateWishList() {
      let wishList = await this.$axios.$get("users/wishlists");
      this.$store.commit("profile/setWishList", wishList);
    },
  },
  async fetch() {
    this.assests = await this.$axios.$get("assets");
    //console.log("assets", this.assests);
  },
};
</script>

<style scoped>
</style>
