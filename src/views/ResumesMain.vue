<template>
    <div>
        <div class="card">
            <ResumeCard v-for="resume in resumes" :key="resume.id" :initialresume="resume" />
        </div>

    </div>
</template>

<script>
import { Toast } from '@/utils/helpers';
import resumeAPI from '../apis/resume'
import ResumeCard from '@/components/ResumeCard.vue';
import { mapState } from 'vuex'


export default {
    name: "ResumesMain",
    components: {
        ResumeCard,

    },
    data() {
        return {
            resumes: []
        }
    },
    methods: {
        async fetchResumes() {
            try {
                const response = await resumeAPI.fetchResumes()
                console.log(response)
                this.resumes = response.data.resume[0].rows
            } catch (error) {
                Toast.fire({
                    icon: "error",
                    title: "無法取得履歷"
                })
            }
        }
    },
    computed: {
        ...mapState(['currentUser', 'isAuthenticated'])
    },
    created() {
        this.fetchResumes()
    }
}
</script>