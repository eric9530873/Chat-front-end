<template>
    <el-input placeholder="請輸入内容" v-model="input" @keyup.enter.native="Message"> </el-input>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            input: ""
        }
    },
    methods: {
        Message() {
            this.$socket.emit('Message', {
                text: this.input,
                userId:this.currentUser.id,
                otheruserId:this.otherUser.id,
                status:1
            });
            this.input = "";
        }
    },
    computed:{
        ...mapState(['currentUser']),
        ...mapState(['otherUser'])
    }
}

</script>

