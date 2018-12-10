<template>
  <Card class="url-average-detail-card">
    <div>
      <h3>{{title}}</h3>
      <p>
        {{value}}ms
      </p>
    </div>
  </Card>
</template>
<script>
export default {
  name: 'DetailCard',
  data () {
    return {
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    value: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="less">
  .url-average-detail-card{
    text-align: center;
  }
</style>
