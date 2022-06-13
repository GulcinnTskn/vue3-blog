import {createStore} from "vuex"
import createPersistedState from "vuex-persistedstate" //state kalıcı olsun diye kurduk
 
// import SecureLS from "secure-ls"; // secure-ls ile datamız görülüyordu. Bunun görülmesini engellemek için kurduk


// var ls = new SecureLS({ isCompression: false });

export default createStore ({
    state : {
        user: null,
        saltKey : "blog123!456?"
    },
    mutations: {
        setUser(state,user){
            state.user = user;
        },
        logoutUser(state) {
            state.user = null
        },
        setLikes(state, blogId){
            state.user.likes = blogId
        },
        setBlogs(state, blogId){
            state.user.blogs = blogId
        }
    },
    getters : {
        _isAuthenticated : state => state.user != null,
        _getCurrentUser (state){
            const user = state.user
            delete user?.password // şifreyi sayfalar arasında normal bir şekilde gezdirmemek için user objesininin içinden silip şifreli bir şekilde gezdireceğiz
            return user;
        },
        _saltKey : state => state.saltKey,
        _currentUserId : state => state?.user?.id,
        _userLikes : state =>state.user?.likes || [],
        _userBlogs : state => state.user?.blogs || []
    },
    plugins: [ //state'i kalıcı hale getirmek için kullandık yani kullanıcı login olduktan sonra sayfayı yenilese de login kalır
        createPersistedState()
        //   storage: {
        //     getItem: key => ls.get(key),
        //     setItem: (key, value) => ls.set(key, value),
        //     removeItem: key => ls.remove(key)
        //   }
        // })
      ]
})
