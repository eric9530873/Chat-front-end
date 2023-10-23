<template>
    <div>123</div>
</template>

<script>
import maplestory from '@/apis/maplestory';
export default {
    data() {
        return {

        }
    },
    methods: {
        maplestoryGet() {
            const response = maplestory.get()
            console.log(response)
        }
    },
    created() { 
        this.maplestoryGet()
    }
}

</script>