<template>
    <div>
        <el-row style="height:60px">
            <div class="otheruserinfo">
                <span>{{otherUser.name}}</span>
            </div>
        </el-row>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState(['otherUser'])
    }
}
</script>

<style>
.otheruserinfo {
    text-align: left;
    vertical-align: middle;
    /* margin-top: 10px; */
    /* margin-left: 10px; */
}

.otheruserinfo span {
    text-align: left;
    vertical-align: middle;
    display: flex;
    justify-content: center;
}
</style>