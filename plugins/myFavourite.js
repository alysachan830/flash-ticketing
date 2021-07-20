function deleteFavourite(id) {
  const items = JSON.parse(localStorage.getItem('flashTicketing'))
  const deleteIdx = items.indexOf(id)
  items.splice(deleteIdx, 1)
  const newItems = JSON.stringify(items)
  localStorage.setItem('flashTicketing', newItems)
}

export default ({ app }, inject) => {
  // Get favourite
  inject('getFavourite', () => {
    const items = localStorage.getItem('flashTicketing')
    if (!items) {
      // if items is empty, items will be null
      // Here we manually set it to an empty array and return it
      return []
    }
    return JSON.parse(items)
  })

  // Add favourite
  inject('addFavourite', (id) => {
    // User has not saved any favourite item before
    if (localStorage.getItem('flashTicketing') === null) {
      const item = JSON.stringify([id])
      localStorage.setItem('flashTicketing', item)
      // User has saved favourite item before
    } else {
      const items = JSON.parse(localStorage.getItem('flashTicketing'))
      // Delete item
      if (items.includes(id)) {
        deleteFavourite(id)
        return
      }
      const newItems = JSON.stringify([...items, id])
      localStorage.setItem('flashTicketing', newItems)
    }
  })

  // Delete favourite
  inject('deleteFavourite', (id) => deleteFavourite(id))
}
