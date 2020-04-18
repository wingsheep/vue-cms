<template>
  <div class="mavonEditor">
    <mavon-editor v-model="value" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>
