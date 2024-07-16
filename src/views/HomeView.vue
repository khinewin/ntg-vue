<template>
  <div class="home">
    <div class="container my-4">
      <div class="row mb-4">
        <div class="col-12">
          <div class="card shadow">
            <div
              class="card-body bg-secondary rounded-top p-0 pt-5 px-2 px-md-5"
            >
              <div class="bg-body text-center rounded-top p-5 mt-5 mx-2">
                <img
                  src="../assets/ntg-logo.png"
                  class="img-fluid"
                  style="width: 100px"
                />
                <h2 class="mb-2 title">New Tech Group Mawlamyine</h2>
                <h2 class="mb-2 lh-lg">
                  ကွန်ပျုတာ နှင့် နည်းပညာ ပညာရေးဝန်ဆောင်မှု
                </h2>
                <h6 class="mb-4 lh-lg">
                  ကွန်ပျုတာ နှင့် နည်းပညာ ပညာရပ်များအတွက် သင့်ဘဝကို
                  သုံညမှစပြီးကျွမ်းကျင်ပညာရှင်များအဆင့်ထိရောက်အောင်
                  တက်လှမ်းနိုင်ဖို့ ကျွန်တော်တို့ နှင့်အတူလက်တွဲလိုက်ပါ။
                </h6>
                <div class="row g-2 justify-content-center">
                  <div class="col-6 col-md-3">
                    <button class="btn btn-outline-primary">Computer</button>
                  </div>
                  <div class="col-6 col-sm-4 col-md-3">
                    <button class="btn btn-outline-success">Programming</button>
                  </div>                 
                  <div class="col-6 col-sm-4 col-md-3">
                    <button class="btn btn-outline-dark">
                      Networking
                    </button>
                  </div>
                  <div class="col-12 col-sm-12 col-md-3">
                    <button class="btn btn-outline-danger">
                      Web Development
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center" v-if="error" style="margin-top: 200px; margin-bottom: 250px">
            <div class="col-12">
                <h3 class="text-danger text-center"><i class="fa-solid fa-triangle-exclamation"></i></h3>
              <div class="text-center text-danger"> {{error}}</div>              
            </div>
            <div class="col-sm-4 col-md-2 d-grid">
              <button class="btn" @click="retryContent">Try again</button>
            </div>
      </div>
      <div
        class="row"
        v-if="showSpinner"
        style="margin-top: 200px; margin-bottom: 250px"
      >
        <div class="col-6">
          <div class="spinner-grow text-success float-end" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="col-6">
          <div class="spinner-grow text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="col-6">
          <div class="spinner-grow text-warning float-end" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="col-6">
          <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="text-center mt-2">
          <span>Fetching data from server...</span>
        </div>
      </div>
      <div class="row g-2" v-else>
        <div v-for="post in posts" :key="post.id" class="col-sm-6 col-md-4">
          <!--start col-->
          <div class="card shadow border-0 bg-secondary rounded-0 rounded-top">
            <div
              class="card-body p-0 pt-5 px-2 px-md-2 mt-5 mx-2 rounded-0 rounded-top"
            >
              <div class="bg-body rounded-0 rounded-top">
                <!-- <h5 class="card-title text-center mb-5 mt-4 title">{{ post.title }}</h5> -->
                <!-- <div v-html="post.text_body"></div> -->

                <div class="show-image-container rounded-top">
                  <vue-load-image>
                    <template v-slot:image>
                      <img :src="post.src" class="img-fluid show-image" />
                    </template>
                    <template v-slot:preloader>
                      <div class="row my-5 justify-content-center">
                        <div class="spinner-border text-warning" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>      
                        <div class="text-center mt-2">Loading image ...</div>                    
                      </div>
                    </template>
                    <template v-slot:error>Loading image failed.</template>
                  </vue-load-image>
                </div>
                <div class="row mt-2">
                    <div class="col-12">
                          <h6 class="text-center">{{post.title}}</h6>
                          <div class="text-center"><span>Fees </span> : <span class="badge bg-secondary">{{post.course_fees.toLocaleString('en-US')}} MMK</span></div>
                    </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col-12 d-grid mb-2 mt-md-2">
                    <button
                      type="button"
                      class="btn text-primary"
                      @click="viewDetails(post.id, post.title, post.src)"
                    >
                     Course details <i class="fa-solid fa-circle-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end col-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import db from "../firebase";

export default {  
  name: "HomeView",
  data() {
    return {
      showSpinner: false,
      loadingPromotion: false,
      posts: [],
      error: null,
      // promotion: []
    };
  },
  components: {},

  mounted() {
    this.getContents();
   
  },

  methods: {
    retryContent(){
          this.error=null;
          this.posts=[];
          this.getContents();
    },

    viewDetails(id, title, img_url) {
      this.$router.push({ name: "PostDetails", params: { id: id } });
    },

    async getContents() {
      this.showSpinner = true;
      const q = query(collection(db, "contents"), orderBy("content_id"));
      const snapShot = await getDocs(q);

      let snapData=snapShot._snapshot.docChanges;
      if(snapData.length <= 0){
        this.showSpinner = false;
        this.error="Something went wrong while retrieving data from the server."
      }else{
        snapShot.forEach((doc) => {
        let post = {
          id: doc.id,
          title: doc.data().title,
          text_body: doc.data().text_body,
          src: doc.data().src,
          course_fees: doc.data().course_fees,
        };
        this.posts.unshift(post);
      });
      this.showSpinner = false;
      this.error=null;
      }    
      
    },
  },
  computed: {},
};
</script>

<style>
.title {
  font-family: "Kanit", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #005b80 !important;
}

.show-image-container {
  overflow: hidden;
}
.show-image {
  transition: all 0.4s linear;
}
.show-image:hover {
  transform: scale(1.1);
  cursor: zoom-in;
}
</style>
