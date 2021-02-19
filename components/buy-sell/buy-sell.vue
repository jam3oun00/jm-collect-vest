<template>
  <div>
    <h3 class="blue padding">You are about to {{text}} 200 ZAR which is 0.3% percentage ownership.</h3>
    <p class="blue padding">I have read and agreed with
      <nuxt-link to="/terms">
        <a>Terms and Conditions</a>
      </nuxt-link> &nbsp;of
      CollectVest
    </p>
    <div>
      <div class="form-group" align="center">
        <input name="" type="button" :class="isBuy ? 'shadow buy' : 'sell shadow'" @click="buyOrSell()"
               :value="text"></div>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            isBuy: {
                required: true,
                default: true
            },
            text: {
                required: true,
                default: 'Buy'
            }
        },
        methods: {
            buyOrSell() {
                this.$emit('buyOrSell');
            }
        }
    }
</script>

<style scoped>
</style>
