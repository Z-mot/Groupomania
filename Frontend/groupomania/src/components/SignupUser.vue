<template>
    <div class="login vh-100">
        <div class="account-box">
            <div class="account-wrapper">
                <h3 class="account-title">Nouvel utilisateur</h3>
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
                        <button class="btn btn-primary account-btn" type="submit" @click="createUser()">Créé un compte</button>
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
        // Création de la méthode Vue permettant la création de l'utilisateur dans la BDD
        async createUser() {
            this.$router.push("/");
            try {
                // avec Axiox qui nous facilite les requêtes Ajax dans leur écriture nous envoyons sur l'API l'email et le password du nouvel utilisateur
                await axios.post(
                    `http://localhost:5000/signup`,
                    {
                        email: this.email,
                        password: this.password,
                    }
                );
                // après envoi, on efface les champs
                this.email = "";
                this.password = "";
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>