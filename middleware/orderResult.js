export default ({ from, redirect }) => {
  // User cannot directly access order result page
  if (from === undefined) {
    redirect('/')
  }
}
