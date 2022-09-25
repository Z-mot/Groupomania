<template>
  <div class="vh-100">
    <div class="field container-fluid">
      <label class="label">Description</label>
      <div class="control">
        <textarea
          class="input form-control rounded"
          type="text"
          placeholder="Que voulez-vous dire?"
          v-model="postName"
        ></textarea>
      </div>
    </div>
	  <div class="field">
      <label class="label">Image</label>
      <div class="control">
        <input type="file" ref="file" @change="previewFiles" >
      </div>
    </div>
    <div class="control">
      <button class="button is-success" @click="savePost">Publier</button>
    </div>
  </div>
</template>
 
<script>
// import axios
import axios from "axios";

export default {
  name: "AddPost",
  data() {
    return {
      postName: "",
      postImage: "",
	    file: {},
      message: "",
    };
  },
  methods: {
	previewFiles() {
	  this.file = document.querySelector('input[type=file]')['files'][0];
    },
    async savePost() {
      try {
		  let base64String ="";
		  var vm = this;
		  var reader = new FileReader();
		  reader.onload = function () {
			base64String = reader.result.replace("data:", "").replace(/^.+,/, "");	  
			base64String = "data:image/png;base64,"+base64String ;	  
			var dataPost = {
									post_name: vm.postName,
									post_image: base64String,
                  user_id: localStorage.getItem("user_id"),
								  }
			vm.postData(dataPost);
		  }
		  reader.readAsDataURL(this.file);
      } catch (err) {
        console.log(err);
      }
    },
    async postData(params) {
      let webApiUrl = "http://localhost:5000/posts";
      let tokenStr = localStorage.getItem("token");
      await axios.post(webApiUrl, params, { headers: { "Authorization": `Bearer ${tokenStr}` } });
      this.postName = "";
      this.postImage = "";
      this.$router.push("/home");
    },
  },
};
</script>
 
<style>
</style>