<template>
  <section>
    <Button @click="getInfo">Default</Button>
  </section>
</template>

<script>

export default {
  head () {
    return {
      script: [
        { src: '/p.js', type: 'text/javascript' }
      ]
    }
  },
  mounted () {
  },
  components: {},
  methods: {
    getInfo () {
      this.$store.dispatch('auth/getCurrentUserInfo')
    }
  }
}
</script>

<style>
</style>
