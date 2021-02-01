<template>
    <div class="heroProfilContainer">
      <h1>{{$t('title')}} {{this.$route.params.name}}</h1>
      <v-sheet
        color="white"
        elevation="10"
        class="mt-5 sheet"
        rounded="lg"
      >
        <div class="sheet_container">
          <div class="left-sheet_container">
            <img v-if="!imgFile" class="hero_pics" :src="getHeroPics" alt="Hero pic">
            <img v-else class="hero_pics" :src="imgFile" alt="Hero pic">
          </div>
          <div v-if="!isEditing" class="right_sheet_container">
            <div class="data_container">
              <h1 class="data_title">
                {{hero_to_visit.name}}
                <span v-if="hero_to_visit.isFavorite" >
                  <v-icon style="color:yellow" title="Ajouté aux favoris">mdi-star</v-icon>
                </span>
              </h1>
              <h3 class="descriptionText" v-if="hero_to_visit.description" >{{hero_to_visit.description}}</h3>
              <h3 class="descriptionText" v-else >{{$t('noHeroDescription')}}</h3>
            </div>
            <div class="buttons_container">
              <v-btn class="button" @click="editHero()">{{$t('editHero')}}</v-btn>
              <v-btn class="button" @click="deleteHeroData()">{{$t('deleteHeroData')}}</v-btn>
            </div>
          </div>
          <div v-else class="form_container">
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
              <div class="buttons_container">
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
              </div>
              
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
    deleteHeroData() {

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

  @media screen and (min-width: 850px)  {
    .sheet {
    width:90%;
    margin-left:5%;
    height: 550px
  }
  .sheet_container {
    height:100%;
    width:100%;
  }
  .left-sheet_container {
    height:100%;
    width:40%;
    float:left;
  }
  .hero_pics {
    height:100%;
    width:100%;
    border-radius: 0.5em 0em 0em 0.5em;
  }
  .right_sheet_container {
    background-color: #151515;
    height:100%;
    width:60%;
    float:right;
  }
  .data_container {
    padding:30px;
  }
  .data_title {
    display:flex;
    justify-content: space-between;
  }
  .buttons_container {
    display:flex;
    justify-content: flex-end;
    width:100%;
  }
  .form_container {
    background-color: #151515;
    height:100%;
    width:60%;
    float:right;
    padding:100px;
  }
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
  }
  @media screen and (max-width: 850px)  {
    .sheet {
      width:90%;
      margin-left:5%;
    }
    .left-sheet_container {
      height:100%;
      width:100%;
    }
    .hero_pics {
      height:100%;
      width:100%;
      border-radius: 0.5em 0em 0em 0.5em;
    }
    .right_sheet_container {
      height:100%;
    }
    .data_container {
      padding:30px;
    }
    .data_title {
      color: black;
      display:flex;
      justify-content: space-between;
    }
    .descriptionText{
      margin-top:15px;
      text-align: left;
      color: black;
    }
    .buttons_container {
      display: block;
      width:100%;
      padding: 20px;
    }
    .button{
      padding:5px;
      margin-left:5px;
    }
    .form_container {
      background-color: #151515;
      height:100%;
      width:100%;
      padding:15px;
    }
  }

</style>