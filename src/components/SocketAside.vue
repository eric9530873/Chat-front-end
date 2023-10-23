<template>
    <div>
        <el-row style="height:60px">
            <div class="myinfo">
                <el-avatar style="margin-right:0.5rem;">
                    <img :src="currentUser.image || 'https://o.aolcdn.com/images/dar/5845cadfecd996e0372f/5d178cb92a30bc72bbc71c33e3605223945a5fa7/aHR0cDovL28uYW9sY2RuLmNvbS9oc3Mvc3RvcmFnZS9taWRhcy8yMGI5ZmMzMmNiOWRmYTJlMGMzYmZmNzA2NzZlNzJmNC8yMDI2MjQxMjEvd2FsbHBhcGVyLWZvci1mYWNlYm9vay1wcm9maWxlLXBob3RvLmpwZw=='"
                        alt="">
                </el-avatar>
                {{ currentUser.name }}

            </div>
        </el-row>
        <el-row style="height:50px">
            <el-input v-model="keyword" placeholder="搜索好友">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-row>

        <el-row style="height:390px;overflow-y: scroll;">

            <el-table stripe style="width: 100%" :show-header='false' @row-click="setUserInfo"
                :data="userList.filter(data => data.name !== currentUser.name && data.name.toLowerCase().includes(keyword.toLowerCase()))">
                <el-table-column label="日期">
                    <template slot-scope="scope">
                        <div style="display: flex; align-items: center;height: 40px;cursor: pointer;">
                            <el-avatar style="margin-right:0.5rem;width: 2.5rem;">
                                <img :src="scope.row.img || 'https://o.aolcdn.com/images/dar/5845cadfecd996e0372f/5d178cb92a30bc72bbc71c33e3605223945a5fa7/aHR0cDovL28uYW9sY2RuLmNvbS9oc3Mvc3RvcmFnZS9taWRhcy8yMGI5ZmMzMmNiOWRmYTJlMGMzYmZmNzA2NzZlNzJmNC8yMDI2MjQxMjEvd2FsbHBhcGVyLWZvci1mYWNlYm9vay1wcm9maWxlLXBob3RvLmpwZw=='"
                                    alt="">
                            </el-avatar>
                            <span>{{ scope.row.name }}</span>
                            <span style="position: absolute;right: 0.5rem;">
                                <div class="chatMessageList chatMessageList-circle">{{
                                    chatMessageList.filter(list => list.status == 1 && list.user_id == scope.row.id &&
                                        list.otheruser_id == currentUser.id).length ? chatMessageList.filter(list => list.status
                                            ==
                                            1
                                            && list.user_id == scope.row.id &&
                                            list.otheruser_id == currentUser.id).length : null
                                }}</div>
                            </span>

                        </div>
                    </template>
                </el-table-column>

            </el-table>



        </el-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import userAPi from '../apis//user'
export default {
    data() {
        return {
            keyword: "",

        }
    },
    methods: {
        setUserInfo(row) {
            this.$store.commit('setotherUser', row)

        },
        async fetchUserList() {
            try {
                const response = await userAPi.getUsers()
                this.$store.state.userList = response.data.user
            } catch (error) {
                console.log(error)
            }
        },
        
    },
    computed: {
        ...mapState(['currentUser']),
        ...mapState(['userList']),
        ...mapState(['chatMessageList']),
        ...mapState(['otherUser'])
    },
    created() {
        this.fetchUserList()
    }
}
</script >


<style scoped>
.myinfo {
    text-align: left;
    vertical-align: middle;
    margin-top: 10px;
    margin-left: 10px;
}

.myinfo span {
    text-align: left;
    vertical-align: middle;
}

.el-avatar>img {
    width: 2.5rem;
    object-fit: cover;
}


.chatMessageList {
    position: relative;
    right: 0px;
    border-radius: 99%;
    border: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: green;
    font-size: 0.2rem;
    color: white;
    width: 1.5rem;
}

/* .chatMessageList-circle {
    position: relative;
    right: 0px;
    border-radius: 99%;
    border: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: green;
    font-size: 0.2rem;
    color: white;
    width: 1.5rem;
} */
</style>