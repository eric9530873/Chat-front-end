<template>
    <div class="card">
        <div class="card-body">
            {{ resume.resumeName }}
            <hr>
            {{ resume.updatedAt | dateFormatDash }}更新
        </div>

    </div>
</template>

<style scoped></style>

<script>
import { day } from '@/utils/mixins'
export default {
    mixins: [day],
    props: {
        initialresume: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
            resume: this.initialresume
        }
    },
    methods: {

    },
    created() { }
}

</script>