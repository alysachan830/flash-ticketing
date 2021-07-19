export default ({ from, redirect }) => {
  // User cannot directly access order form page
  if (from === undefined) {
    redirect('/')
  }
}
