<template lang="">
    <div class="container-fluid home">
    <div class="row">
         
            <div class="col-md-12 content-block" style="min-height: 500px">
            
                <div class="row my-2">
                    <SideBar />  
                        <div class="col-2 col-md-1">                                                             
                                <a href="#!" class="ms-2 d-block circle" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar" aria-label="Toggle navigation">
                                    <span class="text-dark">
                                    <i class="fa-solid fa-bars"></i>
                                    </span>
                                </a> 
                        </div>
                        <div class="col-10 col-md-3">                   
                            <h4 class="h4">Spending Task</h4>
                        </div>
                        
                         <div class="col-12 col-md-4">
                              <router-link to="/admin/income-statement" class="btn btn-link"> Income Statement</router-link>
                         </div>
                </div>
                
                
                 <div class="card shadow-sm mb-4">
                        <div class="card-body">
                            <div class="row my-2 justify-content-center">
                                 <div class="col-sm-6">                             
                                    <form @submit.prevent="saveTask">
                                        <div class="text-danger small ms-2 mb-2" ></div>
                                            <div class="form-floating mb-3">                                                
                                                <input @keydown="clearError('amount')"  type="number" v-model="amount" class="form-control form-control-sm" :class="{'is-invalid' : errors.amount}" id="amount" placeholder="Amount" >
                                                <label for="amount" class="small">Amount</label>
                                            </div>
                                            <div class="form-floating mb-3">                                                
                                                <input @keydown="clearError('task_name')"  type="text" v-model="task_name" class="form-control form-control-sm" id="task_name" :class="{'is-invalid' : errors.task_name}" placeholder="Task Name" >
                                                <label for="task_name" class="small">Task Name</label>
                                            </div>
                                            <div class="form-floating mb-3">                                                
                                                <input @change="clearError('task_at')" type="date" v-model="task_at" class="form-control form-control-sm" :class="{'is-invalid' : errors.task_at}" id="task_at" placeholder="Date" >
                                                <label for="task_at" class="small">Date</label>
                                            </div>
                                            <div class="mb-3">
                                                <button type="submit" class="btn btn-primary btn-lg" :class="{disabled: isLoading}">
                                                    <div class="spinner-border text-light spinner-border-sm" role="status" v-if="isLoading">
                                                        <span class="visually-hidden">Loading...</span>
                                                     </div>
                                                    Save</button>
                                            </div>
                                    </form>
                                    
                                    </div>
                                </div>
                        </div>
                </div>
            </div>
    </div>
   </div>
</template>
<script>
import SideBar from "@/views/admin/partials/SideBar.vue"
import { doc, setDoc, collection, query, getDocs, getDoc,orderBy, addDoc, where , updateDoc, getDocFromCache} from "firebase/firestore"; 
import db from "@/firebase"

  import { Timestamp } from "firebase/firestore";

export default {
    name : "AppSpendingTask",
    components: {
        SideBar,
    },
    data(){
        return {
           task_name : "",
           amount : "",
           task_at : "",

           errors : {
                task_name : "",
                amount: "",
                task_at:""
           },
           isLoading: false,
         
        }
    },
   
    methods:{      

        async saveTask(){
           this.checkValidation();

           if(!this.errors.task_at && !this.errors.task_name && !this.errors.amount){
            this.isLoading=true;
            let new_task_at=Timestamp.fromDate(new Date(this.task_at));

            const saveCollection=collection(db, "spending_task", )
                    let saveData=await addDoc(saveCollection, {  
                        task_name: this.task_name,
                        amount: this.amount, 
                        task_at: new_task_at
                    })
                    if(saveData.id){
                        this.task_at="",
                        this.task_name="",
                        this.amount="",
                        this.isLoading=false;
                    }
           }
        },
        checkValidation(){
            if(!this.task_name){
                    this.errors.task_name="The task name field is required.";
            }else{
                this.errors.task_name="";
            }

            if(!this.amount){
                    this.errors.amount="The amount field is required.";
            }else{
                this.errors.amount="";
            }

            if(!this.task_at){
                    this.errors.task_at="The date field is required.";
            }else{
                this.errors.task_at="";
            }
        },
        clearError(error){
                switch(error){
                        case "task_name":
                            this.errors.task_name="";
                            break;
                            case "amount":
                            this.errors.amount="";
                            break;
                            case "task_at":
                            this.errors.task_at="";
                            break;
                }
            }
    }
}
</script>
<style lang="css">
       
</style>