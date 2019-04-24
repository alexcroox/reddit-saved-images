<template>
  <div>
    <div class="home">Auth</div>
    <v-button :loading="true">Authorise with reddit.com</v-button>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'

export default {
  name: 'auth',
  components: {
    'v-button': Button
  }
}
</script>
