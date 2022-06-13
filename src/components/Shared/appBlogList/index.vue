<template>
            <div>
        <div class="p-2 grid grid-cols-8 gap-4">
            <BlogListItem v-for="item in items" :key="item.id" :item="item" />
        </div>
      </div>
</template>

<script>
import BlogListItem from "./BlogListItem.vue"
export default {
    components : {
        BlogListItem
    },
    props :{
        items : {
            type : Array,
            required : true,
            default : () => []
        }
    }
}
</script>