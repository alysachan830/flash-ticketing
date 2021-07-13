import Vue from 'vue'

export default ({ app }, inject) => {
  inject('bus', new Vue())
}
