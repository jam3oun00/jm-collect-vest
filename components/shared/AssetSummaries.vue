<template>
  <div>
    <h3 align="left" class="px-4">
      {{
        asset_summaries && asset_summaries[slide] && asset_summaries[slide].name
          ? asset_summaries[slide].name
          : ""
      }}
    </h3>
    <b-carousel
      class="mx-n4"
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      :indicators="false"
      background="transparent"
      img-width="1024"
      img-height="480"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide v-for="(a, i, k) in asset_summaries" :key="k">
        <template #img>
          <div class="px-5 mx-auto d-flex align-items-center justify-content-center" style="height:200px;width:100%">
            <img
              style="width:100%" center
              :src="
                a.image_links[0]
                  ? `http://collectvest-staging.herokuapp.com/${a.image_links[0]}`
                  : getImg('banner.jpg')
              "
              rounded
              fluid-grow
            />
          </div>
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      asset_summaries: []
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    getImg(name) {
      try {
        return require("~/assets/images/" + name);
      } catch (e) {
        return null;
      }
    }
  },
  mounted() {
    this.$axios.$get("asset_summaries").then(d => (this.asset_summaries = d));
  }
};
</script>
