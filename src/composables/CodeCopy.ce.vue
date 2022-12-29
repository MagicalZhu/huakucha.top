<template>
  <div>
    <!--TODO add slot?
    <span  class="copyBtn" @click="copy" ref="copyButton" data-clipboard-text="test">
      {{copyMsg}}
    </span>
    -->
    <span class="i-carbon:idea" hidden/>
    <span class="i-carbon:information" hidden/>
    <span class="i-carbon:warning-alt" hidden/>
    <span class="i-carbon:fire" hidden/>
    <span class="codeLang">
      {{lang}}
    </span>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
  export default {
    props: {
      lang: String
    },
    data() {
      return {
        copyMsg: 'copy',
        clipboard: null
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.clipboard = new Clipboard(this.$refs['copyButton'])
      })
    },
    methods: {
      copy() {
        const _this = this
        this.clipboard = new Clipboard(this.$refs['copyButton'])
        this.clipboard.on('success', (e) =>{
          _this.copyMsg = 'copied'
          setTimeout(() => {
            _this.copyMsg =  'copy'
          }, 2000)
          e.clearSelection()
          _this.clipboard.destroy()
        })
      }
    }
  }
</script>

<style scoped>
.codeLang {
  @apply float-right text-gray-300 dark:text-gray-500 text-base items-baseline mr-2;
  font-weight: normal;
}
.copyBtn {
  @apply float-right text-gray-300 dark:text-gray-500 text-base items-baseline cursor-pointer;
  @apply dark:border-gray-600 dark:text-gray-400 dark:bg-gray-800 hover:text-blue-700 dark:hover:text-white
}

</style>
