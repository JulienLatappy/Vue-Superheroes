<template>
    <div class="heroProfilContainer">
      <h1>Page du héros {{this.$route.params.name}}</h1>
      <v-sheet
        color="white"
        elevation="10"
        height="550"
        style="width:90%;margin-left:5%;"
        class="mt-5"
        rounded="lg"
      ></v-sheet>
    </div>
      
</template>

<script>
export default {
  name: 'HeroProfil',
  methods: {
    getHeroData() {
      this.$store.dispatch('GET_HERO_DATA')
    }
  },
  // mounted: function() {
  //   this.getHeroData()
  // }
}
</script>

<style scoped>

  .heroProfilContainer{
    margin-top:100px;
  }
</style>