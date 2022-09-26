<template>
    <div class="login vh-100">
        <div class="account-box">
            <div class="account-wrapper">
                <h3 class="account-title">Se connecter</h3>
                <p class="account-subtitle">pour accéder au réseau social GROUPOMANIA</p>
                <form>
                    <div class="form-group">
                        <label>Adresse email</label>
                        <input class="form-control" type="text" v-model="email">
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col">
                                <label>Mot de passe</label>
                            </div>
                        </div>
                        <input class="form-control" type="password" v-model="password">
                    </div>
                    <div class="form-group text-center">
                        <a class="btn btn-primary account-btn" type="submit" @click="loginUser()">Se connecter</a>
                    </div>
                    <div class="account-footer">
                        <p>Pas encore inscrit ? <router-link :to="{ name: 'Signup' }" class="button is-success mt-5">S'inscrire</router-link></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";


export default {
    name: "LoginUser",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    
    methods: {
        // Création de la méthode Vue permettant la connexion de l'utilisateur
        async loginUser() {
            try {
                await axios.post(
                    `http://localhost:5000/login`,
                    {
                        email: this.email,
                        password: this.password,
                    }
                )
                // Promise
                .then(response => {
                    // Si la réponse contient l'email et le token (c'est que la requête backend est valide et l'utilisateur autorisé à se connecter)
                    if (response.data.email && response.data.authorization) {
                        this.email = "";
                        this.password = "";
                        // on met en localStorage le token, l'user_id et le statut de l'utilisateur
                        localStorage.setItem("token", response.data.authorization);
                        localStorage.setItem("user_id", response.data.user_id);
                        localStorage.setItem("statut", response.data.statut);
                        // On envoi l'utilisateur sur la page d'accueil
                        this.$router.push("/home");
                    } else {
                        alert("email ou mot de passe incorrect")
                    }
                })
            } catch (err) {
                console.log(err);
            }
        }
    }
}


</script>