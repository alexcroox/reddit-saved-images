<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Title msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";

export default {
  name: "home",
  components: {
    Title
  }
};
</script>
