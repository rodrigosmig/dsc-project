<template>
    <div class="centered-container">
        <md-content class="md-elevation-3">
            <div class="title">
                <div class="md-title">Kartolovski</div>
                <div class="md-body-1">Tela de Login</div>
            </div>

            <div class="form">
                <md-field>
                    <label>Login</label>
                    <md-input type="text" v-model="user.nickname" autofocus></md-input>
                </md-field>
                <md-field md-has-password>
                    <label>Senha</label>
                    <md-input type="password" v-model="user.password" @keyup.13="login"></md-input>
                </md-field>
            </div>

            <div class="actions md-alignment-center-space-between">
                <md-button class="md-raised md-accent" type="submit" @click.native.prevent="login()"> Entrar </md-button>
                <p>{{message}}</p>
                <p>Ainda não é cadastrado?</p> <router-link to='/cadastro'>Clique aqui</router-link>
            </div>
        </md-content>
    </div>
</template>

<script>

import axios from 'axios'
import store from '../store'

export default {

    data: function(){
        return {
            user:{
                nickname: "",
                password: "",
            },
            message: "",
            store,
        }
    },
    methods: {
        login: function() {
            if(this.user.nickname === "" || this.user.password === ""){
                this.message = "Nickname e senha inválido"    
            }
            else {
                axios.post("http://localhost:3000/auth" , this.user).then(response => {               
                    this.store.username = this.user.nickname
                    this.store.token = response.data.token
                    this.$router.push({name: "Home"})
                })
                .catch (e =>{
                    this.message = "nickname ou senha inválido"
                });
            }            
        }
    }
}
</script>

<style lang="scss" scoped>

.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.form {
    width: 300px;
}
.md-content {
    padding: 50px;
}
</style>

