<template lang="">
    <div class="container-fluid min-vh-100">
            <div class="row justify-content-center pt-5">
                <div class="col-sm-8 col-md-6 pt-5">
                        <div class="pt-5">
                            <h3>404. That's an error.</h3>
                            <h5>The request URL {{this.url}} was not found on this server.</h5>
                            <h6>That's all we know.</h6>
                        </div>
                </div>
            </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            url : "",
        }
    },
    created(){
        this.url=this.$route.path;
    }
}
</script>
<style>

</style>