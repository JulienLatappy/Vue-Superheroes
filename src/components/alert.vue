<template>
    <div>
        <v-alert 
            :value="alertState"
            color="success"
            dark
            border="top"
            class="alert"
            transition="scale-transition"
        >
            {{message}}
        </v-alert>
    </div>
</template>

<script>
export default {
    name: 'alert',
    watch: {
      message: function() {
        setTimeout(() => {
            this.$store.commit('clear_alert_state')  
        }, 3000);
      }  
    },
    props: [
        'message',
        'alertState'
    ],
}
</script>

<style>
    .alert {
        z-index:100;
        position: fixed;
        right: 2%
    }
</style>