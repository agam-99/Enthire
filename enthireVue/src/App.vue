<template>
  <div id="app">
    <div class="calendar-invite pt-5">
      <div class="row d-flex justify-content-center" style="width:99%">
        <h1 class="col-lg-6">GOOGLE CALENDAR INVITE</h1>
      </div>
      <div class="row d-flex justify-content-center my-3" style="width:99%">
        <div class="col-lg-4" style="text-align:center;">
          <img src="https://img.icons8.com/color/240/000000/google-calendar.png" alt="agam" />
        </div>
      </div>
      <div class="row d-flex justify-content-center my-3" style="width:99%">
        <div class="col-lg-6">
          <form @submit.prevent="addToDo" class="d-flex justify-content-center">
            <div class="form-group" style="width:70%">
              <input
                type="email"
                v-model="singleId"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                value
              />
            </div>
            <button
              type="submit"
              class="ml-3 btn-sm btn-primary"
              style="height:40px !important;"
            >Add Email</button>
          </form>
        </div>
      </div>
      <div class="row d-flex my-3 justify-content-center" style="width:99%">
        <div
          v-bind:key="mail.id"
          v-for="mail in this.emailArr"
          class="col-lg-8"
          style="text-align:center; color:white;"
        >{{mail.emailId}}</div>
      </div>
      <div class="row d-flex justify-content-center py-5 mt-3" style="width:99%">
        <div class="col-lg-8" style="text-align:center;">
          <button
            v-on:click="submit"
            type="button"
            class="ml-3 btn-sm btn-outline-light"
            style="font-size:1.3rem; background:transparent;"
          >Send</button>
        </div>
        <div class="col-lg-8 pt-5" style="text-align:center ">
          <div v-if="empty">please enter atleast one email</div>
        </div>
        <div class="col-lg-8 pt-2" v-if="response!==''" v-show="elementVisible" style="text-align:center "><b><h3>{{response=="success"?"success":"fail"}}</h3></b></div>
      </div>
      <!-- <div class="row d-flex justify-content-center py-5 mt-3" style="width:99%">
    <h3 class="col lg-8  response" style="text-align:center; opacity:{{adv}}"></h3>
      </div>-->
    </div>
  </div>
</template>

<script>
import uuid from "uuid";
import axios from "axios";
export default {
  name: "app",
  components: {},
  data() {
    return {
      email: {
        id: "",
        emailId: ""
      },
      emailArr: [],
      singleId: "",
      data: [],
      response: "",
      empty: false,
      elementVisible:true
    };
  },
  methods: {
    addToDo() {
      if (!this.data.includes(this.singleId)) {
        this.elementVisible=true;
        let val = {
          id: uuid.v4(),
          emailId: this.singleId
        };
        this.response="";
        this.data.push(this.singleId);
        this.emailArr.push(val);
        this.singleId = "";
        this.empty = false;
        console.log(this.data);
      }
    },
    submit() {
      if (this.emailArr.length == 0) {
        this.empty = true;
      } else {
        this.emailArr = [];
        axios
          .post("http://localhost:3000", {
            data: this.data
          })
          .then(res => {
            this.response = res.data.status;
            console.log(res.data.status);
          })
          .catch(err => console.log(err));
        this.singleId = "";
        this.data=[]
      }
      setTimeout(() => this.elementVisible = false, 4000)
      this.response=""
    }
  }
};
</script>

<style>
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
#app {
  margin: 0;
}
.calendar-invite {
  background: linear-gradient(rgb(113, 217, 231), rgb(58, 58, 248));
  height: auto;
  min-height: 99vh;
}
h1 {
  font-family: "Lato";
  text-align: center;
  color: rgb(24, 51, 73);
}
</style>