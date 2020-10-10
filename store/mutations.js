    export default {
            retrieveToken(state,data){
                state.token=data
            },
            destroyToken(state){
                state.token=null;
            },  
            getPost(state,data){
                state.posts=data;
            },
            getById(state,data){
                state.post=data;
            },
            getByCat(state,data){
                state.catFeed=data;
            },
            setInbox(state,data){
                state.inbox=data;
            },
            deletePost(state,data){
                    let index=state.evsFeed.findIndex(item=>item._id == data)
                    state.evsFeed.splice(index,1)

            },
            deleteCat(state,data){
                    let index=state.category.findIndex(item=>item._id == data)
                    state.category.splice(index,1)
            },
            deleteInbox(state,data){
                let index=state.inbox.findIndex(item=>item._id == data)
                state.inbox.splice(index,1)
           },
            uploadProgress(state,data){
                state.uploadProgress=data
            },
            loading(state,data){
                state.loading=data
            },
            getEvsFeed(state,data){
                state.evsFeed=data
            },
            getCategory(state,data){
                console.log('====================================');
                console.log(data,state);
                console.log('====================================');
                state.category=data
            }
    }