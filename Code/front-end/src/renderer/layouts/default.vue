<template>
 
    <div>
    <v-app>
    <v-app-bar app color="green">
      <v-btn text to="/">Main Page</v-btn>
      <!-- <v-btn text to="/" v-if="$auth.user && $auth.user.admin">
        Admin
      </v-btn> -->
<div v-if="logged">
  <v-btn text to="/chat/chat">Chat</v-btn>
</div>
      <v-spacer />
      
      <div v-if="logged">
        <v-btn text to="/user">{{ username }}</v-btn>
        <v-btn text @click="$auth.logout()">Logout</v-btn>
      </div>
      <div v-else>
        <v-btn text to="/login">Login</v-btn>
        <v-btn text to="/register">Register</v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>

  
  </v-app>
  </div>
</template>

<script>
import appHeader from '@/components/header'
export default {
  components: { appHeader },
  computed:{
    username(){
      return this.$auth.user.username
    },
    logged(){
      return this.$auth.loggedIn
    }
  }
}
</script>

<style lang='sass'>
  body
    margin: 0 !important
  html 
    font-family:'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif 
    font-size: 16px 
    word-spacing: 1px 
    -ms-text-size-adjust: 100% 
    -webkit-text-size-adjust: 100% 
    -moz-osx-font-smoothing: grayscale 
    -webkit-font-smoothing: antialiased 
    box-sizing: border-box 
  *,
  *:before,
  *:after 
    box-sizing: border-box 
    margin: 0 
  .button--green 
    display: inline-block 
    border-radius: 4px 
    border: 1px solid #3b8070 
    color: #3b8070 
    text-decoration: none 
    padding: 10px 30px 
    &:hover 
      color: #fff 
      background-color: #3b8070 
  .button--grey 
    display: inline-block 
    border-radius: 4px 
    border: 1px solid #35495e 
    color: #35495e 
    text-decoration: none 
    padding: 10px 30px 
    margin-left: 15px 
    &:hover 
      color: #fff 
      background-color: #35495e 

</style>
