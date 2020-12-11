
export default {
        

        register(context,data){
            return new Promise((resolve,reject)=>{
                this.$axios.$post('/register',data)
                .then(response=>{
                    alert(response)
                    let token =response.token;
                    localStorage.setItem('token',token)
                    
                    context.commit("retrieveToken",token)
                    resolve(response)
                })
                .catch(err=>{
                    reject(err)
                })
            })
        },
    
        postNewData(context,data){       
            this.$axios.defaults.headers.common['Authorization']=this.$auth.getToken('local')
            return new Promise((resolve,reject)=>{ 
                this.$axios.$post('/create-feed',data)
                .then(response=>{
                   console.log("sucessss");
                    // context.commit("retrieveToken",token)
                    resolve(response)
                })
                .catch(err=>{
                    console.log("fail");
                    
                    reject(err)
                })
            })
        },



        sendMessage(context,data){       
            return new Promise((resolve,reject)=>{ 
                this.$axios.$post('/contact-message',data)
                .then(response=>{
                   console.log("sucessss");
                    // context.commit("retrieveToken",token)
                    resolve(response)
                })
                .catch(err=>{
                    console.log("fail");
                    reject(err)
                })
            })
        },


        updateData(context,data){
            this.$axios.defaults.headers.common['Authorization']='Bearer ' + context.state.token
            return new Promise((resolve,reject)=>{
                let formData1=new FormData();
                formData1.append('id',data.id);
                formData1.append('display',data.fileUp);
                formData1.append('title',data.title);
                formData1.append('description',data.description);
                
                this.$axios.$post('/updatepost',formData1)
                .then(response=>{
                   console.log("sucessss");
                    resolve(response)
                })
                .catch(err=>{
                    console.log("fail");
                    
                    reject(err)
                })
            })
        },
        getEvsFeed(context){
            this.$axios.defaults.headers.common['Authorization']=this.$auth.getToken('local')

            return new Promise((resolve,reject)=>{
                this.$axios.$get('/get-feed')
                .then(response=>{
                    console.log(response)
                    context.commit("getEvsFeed",response.feeds)
                    resolve(response.data)
                })
                .catch(err=>{
                    context.commit('loading',false)
                    console.log(err);
            })
         })
        },
        getById(context,id){
            this.$axios.defaults.headers.common['Authorization']="Bearer " + context.state.token
                return new Promise((resolve,reject)=>{
                this.$axios.$get('/getpost/' + id)
                .then(response=>{
                    context.commit("getById",response.data)
                    resolve(response.data)
                })
                .catch(err=>{
                    console.log(err);
         })
        })
        },
        getByCat(context,category){

                return new Promise((resolve,reject)=>{
                this.$axios.$get('/feed-category/' + category)
                .then(response=>{
                    context.commit("getByCat",response.category)
                    resolve(response.data)
                })
                .catch(err=>{
                    console.log(err);
         })
        })
        },

        getMessage(context){

            return new Promise((resolve,reject)=>{
            this.$axios.$get('/get-inbox' )
            .then(response=>{
                context.commit("setInbox",response.inbox)
                resolve(response.inbox)
            })
            .catch(err=>{
                console.log(err);
     })
    })
    },
        deletePost(context,id){
            this.$axios.defaults.headers.common['Authorization']=this.$auth.getToken('local')
            this.$axios.$delete('/delete-feed/'+id)
            .then(()=>{
                context.commit("deletePost",id)
            })
            .catch(err=>{
                console.log(err);
            })  
        },

        uploadFile(context,data){
            this.$axios.defaults.headers.common['Authorization']=this.$auth.getToken('local')
            return new Promise((resolve,reject)=>{                
                let formData=new FormData();
                
                formData.append('file',data.file);
                formData.append('field',data.field);

                this.$axios.$post('/upload-file',formData,{
                    onUploadProgress:progressEvent=>{
                        let progress=Math.round(progressEvent.loaded/progressEvent.total*100)
                        context.commit("uploadProgress",progress)
                    }
                })
                .then(response=>{                    // context.commit("retrieveToken",token)
                    resolve(response)
                })
                .catch(err=>{
                    console.log("fail");
                    
                    reject(err)
                })
            })
        },

        getCategory(context){
            this.$axios.defaults.headers.common['Authorization']=this.$auth.getToken('local')
            return new Promise((resolve,reject)=>{
                this.$axios.$get('/category')
                .then(response=>{
                    context.commit("getCategory",response.category)
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                    console.log(err);
                })  
            })
        },
        saveCategory(context,data){
            this.$axios.defaults.headers.common['Authorization']=this.$auth.getToken('local')
            return new Promise((resolve,reject)=>{                
                this.$axios.$post('category',data).then(response=>{
                    context.dispatch("getCategory")
                    resolve(response);  
                }).catch(err=>{
                // context.commit("serverError");
                  reject(err)
                })
            })
        },
        deleteCat(context,data){
            this.$axios.defaults.headers.common['Authorization']=this.$auth.getToken('local')

            return new Promise((resolve,reject)=>{ 
            this.$axios.$delete('/delete-cat/'+data)
            .then(response=>{
                context.commit("deleteCat",data)
                resolve(response)
            })
            .catch(err=>{
                console.log(err);
                reject(err)
            })  
        })
        },

        deleteInbox(context,data){
            this.$axios.defaults.headers.common['Authorization']=this.$auth.getToken('local')

            return new Promise((resolve,reject)=>{ 
            this.$axios.$delete('/delete-inbox/'+data)
            .then(response=>{
                context.commit("deleteInbox",data)
                resolve(response)
            })
            .catch(err=>{
                console.log(err);
                reject(err)
            })  
        })
        },
        getFeeds(context){
            context.commit("isLoading",true)
            this.$axios.$get('/feeds')
            .then(response=>{
                context.commit("getFeeds",response.data)
                context.commit("isLoading",false)
            })
            .catch(err=>{
                context.commit("serverError");
                
            })  
        },
    


    }