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

  inject('showSuccess', (msg) => {
    Swal.fire({
      title: msg,
      icon: 'success',
      confirmButtonText: '關閉',
    })
  })

  inject('showConfirm', (msg) => {
    return Swal.fire({
      title: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5818d0',
      cancelButtonColor: '#adb5bd',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    }).then((result) => result.isConfirmed)
  })
}
