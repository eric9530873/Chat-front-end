<template>
    <div class="container py-5">
        <form class="w-100" @submit.prevent.stop="handleSumit">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">
                    Sign Up
                </h1>
            </div>

            <div class="form-label-group mb-2">
                <label for="name">Name</label>
                <input id="name" v-model="name" name="name" type="text" class="form-control" placeholder="name"
                    autocomplete="username" required autofocus>
            </div>

            <div class="form-label-group mb-2">
                <label for="email">Email</label>
                <input id="email" v-model="email" name="email" type="email" class="form-control" placeholder="email"
                    autocomplete="email" required>
            </div>

            <div class="form-label-group mb-3">
                <label for="password">Password</label>
                <input id="password" v-model="password" name="password" type="password" class="form-control"
                    placeholder="Password" autocomplete="new-password" required>
            </div>

            <div class="form-label-group mb-3">
                <label for="password-check">Password Check</label>
                <input id="password-check" v-model="passwordcheck" name="passwordCheck" type="password" class="form-control"
                    placeholder="Password" autocomplete="new-password" required>
            </div>

            <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
                Submit
            </button>

            <div class="text-center mb-3">
                <p>
                    <router-link to="/signin">
                        Sign In
                    </router-link>
                </p>
            </div>

            <p class="mt-5 mb-3 text-muted text-center">
                &copy; 2017-2018
            </p>
        </form>
    </div>
</template>

<script>
import authorization from '../apis/authorization'
import { Toast } from '../utils/helpers';
export default {
    name: "SignUp",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            passwordcheck: ""
        }
    },
    methods: {
        async handleSumit() {
            try {
                if (!this.name || !this.email || !this.password || !this.passwordcheck) {
                    Toast.fire({
                        icon: "warning",
                        title: "欄位不得空白"
                    })
                    return
                }

                const response = await authorization.signUp({
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    passwordcheck: this.passwordcheck
                })

                console.log(response)
                this.$socket.emit('signup',response.data.user)
                this.$router.push('/signin')
            } catch (error) {
                Toast.fire({
                    icon: "error",
                    title: "無法註冊"
                })
            }
        }
    }
}
</script>