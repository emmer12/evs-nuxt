import axios from 'axios'


axios.defaults.baseURL=process.env.BASE_URL;


export const state=()=>({
  // token:process.browser && localStorage.getItem('token') || null,
  serverError:false,
  posts:[],
  post:null,
      category:[],
      loading:false,
      uploadProgress:0,
      evsFeed:[],
      catFeed:[],
      inbox:[]
})

  