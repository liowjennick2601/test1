<template>
  <main>
    <div id="district-manager-page">
      <div class="header-row">
        <h1>DISTRICT MANAGER</h1>
      </div>

      <div class="container">
        <div class="select-input-container">
          <p>Filter by age</p>
          <select name="age" id="age" v-model="age_input_value">
            <option
              :key="i" v-for="(choice, i) in age_input_choices"
              :value="choice.value"
              id="age"
            >
              {{ choice.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="container">
        <div class="cards-section" v-if="api_status.manager === 'success'">
          <div class="profile-card-container" :key="i" v-for="(manager, i) in age_filtered_manager">
            <div class="image-container">
              <img src="../assets/images/user_photo.jpg" />
            </div>
            <div class="details-container">
              <h3>{{ manager.name }}</h3>
              <p><span class="title">Email:</span> <span class="value">{{ manager.email }}</span></p>
              <p><span class="title">Mobile:</span> <span class="value">{{ manager.phone }}</span></p>
              <p><span class="title">Company:</span> <span class="value">{{ manager.company }}</span></p>

              <div class="address-container">
                <p><span class="title">Address:</span></p>
                <p><span class="value">{{ manager.address.street }}</span></p>
                <p><span class="value">{{ manager.address.suite }}</span></p>
                <p><span class="value">{{ manager.address.city }}</span></p>
                <p><span class="value">{{ manager.address.zipcode }}</span></p>
              </div>

              <p><span class="title">Website:</span> <span class="value">{{ manager.website }}</span></p>
              <p><span class="title">Age:</span> <span class="value">{{ manager.age }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      api_status: {
        manager: "pending" // pending, loading, success, failed
      },
      managers: [],
      age_input_value: null,
      age_input_choices: [
        {
          label: "Select age",
          value: null
        },
        {
          label: "All",
          value: [0, 200]
        },
        {
          label: "0 - 10 years old",
          value: [0, 10]
        },
        {
          label: "11 - 20 years old",
          value: [11, 20]
        },
        {
          label: "21 - 30 years old",
          value: [21, 30]
        },
        {
          label: "31 - 40 years old",
          value: [31, 40]
        },
        {
          label: "41 - 50 years old",
          value: [41, 50]
        },
        {
          label: "51 - 60 years old",
          value: [51, 60]
        },
        {
          label: "60 years old and above",
          value: [61, 200]
        }
      ]
    }
  },
  computed: {
    age_filtered_manager() {
      if (this.api_status.manager === 'success') {
        if (this.age_input_value !== null) {
          console.log(this.managers)
          return this.managers.filter(manager => manager.age >= this.age_input_value[0] &&  manager.age <= this.age_input_value[1])
        } else {
          return []
        }
      } else {
        return []
      }
    }
  },
  async mounted() {
    try {
      this.api_status.manager = "loading"

      const manager_api_response = await window.fetch('http://www.mocky.io/v2/5d73bf3d3300003733081869')
      const manager_data = await manager_api_response.json()

      this.api_status.manager = "success"

      this.managers = manager_data
    } catch(err) {
      this.api_status.manager = "failed"
      console.log(err)
    }
  },
}
</script>

<style lang="sass">
// I do not have adobe font, used the closest font that resemble myriadpro
@font-face
  font-family: 'PTSans'
  src: url("../assets/fonts/PTSans-Regular.ttf")
  font-weight: 400

@font-face
  font-family: 'PTSans'
  src: url("../assets/fonts/PTSans-Bold.ttf")
  font-weight: 900

body
  margin: 0px !important
  padding: 0px !important

h1, h2, h3, h4, h5, p, select
  font-family: 'PTSans'

h1
  font-size: 36px

.container
  max-width: 1200px
  margin: 0 auto
  padding: 0 20px

#district-manager-page
  padding-bottom: 100px
  .header-row
    background-image: linear-gradient(180deg, rgba(225,225, 225,1),  white)
    h1
      text-align: center
      font-weight: bold
      margin: 0
      padding: 25px 0 50px 0
  .select-input-container
    padding: 50px 0
    border-bottom: 3px solid #e8e7e6
    p
      margin-bottom: 10px
      margin-top: 0
      font-size: 15px
    select
      padding: 10px
      border-color: #dfdfdf
      max-width: 355px
      width: 100%
    option
      font-size: 15px
  .cards-section
    display: flex
    flex-wrap: wrap
    padding-top: 50px
    .profile-card-container
      display: flex
      background-color: white
      box-shadow: 0px 0px 15px 2px #e8e7e6
      margin-bottom: 20px
      padding:  30px 20px
      box-sizing: border-box
      @media screen and (min-width: 1150px)
        flex: 0 0 32%
      @media screen and (min-width: 800px) and (max-width: 1150px)
        flex: 0 0 49%
      @media screen and (min-width: 550px) and (max-width: 800px)
        flex: 0 0 49%
        flex-direction: column
      @media screen and (max-width: 550px)
        flex: 0 0 100%
        flex-direction: column
      &:nth-child(3n + 2)
        @media screen and (min-width: 1150px)
          margin-left: 2%
          margin-right: 2%
      &:nth-child(even)
        @media screen and (min-width: 550px) and (max-width: 1150px)
          margin-left: 1%
      &:nth-child(odd)
        @media screen and (min-width: 550px) and (max-width: 1150px)
          margin-right: 1%
      .image-container
        padding-right: 20px
        img
          border-radius: 50%
      .details-container
        h3
          margin-top: 0
          font-size: 35px
          margin-bottom: 20px
        p
          margin-top: 5px
          margin-bottom: 5px
          font-size: 15px
          .title
            display: inline-block
          .value
            display: inline-block
        .address-container
          margin-bottom: 5px
          p
            margin-bottom: 5px
            margin-top: 5px
        .value
          font-weight: 900
</style>