<template>
    <div class="div1">
        <div v-for="list in chatMessageList" :key="list.id" class="chatMessageList">
            <div v-if="list.user_id == currentUser.id && list.otheruser_id == otherUser.id">
                <p :class="{ right: list.user_id == currentUser.id }">
                    <span style="margin-right: 0.5rem;font-size: 0.5rem;font-weight: 500;">
                        {{ list.createdAt | dateFormatDash }}
                    </span>{{ list.text }}
                    <span style="margin-left: 0.5rem;font-size: 0.5rem;font-weight: 500;">
                        {{ list.status == 1 ? null : '已讀' }}
                    </span>
                    <span style="margin-left: 0.5rem;font-size: 0.5rem;font-weight: 500;">
                        {{ list.id }}
                    </span>
                </p>
            </div>

            <div v-else-if="list.user_id == otherUser.id && list.otheruser_id == currentUser.id"
                style="display: flex;margin-bottom: 0.5rem;" id="otherMessage" ref="targets">
                <p>
                    <el-avatar style="margin-right:0.5rem">
                        <img :src="currentUser.image || 'https://o.aolcdn.com/images/dar/5845cadfecd996e0372f/5d178cb92a30bc72bbc71c33e3605223945a5fa7/aHR0cDovL28uYW9sY2RuLmNvbS9oc3Mvc3RvcmFnZS9taWRhcy8yMGI5ZmMzMmNiOWRmYTJlMGMzYmZmNzA2NzZlNzJmNC8yMDI2MjQxMjEvd2FsbHBhcGVyLWZvci1mYWNlYm9vay1wcm9maWxlLXBob3RvLmpwZw=='"
                            alt="">
                    </el-avatar>
                    <span style="display: flex;align-items: center;">
                        {{ list.text }}
                    </span>
                    <span style="margin-left: 0.5rem;font-size: 0.5rem;font-weight: 500;">
                        {{ list.createdAt | dateFormatDash }}
                    </span>
                    <span id="messageId">{{ list.id }}</span>
                </p>

            </div>
            <div id="loading"></div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex';
import { day } from '@/utils/mixins'
import messageApi from '../apis/message'
import { ref } from 'vue'
import { onUpdated } from 'vue';

export default {
    mixins: [day],
    data() {
        return {}
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
        },
        Read() {
            // this.$socket.emit('read', {
            //     message: list
            // })
            console.log('hi')
        },
    },

    setup() {
        const currentMessage = ref('')

        onUpdated(() => {
            const observer = new IntersectionObserver((entries) => {

                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) {
                        currentMessage.value = entry.target
                        console.log(currentMessage.value.textContent)


                    }
                })
            })
            document.querySelectorAll('#otherMessage #messageId').forEach((span) => {
                observer.observe(span)
            })
        })
    },
    computed: {
        ...mapState(['otherUser']),
        ...mapState(['chatMessageList']),
        ...mapState(['currentUser'])
    },
    created() {
        this.fetchchatMessageList()
    }
}

</script>

<style scoped>
p {
    display: flex;
    align-items: center;
}



.right {
    justify-content: end;
}

.el-avatar>img {
    width: 2.5rem;
    object-fit: cover;
}
</style>
