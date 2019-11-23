<template>
  <div class="e-nuxt-container">
    <h2>Bienvenidos</h2>
    <label class="mt-2.mb-2">Correo Electronico</label>
    <v-text-field color="white" placeholder="Ingrese correo electronico" v-model="email" :rules="emailRules"></v-text-field>
    <label class="mt-2.mb-2">Contrasenia</label>
    <v-text-field color="white" placeholder="Ingrese contrasenia" v-model="password" type="password"></v-text-field>
    <v-btn class="btn-fin" @click="login()" :disabled="btnDisabled1" :loading="loginLoading">Login</v-btn>
  </div>
</template>

<script>
import { remote } from "electron";
import SystemInformation from "@/components/SystemInformation.vue";
import { watch } from "fs";

export default {
  components: {
    SystemInformation
  },
  data() {
    return {
      externalContent: "",
      audio_stream: null,
      audio_context: null,
      recorder: null,
      loginLoading:false,
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
     async login() {
        // let loader = Loading.service({ fullscreen: true })
        try {
          console.log('entro')
          // this.handleClickStart()
          // this.loginLoading = true
          // await this.delay(4000)
          // this.loginLoading = false

     
          //et user = await this.$store.dispatch('login/postLogin',{email:this.email, password:this.password})
          await this.$auth
            .loginWith('local', {
              data: {
                email: this.email,
                password: this.password
              }
            })
            .then(res => {
              console.log('res', res, this.$auth.user)
              console.log('he',this.$auth.loggedIn,this.$auth)
            })
            .catch(e=> console.log("Err",e))
          console.log('response ', this.$auth.user)
          // this.$router.push({ name: 'index' })
          this.$axios.$get('/command/')
          this.$router.push()
          //this.$store.commit('login/setUserData',user.data)
          //this.$auth.redirect('/documents')
          //this.$router.push('/documents/')
        } catch (err) {
          console.log('ERROR') //si funciona cuando no encuentra
          console.log(err)
          // this.$showAlert({ title: 'Credenciales/ Inválidas', message: `Correo electrónico y/o contraseña incorrecta.` })
          //   this.$refs.alertDialog.open('Error Verifica crediedenciales')
        }
        // loader.close()s
      },
    openURL(url) {
      remote.shell.openExternal(url);
    },
    startAudio() {},
    speech() {
      window.SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      let finalTranscript = "";
      let recognition = new window.SpeechRecognition();
      recognition.interimResults = true;
      recognition.maxAlternatives = 10;
      recognition.continuous = true;
      recognition.onresult = event => {
        console.log("event?");
        let interimTranscript = "";
        for (
          let i = event.resultIndex, len = event.results.length;
          i < len;
          i++
        ) {
          let transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        console.log(interimTranscript);
        document.querySelector("body").innerHTML =
          finalTranscript +
          '<i style="color:#ddd;">' +
          interimTranscript +
          "</>";
      };
      recognition.start();
    },
    handleClickStart() {
      let shouldStop = false;
      let stopped = false;
      // const downloadLink = document.getElementById('download');
      // const stopButton = document.getElementById('stop');

      // stopButton.addEventListener('click', function() {
      //   shouldStop = true;
      // })
      var handleSuccess = function(stream) {
        const options = { mimeType: "video/webm;codecs=vp9" };
        const recordedChunks = [];
        const mediaRecorder = new MediaRecorder(stream, options);
        console.log("dat1");
        console.log(mediaRecorder);
        mediaRecorder.addEventListener("dataavailable", function(e) {
          console.log("dat2");
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
            console.log("data");
          }

          if (shouldStop === true && stopped === false) {
            console.log("pare");
            mediaRecorder.stop();
            stopped = true;
          }
        });

        mediaRecorder.addEventListener("stop", function() {
          console.log("pare");
          // downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
          // downloadLink.download = 'acetest.wav';
        });

        mediaRecorder.start();
      };
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(handleSuccess);
      // navigator.mediaDevices.getUserMedia({ audio: true }).then((mediaStreamObject)=>{
      //     this.audio_stream = mediaStreamObject
      //     const input = this.audio_context.createMediaStreamSource(mediaStreamObject)
      //     console.log("listening,", input)
      // })
    }
  },
  async mounted() {
    window.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    let finalTranscript = "";
    let recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;

    recognition.onresult = event => {
      console.log("event?");
      let interimTranscript = "";
      for (
        let i = event.resultIndex, len = event.results.length;
        i < len;
        i++
      ) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      console.log(interimTranscript);
      document.querySelector("body").innerHTML =
        finalTranscript + '<i style="color:#ddd;">' + interimTranscript + "</>";
    };
    recognition.start();
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      window.URL = window.URL || window.webkitURL;
      this.audio_context = new AudioContext();
      console.log("this", this.audio_context);
      // this.handleClickStart()
      this.speech();
    } catch (e) {
      alert("No web audio support in this browser!");
    }
  },
  watch: {
    email: function() {
      console.log(this.email);
    }
  },
  computed:{
     btnDisabled1() {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return  (!pattern.test(this.email) || this.password.length < 3)
      }
  }
};
</script>

<style lang="sass">
.e-nuxt-container 
	min-height: calc(100vh - 50px) 
	background: linear-gradient(to right, #ece9e6, #ffffff) 
	font-family: Helvetica, sans-serif 
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
