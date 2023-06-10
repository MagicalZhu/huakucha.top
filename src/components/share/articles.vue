<script setup lang="ts">
  import  { CS_Basic, FE_Tech }  from '~/assets/data/articleData'
  import { queryInStringArray, slug } from '~/utils/index'
  import  { Article } from 'share'
  import debounce from 'lodash/debounce'

  const pageData:{[propName:string]:Article[]} = {
    CS_Basic,
    FE_Tech
  }

  const ArticleData = ref(pageData || {})

  const props = defineProps<{
    searchKey: string
  }>()

  watch(() => props.searchKey, (newVal, oldVal) => {
    query()
  })

  const query = debounce(() => {
    if (props.searchKey.trim() === '' || Object.keys(ArticleData).length === 0) {
      ArticleData.value = pageData
    } else {
      const result:{[propName:string]:Article[]} = {}
      Object.keys(pageData).filter((item: string) => {
        const tmp = pageData[item].filter((ele:Article) => {
          if(ele.title.toLowerCase().indexOf(props.searchKey.toLowerCase()) > -1 ||
            queryInStringArray(ele.articleTypes ,props.searchKey).length > 0) {
            return true
          }
          return false
        })
        if (tmp.length > 0) {
          result[item] = tmp
        }
      })
      ArticleData.value = result
    }
  }, 300)

</script>
<template>
  <div class="overflow-hidden">
    <template v-if="Object.keys(ArticleData).length!==0">
      <div v-for="item in Object.keys(ArticleData)">
        <div pb-1 class="mx-auto w-4/5">
          <!-- <h1 font-extrabold text-base>{{ item }}</h1> -->
          <Badge type="gray">
            <template #content>
              <span font-extrabold>{{ $t(`theme.fav.${item}`) }}</span>
            </template>
          </Badge>
        </div>
        <div v-for="articleItem in ArticleData[item]" class="mx-auto w-4/5 ">
          <div class="grid grid-flow-col auto-cols-auto mb-3">
            <div whitespace-nowrap overflow-hidden text-ellipsis text-center md:mx-auto sm:mx-4>
              <a :href="articleItem.url"
                  target="_blank"
                 class="border-none cursor-pointer hover:opacity-30"
                 decoration-gray underline underline-dashed hover:underline-solid underline-offset-6 decoration-1
                >{{ articleItem.title }}
              </a>
            </div>
            <div v-for="articleType in articleItem.articleTypes" pl-4 flex float-right>
              <Badge type="indigo">
                <template #content>
                  <span font-extrabold>{{ articleType }}</span>
                </template>
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <!--toc-->
      <div class="table-of-contents">
        <ul>
          <li v-for="key of Object.keys(ArticleData)" :key="key" opacity-50 hover:opacity-100>
            <a font-mono text-sm :href="`#${slug(key)}`">{{ $t(`theme.fav.${key}`) }} </a>
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
      <div class="whitespace-nowrap text-sm font-medium text-gray-400 text-center">
        No Data....
      </div>
    </template>
  </div>
</template>

<style scoped>
  .not-prose {
    max-width: 70ch;
  }

  .not-prose .table-of-contents {
    @apply opacity-50;
  }

</style>

<route lang="yaml">
  meta:
    layout: fav
</route>
