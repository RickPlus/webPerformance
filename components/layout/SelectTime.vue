<template>
  <div class="select-time-buttons">
    <Button :type="current === +index ? 'primary' : 'default' " v-for="(item, index) in Time" :key="index" @click="changeTime(+index)">{{item.name}}</Button>
  </div>
</template>
<script>
import Time from '@/utils/server/esum/Time'

export default {
  name: 'SelectTime',
  props: {
    current: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      Time
    }
  },
  methods: {
    changeTime (index) {
      this.$emit('changeTime', index)
    }
  }
}
</script>
<style lang="less">
.select-time-buttons{
  margin-bottom: 10px;
  button {
    margin: 2px;
  }
}
</style>
