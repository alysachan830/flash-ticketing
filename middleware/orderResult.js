export default ({ route, from, redirect }) => {
  // User cannot directly access order result page
  if (from === undefined || from.path !== '/checkout/form') {
    redirect('/')
  }
}
