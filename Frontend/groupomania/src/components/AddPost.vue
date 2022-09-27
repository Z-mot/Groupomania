<template>
  <div class="vh-100">
    <div class="field container-fluid">
      <label class="label">Description</label>
      <div class="control">
        <textarea
          class="input form-control rounded"
          type="text"
          aria-label="Zone de saisie de texte"
          placeholder="Que voulez-vous dire?"
          v-model="postName"
        ></textarea>
      </div>
    </div>
	  <div class="field">
      <label class="label">Image</label>
      <div class="control">
        <input type="file" ref="file" id="file" aria-label="Bouton pour charger le fichier" @change="previewFiles" >
      </div>
    </div>
    <div class="control">
      <button class="button is-success" aria-label="Bouton pour publier" @click="savePost">Publier</button>
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
    // Méthode Vue pour afficher le nom du fichier avant l'upload
	  previewFiles() {
	  this.file = document.querySelector('input[type=file]')['files'][0];
    },

    //Méthode Vue pour déterminer si les données à upload seront que du texte ou des images et du texte
    async savePost() {
      try {
        // si le post n'a pas d'image, on upload que le texte
        if (document.getElementById("file").value == "" ) {
          let vm = this;
          let dataPost = {
                      post_name: vm.postName,
                      user_id: localStorage.getItem("user_id"),
                      }
          vm.postData(dataPost);
          } else {
            // sinon on upload le texte et l'image (le texte peut être nul)
            let base64String ="";
            let vm = this;
            let reader = new FileReader();
            reader.onload = function () {
            base64String = reader.result.replace("data:", "").replace(/^.+,/, "");	  
            base64String = "data:image/png;base64,"+base64String; 
            let dataPost = {
                      post_name: vm.postName,
                      post_image: base64String,
                      user_id: localStorage.getItem("user_id"),
                      }
            vm.postData(dataPost);
            }
            reader.readAsDataURL(this.file);
          }
      } catch (err) {
        console.log(err);
      }
    },

    // Méthode Vue pour Upload les données dans la BDD
    async postData(params) {
      let webApiUrl = "http://localhost:5000/posts";
      let tokenStr = localStorage.getItem("token");
      await axios.post(webApiUrl, params, { headers: { "Authorization": `Bearer ${tokenStr}` } });
      this.postName = "";
      this.postImage = "";
      // On envoi l'utilisateur sur la page d'accueil
      this.$router.push("/home");
    },
  },
};
</script>
 
<style>
</style>