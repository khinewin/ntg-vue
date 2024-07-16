<template lang="">
    <div class="container-fluid home">
    <div class="row">
            <div class="col-md-2 d-none d-md-block sidebar-block">
                    <SideBar></SideBar>
            </div>
            <div class="col-md-10 content-block" style="min-height: 500px">
                <div class="row my-2">
                        <div class="col-12">
                                <h4><i class="fa-solid fa-plus-circle"></i> Add new post</h4>
                        </div>
                </div>
                
                 <div class="card shadow-sm mb-2">
                        <div class="card-body">
                            <div class="row my-2 justify-content-center">
                                 <div class="col-sm-6">                             
                                    
                                        <form @submit.prevent="savePost">
                                            <div class="text-danger small ms-2 mb-2" v-if="errors.title">{{errors.title}}</div>
                                            <div class="form-floating mb-3">                                                
                                                <input @keydown="clearError('title')" type="text" class="form-control form-control-sm" :class="{'is-invalid' : errors.title}" id="title" placeholder="Title" v-model="title">
                                                <label for="title" class="small">Title</label>
                                            </div>
                                     
                                            <div class="text-danger small ms-2 mb-2" v-if="errors.src">{{errors.src}}</div>
                                            <div class="form-floating mb-3">
                                                <input @keydown="clearError('src')" v-model="src" type="url" class="form-control form-control-sm" :class="{'is-invalid' : errors.src}" id="src" placeholder="Image URL">
                                                <label for="src" class="small">Image URL</label>
                                            </div>                                   
                                       
                                           
                                            <div class="text-danger small ms-2 mb-2" v-if="errors.text_body">{{errors.text_body}}</div>
                                            <div class="mb-3">
                                                <label for="text_body" class="small">Content body</label>
                                                <ckeditor :editor="editor"  @ready="onReady" @input="onChange"   @keydown="clearError('text_body')" v-model="text_body" id="text_body"  placeholder="Content body"></ckeditor>
                                            </div>
                                            <div class="mb-3">
                                                <button type="submit" class="btn btn-primary btn-lg me-2" :class="{disabled: isLoading}">
                                                        <div class="spinner-border text-light spinner-border-sm" role="status" v-if="isLoading">
                                                            <span class="visually-hidden">Loading...</span>
                                                         </div>
                                                        Save
                                                    </button>
                                                    <router-link to="/dashboard" class="btn  float-end" :class="{disabled: isLoading}"><i class="fa-solid fa-users-line"></i> Posts</router-link>
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
import { doc, setDoc, collection, query, getDocs, getDoc,orderBy, addDoc, where , updateDoc, getDocFromCache} from "firebase/firestore"; 
import db from "../firebase"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import CKEditor from "@ckeditor/ckeditor5-vue"

export default {
    name : "AppNewStudent",
    components: {
        SideBar,
        ckeditor: CKEditor.component
    },
    data(){
        return {
            editor: ClassicEditor,
            editorConfig: {
            // The configuration of the editor.
          
         toolbar: [ 'htmlEmbed', /* ... */ ],
       
            },
            src: "",
            text_body: "",
            title: "",
         
            errors: {
                src: "",
                text_body: "",
                title: "",
              
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
        async savePost(){
                console.log(this.text_body)
                this.checkValidation();
                if(!this.errors.src && !this.errors.text_body && !this.errors.title){
                    this.isLoading=true;                  
                    const saveCollection=collection(db, "contents", )
                    let saveData=await addDoc(saveCollection, {
                      
                    
                        })
                    if(saveData.id){
                        this.isLoading=false;              
                        this.src="";
                        this.text_body="";
                        this.title="";                 
                        this.showSpinner=false;
                    }
               
                
            }
        },
        clearError(error){
                switch(error){
                        case "name":
                            this.errors.src="";
                            break;
                         case "email":
                            this.errors.text_body="";
                            break;
                         case "phone":
                            this.errors.title="";                           
                            break;        
                }
        },
        checkValidation(){
            if(!this.title){
                    this.errors.title="The title field is required.";
            }else{
                this.errors.title="";
             }   
             if(!this.text_body){
                    this.errors.text_body="The content body field is required.";
            }else{
                this.errors.text_body="";
             }   
             if(!this.src){
                    this.errors.src="The image URL field is required.";
            }else{
                this.errors.src="";
             }        
         
        },
      
    }
}
</script>
<style lang="css">
       
</style>