<template>
  <div class="e-nuxt-container">
    <h2>Registro</h2>
    
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
.e-nuxt-container 
    min-height: calc(100vh - 50px) 
    background: linear-gradient(to right, #ece9e6, #ffffff) 
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
