import TinyURL from 'tinyurl'

export default {
  data() {
    return {
      optimizedUrl: '',
    }
  },
  methods: {
    optimizeImg(url, width) {
      TinyURL.shorten(url).then(
        (res) => {
          this.optimizedUrl = this.$cloudinary.image.fetchRemote(res, {
            crop: 'scale',
            width,
          })
        },
        // If TinyURL fails, return the original image url
        () => {
          return url
        }
      )
    },
  },
}
