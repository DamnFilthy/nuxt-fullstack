<template>
    <div class="auth-wrapper">
        <div class="auth-block">
            <div class="form-container">
                <span @click="showLoginForm = true" class="tab-link" :class="{ 'tab-link__active': showLoginForm }"
                    >Login</span
                >
                <span @click="showLoginForm = false" class="tab-link" :class="{ 'tab-link__active': !showLoginForm }"
                    >Register</span
                >
                <form v-if="showLoginForm" @submit.prevent="onSubmit(true)" class="login-form">
                    <h2>Login</h2>
                    <div>
                        <input type="text" placeholder="Login" required v-model="form.email" />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" required v-model="form.password" />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <form v-else @submit.prevent="onSubmit(false)" class="register-form">
                    <h2>Register</h2>
                    <div>
                        <input type="text" placeholder="Name" required v-model="form.name" />
                    </div>
                    <div>
                        <input type="text" placeholder="age" required v-model="form.age" />
                    </div>
                    <div>
                        <input type="email" placeholder="Email" required v-model="form.email" />
                    </div>
                    <div>
                        <input type="password" id="password" placeholder="Password" required v-model="form.password" />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
            <p v-if="error" class="error">{{ error }}</p>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
    name: "auth",
    middleware: ["onlyForAnonymous"],
    data() {
        return {
            showLoginForm: true,
            loginForm: false,
            error: null,
            form: {
                name: null,
                email: null,
                age: null,
                password: null,
            },
        }
    },
    computed: {
        ...mapGetters("modules/auth", ["isLoggedIn"]),
    },
    methods: {
        ...mapActions("modules/auth", ["onRegister", "onLogin", "setLoginToken"]),
        async onSubmit(login) {
            this.error = null
            let status
            const payload = {
                firstname: this.form.name,
                email: this.form.email,
                age: this.form.age,
                password: this.form.password,
            }

            if (!login) status = await this["onRegister"](payload)
            else status = await this["onLogin"](payload)

            if (status.status) {
                await this["setLoginToken"]({ token: status.token, user: status.user })
                    .then(async () => {
                        await this.$router.push("/")
                    })
                    .catch((e) => console.log(e))
            } else {
                this.error = status.message
            }
        },
    },
}
</script>

<style scoped>
.auth-wrapper {
    padding-top: 250px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.auth-block {
    width: 500px;
}

.error {
    color: red;
    font-size: 14px;
    font-weight: 300;
}

.form-container {
    width: 100%;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    position: relative;
    overflow: hidden;
}

.form-container h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-container.register-form h2 {
    margin-bottom: 30px;
}

.form-container input[type="text"],
.form-container input[type="password"],
.form-container input[type="email"] {
    width: 95%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.form-container button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: #ffffff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.form-container button:hover {
    background-color: #45a049;
}

.form-container .toggle-form {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 12px;
    text-decoration: underline;
    color: #666;
    cursor: pointer;
}

.tab-link {
    cursor: pointer;
    color: #6f6fff;
    padding-bottom: 8px;
}

.tab-link__active {
    border-bottom: 2px solid #34ee34;
    color: #34ee34;
}
</style>
