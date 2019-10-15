<template>
  <div class="e-nuxt-container">
    <div class="e-nuxt-content">
      <div class="e-nuxt-logo">
        <img style="max-width: 100%;" src="~assets/electron-nuxt.png">
      </div>
      <div class="e-nuxt-system-info">
        <system-information />
      </div>
    </div>
    <div class="e-nuxt-links">
      <div class="e-nuxt-button" @click="openURL('https://github.com/michalzaq12/electron-nuxt')">
        Github
      </div>
      <div class="e-nuxt-button" @click="openURL('https://nuxtjs.org/guide')">
        Nuxt.js
      </div>
      <div class="e-nuxt-button" @click="openURL('https://electronjs.org/docs')">
        Electron.js
      </div>
    </div>
  <v-btn>dsadssadsadsas</v-btn>
  </div>
</template>

<script>
import { remote } from 'electron'
import SystemInformation from '@/components/SystemInformation.vue'

export default {
  components: {
    SystemInformation
  },
  data () {
    return {
      externalContent: '',
      audio_stream: null,
      audio_context: null,
      recorder: null
    }
  },
  methods: {
    openURL (url) {
      remote.shell.openExternal(url)
    },
    startAudio(){
    },
    speech(){
          window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    let finalTranscript = '';
    let recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;
    recognition.onresult = (event) => {
      console.log("event?")
      let interimTranscript = '';
      for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      console.log(interimTranscript)
      document.querySelector('body').innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</>';
    }
    recognition.start();
    },
    handleClickStart(){
        let shouldStop = false;
  let stopped = false;
  // const downloadLink = document.getElementById('download');
  // const stopButton = document.getElementById('stop');

  // stopButton.addEventListener('click', function() {
  //   shouldStop = true;
  // })
 var handleSuccess = function(stream) {  
    const options = {mimeType: 'video/webm;codecs=vp9'};
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);  
    console.log("dat1")
    console.log(mediaRecorder)
    mediaRecorder.addEventListener('dataavailable', function(e) {
          console.log("dat2")
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
        console.log("data")
      }

      if(shouldStop === true && stopped === false) {
        console.log("pare")
        mediaRecorder.stop();
        stopped = true;
      }
    });

    mediaRecorder.addEventListener('stop', function() {
      console.log("pare")
      // downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
      // downloadLink.download = 'acetest.wav';
    });

    mediaRecorder.start();
  };
      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess);
      // navigator.mediaDevices.getUserMedia({ audio: true }).then((mediaStreamObject)=>{
      //     this.audio_stream = mediaStreamObject
      //     const input = this.audio_context.createMediaStreamSource(mediaStreamObject)
      //     console.log("listening,", input)
      // })
    }
  },
  async mounted(){
          window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    let finalTranscript = '';
    let recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;
    
    recognition.onresult = (event) => {
      console.log("event?")
      let interimTranscript = '';
      for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      console.log(interimTranscript)
      document.querySelector('body').innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</>';
    }
    recognition.start();
   try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext
        window.URL = window.URL || window.webkitURL
        this.audio_context = new AudioContext()
        console.log("this", this.audio_context)
        // this.handleClickStart()
        this.speech()
      } catch (e) {
        alert('No web audio support in this browser!')
      }
  
  }
}
</script>

<style>
.e-nuxt-container {
  min-height: calc(100vh - 50px);
  background: linear-gradient(to right, #ece9e6, #ffffff);
  font-family: Helvetica, sans-serif;
}

.e-nuxt-content {
  display: flex;
  justify-content: space-around;
  padding-top: 100px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.e-nuxt-logo{
  width: 400px;
}

.e-nuxt-system-info {
  padding: 20px;
  border-top: 1px solid #397c6d;
  border-bottom: 1px solid #397c6d;
}

.e-nuxt-links {
  padding: 100px 0;
  display: flex;
  justify-content: center;
}

.e-nuxt-button {
  color: #364758;
  padding: 5px 20px;
  border: 1px solid #397c6d;
  margin: 0 20px;
  border-radius: 15px;
  font-size: 1rem;
}

.e-nuxt-button:hover{
  cursor: pointer;
  color: white;
  background-color: #397c6d;
}
</style>
