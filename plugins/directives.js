import Vue from 'vue'
import TinyURL from 'tinyurl'

Vue.directive('img', async (el, binding, vnode) => {
  const vm = vnode.context.$root
  const [type, width] = binding.arg.split(',')

  const shorten = (url) =>
    TinyURL.shorten(url)
      .then((res) => res)
      .catch(() => url) // return the original url if tinyURL fails

  const url = await shorten(binding.value)

  const resultUrl = vm.$cloudinary.image.fetchRemote(url, {
    crop: 'scale',
    width: Number(width),
  })

  if (type === 'bg') {
    el.style = `background-image: url('${resultUrl}')`
  } else {
    el.src = resultUrl
  }
})
