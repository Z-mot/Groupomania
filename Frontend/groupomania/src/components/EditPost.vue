<template>
  <div>
    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea
          class="input form-control"
          type="text"
          :placeholder="postName"
          v-model="postName"
        ></textarea>
      </div>
    </div>
    <div class="field col">
      <label class="label container">Image</label>
      <img id="images" :src="postImage" alt="" />
      <div class="control">
        <input type="file" ref="file" @change="previewFiles">
      </div>
    </div>
    <div class="control">
      <button class="button is-success" @click="updatePost">Mettre à jour</button>
    </div>
  </div>
</template>
 
<script>
// import axios
import axios from "axios";
 
export default {
  name: "EditPost",
  data() {
    return {
      postName: "",
      postImage: "",
      userId: "",
    };
  },
  created: function () {
    this.showPostById();
  },
  methods: {
    previewFiles() {
      this.file = document.querySelector('input[type=file]')['files'][0];
    },
    // Get Product By Id
    async showPostById() {
      try {
        let webApiUrl = `http://localhost:5000/posts/${this.$route.params.id}`;
        let tokenStr = localStorage.getItem("token");
        const response = await axios.get(webApiUrl, { headers: { "Authorization": `Bearer ${tokenStr}` } });
        this.postName = response.data.post_name,
        this.postImage = response.data.post_image;
        this.userId = response.data.user_id;
      } catch (err) {
        console.log(err);
      }
    },
 
    // Update product
    async updatePost() {
      let params = {
        post_name: this.postName,
        post_image: this.postImage,
        user_id: this.userId,
      };
      try {
        let webApiUrl = `http://localhost:5000/posts/${this.$route.params.id}`;
        let tokenStr = localStorage.getItem("token");
        await axios.put(webApiUrl, params, { headers: { "Authorization": `Bearer ${tokenStr}` } });
        this.postName = "";
        this.postImage = "";
        this.$router.push("/home");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
 
<style>
</style>