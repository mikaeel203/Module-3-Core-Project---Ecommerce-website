<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import Header from '@/components/HeaderComp.vue';
import Footer from '@/components/FooterComp.vue';

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
/* Global styles */
</style>