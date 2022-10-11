<template>
    <div>
        <v-app id="inspire">
            <v-content>
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
                                            v-model="form.email"
                                            label="Login"
                                            name="login"
                                            type="text"
                                        ></v-text-field>

                                        <v-text-field
                                            v-model="form.password"
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
                                    <v-btn color="light-blue" @click="login_admin()">Login</v-btn>
                                </v-card-actions>
                                </v-card>
                            <!-- </v-flex>
                            </v-layout> -->
                        </v-col>
                    </v-row>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>
<script>
// import {QrcodeStream} from 'vue-qrcode-reader'

export default {
    components:{
        // QrcodeStream
    },

    data: () => ({
        students: [],
        teachers:[],
        show_pass: false,

        form: {
            email: 'admin@test.com',
            password: 'password',
        },
         error: '',
         qrForm:{
             value:'',
         }

    }),
    methods : {
        // onDecode(data){
        //     console.log("qr_value", data);
        //     this.qrForm = {
        //         value: data,
              
        //     }
            
        //     axios.post('/api/userLogin', this.qrForm).then((response) =>{
        //         if(response.error){
        //             alert("Unknown User")
        //         }else{
        //             localStorage.setItem('token',response.data.token)
        //             localStorage.setItem('user_type',response.data.user_type)
        //             console.log(response)
        //             this.$router.push('student/dashboard')
        //         }
        //     })
        // },

        login_admin(){
            
                axios.post('/api/login',this.form).then((response) => {
                    console.log(response)
                    if(response.error) {
                        alert("Username or password are incorrect")
                    }
                    else{
                        localStorage.setItem('token',response.data.token)
                        localStorage.setItem('user_type','admin')
                        this.$router.push('/dashboard')
                    }
                })

        },

        async onInit (promise) {
            try {
                await promise
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                this.error = "ERROR: you need to grant camera access permission"
                } else if (error.name === 'NotFoundError') {
                this.error = "ERROR: no camera on this device"
                } else if (error.name === 'NotSupportedError') {
                this.error = "ERROR: secure context required (HTTPS, localhost)"
                } else if (error.name === 'NotReadableError') {
                this.error = "ERROR: is the camera already in use?"
                } else if (error.name === 'OverconstrainedError') {
                this.error = "ERROR: installed cameras are not suitable"
                } else if (error.name === 'StreamApiNotSupportedError') {
                this.error = "ERROR: Stream API is not supported in this browser"
                } else if (error.name === 'InsecureContextError') {
                this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
                } else {
                this.error = `ERROR: Camera error (${error.name})`;
                }
            }
        }
    },

    
}
</script>