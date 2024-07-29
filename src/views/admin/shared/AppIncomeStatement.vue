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
                            <h4 class="h4 pt-1">Income Statement</h4>
                        </div>                  
       
                
                        <div class="col-6 col-md-4">
                               <router-link to="/admin/spanding-task" class="btn btn-link">  Spending Task</router-link>
                         </div>
                         <div class="col-6 col-md-4">
                                <router-link to="/admin/revenue-task" class="btn btn-link">  Revenue Task</router-link>
                         </div>
                             
                  </div>
                <div class="row my-2 g-1">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-body p-0">
                                    <table class="table table-bordered mb-0 small">
                                        <tbody class="text-center">
                                            <tr>
                                                <td colspan="2">
                                                        <select class="form-select form-select-sm" id="batch" v-model="batch" aria-placeholder="Filter by Batch">
                                                            <option v-for="b in batchs" :key="b">{{b}}</option>
                                                        </select>
                                                </td>
                                                <td colspan="2">
                                                        <select class="form-select form-select-sm" id="course"  v-model="course" >
                                                                <option>Programming Basic (From Zero To Moderate)</option>
                                                                <option>Web Development Level - 1</option>
                                                                <option>Web Development Level - 2</option>
                                                        </select>
                                                </td>
                                                <td>
                                                    <button type="button" @click="filterStudent" class="btn btn-sm btn-outline-primary"  :class="{disabled: isLoading}">
                                                        <div class="spinner-border text-light spinner-border-sm" role="status" v-if="isLoading">
                                                            <span class="visually-hidden">Loading...</span>
                                                         </div>
                                                        Filter
                                                    </button>
                                                        <button class="btn btn-sm btn-outline-warning" @click="clearFilter">Clear</button>
                                                </td>
                                            </tr>
                                                <tr>
                                                    <td>Total Training Revenue</td>
                                                    <td>Teacher </td>
                                                    <td>Myo Htet (40%)</td>
                                                    <td>Father (40%)</td>
                                                    <td>NTG (20%)</td>
                                                </tr>
                                                <tr>
                                                    <td>{{totalTrainingRevenue}}</td>
                                                    <td>{{teacherRevenue}}</td>
                                                    <td>{{totalProfitRevenue * 0.40}}</td>
                                                    <td>{{totalProfitRevenue * 0.40}}</td>
                                                    <td>{{totalProfitRevenue * 0.20}}</td>
                                                </tr>
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body p-0">                               
                                <table class="table table-bordered  mb-0">
                                    <tbody>
                                    <tr>
                                        <td class="text-end">Total Revenue </td>
                                        <td  class="text-end">{{totalRevenue}}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-end">Total Spending </td>
                                        <td  class="text-end">{{totalSpending}}</td>
                                    </tr>
                                   
                                    <tr>
                                        <td class="text-end">Total Cash Balance </td>
                                        <td  class="text-end">{{ totalRevenue - totalSpending}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="card shadow-sm mb-2">
                        <div class="card-body p-1">
                            <div class="row g-1">
                                <div class="col-sm-6 col-md-4">                             
                                    <div class="card shadow">
                                        <div class="card-header bg-primary">Training Revenue</div>
                                        <div class="card-body table-responsive p-0">
                                            <table class="table table-bordered table-primary mb-0">
                                                <tbody v-for="t in trainingRevenues" :key="t.id">
                                                    <tr class="small border-3 border-bottom-0 border-start-0 border-end-0 ">
                                                        <td  class="text-center"><span class="text-primary">{{t.name}}</span>, Tr:{{t.teacherFees}}, Co.,ltd:{{t.deposit - t.teacherFees}}</td>
                                                        <td class="text-end">{{t.deposit}}</td>
                                                    </tr>
                                                    <tr class="small border-3 border-top-0 border-start-0 border-end-0 " >
                                                        <td colspan="2"><span class="badge bg-primary">{{t.batch}}</span> {{t.course}}</td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr class="table-secondary small">
                                                        <td class="text-end">Total Training Revenue</td>
                                                        <td class="text-end">{{totalTrainingRevenue}}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                
                                </div>
                                 <div class="col-sm-6 col-md-4" >                             
                                        <div class="card shadow">
                                            <div class="card-header bg-success">Revenue Tasks</div>
                                            <div class="card-body table-responsive p-0">
                                                <table class="table table-bordered table-success mb-0">
                                                    <tbody v-for="r in revenueTasks" :key="r.id">
                                                        <tr class="small" >
                                                            <td>{{showTime(r.task_at)}}</td>
                                                            <td>{{r.task_name}}</td>
                                                            <td class="text-end">{{r.task_amount}}</td>
                                                            
                                                        </tr>
                                                    </tbody>
                                                    <tfoot>
                                                        <tr class="table-secondary small">
                                                            <td colspan="2" class="text-end">Total Revenue</td>
                                                            <td class="text-end">{{totalRevenue}}</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    
                                    </div>
                                    <div class="col-sm-6 col-md-4">                             
                                        <div class="card shadow">
                                            <div class="card-header bg-warning">Spending Tasks</div>
                                            <div class="card-body table-responsive p-0">
                                                <table class="table table-bordered table-warning mb-0">
                                                    <tbody v-for="s in spendingTasks" :key="s.id">
                                                        <tr class="small" >
                                                            <td>{{showTime(s.task_at)}}</td>
                                                            <td>{{s.task_name}}</td>
                                                            <td class="text-end">{{s.task_amount}}</td>
                                                            
                                                        </tr>
                                                    </tbody>
                                                    <tfoot>
                                                        <tr class="table-secondary small">
                                                            <td colspan="2" class="text-end">Total Spending</td>
                                                            <td class="text-end">{{totalSpending}}</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    
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


export default {
    name : "AppIncomeStatement",
    components: {
        SideBar,
    },
    data(){
        return {
            showSpinner:false,
            error:null,
            isLoading:false,
           spendingTasks :[],
           revenueTasks:[],
           trainingRevenueTasks:[],
           totalSpending: 0,
           totalRevenue:0,
           totalTrainingRevenue:0,
           teacherRevenue :0,
           totalProfitRevenue:0,
           batchs:[],
           batch: "",
           course: "",
           currentBatch:"",
         
        }
    },

    created() {
        this.$watch(()=>this.$route,
        this.fetchBatch,       
        {immediate:true}
        ),
        this.$watch(()=>this.$route,
        this.fetchSpendingTask,       
        {immediate:true}
        ),
        this.$watch(()=>this.$route,
        this.fetchRevenueTask,       
        {immediate:true}
        )
       // this.fetchBatch();
        //this.fetchSpendingTask()
        //this.fetchRevenueTask();
        
    },

    computed:{
        trainingRevenues(){
            return this.trainingRevenueTasks;
        },
        
    },
   
    methods:{  
        showTime(t){
            const date=t.toDate()
           const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
            return formattedDate;
        },
        
        clearFilter(){
            this.batch="";
            this.course="";
        } ,
         filterStudent(){
            this.isLoading=true;
            this.trainingRevenueTasks=[];
            this.totalTrainingRevenue=0;
            this.teacherRevenue=0;
            this.totalProfitRevenue=0;
            this.fetchTrainingRevenueTask();
        },
        async fetchBatch(){
            const q = query(collection(db, "training"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let batch={};   
                batch=doc.data().batch;
                this.batchs.unshift(batch);
            })
            let largeBatch=this.batchs[0];
            this.batchs.map((b)=>{
                    if(b > largeBatch){
                        largeBatch=b;
                    }
            });
            this.currentBatch=largeBatch;
            this.fetchTrainingRevenueTask();
        },

      
        async fetchTrainingRevenueTask(){           
            let q="";
            if(this.batch && this.course){
                 q = query(collection(db, "students"), where("batch", "==", Number(this.batch)), where("course", "==", this.course));
            }else if(this.batch){
                q = query(collection(db, "students"), where("batch", "==", Number(this.batch)));
            }
            else if(this.course){
                q = query(collection(db, "students"), where("course", "==", this.course));
            }else{
                 q = query(collection(db, "students"), where("batch", "==", Number(this.currentBatch)));
            }
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let task={};   
                task.batch=doc.data().batch;
                task.course=doc.data().course;
                task.deposit=doc.data().deposit.reduce((r,d)=>r+d);     
                task.created_at=doc.data().created_at;   
                task.name=doc.data().name;
                task.id=doc.id;
                task.teacherFees=doc.data().teacherFees * task.deposit;        
                
               this.totalTrainingRevenue += task.deposit;
               this.teacherRevenue += task.teacherFees;
                this.totalProfitRevenue = this.totalTrainingRevenue - this.teacherRevenue;

                this.trainingRevenueTasks.unshift(task);
            })
            this.isLoading=false;
        }, 
        async fetchSpendingTask(){
            const q = query(collection(db, "spending_task"), orderBy("task_at"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let task={};   
                task.task_name=doc.data().task_name;
                task.task_at=doc.data().task_at;
                task.task_amount=doc.data().amount;        
                task.id=doc.id;        
                this.spendingTasks.unshift(task);
                this.totalSpending += doc.data().amount;
               
            })
        },
        async fetchRevenueTask(){
            const q = query(collection(db, "revenue_task"), orderBy("task_at"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let task={};   
                task.task_name=doc.data().task_name;
                task.task_at=doc.data().task_at;
                task.task_amount=doc.data().amount;                
                this.revenueTasks.unshift(task);
                this.totalRevenue += doc.data().amount;
               
            })
        },
    }
}
</script>
<style lang="css">
       
</style>