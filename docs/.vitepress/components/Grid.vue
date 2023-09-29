<script setup lang="ts">
import {computed} from "vue";

interface IGrid {
  text: string
  desc?: string
  link: string
}

defineProps<{
  navData: IGrid[]
}>()
</script>

<template>

  <div class="grid">
    <section v-for="navItem in navData">
      <a :href="navItem.link" rel="noreferrer" target="_blank" class="group">
        <section class="flex">
      <span class="text">
        {{ navItem.text }}
      </span>
          <span class="desc">
        {{ navItem.desc }}
      </span>
        </section>
      </a>
    </section>
  </div>
</template>

<style>
.grid {
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: auto;
  display: grid;
}

.flex {
  line-height: 24px;
  padding: 12px 24px;
  border-style: solid;
  border-radius: 8px;
  border-color: var(--vp-c-border);
  border-width: 1px;
  flex-direction: column;
  display: flex;
  height: 100%;
}

.text {
  --un-text-opacity: 1;
  font-weight: 500;
  color: rgba(75, 85, 99, var(--un-text-opacity));
}

.desc {
  opacity: .5;
  --un-text-opacity: 1;
  color: rgba(55, 65, 81, var(--un-text-opacity));
  font-size: .875rem;
  line-height: 1.25rem;
  min-height: 20px;
  margin-bottom: auto;
}

.flex:hover {
  background-color: #efefef;
}
</style>
