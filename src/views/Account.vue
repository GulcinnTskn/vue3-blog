<template>
  <app-header />
  <div class="flex flex-row">
    <side-bar />
 <app-blog-list :items="blogList"/>
  </div>
</template>

<script>
import sideBar from "@/components/Account/sideBar";
import appHeader from '../components/Shared/appHeader.vue';
export default {
  components: {
    sideBar,
    appHeader
  },
  data() {
    return {
      blogList: []
    };
  },
  created() {
    this.$appAxios.get("/blogs?_expand=category&_expand=user").then(blog_list_response => {
      console.log("blog_list_response :>> ", blog_list_response);
      this.blogList = blog_list_response?.data || [];
    });
  }
};
</script>