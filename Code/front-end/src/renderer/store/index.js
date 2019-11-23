import * as electron from 'electron'
const util = require('util');
const exec = util.promisify(require('child_process').exec);
export const state = () => ({
    count: 0,
    commandRes:{
      e: '',
      err: '',
      out: ''
    }
  })
  export const mutations = {
    increment(state, n) {
      console.log("increment", n,electron)
      console.log("resource" , __resources)
   
    },
    commandExec(state,command){
      //   const ls = spawn(command.command,[],{cwd: command.location
      // });
      // try {
      //   ls.stdout.on('data', (data) => {
      //     console.log(`stdout: ${data}`);
      //   });
        
      //   ls.stderr.on('data', (data) => {
      //     console.error(`stderr: ${data}`);
      //   });
        
      //   ls.on('close', (code) => {
      //     console.log(`child process exited with code ${code}`);
      //   });
        
      // } catch (error) {
      //   console.error("error command",error)
      // }
     
    }
  }
  export const  actions= {
    async  lsExample() {
      const { stdout, stderr } = await exec('ls');
      console.log('stdout:', stdout);
      console.error('stderr:', stderr);
    },
    async execute ({state},command) {
      // console.log("command",command)
      // let response = await exec(command.command,{cwd:command.location},function(err,s,err){
      //   e? console.error("e", e):0
      //   err? console.error("err",err):0
      //   console.log("stdout",s)
      //   return {e,err,s}
      // })
      console.log('holaaa', command )
      const { e,stdout, stderr } = await exec(command.command,{
        cwd:command.location
      });
      let response = {
        e,stdout,stderr,
        name:command.name,
        command:command.command
      }
      console.log(response.stdout)
      state.commandRes =response
      return response
    }
  }
