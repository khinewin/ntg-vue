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
                        <div class="col-10 col-md-4">                   
                            <h4 class="h4 pt-1"> New Course</h4>
                        </div>
                        
                        <div class="col-md-7">
                                <h4 v-if="message" class="text-success text-center h4 pt-1"><i class="fa-solid fa-check"></i> {{message}}</h4>
                        </div>
                </div>
                
                 <div class="card shadow-sm mb-2 min-vh-100">
                        <div class="card-body">
                            <div class="row my-2 justify-content-center">
                                 <div class="col-sm-6">                             
                                    
                                        <form @submit.prevent="saveCourse">
                                            <div class="text-danger small ms-2 mb-2" v-if="errors.course_id">{{errors.course_id}}</div>
                                            <div class="form-floating mb-3">                                                
                                                <input @keydown="clearError('course_id')" type="number" class="form-control form-control-sm" v-model="course_id" :class="{'is-invalid' : errors.course_id}" id="title" placeholder="ID" >
                                                <label for="course_id" class="small">ID</label>
                                            </div>

                                            <div class="text-danger small ms-2 mb-2" v-if="errors.title">{{errors.title}}</div>
                                            <div class="form-floating mb-3">                                                
                                                <input @keydown="clearError('title')" type="text" class="form-control form-control-sm" v-model="title" :class="{'is-invalid' : errors.title}" id="title" placeholder="Title" >
                                                <label for="title" class="small">Title</label>
                                            </div>

                                            <div class="text-danger small ms-2 mb-2" v-if="errors.course_fees">{{errors.course_fees}}</div>
                                            <div class="form-floating mb-3">                                                
                                                <input @keydown="clearError('course_fees')" type="number" class="form-control form-control-sm" v-model="course_fees" :class="{'is-invalid' : errors.course_fees}" id="course_fees" placeholder="Course fees" >
                                                <label for="course_fees" class="small">Course fees</label>
                                            </div>

                                            <div class="text-danger small ms-2 mb-2" v-if="errors.category">{{errors.category}}</div>
                                            <div class="form-floating mb-3">
                                                <select class="form-select form-select-sm" id="batch" @click="clearError('batch')" v-model="category" :class="{'is-invalid' : errors.category}">
                                                    <option value="">Select category</option>    
                                                    <option v-for="c in categories" :key="c.id" :value="c.name">{{c.title}}</option>
                                                </select>
                                                <label for="batch" class="small">Category</label>
                                            </div>
                                     
                                            <div class="text-danger small ms-2 mb-2" v-if="errors.src">{{errors.src}}</div>
                                            <div class="form-floating mb-3">
                                                <input @keydown="clearError('src')" v-model="src"  type="url" class="form-control form-control-sm" :class="{'is-invalid' : errors.src}" id="src" placeholder="Image URL">
                                                <label for="src" class="small">Image URL</label>
                                            </div>                                   
                                       
                                           
                                            <div class="text-danger small ms-2 mb-2" v-if="errors.content">{{errors.content}}</div>
                                            <div class="mb-3">
                                                <label for="content" class="small">Content body</label>
                                                <ckeditor  :editor="editor" :config="editorConfig"   @keydown="clearError('content')" v-model="content" id="content"  placeholder="Content body"></ckeditor>
                                            </div>
                                            <div class="mb-3">
                                                <button type="submit" class="btn btn-primary btn-lg me-2" :class="{disabled: isLoading}">
                                                        <div class="spinner-border text-light spinner-border-sm" role="status" v-if="isLoading">
                                                            <span class="visually-hidden">Loading...</span>
                                                         </div>
                                                        Save
                                                    </button>
                                                    <router-link to="/admin/courses" class="btn  float-end" :class="{disabled: isLoading}"><i class="fa-solid fa-network-wired"></i> Courses</router-link>
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
import SideBar from '@/views/admin/partials/SideBar.vue'
//import { doc, setDoc, collection, query, getDocs, getDoc,orderBy, addDoc, where , updateDoc, getDocFromCache} from "firebase/firestore"; 
import db from "@/firebase/database"
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Image, ImageInsert, Link, List, MediaEmbed ,Table, TableToolbar,TableCellProperties, TableProperties, } from 'ckeditor5';
import CKEditor from '@ckeditor/ckeditor5-vue';
import { getDatabase, ref, set, onValue, remove,query, startAt, endAt, orderByChild } from 'firebase/database'

export default {
    name : "NewCourse",
    components: {
        SideBar, ckeditor: CKEditor.component
    },
    data(){
        return {
            categories : [
                {title : "Computer", name : "computer", active:false},
                {title : "Networking", name : "networking",active:false},
                {title : "Programming", name : "programming", active:false},
                {title : "Web Development", name : "web_development", active:false}
            ],
            title: "",
            src:"",
            category:"",
            content:"",
            category:"",
            course_fees:"",
            course_id:"",
            message: null,

            errors:{
                title: "",
                src:"",
                category:"",
                content:"",
                category:"",
                course_fees:"",
                course_id:"",
            },

            editor: ClassicEditor,
            editorData: '',
            editorConfig: {
              plugins: [ Bold, Essentials, Italic, Mention, Paragraph, Undo, Image, ImageInsert, Link, List,MediaEmbed,Table, TableToolbar,TableProperties, TableCellProperties ],
              toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', "ImageInsert", "link", "bulletedList", "numberedList", "mediaEmbed", "insertTable"],
              table: {
                    contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties' ]
              },
              mention: { 
                  // Mention configuration
              },
            },       
            
            isLoading: false,
        }
    },
    
    methods:{      
        onReady( editor ) {
       // console.log( "CKEditor5 Vue Component is ready to use!", editor );
      // CKEditorInspector.attach(editor);
      },
      onChange( data ) {
       // console.log( data );
      },
        async saveCourse(){
                this.checkValidation();
                if(!this.errors.src && !this.errors.content && !this.errors.title && !this.errors.course_id && !this.errors.category && !this.errors.course_fees){
                    this.isLoading=true;                
                    
                    const course={title: this.title, course_fees: this.course_fees, src: this.src, category: this.category, content: this.content, course_id: this.course_id, created_at: Date.now() }
                    const id = Date.now()
                    const query = ref(db, 'courses/' + id)
                    set(query, course)
                    .then(()=>{
                            this.message="The course has been created."
                            this.isLoading=false;              
                            this.src="";
                            this.content="";
                            this.title="";           
                            this.category="",
                            this.course_fees="",
                            this.course_id="" 
                    }).catch((err)=>{
                        this.message="Oops..., something went wrong."
                    })                
               
                
            }
        },
        clearError(error){
                switch(error){
                        case "title":
                            this.errors.title="";
                            break;
                         case "content":
                            this.errors.content="";
                            break;
                         case "course_fees":
                            this.errors.course_fees="";                           
                            break;     
                        case "category":
                            this.errors.category="";                           
                            break; 
                         case "src":
                            this.errors.src="";                           
                            break;   
                        case "course_id":
                            this.errors.course_id="";                           
                            break;    
                }
        },
        checkValidation(){
            if(!this.course_id){
                    this.errors.course_id="The ID field is required.";
            }else{
                this.errors.course_id="";
             } 
            if(!this.title){
                    this.errors.title="The title field is required.";
            }else{
                this.errors.title="";
             }   
             if(!this.content){
                    this.errors.content="The content  field is required.";
            }else{
                this.errors.content="";
             }   
             if(!this.src){
                    this.errors.src="The image URL field is required.";
            }else{
                this.errors.src="";
             }   
             if(!this.category){
                    this.errors.category="The category is selected required.";
            }else{
                this.errors.category="";
             } 
             if(!this.course_fees){
                    this.errors.course_fees="The course fees is required.";
            }else{
                this.errors.course_fees="";
             } 
                 
         
        },
      
    }
}
</script>
<style lang="css">
       
</style>