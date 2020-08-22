<template>
  <div>
    <p class="alert alert-danger shadow-lg">{{ errorMsg }}</p>
  </div>
</template>

<script>
export default {
  name: 'ErrorNotification',
  props: ['errorMsg'],
  data() {
    return {}
  }
}
</script>
