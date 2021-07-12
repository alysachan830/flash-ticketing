<template>
  <NuxtLink to="/" class="card border-0 mb-10">
    <div class="img-wrap rounded-4 mb-4">
      <img
        :src="image"
        class="hover__filter--darken h-100 w-100 position-absolute"
        alt="hot event"
      />
    </div>
    <div class="card-body">
      <div class="d-flex justify-content-between mb-lg-6 mb-2">
        <div>
          <h5 class="card-title font-lg-m font-base">
            {{ title }}
          </h5>
          <p>
            <span class="font-base material-icons align-text-top me-2">
              calendar_today
            </span>
            {{ dateTimeTemplate }}
          </p>
        </div>
        <a href="#"
          ><span
            class="
              favourite-icon
              material-icons
              font-lg-l font-m
              align-baseline
            "
          >
            bookmark_border
          </span></a
        >
      </div>
      <span class="badge font-lg-s font-xs bg-secondary text-black mb-4">
        {{ tag }}
      </span>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    dateTime: {
      type: [Object, Array],
      required: true,
    },
  },
  data() {
    return {
      dateTimeTemplate: '',
    }
  },
  mounted() {
    if (Array.isArray(this.dateTime)) {
      this.dateTimeTemplate = `${this.dateTime[0].date} - ${
        this.dateTime[this.dateTime.length - 1].date
      }`
    } else {
      this.dateTimeTemplate = `${this.dateTime.start} - ${this.dateTime.end}`
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/all';

.card {
  &:hover {
    color: inherit !important;
  }
}

.img-wrap {
  padding-bottom: 100%;
  overflow: hidden;
  position: relative;

  img {
    transition: transform 0.5s;
    &:hover {
      transform: scale(1.1);
    }
  }
}

.card-body {
  padding: 0 4px;
}

.favourite-icon {
  &:hover {
    color: $primary;
  }
}
</style>
