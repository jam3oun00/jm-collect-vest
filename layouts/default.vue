<template>
  <div>
    <Nuxt/>
  </div>
</template>
<script>
import { loadProgressBar } from 'axios-progress-bar';
    export default {
        async fetch() {
          if(this.$auth.loggedIn){
            let wishList = await this.$axios.$get("users/wishlists");
            let wallet = await this.$axios.$get("users/wallets");
            let currentUser = await this.$axios.$get("current_user");
            //console.log('current user',currentUser)
            this.$store.commit("profile/setCurrentUser", currentUser);
            this.$store.commit("profile/setWishList", wishList);
            this.$store.commit("profile/setWallet", wallet);
          }
        },
        mounted(){
          loadProgressBar();
        }
    }
</script>
<style>
  html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }

  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }
</style>
