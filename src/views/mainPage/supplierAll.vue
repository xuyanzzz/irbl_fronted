<template>
    <div></div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "supplierAll",
        data() {
            this.$router.replace({
                path: '/issueList',
                name: 'issueList'
            })
            return {}
        },
        components: {},
        computed: {
            ...mapGetters([])
        },
        async mounted() {

        },
        methods: {
            ...mapMutations([]),
            ...mapActions([]),


        },

    }
</script>

<style scoped>

</style>
