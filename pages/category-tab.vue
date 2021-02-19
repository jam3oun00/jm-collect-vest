<template>
  <layout id="bid">
    <div class="row">
      <div class="container">
        <div class="col-lg-12 col-md-12">
          <div class="form shadow">
            <div class="col-sm-6">
              <h4 class="blue padding_bottom20">Assets Name</h4>
              <a href="#x"
                ><img
                  src="http://placehold.it/500x500"
                  alt="Image"
                  width="200"
                  height="200"
              /></a>
            </div>

            <div class="col-sm-6">
              <div class="price padding_bottom20" align="right">
                ZAR <strong>10000.000</strong>
              </div>

              <div class="tabs">
                <a href="#">Investment Info</a>
                <a href="#" class="active">Graphical Trends</a>
              </div>

              <div
                id="piechart"
                style="margin-left: -100px; float: left; width: 300px"
              ></div>
              <div class="form-group">
                <input
                  name=""
                  type="button"
                  class="bt bt-white"
                  value="View More"
                /><input name="" type="button" class="bt bt-blue" value="BID" />
              </div>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from "../components/shared/layout";

export default {
  name: "category-tab",
  components: { Layout },
};
</script>

<style scoped>
</style>
