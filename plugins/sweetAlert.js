import Swal from 'sweetalert2'

export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('showError', (msg) => {
    Swal.fire({
      title: msg,
      // text: 'Do you want to continue',
      icon: 'error',
      // showConfirmButton: false,
      confirmButtonText: '關閉',
    })
  })
}
