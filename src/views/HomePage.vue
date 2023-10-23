<template>
    <div>
        <el-container>
            <el-aside width="200px">
                <SocketAside />
            </el-aside>

            <el-container>

                <el-header>
                    <SocketHeader />
                </el-header>

                <el-main>
                    <SocketMaincontent />
                </el-main>

                <el-footer v-if="otherUser.name">
                    <SocketFooter />
                </el-footer>

            </el-container>
        </el-container>
    </div>
</template>

<script>
import SocketFooter from '@/components/SocketFooter.vue';
import SocketAside from '@/components/SocketAside.vue';
import SocketHeader from '@/components/SocketHeader.vue';
import SocketMaincontent from '@/components/SocketMaincontent.vue';
import { mapState } from 'vuex';
export default {
    name: 'HomePage',
    components: {
        SocketFooter,
        SocketAside,
        SocketHeader,
        SocketMaincontent
    },
    data() {
        return {
            messages: []
        }
    },
    sockets: {
        connect: function () {
            console.log('connect===連線')
        },
        disconnect() {
            console.log('disconnect===終止連線')
        },
        reconnect() {
            console.log('reconnect===重新連線')
        },
        toClient(messages) {
            this.messages.push(messages.message)
        }
    },
    computed: {
        ...mapState(['currentUser']),
        ...mapState(['otherUser'])
    }
}
</script>
<style lang="scss" scoped>
.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    // line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    overflow-y: scroll;
    height: 390px;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>