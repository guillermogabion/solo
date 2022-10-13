<template>
    <div>
        <v-app id="inspire">
            <v-main>
                <v-container
                    fill-height
                >
                    <v-row>
                        <v-col>
                            <!-- <v-layout align-center justify-center> -->
                            <!-- <v-flex xs12 sm8 md4> -->
                                <v-card 
                                class="elevation-12 mx-auto"
                                width="600"
                                
                                >
                                <v-toolbar
                                    color="green"
                                    dark
                                    flat
                                >
                                    <v-toolbar-title>Admin Login</v-toolbar-title>
                                
                                </v-toolbar>
                                <v-card-text>
                                    <v-form>
                                        <v-text-field
                                            v-model="email"
                                            label="Login"
                                            name="login"
                                            type="text"
                                        ></v-text-field>

                                        <v-text-field
                                            v-model="password"
                                            id="password"
                                            label="Password"
                                            name="password"
                                            :type="show_pass ? 'text' : 'password'"
                                            :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                                            @click:append="show_pass = !show_pass"
                                        ></v-text-field>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions >
                                    <v-spacer></v-spacer>
                                    <v-btn color="light-blue" @click="Login()">Login</v-btn>
                                </v-card-actions>
                                </v-card>
                            <!-- </v-flex>
                            </v-layout> -->
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>
<script>
// import {QrcodeStream} from 'vue-qrcode-reader'
import { login } from "../repositories/user.api";
export default {
    components:{
        // QrcodeStream
    },

    data: () => ({
      
        show_pass: false,

        email: '',
        password: '',

    }),
    methods : {
 

        Login() {
          const login_data = {
              email: this.email,
              password: this.password
          }
          login(login_data).then(({data}) => {
              // this.$store.commit('login', data)
              localStorage.setItem('token', data.access_token)
              this.$router.push({ name: "admin_dashboard"});
          }).catch((errors)=> {
              console.log(errors)
              this.snackbar = true
              
          })
        },
    }
    

    
}
</script>