<script setup lang="ts">
import MarkdownRender from "../../src/components/display/MarkdownRender.vue";
import Tag from "../../src/components/Tag.vue";
import NavSection from "../../src/components/navigation/NavSection.vue";
defineOptions({
  name: "DisplayNavSection",
})
const code=`
\`\`\`json
// 定义类型
interface Section {
  id: number | string
  title: string
  children?: Section[]
}

// props
const props = defineProps<{
  sections: Section[],
  title: string,
}>()
\`\`\`
`
const content={
  title:'标题1',
  children:[
    {
      id: 1,
      title: '标题2',
      children:[
        {
          title: '标题3',
          children:[
            {
              title: '标题5'
            },
            {
              title: '标题6'
            }
          ]
        },
        {
          title: '标题4',
          children:[
            {
              title: '标题7'
            },
            {
              title: '标题8'
            }
          ]
        }
      ]
    },
    {
      title: '标题3',
      children:[
        {
          title: '标题4'
        },
        {
          title: '标题5'
        }
      ]
    }
  ]
}
const handleSelect=(section)=> {
  alert( JSON.stringify( section));
}
</script>

<template>

  <h1 class="text-center">示例</h1>
  <NavSection :title="content.title" :sections="content.children" @select="(e)=>handleSelect(e)" />
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
