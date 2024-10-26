<template lang="">
    <div class="container-fluid home min-vh-100">
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
                        <div class="col-10 col-md-9">                   
                            <h4 class="h4 pt-1"> Shares statement</h4>
                        </div>
                        <div class="col-md-2">
                            <button class="btn" @click="handlePaymentForm">
                                <span v-if="isShowPaymentForm">
                                    <i class="fa-solid fa-circle-minus" ></i>
                                </span>
                                <span v-if="!isShowPaymentForm" >
                                    <i class="fa-solid fa-plus-circle"></i>
                                </span>
                                 Payment</button>
                        </div>
                     
                </div>
                
                <div class="row my-2 g-1">
                    <div :class="[isShowPaymentForm ? 'col-md-8' : 'col-md-12']">
                       <!--Filter rows-->
                       <div class="row g-0">
                        <div class="col-lg-6">
                            <div class="input-group">
                                <span class="input-group-text"><i class="fa-solid fa-filter"></i></span>
                                    <select v-model="filter_by_batch" @change="doFilter" class="form-select form-select-sm">
                                        <option value="">Batchs</option>
                                        <option v-for="bat in batchs" :value="bat.name">{{bat.name}}</option>
                                    </select>   
                                <span class="input-group-text" role="button" @click="clearFilter"><i class="fa-solid fa-circle-xmark"></i></span>                          
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="input-group">
                                <span class="input-group-text"><i class="fa-solid fa-filter"></i></span>
                                <select v-model="filter_by_course" @change="doFilter" class="form-select form-select-sm">
                                    <option value=""> Courses</option>
                                    <option v-for="sc in select_courses" :value="sc.code">{{sc.code.toUpperCase()}}</option>
                                </select>   
                                <span class="input-group-text" role="button" @click="clearFilter"><i class="fa-solid fa-circle-xmark"></i></span>                          
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="input-group">
                                <span class="input-group-text"><i class="fa-solid fa-filter"></i></span>
                                    <input v-model="filter_start_date" type="date" class="form-control form-control-sm" @change="doFilter" />  
                                <span class="input-group-text " role="button" @click="clearFilter"><i class="fa-solid fa-circle-xmark"></i></span>                          
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="input-group">
                                <span class="input-group-text"><i class="fa-solid fa-filter"></i></span>
                                    <input v-model="filter_end_date" type="date" class="form-control form-control-sm" @change="doFilter" />  
                                <span class="input-group-text" role="button" @click="clearFilter"><i class="fa-solid fa-circle-xmark"></i></span>                          
                            </div>
                        </div>
                    </div>                             
                    <!--Filter rows end-->
                        <div class="card shadow min-vh-100">
                            <div class="card-body table-responsive p-0">
                                <table class="table table-bordered table-hover mb-0">
                                        <tbody class="small" >
                                            <tr class="text-center">
                                                <td colspan="4">{{displayFilter}}</td>
                                            </tr>
                                            <tr  class="text-center table-secondary" >                                               
                                                    <td>Crourse fees</td>
                                                    <td>Student deposit</td>  
                                                    <td>Teacher fees</td>                                                 
                                                    <td>Training profit</td>
                                                </tr>
                                                <tr class="text-end">
                                                    <td>{{totalCourseFees.toLocaleString('en-US')}}</td>
                                                    <td>{{totalDeposit.toLocaleString('en-US')}}</td>
                                                    <td >{{totalTeacherFees.toLocaleString('en-US')}}</td>
                                                    <td  :class="[totalTrainingProfit > 0 ? 'text-success' : 'text-danger']">{{totalTrainingProfit.toLocaleString('en-US')}}</td>
                                                </tr>     
                                                <tr class="text-center table-secondary">
                                                    <td>Shareholder</td>
                                                    <td >Earnings share</td>
                                                    <td>Paid</td>
                                                    <td>Balance due</td>
                                                </tr>                                      
                                                <tr  class="text-end">
                                                    <td  class="table-secondary">Teacher fees</td>
                                                    <td >{{totalTeacherFees.toLocaleString('en-US')}}</td>
                                                    <td>{{shareholder_teacher_total.toLocaleString('en-US')}}</td>
                                                    <td>{{(totalTeacherFees-shareholder_teacher_total).toLocaleString('en-US')}}</td>
                                                  
                                            </tr>
                                                <tr  class="text-end">
                                                        <td class="table-secondary">Shareholder #1 (40%)</td>
                                                        <td >{{sharedOneProfit.toLocaleString('en-US')}}</td>
                                                        <td>{{shareholder_1_total.toLocaleString('en-US')}}</td>
                                                        <td>{{(sharedOneProfit-shareholder_1_total).toLocaleString('en-US')}}</td>

                                                </tr>
                                                <tr  class="text-end">
                                                        <td  class="table-secondary">Shareholder #2 (40%)</td>
                                                        <td >{{sharedTwoProfit.toLocaleString('en-US')}}</td>
                                                        <td>{{shareholder_2_total.toLocaleString('en-US')}}</td>
                                                        <td>{{(sharedTwoProfit-shareholder_2_total).toLocaleString('en-US')}}</td>

                                                </tr>
                                                <tr  class="text-end">
                                                     <td  class="table-secondary">Shareholder #NTG (20%)</td>
                                                     <td >{{ntgProfit.toLocaleString('en-US')}}</td>
                                                     <td>{{shareholder_ntg_total.toLocaleString('en-US')}}</td>
                                                     <td>{{(ntgProfit-shareholder_ntg_total).toLocaleString('en-US')}}</td>

                                                </tr>
                                        </tbody>
                                </table>
                                <table class="table table-bordered table-hover">
                                        <tbody>
                                            <tr>
                                                <td colspan="5">Payments</td>
                                            </tr>
                                            <tr class="text-center table-secondary small">
                                                    <td>ID</td>
                                                    <td>Description</td>
                                                    <td>Shareholder</td>                                                    
                                                    <td>Date</td>
                                                    <td>Amount</td>
                                            </tr>
                                            <tr class="small text-center" v-if="paymentTasks.length > 0" v-for="p in paymentTasks" :key="p.id">
                                                    <td>{{p.id}}</td>
                                                    <td>{{p.batch}}#{{p.course.toUpperCase()}}</td>
                                                    <td>{{p.payment_to.toUpperCase()}}</td>                                                    
                                                    <td>{{showTime(p.payment_at)}}</td>
                                                    <td class="text-end">{{p.amount.toLocaleString('en-US')}}</td>
                                            </tr>
                                            <tr class="small text-end">
                                                <td colspan="4">Total</td>
                                                <td>{{paymentTotal.toLocaleString('en-US')}}</td>
                                            </tr>
                                        </tbody>
                                </table>
                                </div>                                        
                         </div>
                        
                </div>
                <div class="col-md-4" v-if="isShowPaymentForm">
                        <div class="card">
                            <div class="card-header">Payment</div>
                            <div class="card-body">
                                <form @submit.prevent="savePayment">
                                        <div class="form-floating mb-3">
                                            <select class="form-select form-select-sm" id="payment_batch" v-model="payment_batch" placeholder="Batch" :class="{'is-invalid' : errors.payment_batch}">
                                                <option v-for="b in batchs" :key="b.name">{{b.name}}</option>
                                            </select>
                                            <label for="payment_batch" class="small">Batch</label>
                                        </div>

                                        <div class="form-floating mb-3">
                                            <select v-model="payment_course"  class="form-select form-select-sm" id="payment_course"  :class="{'is-invalid' : errors.payment_course}" >
                                                <option value=""> Courses</option>
                                                <option v-for="sc in select_courses" :value="sc.code">{{sc.code.toUpperCase()}}</option>
                                            </select>  
                                            <label for="payment_course" class="small">Course</label>                                           
                                        </div>

                                        <div class="form-floating mb-3">
                                            <select class="form-select form-select-sm"   :class="{'is-invalid' : errors.payment_to}" id="payment_to"   v-model="payment_to" placeholder="Payment To">
                                                <option>Select shareholder</option>
                                                <option value="teacher">Teacher</option>
                                                <option value="1">Shareholder #1</option>
                                                <option value="2">Shareholder #2</option>
                                                <option value="ntg">Shareholder #NTG</option>
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
import SideBar from "@/views/admin/partials/SideBar.vue"
import db from "@/firebase/database"
import { ref, set, onValue, remove, query, startAt,endAt, equalTo, orderByChild ,limitToLast, limitToFirst} from 'firebase/database'
import PreLoading from "@/views/loaders/PreLoading"


export default {
    name : "AppSharedStatement",
    components: {
        SideBar,
    },
    data(){
        return {
            isShowPaymentForm: true,
            isLoading:false,
            isSaveLoading:false,
            trainingsData:[],
           trainingRevenueTasks:[],
           
           sharedOneProfit:0,
           sharedTwoProfit:0,
           ntgProfit:0,

           sharedOnePrecent:40,
           sharedTwoPercent:40,
           ntgPercent:20,
      
           batchs:[],
           batch: "",
           course: "",

           paymentTasks:[],
           paymentData:[],
           paymentTotal:0,

           filter_by_batch:"",
           filter_by_course:"",
           filter_start_date:"",
           filter_end_date:"",
           displayFilter:"",

           totalCourseFees:0,
           totalDeposit:0,
           totalTeacherFees:0,
           totalTrainingProfit:0,

           amount :"",
           payment_at:"",
           payment_batch:"",
           payment_course:"",
           payment_to:"",

           shareholder_1_total:0,
           shareholder_2_total:0,
           shareholder_ntg_total:0,
           shareholder_teacher_total:0,

           errors: {
            amount: "",
            payment_at:"",
            payment_batch:"",
            payment_course:"",
            payment_to:""
           }
         
        }
    },

    created() {
        this.$watch(()=>this.$route,
        this.fetchBatch,
        {immediate:true}
    )     
    this.$watch(()=>this.$route,
        this.fetchTrainingRevenueTasks,
        {immediate:true}
    )      
    this.$watch(()=>this.$route,
        this.fetchPayments,
        {immediate:true}
    ) 
    },

    computed:{
        select_courses(){
            return this.$store.getters.select_courses;
        }
   
    },
   
    methods:{  
        handlePaymentForm(){
            this.isShowPaymentForm=!this.isShowPaymentForm;
        },

        showTime(t){
           const options = { year: '2-digit', month: 'numeric', day: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('en-UK', options).format(t);
            return formattedDate;
        },

        calDeposit(dbs){
            return dbs.reduce((accu, cur)=>accu + cur.amount,0)
        },  
      
        doFilter(){
            this.showTrainingRevenue();
            this.showPaymentTasks();
        },
        clearFilter(){
            this.filter_by_batch="";
            this.filter_by_course="";
            this.filter_start_date="";
            this.filter_end_date="";
            this.showTrainingRevenue();
            this.showPaymentTasks();
        },
   
        
        fetchBatch(){
           const query_url=query(ref(db,"batchs"))
           onValue(query_url, (snapshot)=>{
                const data=snapshot.val();
               if(data===null) return null;
               this.batchs=Object.values(data);
           })        
        },

        showPaymentTasks(){
            if(this.filter_start_date && this.filter_end_date && this.filter_by_batch && this.filter_by_course){
                const newStartDate= +new Date(this.filter_start_date)
                const newEndDate=+ new Date(this.filter_end_date);
                const data= this.paymentData.filter((tr)=>{     
                        return    tr.payment_at >= newStartDate && tr.payment_at <= newEndDate && tr.course===this.filter_by_course && tr.batch===this.filter_by_batch;
                })
                this.displayFilter=`${this.filter_by_batch}#${this.filter_by_course.toUpperCase()}, ${this.showTime(newStartDate)} - ${this.showTime(newEndDate)}`
                this.paymentTasks=data;
            }else
              if(this.filter_start_date && this.filter_end_date && this.filter_by_batch){
                const newStartDate= +new Date(this.filter_start_date)
                const newEndDate=+ new Date(this.filter_end_date);
                const data= this.paymentData.filter((tr)=>{     
                        return    tr.payment_at >= newStartDate && tr.payment_at <= newEndDate && tr.batch===this.filter_by_batch;
                })
                this.displayFilter=`${this.filter_by_batch}# , ${this.showTime(newStartDate)} - ${this.showTime(newEndDate)}`
                this.paymentTasks=data;
            }else 
             if(this.filter_start_date && this.filter_end_date && this.filter_by_course){
                const newStartDate= +new Date(this.filter_start_date)
                const newEndDate=+ new Date(this.filter_end_date);
                const data= this.paymentData.filter((tr)=>{     
                        return    tr.payment_at >= newStartDate && tr.payment_at <= newEndDate && tr.course===this.filter_by_course;
                })
                this.displayFilter=`${this.filter_by_course.toUpperCase()}, ${this.showTime(newStartDate)} - ${this.showTime(newEndDate)}`
                this.paymentTasks=data;
            }else 
            if(this.filter_start_date && this.filter_end_date){  //start date and end date
                const newStartDate=new Date(this.filter_start_date).getTime();
                const newEndDate= new Date(this.filter_end_date).getTime();
                console.log(newStartDate)
               const data= this.paymentData.filter((tr)=>{   
                       return   tr.payment_at >= newStartDate && tr.payment_at <= newEndDate;
                })
                        
               this.displayFilter=`${this.showTime(newStartDate)} - ${this.showTime(newEndDate)}`
                this.paymentTasks=data;
            }else if(this.filter_by_batch && this.filter_by_course){
                const data= this.paymentData.filter((tr)=>{
                return tr.course===this.filter_by_course && tr.batch===this.filter_by_batch;
                })
                this.paymentTasks=data;
                this.displayFilter=`${this.filter_by_batch}#${this.filter_by_course.toUpperCase()}`

            }else 
            if(this.filter_by_batch){
                const data= this.paymentData.filter((tr)=>{
                return tr.batch===this.filter_by_batch;
                })
                this.paymentTasks=data;
                this.displayFilter=`${this.filter_by_batch}#`

            }else
             if(this.filter_by_course){
                const data= this.paymentData.filter((tr)=>{
                return tr.course===this.filter_by_course;
                })
                this.paymentTasks=data;
                this.displayFilter=`${this.filter_by_course.toUpperCase()}`
            }else {
            const date = new Date();
                const firstDay = +new Date(date.getFullYear(), date.getMonth(), 1);
                const lastDay = +new Date(date.getFullYear(), date.getMonth() + 1, 0);
                const data= this.paymentData.filter((tr)=>{     
                        return    tr.payment_at >= firstDay && tr.payment_at <= lastDay;
                })
                this.displayFilter=`${this.showTime(firstDay)} - ${this.showTime(lastDay)}`
                this.paymentTasks=data;
            }
            this.paymentTotal=this.paymentTasks.reduce((accu, cur)=>accu+cur.amount,0)
            const shareholder_1_total=this.paymentTasks.filter((f)=>{
                    return f.payment_to==="1";
            }).reduce((accu,cur)=>accu + cur.amount,0)
            const shareholder_2_total=this.paymentTasks.filter((f)=>{
                    return f.payment_to==="2";
            }).reduce((accu,cur)=>accu + cur.amount,0)
            const shareholder_ntg_total=this.paymentTasks.filter((f)=>{
                    return f.payment_to==="ntg";
            }).reduce((accu,cur)=>accu + cur.amount,0)
            const shareholder_teacher_total=this.paymentTasks.filter((f)=>{
                    return f.payment_to==="teacher";
            }).reduce((accu,cur)=>accu + cur.amount,0)

            this.shareholder_1_total=shareholder_1_total;
            this.shareholder_2_total=shareholder_2_total;
            this.shareholder_ntg_total=shareholder_ntg_total;
            this.shareholder_teacher_total=shareholder_teacher_total;
           
        },
        fetchPayments(){
            const query_url=query(ref(db,"payments"))
                 onValue(query_url, (snapshot)=>{
                    const data=snapshot.val();
                    if(data===null) return null;
                    const payments=Object.values(data)
                    const paymentData=payments.sort((a,b)=>a.payment_to.localeCompare(b.payment_to)).reverse();
                    this.paymentData=paymentData
                    this.showPaymentTasks();
                })   
            
        },

        fetchTrainingRevenueTasks(){
            const query_url = query(ref(db, 'students'))        
            onValue(query_url, (snapshot) => {
                const data = snapshot.val()
                if(data===null){
                    this.error="No result found."                    
                }else{
                    const arr=Object.entries(data);   
                    const trainings=[]                 
                    arr.reverse().map((res)=>{                     
                     const newData=res[1].courses.sort((a,b)=>{
                            return a.created_at + b.created_at;
                        })                
                        
                         trainings.push(...newData)
                    })
                    this.trainingsData=trainings;
                    this.showTrainingRevenue();                
                            
                };
                this.isLoading=false;
            })           
        },

        calculateTrainingProfit(){
                this.totalCourseFees=0;
                this.totalDeposit=0;
                this.totalTeacherFees=0;
                this.totalTrainingProfit=0;   

                this.sharedOneProfit=0;
                this.sharedTwoProfit=0;
                this.ntgProfit=0;

                this.trainingRevenueTasks.map((res)=>{                         
                    this.totalCourseFees +=res.course.course_fees;
                    this.totalDeposit += res.deposit.reduce((accu, cur)=>accu + cur.amount,0);
                    this.totalTeacherFees += res.course.course_fees * res.course.teacherFees;
                    this.totalTrainingProfit = this.totalDeposit - this.totalTeacherFees;                             
                })

                this.sharedOneProfit=this.totalTrainingProfit * 0.4;
                this.sharedTwoProfit=this.totalTrainingProfit * 0.4;
                this.ntgProfit=this.totalTrainingProfit * 0.2;
        },

        showTrainingRevenue(){
            if(this.filter_start_date && this.filter_end_date && this.filter_by_batch && this.filter_by_course){
                const newStartDate= +new Date(this.filter_start_date)
                const newEndDate=+ new Date(this.filter_end_date);
                const data= this.trainingsData.filter((tr)=>{     
                        return    tr.created_at >= newStartDate && tr.created_at <= newEndDate && tr.course.code===this.filter_by_course && tr.batch===this.filter_by_batch;
                })
                this.displayFilter=`${this.filter_by_batch}#${this.filter_by_course.toUpperCase()}, ${this.showTime(newStartDate)} - ${this.showTime(newEndDate)}`
                this.trainingRevenueTasks=data;
            }else
              if(this.filter_start_date && this.filter_end_date && this.filter_by_batch){
                const newStartDate= +new Date(this.filter_start_date)
                const newEndDate=+ new Date(this.filter_end_date);
                const data= this.trainingsData.filter((tr)=>{     
                        return    tr.created_at >= newStartDate && tr.created_at <= newEndDate && tr.batch===this.filter_by_batch;
                })
                this.displayFilter=`${this.filter_by_batch}# , ${this.showTime(newStartDate)} - ${this.showTime(newEndDate)}`
                this.trainingRevenueTasks=data;
            }else 
             if(this.filter_start_date && this.filter_end_date && this.filter_by_course){
                const newStartDate= +new Date(this.filter_start_date)
                const newEndDate=+ new Date(this.filter_end_date);
                const data= this.trainingsData.filter((tr)=>{     
                        return    tr.created_at >= newStartDate && tr.created_at <= newEndDate && tr.course.code===this.filter_by_course;
                })
                this.displayFilter=`${this.filter_by_course.toUpperCase()}, ${this.showTime(newStartDate)} - ${this.showTime(newEndDate)}`
                this.trainingRevenueTasks=data;
            }else 
            if(this.filter_start_date && this.filter_end_date){  //start date and end date
                const newStartDate=new Date(this.filter_start_date).getTime();
                const newEndDate= new Date(this.filter_end_date).getTime();
               const data= this.trainingsData.filter((tr)=>{   
                       return   tr.created_at >= newStartDate && tr.created_at <= newEndDate;
                })
                        
               this.displayFilter=`${this.showTime(newStartDate)} - ${this.showTime(newEndDate)}`
                this.trainingRevenueTasks=data;
            }else if(this.filter_by_batch && this.filter_by_course){
                const data= this.trainingsData.filter((tr)=>{
                return tr.course.code===this.filter_by_course && tr.batch===this.filter_by_batch;
                })
                this.trainingRevenueTasks=data;
                this.displayFilter=`${this.filter_by_batch}#${this.filter_by_course.toUpperCase()}`

            }else 
            if(this.filter_by_batch){
                const data= this.trainingsData.filter((tr)=>{
                return tr.batch===this.filter_by_batch;
                })
                this.trainingRevenueTasks=data;
                this.displayFilter=`${this.filter_by_batch}#`

            }else
             if(this.filter_by_course){
                const data= this.trainingsData.filter((tr)=>{
                return tr.course.code===this.filter_by_course;
                })
                this.trainingRevenueTasks=data;
                this.displayFilter=`${this.filter_by_course.toUpperCase()}`
            }else{
                const date = new Date();
                const firstDay = +new Date(date.getFullYear(), date.getMonth(), 1);
                const lastDay = +new Date(date.getFullYear(), date.getMonth() + 1, 0);
                const data= this.trainingsData.filter((tr)=>{     
                        return    tr.created_at >= firstDay && tr.created_at <= lastDay;
                })
                this.displayFilter=`${this.showTime(firstDay)} - ${this.showTime(lastDay)}`
                this.trainingRevenueTasks=data;
            }      
            this.calculateTrainingProfit();
        },

        async deletePayment(id){
            let cf=confirm(`The selected payment id ${id} will deleted from database. ok ?, cancel ?`);
            if(cf){
               
              
            }
        },

        async savePayment(){
                this.checkValidation();
                if(!this.errors.payment_at && !this.errors.payment_batch && !this.errors.payment_course && !this.errors.amount && !this.errors.payment_to){
                    this.isSaveLoading=true;                 
                    const new_payment_at=new Date(this.payment_at).getTime();
                    const id=new Date().getTime();
                    const data={
                        id: id,
                        batch: Number(this.payment_batch),
                        course: this.payment_course,
                        payment_to: this.payment_to,
                        amount : this.amount,
                        payment_at: new Date(this.payment_at).getTime(),
                    }
                    const query_url=query(ref(db, "payments/"+id))
                    set(query_url, data).then(()=>{
                        this.isSaveLoading=false;                      

                        this.payment_to="";
                        this.payment_at="";
                        this.payment_batch="";
                        this.payment_course="";
                        this.amount="";
                    })

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
  
    }
}
</script>
<style lang="css">
       
</style>