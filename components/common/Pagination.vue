<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="turnPage(currentPage - 1)"
        >
          <span class="material-icons font-m"> chevron_left </span>
        </a>
      </li>
      <li
        v-for="n in totalPages"
        :key="n"
        class="page-item"
        :class="{ active: n === currentPage }"
      >
        <a class="page-link" href="#" @click.prevent="turnPage(n)"> {{ n }} </a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="turnPage(currentPage + 1)"
        >
          <span class="material-icons font-m"> chevron_right </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  methods: {
    turnPage(pageNum) {
      if (pageNum > this.totalPages || pageNum < 1) return
      this.currentPage = pageNum
      window.scrollTo(0, 500)
      this.$nuxt.$emit('clickPageNum', pageNum)
    },
  },
}
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
