<template>
    <main style="display: flex;">
        <article>
            <section v-for="(list, index) in chatMessageList" :key="index">
                <h2 :id="index">{{ list.text }}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.</p>
            </section>
        </article>

    </main>
</template>



<script>
import { onMounted } from 'vue';
import { onUpdated } from 'vue';
import { ref } from 'vue';
import { mapState } from 'vuex';
import messageApi from '../apis/message'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapState(['chatMessageList'])
    },
    methods: {
        async fetchchatMessageList() {
            try {
                const response = await messageApi.getMessages()
                this.$store.state.chatMessageList = response.data.messages
            } catch (error) {
                console.log('error', error)
                console.error('can not fetch chatMessageList')
            }
        }
    },
    created() {
        this.fetchchatMessageList()
    },
    setup() {
        const currentMessage = ref('')

        onUpdated(() => {
            const observer = new IntersectionObserver((entries) => {

                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) {
                        currentMessage.value = entry.target
                        console.log(currentMessage.value)
                    }
                })
            })
            document.querySelectorAll('article h2').forEach((section) => {
                observer.observe(section)
            })
        })
    }
}



</script>

<style>
aside a.active {
    font-weight: bold;
    border-color: black
}

aside>div {
    position: sticky;
    top: 20px;
    padding-left: 2em;
}
</style>