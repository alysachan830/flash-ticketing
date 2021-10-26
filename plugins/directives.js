import Vue from 'vue'
import TinyURL from 'tinyurl'

Vue.directive('img', (el, binding, vnode) => {
  const vm = vnode.context.$root
  const [type, width] = binding.arg.split(',')
  TinyURL.shorten(binding.value).then(
    (res) => {
      const resultUrl = vm.$cloudinary.image.fetchRemote(res, {
        crop: 'scale',
        width: Number(width),
      })
      if (type === 'bg') {
        el.style = `background-image: url('${resultUrl}')`
      } else {
        el.src = resultUrl
      }
    },
    // If TinyURL fails, return the original image url
    () => {
      if (type === 'bg') {
        el.style = `background-image: url('${binding.value}')`
      } else {
        el.src = binding.value
      }
    }
  )
})
