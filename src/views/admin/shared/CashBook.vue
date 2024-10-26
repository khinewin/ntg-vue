<template lang="">
  <div class="container-fluid home min-vh-100">
    <div class="row">
           
            <div class="col-md-12 content-block">
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
                            <h4 class="h4 pt-1">Cash book</h4>
                        </div>                  
       
                        <div class="col-6 col-md-4">
                            <router-link to="/admin/revenue-task" class="btn"><i class="fa-solid fa-plus-circle"></i> Revenue</router-link>
                        </div>
                        <div class="col-6 col-md-4">
                               <router-link to="/admin/expenditure-task" class="btn"><i class="fa-solid fa-plus-circle"></i> Expenditure</router-link>
                         </div>                   
                             
                  </div>
                  
                <div class="row my-2 g-1">
                    <div class="col-md-6 col-lg-4">                        
                                <!--Filter rows-->
                                <div class="row g-0">
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fa-solid fa-filter"></i></span>
                                                <select v-model="filter_by_batch" @change="doFilter" class="form-select form-select-sm">
                                                    <option value="">Batchs</option>
                                                    <option v-for="bat in batchs" :value="bat[1].name">{{bat[1].name}}</option>
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
                            <div class="card min-vh-100">
                                <div class="card-body p-0 table-responsive">
                                <table class="table table-bordered  table-hover mb-0">
                                    <tbody>
                                        <tr class="table-primary text-center">
                                            <td colspan="2">Training income</td>
                                            <td colspan="4" class="table-secondary small">{{displayFilter}}</td>
                                        </tr>
                                        <tr class="small text-center table-secondary">
                                            <td>B#C</td>
                                            <td>Date</td>
                                            <td>Fees</td>
                                            <td>Deposit</td>
                                            <td>Teacher fees</td>
                                            <td>Gross profit</td>
                                        </tr>
                                        <tr>
                                            <td colspan="6" v-if="isLoading">
                                                <PreLoading />
                                            </td>
                                        </tr>
                                        <tr class="text-end small" v-if="trainings.length >0">
                                            <td colspan="2" >Total</td>
                                            <td>{{totalCourseFees.toLocaleString('en-US')}}</td>
                                            <td>{{totalDeposit.toLocaleString('en-US')}}</td>
                                            <td>{{totalTeacherFees.toLocaleString('en-US')}}</td>
                                            <td>{{totalTrainingProfit.toLocaleString('en-US')}}</td>
                                        </tr>
                                        <tr v-for="tr in trainings" :key="tr.id" class="small" v-if="trainings.length >0" @dblclick="goInfo(tr.student_id)">
                                            <td>{{tr.batch}}#{{tr.course.code.toUpperCase()}}</td>
                                            <td class="text-center">{{showTime(tr.created_at)}}</td>
                                            <td class="text-end">{{tr.course.course_fees.toLocaleString('en-US')}}</td>
                                            <td class="text-end" :class="[tr.deposit && calDeposit(tr.deposit) >= tr.course.course_fees ? 'text-success' : 'text-danger']"><span v-if="tr.deposit">{{calDeposit(tr.deposit).toLocaleString('en-US')}}</span><span v-else>0</span></td>
                                            <td class="text-end">{{(tr.course.course_fees * tr.course.teacherFees).toLocaleString('en-US')}}</td>
                                            <td class="text-end" :class="[tr.deposit && (tr.deposit) >= tr.course.course_fees ? 'text-success' : 'text-danger']" ><span v-if="tr.deposit">{{(calDeposit(tr.deposit) - (tr.course.course_fees * tr.course.teacherFees)).toLocaleString('en-US')}}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                     
                            </div>
                     
                        </div>
                    </div>
               
                <div class="col-md-6 col-lg-4" >
                    <div class="row g-0">
                        <div class="col-lg-6">
                            <div class="input-group">
                                <span class="input-group-text"><i class="fa-solid fa-filter"></i></span>
                                    <input v-model="filter_revenue_start_date" type="date" class="form-control form-control-sm" @change="doFilterRevenue" />  
                                <span class="input-group-text " role="button" @click="clearFilterRevenue"><i class="fa-solid fa-circle-xmark"></i></span>                          
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="input-group">
                                <span class="input-group-text"><i class="fa-solid fa-filter"></i></span>
                                    <input v-model="filter_revenue_end_date" type="date" class="form-control form-control-sm" @change="doFilterRevenue" />  
                                <span class="input-group-text" role="button" @click="clearFilterRevenue"><i class="fa-solid fa-circle-xmark"></i></span>                          
                            </div>
                        </div>
                    </div>                             
                    <div class="card shadow min-vh-100">                        
                        <div class="card-body table-responsive p-0">
                            <table class="table table-bordered  mb-0 table-hover">
                                <tbody >
                                    <tr class="table-success">
                                        <td colspan="3">Revenue account</td>
                                    </tr>
                                    <tr class="small text-center table-secondary">                                       
                                        <td>Date</td>
                                        <td>Tasks</td>
                                        <td>Amount</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" v-if="isLoading">
                                            <PreLoading />
                                        </td>
                                    </tr>
                                    <tr class="text-end small" v-if="revenueTasks.length > 0">
                                        <td colspan="2" >Total</td>
                                        <td>{{totalRevenue.toLocaleString('en-US')}}</td>                                        
                                    </tr>
                                    <tr class="small" v-for="r in revenueTasks" :key="r.id" v-if="revenueTasks.length > 0">
                                        <td>{{showTime(r.task_at)}}</td>
                                        <td>{{r.task_name}}</td>
                                        <td class="text-end">{{r.amount.toLocaleString('en-US')}}</td>                                       
                                    </tr>
                                </tbody>
                               
                            </table>
                        </div>
                    </div>
                
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="row g-0">
                        <div class="col-lg-6">
                            <div class="input-group">
                                <span class="input-group-text"><i class="fa-solid fa-filter"></i></span>
                                    <input v-model="filter_expenditure_start_date" type="date" class="form-control form-control-sm" @change="doFilterExpenditure" />  
                                <span class="input-group-text " role="button" @click="clearFilterExpenditure"><i class="fa-solid fa-circle-xmark"></i></span>                          
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="input-group">
                                <span class="input-group-text"><i class="fa-solid fa-filter"></i></span>
                                    <input v-model="filter_expenditure_end_date" type="date" class="form-control form-control-sm" @change="doFilterExpenditure" />  
                                <span class="input-group-text" role="button" @click="clearFilterExpenditure"><i class="fa-solid fa-circle-xmark"></i></span>                          
                            </div>
                        </div>
                    </div>                             
                    <div class="card shadow min-vh-100">
                        <div class="card-body table-responsive p-0">
                            <table class="table table-bordered mb-0 table-hover">
                                <tbody >
                                    <tr class="table-danger">
                                        <td colspan="3">Expenditure account</td>
                                    </tr>
                                    <tr class="small text-center table-secondary">                                       
                                        <td>Date</td>
                                        <td>Tasks</td>
                                        <td>Amount</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" v-if="isLoading">
                                            <PreLoading />
                                        </td>
                                    </tr>
                                    <tr class="text-end small" v-if="expenditureTasks.length > 0">
                                        <td colspan="2" >Total</td>
                                        <td>{{totalExpenditure.toLocaleString('en-US')}}</td>                                        
                                    </tr>
                                    <tr class="small" v-for="s in expenditureTasks" :key="s.id" v-if="expenditureTasks.length > 0">
                                        <td>{{showTime(s.task_at)}}</td>
                                        <td>{{s.task_name}}</td>
                                        <td class="text-end">{{s.amount.toLocaleString('en-US')}}</td>
                                        
                                    </tr>
                                </tbody>
                                
                            </table>
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
    name : "CashBook",
    components: {
        SideBar,PreLoading
    },
    data(){
        return {
            error:null,
            isLoading:true,

            expenditureTasks :[],
            totalExpenditure:0,

            revenueTasks:[],
            totalRevenue:0,
         
           
           batchs:[],        
        
           trainings : [],
           trainingsData:[],
           totalCourseFees : 0,
           totalDeposit:0,
           totalTeacherFees:0,
           totalTrainingProfit:0,        

           filter_by_batch:"",
           filter_by_course:"",
           filter_start_date:"",
           filter_end_date:"",
           displayFilter:"",
         
           filter_revenue_start_date:"",
           filter_revenue_end_date:"",

           filter_expenditure_start_date:"",
           filter_expenditure_end_date:"",
        }
    },

    created() {
     
        this.$watch(()=>
            this.$route,
            this.fetchBatch,       
            {immediate:true}
        )      
        this.$watch(()=>
            this.$route,
            this.fetchExpenditureTask,       
            {immediate:true}
        )   
        this.$watch(()=>
            this.$route,
            this.fetchRevenueTask,       
            {immediate:true}
        ) 
        
    },

    watch: {
   
  },
    computed:{
       select_courses(){
        return this.$store.getters.select_courses;
       }
        
    },
   
    methods:{  
        goInfo(id){            
            this.$router.push({name: "StudentInfo", params: {id:id}})
        },
        doFilterRevenue(){
            this.fetchRevenueTask();
        },
        clearFilterRevenue(){
                this.filter_revenue_start_date="";
                this.filter_revenue_end_date="";
                this.fetchRevenueTask();
        },
        doFilterExpenditure(){
            this.fetchExpenditureTask();
        },
        clearFilterExpenditure(){
                this.filter_expenditure_start_date="";
                this.filter_expenditure_end_date="";
                this.fetchExpenditureTask();
        },
        doFilter(){
            this.showTrainingRevenue();
        },
        clearFilter(){
            this.filter_by_batch="";
            this.filter_by_course="";
            this.filter_start_date="";
            this.filter_end_date="";
            this.showTrainingRevenue();
        },
   
        showTime(t){
           const options = { year: '2-digit', month: 'numeric', day: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('en-UK', options).format(t);
            return formattedDate;
        },

        calDeposit(dbs){
            return dbs.reduce((accu, cur)=>accu + cur.amount,0)
        },       
    
         fetchBatch(){
            const query_url = query(ref(db, 'batchs'))
            onValue(query_url, (snapshot) => {
                const data = snapshot.val()
                if(data===null) return;
                const batchs=Object.entries(data);
                this.batchs=batchs;
            })         
            
            this.fetchTrainingRevenueTask();
        },

        showTrainingRevenue(){
            if(this.filter_start_date && this.filter_end_date && this.filter_by_batch && this.filter_by_course){
                const newStartDate= +new Date(this.filter_start_date)
                const newEndDate=+ new Date(this.filter_end_date);
                const data= this.trainingsData.filter((tr)=>{     
                        return    tr.created_at >= newStartDate && tr.created_at <= newEndDate && tr.course.code===this.filter_by_course && tr.batch===this.filter_by_batch;
                })
                this.displayFilter=`${this.filter_by_batch}#${this.filter_by_course.toUpperCase()}, ${this.showTime(newStartDate)} - ${this.showTime(newEndDate)}`
                this.trainings=data;
            }else
              if(this.filter_start_date && this.filter_end_date && this.filter_by_batch){
                const newStartDate= +new Date(this.filter_start_date)
                const newEndDate=+ new Date(this.filter_end_date);
                const data= this.trainingsData.filter((tr)=>{     
                        return    tr.created_at >= newStartDate && tr.created_at <= newEndDate && tr.batch===this.filter_by_batch;
                })
                this.displayFilter=`${this.filter_by_batch}# , ${this.showTime(newStartDate)} - ${this.showTime(newEndDate)}`
                this.trainings=data;
            }else 
             if(this.filter_start_date && this.filter_end_date && this.filter_by_course){
                const newStartDate= +new Date(this.filter_start_date)
                const newEndDate=+ new Date(this.filter_end_date);
                const data= this.trainingsData.filter((tr)=>{     
                        return    tr.created_at >= newStartDate && tr.created_at <= newEndDate && tr.course.code===this.filter_by_course;
                })
                this.displayFilter=`${this.filter_by_course.toUpperCase()}, ${this.showTime(newStartDate)} - ${this.showTime(newEndDate)}`
                this.trainings=data;
            }else 
            if(this.filter_start_date && this.filter_end_date){  //start date and end date
                const newStartDate=new Date(this.filter_start_date).getTime();
                const newEndDate= new Date(this.filter_end_date).getTime();
                console.log(newStartDate)
               const data= this.trainingsData.filter((tr)=>{   
                       return   tr.created_at >= newStartDate && tr.created_at <= newEndDate;
                })
                        
               this.displayFilter=`${this.showTime(newStartDate)} - ${this.showTime(newEndDate)}`
                this.trainings=data;
            }else if(this.filter_by_batch && this.filter_by_course){
                const data= this.trainingsData.filter((tr)=>{
                return tr.course.code===this.filter_by_course && tr.batch===this.filter_by_batch;
                })
                this.trainings=data;
                this.displayFilter=`${this.filter_by_batch}#${this.filter_by_course.toUpperCase()}`

            }else 
            if(this.filter_by_batch){
                const data= this.trainingsData.filter((tr)=>{
                return tr.batch===this.filter_by_batch;
                })
                this.trainings=data;
                this.displayFilter=`${this.filter_by_batch}#`

            }else
             if(this.filter_by_course){
                const data= this.trainingsData.filter((tr)=>{
                return tr.course.code===this.filter_by_course;
                })
                this.trainings=data;
                this.displayFilter=`${this.filter_by_course.toUpperCase()}`
            }else{
                const date = new Date();
                const firstDay = +new Date(date.getFullYear(), date.getMonth(), 1);
                const lastDay = +new Date(date.getFullYear(), date.getMonth() + 1, 0);
                const data= this.trainingsData.filter((tr)=>{     
                        return    tr.created_at >= firstDay && tr.created_at <= lastDay;
                })
                this.displayFilter=`${this.showTime(firstDay)} - ${this.showTime(lastDay)}`
                this.trainings=data;
            }      
            this.calculateTrainingProfit();     
        },
        calculateTrainingProfit(){
                this.totalCourseFees=0;
                this.totalDeposit=0;
                this.totalTeacherFees=0;
                this.totalTrainingProfit=0;   

                this.trainings.map((res)=>{                         
                    this.totalCourseFees +=res.course.course_fees;
                    this.totalDeposit +=res.deposit ? res.deposit.reduce((accu, cur)=>accu + cur.amount,0) : 0;
                    this.totalTeacherFees += res.course.course_fees * res.course.teacherFees;
                    this.totalTrainingProfit = this.totalDeposit - this.totalTeacherFees;                             
                })
        },
         fetchTrainingRevenueTask(){           
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
        
        fetchExpenditureTask(){
            this.expenditureTasks=[];
            let query_url="";
            if(this.filter_expenditure_start_date && this.filter_expenditure_end_date){
                const startDate=new Date(this.filter_expenditure_start_date).getTime();
                const endDate=new Date(this.filter_expenditure_end_date).getTime();
                query_url = query(ref(db, 'expenditures'), orderByChild("task_at"), startAt(startDate), endAt(endDate))
                
            }else{
                query_url = query(ref(db, 'expenditures'))               
            }   
            onValue(query_url, (snapshot) => {
                    const data = snapshot.val()
                    if(data===null) return;
                    const result=Object.values(data);
                    this.expenditureTasks=result.reverse();
                    this.totalExpenditure=result.reduce((accu, cur)=>accu + cur.amount,0)
            })          
         
        },
       
         fetchRevenueTask(){
            this.revenueTasks=[];
            let query_url="";
            if(this.filter_revenue_start_date && this.filter_revenue_end_date){
                const startDate=new Date(this.filter_revenue_start_date).getTime();
                const endDate=new Date(this.filter_revenue_end_date).getTime();
                query_url = query(ref(db, 'revenues'), orderByChild("task_at"), startAt(startDate), endAt(endDate))
                
            }else{
                query_url = query(ref(db, 'revenues'))               
            }   
            onValue(query_url, (snapshot) => {
                    const data = snapshot.val()
                    if(data===null) return;
                    const result=Object.values(data);
                    this.revenueTasks=result.reverse();
                    this.totalRevenue=result.reduce((accu, cur)=>accu + cur.amount,0)
            }) 
           
        },
   
    }
}
</script>
<style lang="css">
       
</style>