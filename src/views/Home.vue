<template>
    <app-Header/>
    <div class="flex flex-row">
        <Sidebar @category-changed="updateBlogList"/>
        <app-blog-list :items="blogList"/>
    </div>
</template>

<script>
import Sidebar from "../components/Home/Sidebar.vue"
export default {
    components : {
        Sidebar
    },
    data(){
        return{
            blogList : []
        }
    },
    mounted() {
        this.$socket.on("NEW_BLOG_ADDED", blog => {
        this.blogList.push(blog);
    });
  },
    created(){
        this.fetchData();

    },
    methods: {
        fetchData() {
        this.$appAxios.get("/blogs?_expand=category&_expand=user").then(blog_list_response => {
            console.log("blog_list_response :>> ", blog_list_response);
            this.blogList = blog_list_response?.data || [];
        });
        //! blog olarak eklediklerimizi çekmek için user_blogs üzerinden çekelim..
        this.$appAxios.get("/user_blogs/?_expand=blog&_expand=user").then(user_blog_response => {
            console.log("user_blog_response :>> ", user_blog_response);
            this.$store.commit("setblogs", user_blog_response?.data);
        });
        //! Like olarak eklediklerimizi çekmek için user_likes üzerinden çekelim..
        this.$appAxios.get("/user_likes/?_expand=blog&_expand=user").then(user_likes_response => {
            this.$store.commit("setLikes", user_likes_response?.data);
        });
        },
        updateBlogList(categoryId){
            const url = categoryId ? `/blogs?_expand=category&_expand=user&categoryId=${categoryId}` : `/blogs?_expand=category&_expand=user`;
            this.$appAxios.get(url).then(blog_list_response => {
            this.blogList = blog_list_response?.data || [];
        })
        }
    }
}
</script>