<template>
  <div class="e-nuxt-container">
    <h2>Create an account</h2>
    <label class="mt-2.mb-2">Username</label>
    <v-text-field placeholder="Enter username" v-model="username"></v-text-field>
    <label class="mt-2.mb-2">Email</label>
    <v-text-field placeholder="Enter your email address" v-model="email" :rules="emailRules"></v-text-field>
    <label class="mt-2.mb-2">Password</label>
    <v-text-field placeholder="Enter password" v-model="password" type="password"></v-text-field>
    <v-btn class="btn-fin" @click="register()" :disabled="btnDisabled1" color="#313131">Create Account</v-btn>
  </div>
</template>

<script>
import appHeader from '@/components/header'
export default {
  components: { appHeader },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      emailRules: [
        value => !!value || "Required.",
        value => (value || "").length <= 50 || "Max 50 characters",
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      ]
    };
  },
  methods: {
    async register() {
      try {

        await this.$axios.post("/auth/signup", {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        await this.$auth
          .loginWith("local", {
            data: {
              email: this.email,
              password: this.password
            }
          })
          .then(res => {
            console.log("res", res, this.$auth.user);
            console.log("he", this.$auth.loggedIn, this.$auth);
            this.$router.push();
          })
          .catch(e=> console.log("Err",e))
        console.log("response ", this.$store.state.auth.user);
      }
      catch (err) {
        console.log("ERROR"); //si funciona cuando no encuentra
        console.log(err);
      }
    },
    openURL(url) {
      remote.shell.openExternal(url);
    }
  },
  computed:{
    btnDisabled1() {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return !pattern.test(this.email) || this.password.length < 3;
    }
  }
};
</script>

<style lang='sass'>
  .e-nuxt-container 
      min-height: calc(100vh - 50px) 
      background: #525252
      font-family: Helvetica, sans-serif 
      padding: 30px
  .mt-2 
      margin-top: 14px 
  .mb-2 
      margin-bottom: 14px 
  .e-nuxt-content 
      display: flex 
      justify-content: space-around 
      padding-top: 100px 
      align-items: flex-start 
      flex-wrap: wrap 
  .e-nuxt-logo 
      width: 400px 
  .e-nuxt-system-info 
      padding: 20px 
      border-top: 1px solid #397c6d 
      border-bottom: 1px solid #397c6d 
  .e-nuxt-links 
      padding: 100px 0 
      display: flex 
      justify-content: center 
  .e-nuxt-button 
      color: #364758 
      padding: 5px 20px 
      border: 1px solid #397c6d 
      margin: 0 20px 
      border-radius: 15px 
      font-size: 1rem 
      &:hover 
          cursor: pointer 
          color: white 
          background-color: #397c6d  


</style>
