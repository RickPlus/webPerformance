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
        { src: '/p.js', type: 'text/javascript', crossorigin: true }
      ]
    }
  },
  mounted () {
  },
  components: {},
  methods: {
    getInfo () {
      this.$axios.post('/open/monitor', { a: 1, b: 2 })
    }
  }
}
</script>

<style>
</style>
