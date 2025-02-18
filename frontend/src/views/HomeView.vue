<template>
  <div class="home">
    <HomepageComp/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomepageComp from '@/components/HomepageComp.vue'

export default {
  name: 'HomeView',
  components: {
    HomepageComp
  }
}
</script>
