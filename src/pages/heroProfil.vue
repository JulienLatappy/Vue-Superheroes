<template>
    <div class="heroProfilContainer">
      <h1>{{$t('title')}} {{this.$route.params.name}}</h1>
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
            <img v-if="!imgFile" style="height:100%;width:100%;border-radius: 0.5em 0em 0em 0.5em;" :src="getHeroPics" alt="Hero pic">
            <img v-else style="height:100%;width:100%;border-radius: 0.5em 0em 0em 0.5em;" :src="imgFile" alt="Hero pic">
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
              <h3 class="descriptionText" v-else >{{$t('noHeroDescription')}}</h3>
            </div>
            <div style="display:flex;justify-content: flex-end;background-grey;width:100%;margin-top:250px;">
              <v-btn class="button" @click="editHero()">{{$t('editHero')}}</v-btn>
              <v-btn class="button" @click="editHero()">{{$t('deleteHeroData')}}</v-btn>
            </div>
          </div>
          <div v-else style="background-color: #151515;height:100%;width:60%;float:right;padding:100px;">
            <form>
              <v-text-field
                v-model="name"
                label="Name"
                :placeholder="hero_to_visit.name"
                dark
                required
              ></v-text-field>
              <v-textarea
                v-model="description"
                :placeholder="hero_to_visit.description"
                label="Description"
                auto-grow
                rows="2"
                row-height="30"
                dark
                required
              ></v-textarea>
              <v-file-input
                dark
                @change="onFileSelected"
                truncate-length="15"
              ></v-file-input>

              <v-btn
                class="mr-4"
                @click="submit"
              >
                {{$t('submit')}}
              </v-btn>
              <v-btn @click="clear">
                {{$t('clear')}}
              </v-btn>
              <v-btn class="button" @click="editHero()">{{$t('back')}}</v-btn>
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
      imgFile: '',
      PictureInB64: "",
      heroId: null
    }
  },
  methods: {
    getHeroData() {
      this.$store.dispatch('GET_HERO_DATA')
    },
    editHero() {
      this.isEditing = !this.isEditing
    },
    async onFileSelected(event) {
        let File = event
        this.PictureInB64 = await this.toDataURL(File)
        this.imgFile = `data:image/png;base64,${this.PictureInB64}`
    },
    toDataURL: async function(Picture) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(Picture);
            reader.onload = () => resolve(reader.result.replace(/^data:image\/[a-z]+;base64,/, ""));
            reader.onerror = error => reject(error);
        });
    },
    submit () {
      const message = "Héro modifié avec succès."
      if (this.imgFile){
        console.log('with img update')
        const payloadwWithImg = {
          name: this.name,
          description: this.description,
          img: this.imgFile,
          heroId : this. heroId
        }
        this.$store.dispatch('UPDATE_HERO_DATA', payloadwWithImg)
      }else {
        console.log('without img update')
        const payloadWithoutImg = {
          name: this.name,
          description: this.description,
          heroId : this. heroId
        }
        this.$store.dispatch('UPDATE_HERO_DATA', payloadWithoutImg)
      }
      this.$store.commit ('setMessage', message)
    },
    clear () {
        this.name = ''
        this.description = ''
        this.imgFile = ''
    },
    setData() {
      this.name = this.hero_to_visit.name,
      this.description = this.hero_to_visit.description,
      this.heroId = this.hero_to_visit.id
    }
  },
  computed: {
    ...mapState([
      'hero_to_visit'
    ]),
    getHeroPics() {
      let src
        if (this.hero_to_visit.isImgModified) {
          src = `${this.hero_to_visit.thumbnail.path}`
        }else {
          src = `${this.hero_to_visit.thumbnail.path}.${this.hero_to_visit.thumbnail.extension}` 
        }
        return src
      }
  },
  mounted() {
    this.setData()
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