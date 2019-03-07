<template>
  <section class="resource-process" v-if="duration">
    <span class="resource-url">{{url}}</span>
    <div class="resource-process-body">
      <Tooltip :content="`block time ${block}`" placement="top" class="process-block" :style="{width: blockWidth}" />
      <Tooltip :content="`wait time ${wait}`" placement="top" class="process-wait" :style="{width: waitWidth}" />
      <Tooltip :content="`download time ${download}`" placement="top" class="process-download" :style="{width: downloadWidth}" />
    </div>
    <span class="resource-duration">{{duration}}</span>
  </section>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    url: '',
    block: 0,
    wait: 0,
    download: 0,
    duration: 0
  },
  computed: {
    blockWidth () {
      return this.duration === 0 ? 0 : `${this.block * 100 / this.duration}%`
    },
    waitWidth () {
      return this.duration === 0 ? 0 : `${this.wait * 100 / this.duration}%`
    },
    downloadWidth () {
      return this.duration === 0 ? 0 : `${this.download * 100 / this.duration}%`
    }
  }
}
</script>
<style lang="less">
  .resource-process{
    width: 100%;
    height: 60px;
    .resource-process-body {
      width: 50%;
      display: inline-block;
      vertical-align: middle;
      .process-block {
        background: #e5e5e5;
      }
      .process-wait {
        background: #00c854;
      }
      .process-download {
        background: #04a9f4;
      }
      .process-block, .process-wait, .process-download {
        height: 30px;
        display: inline-block;
        float: left;
      }
    }
    .resource-url{
      display: inline-block;
      vertical-align: middle;
      width: 20%;
      word-break: break-all;
    }
    .resource-duration{
      display: inline-block;
      vertical-align: middle;
      margin-left: 10px;
    }
  }
</style>
