<template>
  <div class="home">
    <ul>
      <li @click="openPage">上拉加载-下拉刷新</li>
    </ul>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'home',
    components: {},
    methods: {
      openPage() {
        this.$router.push('/scroller')
      }
    }
  }
</script>
