<template>
  <div>
    <router-link :to="{ name: 'Create' }" class="button is-success mt-5 " aria-label=" Ajouter un nouveau post"><i class="fa-solid fa-plus"></i> Ajouter un nouveau post </router-link>
    <div class=" container-fluid my-5" v-for="item in items" :key="item.post_id">
      <div class="container  border rounded shadow pb-2  add">
        <div class="container-fluid d-flex justify-content-end pt-2">
          <div class=" d-flex pr-4" v-if="user_id == item.user_id || statut == 1">
            <router-link :to="{ name: 'Edit', params: { id: item.post_id } }" class="button is-info is-small" aria-label=" Modifier le post"><i class="fa-regular fa-pen-to-square lead text-dark"></i>
            </router-link>
          </div>
          <div class="d-flex" v-if="user_id == item.user_id || statut == 1">
            <a class="button is-danger is-small" aria-label="Supprimer le post"  role="button" @click="deletePost(item.post_id)">
              <i class="fa-solid fa-trash lead text-dark"></i></a>
          </div>
        </div>
        <div class="bg-transparent rounded my-1 text-dark font-weight-bold">{{ item.post_name }}</div>
        <div class="d-flex justify-content-end my-1 text-dark font-italic" v-if="statut == 1"> post by User {{ item.user_id}}</div>
        <img class="rounded my-1 img-fluid"  :src="item.post_image" />
        <div class="container-fluid d-flex">
          <div class="container lead" role="button" aria-label="Ajouter un like" @click="like(item.post_id)">
            <i class="fa-regular fa-thumbs-up text-dark"></i>
            <div class="success">{{ item.nombre_like }}</div>
          </div>
          <div class="container lead" role="button" aria-label="Ajouter un dislike" @click="dislike(item.post_id)">
            <i class="fa-regular fa-thumbs-down text-dark"></i>
            <div class="">{{ item.nombre_dislike }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// importation axios
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
  // Ex??cuter la m??thode lors de la cr??ation de l'??l??ment
  created() {
    this.getPost();
  },

  methods: {
    // M??thode Vue pour r??cup??rer tous les Posts
    async getPost() {
      try {
        let webApiUrl = "http://localhost:5000/posts";
        let tokenStr = localStorage.getItem("token");
        // Toujours envoyer dans le header de la requ??te le token pour que le middleware d'authentification du backend puisse autoriser l'acc??s
        const response = await axios.get(webApiUrl, { headers: { "Authorization": `Bearer ${tokenStr}` } });
        this.items = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    //  M??thode Vue pour supprimer un Post
    async deletePost(id) {
      try {
        let webApiUrl = `http://localhost:5000/posts/${id}`;
        let tokenStr = localStorage.getItem("token");
        // Toujours envoyer dans le header de la requ??te le token pour que le middleware d'authentification du backend puisse autoriser l'acc??s
        await axios.delete(webApiUrl, { headers: { "Authorization": `Bearer ${tokenStr}` } });
        this.getPost();
      } catch (err) {
        console.log(err);
      }
    },

    // M??thode Vue pour liker un post
    async like(id) {
      // Objet contenant les donn??es envoy??es dans le corps de la requ??te vers l'API
      let params = {
        vote: 1,
        post_id: id,
        user_id: localStorage.getItem("user_id")
      };
      try {
        let webApiUrl = "http://localhost:5000/posts/vote";
        let tokenStr = localStorage.getItem("token");
        // Toujours envoyer dans le header de la requ??te le token pour que le middleware d'authentification du backend puisse autoriser l'acc??s
        await axios.post(webApiUrl, params, { headers: { "Authorization": `Bearer ${tokenStr}` }})
        .then(response => {
          console.log(response.data.message);
        });
        this.getPost();
      } catch (err) {
        console.log(err);
      }
    },

    // M??thode Vue pour disliker un post
    async dislike(id) {
      // Objet contenant les donn??es envoy??es dans le corps de la requ??te vers l'API
      let params = {
        vote: -1,
        post_id: id,
        user_id: localStorage.getItem("user_id")
      };
      try {
        let webApiUrl = "http://localhost:5000/posts/vote";
        let tokenStr = localStorage.getItem("token");
        // Toujours envoyer dans le header de la requ??te le token pour que le middleware d'authentification du backend puisse autoriser l'acc??s
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