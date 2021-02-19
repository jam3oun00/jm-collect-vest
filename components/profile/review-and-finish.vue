<template>
  <div class="col-lg-10 col-md-10" id="">
    <div class="rightbg" id="verification">
      <form>
        <div>
          <div>
            <h3 class="blue">Your documentation is in review!</h3>
          </div>
          <div class="col-lg-7 col-md-7 padd_0 blue"><br>
            <br>

            We have recieved a part of the necessary documentation from you and it's currently
            in review. You can check your progress any time by logging onto the site. In order
            to become a verified user, you need to upload all of the necessary documents. <br>
            <br>
            <br>

            In the meantime, you can browse the platform as an unverified users, which means you
            can view all listings, add them to your wishlist and monitor the activity, but you
            won't be able to bid, buy or sell. <br>
            <br>

            We look forward to welcoming you on board soon!
          </div>
          <div class="col-lg-5 col-md-5 blue">
            <div id="document_list" class="shadow">
              <h5><strong>We have received the following from you.</strong><br>
                <br>
              </h5>

              <div class="list"><i class="fa fa-close"></i>Identification Card</div>
              <div class="list"><i class="fa fa-check-circle-o"></i>Address Proof</div>
              <div class="list"><i class="fa fa-check-circle-o"></i>Address of account</div>
              <div class="list"><i class="fa fa-check-circle-o"></i>Tax Clearance Certificate
              </div>
              <div class="list"><i class="fa fa-check-circle-o"></i>Identification Card</div>
            </div>
          </div>
          <br>
          <br>
          <div class="form-group padd_0"><br>
            <br>
            <input @click="$emit('prev')" type="submit" class="bt-white shadow ft_left mar_0" value="Previous">
            <nuxt-link to="/">
              <input type="submit" class="bt-blue shadow ft_right" value="Next"><br>
            </nuxt-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "review-and-finish"
    }
</script>

<style scoped>

</style>
