import Vue from "vue";

if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true;
  Vue.mixin({
    computed: {
      base_URL(){
        return process.env.baseUrl;
      },
      wallet(){
        return this.$store.state.profile.wallet||{};
      },
      userData() {
        return this.$auth.user || {};
      },
      currentUser() {
        return this.$store.state.profile.currentUser||{};
      }
    },
    methods: {
      goBack(){
        this.$router.back() ;
      },
      makeToast(variant = null, message) {
        this.$bvToast.toast(message, {
          title: `${variant || "default"}`,
          variant: variant,
          toaster:'b-toaster-bottom-center',
          solid: true
        });
      }
    }
  }); // Set up your mixin then
}
