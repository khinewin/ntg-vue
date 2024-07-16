<template lang="">
    <div class="container-fluid home">
    <div class="row">
            <div class="col-md-2 d-none d-md-block sidebar-block">
                    <SideBar></SideBar>
            </div>
            <div class="col-md-10 content-block" style="min-height: 500px">
                <div class="row my-2">
                        <div class="col-12">
                                <div class="row">
                                    <div class="col-4">
                                        <h4><i class="fa-brands fa-creative-commons-share"></i> Shared Statement</h4>
                                    </div>
                                 
                                </div>
                        </div>
                </div>
                <div class="row my-2 gx-1">
                    <div class="col-6">
                        <div class="card mb-2">
                            <div class="card-body p-0">
                                    <table class="table table-bordered mb-0 small">
                                        <tbody class="text-center">
                                            <tr>
                                                <td>
                                                        <select class="form-select form-select-sm" id="batch" v-model="batch" aria-placeholder="Filter by Batch">
                                                            <option v-for="b in batchs" :key="b">{{b}}</option>
                                                        </select>
                                                </td>
                                                <td>
                                                        <select class="form-select form-select-sm" id="course"  v-model="course" >
                                                                <option>Programming Basic (From Zero To Moderate)</option>
                                                                <option>Web Development Level - 1</option>
                                                                <option>Web Development Level - 2</option>
                                                        </select>
                                                </td>
                                                <td>
                                                    <button type="button" @click="filterStudent" class="btn btn-primary btn-sm"  :class="{disabled: isLoading}">
                                                        <div class="spinner-border text-light spinner-border-sm" role="status" v-if="isLoading">
                                                            <span class="visually-hidden">Loading...</span>
                                                         </div>
                                                        Filter</button>
                                                        <button class="btn btn-sm" @click="clearFilter">Clear</button>
                                                </td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                        <div class="card shadow">
                            <div class="card-body table-responsive p-0">
                                <table class="table table-bordered  mb-0">
                                        <tbody class="text-end">
                                            <tr>
                                                <td>Total Training Revenue</td>
                                                <td>{{totalTrainingRevenue}}</td>
                                            </tr>
                                                <tr >
                                                        <td>Teacher </td>
                                                        <td>{{teacherRevenue}}</td>
                                                </tr>
                                                <tr>
                                                        <td>Myo Htet (40%)</td>
                                                        <td>{{totalProfitRevenue * 0.40}}</td>
                                                </tr>
                                                <tr>
                                                        <td>Father (40%)</td>
                                                        <td>{{totalProfitRevenue * 0.40}}</td>
                                                </tr>
                                                <tr>
                                                     <td>NTG (20%)</td>
                                                     <td>{{totalProfitRevenue * 0.20}}</td>
                                                </tr>
                                        </tbody>
                                </table>
                                </div>                                        
                         </div>
                         <div class="card my-2">
                            <div class="card-header text-success">Payment for Batch#{{batch}}, {{course}}</div>
                            <div class="card-body p-0">
                                <table class="table table-bordered small table-hover mb-0">
                                    <tbody v-for="p in paymentTasks" :key="p.id">
                                            <tr class="text-end">
                                                <td><button class="btn text-danger" @click="deletePayment(p.id)"><i class="fa-solid fa-circle-xmark"></i></button></td>
                                                <td class="text-success">Paid</td>
                                                <td>{{p.payment_at}}</td>
                                                <td>{{p.payment_to}}</td>
                                                <td>{{p.amount}}</td>
                                            </tr>
                                    </tbody>
                                    <tfoot class="text-end">
                                        <tr>
                                            <td colspan="4">Total Payment</td>
                                            <td>{{totalPayment}}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                         </div>
                </div>
                <div class="col-6">
                        <div class="card">
                            <div class="card-header">Making Payment</div>
                            <div class="card-body">
                                <form @submit.prevent="savePayment">
                                        <div class="form-floating mb-3">
                                            <select class="form-select form-select-sm" id="payment_batch" v-model="payment_batch" placeholder="Batch">
                                                <option v-for="b in batchs" :key="b">{{b}}</option>
                                            </select>
                                            <label for="payment_batch" class="small">Batch</label>
                                        </div>

                                        <div class="form-floating mb-3">
                                            <select class="form-select form-select-sm" id="payment_course"  v-model="payment_course" placeholder="Course">
                                                <option>Programming Basic (From Zero To Moderate)</option>
                                                <option>Web Development Level - 1</option>
                                                <option>Web Development Level - 2</option>
                                        </select>
                                        <label for="payment_course" class="small">Course</label>
                                        </div>

                                        <div class="form-floating mb-3">
                                            <select class="form-select form-select-sm" id="payment_to"  v-model="payment_to" placeholder="Payment To">
                                                <option>Teacher</option>
                                                <option>Father</option>
                                                <option>Myo Htet</option>
                                                <option>NTG</option>
                                        </select>
                                        <label for="payment_to" class="small">Payment To</label>

                                        </div>
                                 
                                        <div class="form-floating mb-3">                                                
                                            <input @keydown="clearError('amount')"  type="number" v-model="amount" class="form-control form-control-sm" :class="{'is-invalid' : errors.amount}" id="amount" placeholder="Amount" >
                                            <label for="amount" class="small">Amount</label>
                                            
                                        </div>
                                       
                                        <div class="form-floating mb-3">                                                
                                            <input @change="clearError('payment_at')" type="date" v-model="payment_at" class="form-control form-control-sm" :class="{'is-invalid' : errors.payment_at}" id="payment_at" placeholder="Date" >
                                            <label for="payment_at" class="small">Date</label>
                                        </div>
                                        <div class="mb-3">
                                            <button type="submit" class="btn btn-primary btn-lg" :class="{disabled: isSaveLoading}">
                                                <div class="spinner-border text-light spinner-border-sm" role="status" v-if="isSaveLoading">
                                                    <span class="visually-hidden">Loading...</span>
                                                 </div>
                                                Submit Payment</button>
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
import SideBar from '@/views/SideBar.vue'
import { doc, setDoc, collection, query, getDocs, getDoc,orderBy, addDoc, where ,deleteDoc, updateDoc, getDocFromCache} from "firebase/firestore"; 
import db from "../firebase"

export default {
    name : "AppSharedStatement",
    components: {
        SideBar,
    },
    data(){
        return {
            isLoading:false,
            isSaveLoading:false,
           trainingRevenueTasks:[],
           totalTrainingRevenue:0,
           teacherRevenue :0,
           totalProfitRevenue:0,
           batchs:[],
           batch: "",
           course: "",
           currentBatch:"",

           paymentTasks:[],
           totalPayment:0,

           amount :"",
           payment_at:"",
           payment_batch:"",
           payment_course:"",
           payment_to:"",
           errors: {
            amount: "",
            payment_at:"",
            payment_batch:"",
            payment_course:"",
            payment_to:""
           }
         
        }
    },

    mounted() {
        this.fetchBatch();      
        
    },

    computed:{
        trainingRevenues(){
            return this.trainingRevenueTasks;
        },
        payments(){
            const transformed = []
             this.paymentTasks.map((item)=>{
                const exist = transformed.find(t => t.payment_to == item.payment_to)
                if(exist){ 
                    exist.amount += item.amount
                }else {
                    transformed.push(item)
                }
                return exist;
            });
            return transformed;
        }
        
    },
   
    methods:{  

        async deletePayment(id){
            let cf=confirm(`The selected payment id ${id} will deleted from database. ok ?, cancel ?`);
            if(cf){
                await deleteDoc(doc(db, "payment",id)).then(()=>{
                        this.paymentTasks=[];
                        this.totalPayment=0;
                        this.fetchPayment();
                }).catch(()=>{

                });
            }
        },


        async savePayment(){
                this.checkValidation();
                if(!this.errors.payment_at && !this.errors.payment_batch && !this.errors.payment_course && !this.errors.amount && !this.errors.payment_to){
                    this.isSaveLoading=true;                 
                    let new_payment_at=new Date(this.payment_at).toDateString();

                    const saveCollection=collection(db, "payment", )
                    let saveData=await addDoc(saveCollection, {
                        
                        batch: Number(this.payment_batch),                        
                            course: this.payment_course,
                            payment_to : this.payment_to,
                            amount: this.amount,                           
                            payment_at: new_payment_at,                         
                    
                        })
                    if(saveData.id){
                        this.isSaveLoading=false;                      

                        this.payment_to="";
                        this.payment_at="";
                        this.payment_batch="";
                        this.payment_course="";
                        this.amount="";

                        this.paymentTasks=[];
                        this.totalPayment=0;
                        this.fetchPayment();
                      
                    }
               
                
            }
        },
        clearError(error){
                switch(error){
                        case "payment_batch":
                            this.errors.payment_batch="";
                            break;
                         case "payment_course":
                            this.errors.payment_course="";
                            break;
                         case "payment_to":
                            this.errors.payment_to="";
                            break;
                        case "amount":
                            this.errors.amount="";
                            break;
                        case "payment_at":
                            this.errors.payment_at="";
                            break;      
                      
                }
        },
        checkValidation(){
            if(!this.payment_batch){
                    this.errors.payment_batch="The batch field is required.";
            }else{
                this.errors.payment_batch="";
            }
            if(!this.payment_course){
                    this.errors.payment_course="The course field is required.";
            }else{               
                this.errors.payment_course="";
               
            }
            if(!this.payment_to){
                    this.errors.payment_to="The payment to field is required.";
            }else{
                this.errors.payment_to="";
            }
            if(!this.amount){
                    this.errors.amount="The amount field is required.";
            }else{
                this.errors.amount="";
            }
            
            if(!this.payment_at){
                    this.errors.payment_at="The date  field is required.";
            }else{
                this.errors.payment_at="";
            }
          
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

            this.paymentTasks=[];
            this.totalPayment=0;

            this.fetchTrainingRevenueTask();
            this.fetchPayment();
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
            this.fetchPayment();
            
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

        async fetchPayment(){

            let q="";
            if(this.batch && this.course){
                 q = query(collection(db, "payment"), where("batch", "==", Number(this.batch)), where("course", "==", this.course), orderBy("payment_to", "asc"));
            }else if(this.batch){
                q = query(collection(db, "payment"), where("batch", "==", Number(this.batch)), orderBy("payment_to", "asc"));
            }
            else if(this.course){
                q = query(collection(db, "payment"), where("course", "==", this.course), orderBy("payment_to", "asc"));
            }else{
                 q = query(collection(db, "payment"), where("batch", "==", Number(this.currentBatch)), orderBy("payment_to", "asc"));
            }
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let task={};   
                task.batch=doc.data().batch;
                task.course=doc.data().course;
                task.amount=doc.data().amount; 
                task.payment_to=doc.data().payment_to;
                task.payment_at=doc.data().payment_at;  
              
                task.id=doc.id;             
                this.paymentTasks.unshift(task);
                this.totalPayment += task.amount;
            })
            this.isLoading=false;

        }
      
       
    }
}
</script>
<style lang="css">
       
</style>