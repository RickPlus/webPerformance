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
      window.JsonP('/open/jsonp', { a: 1, b: 2 }, { param: 'callback' }, (err, rs) => {
        if (err) {
          console.log(err)
        }
        console.log(rs)
      })
    }
  }
}
</script>

<style>
</style>
