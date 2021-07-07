<template>
  <div>{{ event }}</div>
</template>

<script>
export default {
  asyncData({ params }) {
    const event = params.event
    return { event }
  },
}
</script>

<style></style>
