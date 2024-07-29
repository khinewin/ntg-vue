<template lang="">
    <div>
        <div class="card">
            <div class="card-body bg-secondary">
              <div class="text-white"> Available courses</div>
                <div class="table-responsive">                  
                    <table class="table table-borderless mb-1">
                      <tbody>
                        <tr >
                            <td v-for="p in allPosts" :key="p.id" class="p-1 bg-secondary " >
                                  <button type="button" class="btn btn-light btn-sm" style="width: 350px !important" @click="goTo(p.id)">{{p.title}}</button>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['posts'],
    created(){
       
   
    },
   
    methods: {
        goTo(id){
             this.$router.push({path: `/post/${id}`})
    },

    },
    computed:{
        allPosts(){
            return [...this.posts].reverse();
        }
    }
}
</script>
<style lang="">
    
</style>