<template>
        <!-- Modal -->
            <div class="modal fade"  id="loadingModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <div class="spinner-border text-info m-5" role="status" style="width: 50px; height: 50px;" v-if="showSpinner">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
            </div>

      
</template>
<script>
export default {
    name: "LoadingSpinner"
}
</script>
<style lang="css">
     
</style>