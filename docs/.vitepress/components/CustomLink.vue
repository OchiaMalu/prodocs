<script setup lang="ts">
import {Icon} from '@iconify/vue';
import {computed} from "vue";
import Grid from "./Grid.vue";

interface ILink {
  href: string
  title: string
}

const {href, title} = defineProps<ILink>()

const hrefSource = computed(() => {
  if (/bilibili\.com/.test(href))
    return 'bilibili'
  if (/b23\.tv/.test(href))
    return 'bilibili'
  if (/youtube\.com/.test(href))
    return 'youtube'
  if (/github\.com/.test(href))
    return 'github'
  if (/gitee\.com/.test(href))
    return 'gitee'
  return 'web'
})

const jump = () => {
  window.open(href)
}
</script>

<template>
  <div
      style="width: 100%;border: 1px solid #D4D4D8;border-radius: 0.5rem;padding: 16px;margin-top: 10px;margin-bottom: 10px"
      class="main" @click="jump">
    <span style="font-weight: 600;overflow: hidden;width: 90%;text-overflow: ellipsis;white-space: nowrap;"
          class="title">
      {{ title }}
    </span>
    <div style="justify-content: space-between;display: flex;overflow: hidden">
      <div style="margin-top: 20px;overflow: hidden">
        <Icon icon="tabler:brand-bilibili" color="#47A7D9" class="icon" v-if="hrefSource == 'bilibili'"/>
        <Icon icon="mdi:youtube" color="#FF0000" class="icon" v-else-if="hrefSource == 'youtube'"/>
        <Icon icon="devicon:github" class="icon" v-else-if="hrefSource == 'github'"/>
        <Icon icon="simple-icons:gitee" color="#D0101A" class="icon" v-else-if="hrefSource == 'gitee'"/>
        <Icon icon="icon-park:add-web" class="icon" v-else/>
        <span
            style="margin-left: 5px;opacity: .75;font-weight: 500;font-size: .875rem;line-height: 27px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;width: 100%;">
          {{ href }}
        </span>
      </div>
    </div>
  </div>
</template>

<style>
.main:hover {
  cursor: pointer;

  > .title {
    color: #314ad7;
  }
}

.icon {
  width: 1.75rem;
  height: 1.75rem;
  float: left
}
</style>
