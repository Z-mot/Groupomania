<template>
  <div>
    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea
          class="input form-control"
          type="text"
          aria-label="Zone de saisie de texte"
          :placeholder="postName"
          v-model="postName"
        ></textarea>
      </div>
    </div>
    <div class="field col">
      <label class="label container-fluid">Image</label>
      <img id="images" :src="postImage" alt="" />
      <div class="control">
        <input type="file" ref="file" aria-label="Bouton pour charger une image" id="file" @change="previewFiles">
      </div>
    </div>
    <div class="control">
      <button class="button is-success" aria-label="Bouton pour mettre à jour" @click="updatePost">Mettre à jour</button>
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
  // Exécuter la méthode lors de la création de l'élément
  created: function () {
    this.showPostById();
  },
  methods: {
    // Méthode Vue pour afficher le nom du fichier avant l'upload
    previewFiles() {
      this.file = document.querySelector('input[type=file]')['files'][0];
    },
    // Méthode Vue pour la récupération d'un Post
    async showPostById() {
      try {
        let webApiUrl = `http://localhost:5000/posts/${this.$route.params.id}`;
        let tokenStr = localStorage.getItem("token");
        // Toujours envoyer dans le header de la requête le token pour que le middleware d'authentification du backend puisse autoriser l'accès
        const response = await axios.get(webApiUrl, { headers: { "Authorization": `Bearer ${tokenStr}` } });
        this.postName = response.data.post_name,
        this.postImage = response.data.post_image;
        this.userId = response.data.user_id;
      } catch (err) {
        console.log(err);
      }
    },
    
    // Méthode Vue permettant de mettre à jour le post
    async updatePost() {
      try {
        // si la modification porte uniquement sur le texte on met à jour que le texte
        if (document.getElementById("file").value == "") {
          let vm = this;
          let dataPost = {
            post_name: vm.postName,
            post_image: vm.postImage,
            user_id: this.userId,
          }
          vm.updateData(dataPost);
        } else {
          // sinon on met à jour la totalité du post avec la nouvelle image (même éthode que dans le composant AddPost)
          let base64String = "";
          let vm = this;
          let reader = new FileReader();
          reader.onload = function () {
            base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
            base64String = "data:image/png;base64," + base64String;
            let dataPost = {
              post_name: vm.postName,
              post_image: base64String,
              user_id: vm.userId,
            }
          vm.updateData(dataPost);
          }
          reader.readAsDataURL(this.file);
        }
      } catch (err) {
        console.log(err);
      }
    },

    // Méthode Vue pour la mise à jour d'un Post
    async updateData(params) {
      try {
        let webApiUrl = `http://localhost:5000/posts/${this.$route.params.id}`;
        let tokenStr = localStorage.getItem("token");
        // Toujours envoyer dans le header de la requête le token pour que le middleware d'authentification du backend puisse autoriser l'accès
        await axios.put(webApiUrl, params, { headers: { "Authorization": `Bearer ${tokenStr}` } });
        this.postName = "";
        this.postImage = "";
        // On envoi l'utilisateur sur la page d'accueil
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