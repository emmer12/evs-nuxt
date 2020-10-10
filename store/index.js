import axios from 'axios'


axios.defaults.baseURL="http://localhost:3000/api";


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

  