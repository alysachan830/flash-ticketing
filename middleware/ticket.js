export default ({ route, from, redirect }) => {
  // User cannot directly access ticket info page
  if (from === undefined) {
    redirect(`/event/${route.params.eventId}`)
  }
}
