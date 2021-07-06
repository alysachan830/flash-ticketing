<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span class="material-icons font-m"> chevron_left </span>
        </a>
      </li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item active"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span class="material-icons font-m"> chevron_right </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/all';

.page-link {
  border: 0;
  color: #000;
}

.page-item.active .page-link {
  color: $primary;
  background: none;
  border-bottom: 2px solid $primary;
}
</style>
