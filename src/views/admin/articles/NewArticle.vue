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
                        <div class="col-10 col-md-4">                   
                            <h4 class="h4 pt-1"> New article</h4>
                        </div>
                        
                        <div class="col-md-7">
                                <h4 v-if="message" class="text-success text-center h4 pt-1"><i class="fa-solid fa-check"></i> {{message}}</h4>
                        </div>
                </div>
                
                 <div class="card shadow-sm mb-2">
                        <div class="card-body">
                            <div class="row my-2 justify-content-center">
                                 <div class="col-sm-6">                             
                                    
                                        <form @submit.prevent="savePost">
                                         
                                            <div class="text-danger small ms-2 mb-2" v-if="errors.title">{{errors.title}}</div>
                                            <div class="form-floating mb-3">                                                
                                                <input @keydown="clearError('title')" type="text" class="form-control form-control-sm" v-model="title" :class="{'is-invalid' : errors.title}" id="title" placeholder="Title" >
                                                <label for="title" class="small">Title</label>
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
                                                <label for="text_body" class="small">Article body</label>
                                                <ckeditor :editor="editor" :config="editorConfig"  @keydown="clearError('content')" v-model="content" id="content"  placeholder="Content body"></ckeditor>
                                            </div>
                                            <div class="mb-3">
                                                <button type="submit" class="btn btn-primary btn-lg me-2" :class="{disabled: isLoading}">
                                                        <div class="spinner-border text-light spinner-border-sm" role="status" v-if="isLoading">
                                                            <span class="visually-hidden">Loading...</span>
                                                         </div>
                                                        Save
                                                    </button>
                                                    <router-link to="/admin/articles" class="btn  float-end" :class="{disabled: isLoading}"><i class="fa-solid fa-pen-nib"></i> Articles</router-link>
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
import { doc, setDoc, collection, query, getDocs, getDoc,orderBy, addDoc, where , updateDoc, getDocFromCache} from "firebase/firestore"; 
import db from "@/firebase"
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Image, ImageInsert, Link, List, MediaEmbed ,Table, TableToolbar,TableCellProperties, TableProperties, } from 'ckeditor5';

  import { Timestamp } from "firebase/firestore";
  import CKEditor from '@ckeditor/ckeditor5-vue';

export default {
    name : "NewArticle",
    components: {
        SideBar,ckeditor: CKEditor.component
    },
    data(){
        return {
            categories : [
                {title : "Computer", name : "computer", active:false},
                {title : "Networking", name : "networking",active:false},
                {title : "Programming", name : "programming", active:false},
                {title : "Database", name : "database", active:false}
            ],
            title: "",
            src:"",
            category:"",
            content:"",
            category:"",
            created_at:"",
            message: null,

            errors:{
                title: "",
                src:"",
                category:"",
                content:"",
                category:"",
                created_at:"",
            },
            editor: ClassicEditor,
            editorData: '',
            editorConfig: {
              plugins: [ Bold, Essentials, Italic, Mention, Paragraph, Undo, Image, ImageInsert, Link, List,MediaEmbed,Table, TableToolbar,TableProperties, TableCellProperties ],
              toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', "ImageInsert", "link", "bulletedList", "numberedList", "mediaEmbed", "insertTable"],
              table: {
                    contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties' ]
              },
              link: {
            // Automatically add target="_blank" and rel="noopener noreferrer" to all external links.
                addTargetToExternalLinks: true,

                // Let the users control the "download" attribute of each link.
                decorators: [
                    {
                        mode: 'manual',
                        label: 'Downloadable',
                        attributes: {
                            download: 'download',
                        }
                    }
                    ]
                },
              mention: { 
                  // Mention configuration
              },
            },
        
         
         
            isLoading: false,
        }
    },
   
    methods:{      
      
        async savePost(){
                this.checkValidation();
                if(!this.errors.src && !this.errors.content && !this.errors.title && !this.errors.category){
                    this.isLoading=true;                  
                    const saveCollection=collection(db, "articles", )
                    let saveData=await addDoc(saveCollection, {
                            title: this.title,
                            src: this.src,
                            category: this.category, 
                            content: this.content,
                            created_at: Timestamp.fromDate(new Date())                     
                    
                        })
                    if(saveData.id){
                        this.message="The article has been created."
                        this.isLoading=false;              
                        this.src="";
                        this.content="";
                        this.title="";           
                        this.category="";
                        this.created_at="";
                    }
               
                
            }
        },
        clearError(errors){
                switch(errors){
                        case "title":
                            this.errors.title="";
                            break;
                         case "text_body":
                            this.errors.text_body="";
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
                        case "content_id":
                            this.errors.content_id="";                           
                            break;    
                }
        },
        checkValidation(){
         
            if(!this.title){
                    this.errors.title="The title field is required.";
            }else{
                this.errors.title="";
             }   
             if(!this.content){
                    this.errors.content="The article body field is required.";
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
                           
         
        },
      
    }
}
</script>
<style lang="css">
       
</style>