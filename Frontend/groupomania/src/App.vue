<template>
  <div id="app">
    <div id="nav" class="container-fluid d-flex mb-5">
      <div class="v-25 h-25">
        <img src="../src/assets/icon-left-font.svg" class="v-25 h-25  position-absolute " style="left: -1vw ; top: -10vh" alt="Logo Groupomania">
      </div>
      <div class="container-fluid d-flex justify-content-end"
        v-if="['Create', 'Edit', 'PostList'].includes($route.name)">
        <router-link to="/home">Accueil</router-link>
        <span class="d-flex mr-2 ml-2"> | </span>
        <a role="button" @click="logOut()">Déconnexion</a>
      </div>
      <div class="container-fluid d-flex justify-content-end" v-if="['Signup'].includes($route.name)">
        <router-link to="/">Se connecter</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>
		
<script>

export default {
  name: "LogOut",
  data() {
    return {}
  },

  methods: {
    // Création de la méthode Vue permettant à un utilisateur de se déconnecter
    async logOut() {
      try {
        // On efface le local storage (dont le token)
        localStorage.clear();
        // On renvoit à la page de connexion
        this.$router.push("/")
      } catch (err) {
        console.log(err);
      }
    }
  }
}


</script>


<style>
#app {
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4E5166;
  background-color: white;
}

#nav {
  padding: 5vh;
}

#nav a {
  font-weight: bold;
  color: #4E5166;
}

#nav a.router-link-exact-active {
  color: #FD2D01;
}
</style>
