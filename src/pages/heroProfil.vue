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
      >
        <div style="height:100%;width:100%;">
          <div style="height:100%;width:40%;float:left">
            <img style="height:100%;width:100%;border-radius: 0.5em 0em 0em 0.5em;" :src="`${hero_to_visit.thumbnail.path}.${hero_to_visit.thumbnail.extension}`" alt="Hero pic">
          </div>
          <div v-if="!isEditing" style="background-color: #151515;height:100%;width:60%;float:right;">
            <div style="padding:30px;">
              <h1 style="display:flex;justify-content: space-between;">
                {{hero_to_visit.name}}
                <span v-if="hero_to_visit.isFavorite" >
                  <v-icon style="color:yellow" title="Ajouté aux favoris">mdi-star</v-icon>
                </span>
              </h1>
              <h3 class="descriptionText" v-if="hero_to_visit.description" >{{hero_to_visit.description}}</h3>
              <h3 class="descriptionText" v-else >Aucune description.</h3>
            </div>
            <div style="display:flex;justify-content: flex-end;background-grey;width:100%;margin-top:250px;">
              <v-btn class="button" @click="editHero()">Editer le héro</v-btn>
              <v-btn class="button">Effacer les informations</v-btn>
            </div>
          </div>
          <div v-else style="background-color: #151515;height:100%;width:60%;float:right;padding:100px;">
            <form>
              <v-text-field
                v-model="name"
                label="Hero's name"
                dark
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="description"
                label="Description"
                dark
                required
                @input="$v.description.$touch()"
                @blur="$v.description.$touch()"
              ></v-text-field>
              <v-file-input
                dark
                v-model="img"
                truncate-length="15"
              ></v-file-input>

              <v-btn
                class="mr-4"
                @click="submit"
              >
                submit
              </v-btn>
              <v-btn @click="clear">
                clear
              </v-btn>
              <v-btn class="button" @click="editHero()">Retour</v-btn>
            </form>
          </div>
        </div>
      </v-sheet>
    </div>
      
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HeroProfil',
  data () {
    return {
      isEditing : false,
      name: '',
      description: '',
      img: ''
    }
  },
  methods: {
    getHeroData() {
      this.$store.dispatch('GET_HERO_DATA')
    },
    editHero() {
      this.isEditing = !this.isEditing
    },
    submit () {
      const payload = {
        name: '',
        description: '',
        img: ''
      }
      this.$store.dispatch('UPDATE_HERO_DATA', payload)
    },
    clear () {
        this.$v.$reset()
        this.name = ''
        this.description = ''
        this.img = null
    },
  },
  computed: {
    ...mapState([
      'hero_to_visit'
    ])
  },
  mounted: function() {
    
  }
}
</script>

<style scoped>

  .heroProfilContainer{
    margin-top:100px;
  }
  .descriptionText{
    margin-top:15px;
    color: white
  }
  .button{
    margin:10px;
  }
</style>