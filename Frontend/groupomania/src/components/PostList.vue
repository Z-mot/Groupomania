<template>
  <div>
    <router-link :to="{ name: 'Create' }" class="button is-success mt-5 " ><i class="fa-solid fa-plus"></i> Ajouter un nouveau post </router-link>
    <div class=" container-fluid my-5" v-for="item in items" :key="item.post_id">
      <div class="container  border rounded shadow pb-2  add">
        <div class="container-fluid d-flex justify-content-end pt-2">
          <div class=" d-flex pr-4" v-if="user_id == item.user_id || statut == 1">
            <router-link :to="{ name: 'Edit', params: { id: item.post_id } }" class="button is-info is-small "><i class="fa-regular fa-pen-to-square lead text-dark"></i>
            </router-link>
          </div>
          <div class="d-flex" v-if="user_id == item.user_id || statut == 1">
            <a class="button is-danger is-small" role="button" @click="deletePost(item.post_id)">
              <i class="fa-solid fa-trash lead text-dark"></i></a>
          </div>
        </div>
        <div class="bg-transparent rounded my-1 text-dark font-weight-bold">{{ item.post_name }}</div>
        <div class="d-flex justify-content-end my-1 text-dark font-italic" v-if="statut == 1"> post by User {{ item.user_id}}</div>
        <img class="rounded my-1 img-fluid" id="images" :src="item.post_image" />
        <div class="container-fluid d-flex">
          <div class="container lead" role="button" @click="like(item.post_id)">
            <i class="fa-regular fa-thumbs-up text-dark"></i>
            <div class="success">{{ item.nombre_like }}</div>
          </div>
          <div class="container lead" role="button" @click="dislike(item.post_id)">
            <i class="fa-regular fa-thumbs-down text-dark"></i>
            <div class="">{{ item.nombre_dislike }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios
import axios from "axios";

export default {
  name: "PostList",
  data() {
    return {
      items: [],
      statut: localStorage.getItem("statut"),
      user_id: localStorage.getItem('user_id'),
    };
  },

  created() {
    this.getPost();
  },

  methods: {
    // Get All Post
    async getPost() {
      try {
        let webApiUrl = "http://localhost:5000/posts";
        let tokenStr = localStorage.getItem("token");
        const response = await axios.get(webApiUrl, { headers: { "Authorization": `Bearer ${tokenStr}` } });
        this.items = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    // Delete Post
    async deletePost(id) {
      try {
        let webApiUrl = `http://localhost:5000/posts/${id}`;
        let tokenStr = localStorage.getItem("token");
        await axios.delete(webApiUrl, { headers: { "Authorization": `Bearer ${tokenStr}` } });
        this.getPost();
      } catch (err) {
        console.log(err);
      }
    },

    // Like Post
    async like(id) {
      let params = {
        vote: 1,
        post_id: id,
        user_id: localStorage.getItem("user_id")
      };
      try {
        let webApiUrl = "http://localhost:5000/posts/vote";
        let tokenStr = localStorage.getItem("token");
        await axios.post(webApiUrl, params, { headers: { "Authorization": `Bearer ${tokenStr}` }})
        .then(response => {
          console.log(response.data.message);
        });
        this.getPost();
      } catch (err) {
        console.log(err);
      }
    },

    async dislike(id) {
      let params = {
        vote: -1,
        post_id: id,
        user_id: localStorage.getItem("user_id")
      };
      try {
        let webApiUrl = "http://localhost:5000/posts/vote";
        let tokenStr = localStorage.getItem("token");
        await axios.post(webApiUrl, params, { headers: { "Authorization": `Bearer ${tokenStr}` } })
        .then(response => {
          console.log(response.data.message);
        });
        this.getPost();
      } catch (err) {
        console.log(err);
      }
    },
  }
};
</script>
 
<style>
.add {
    background-color: #FFD7D7;
  }
</style>