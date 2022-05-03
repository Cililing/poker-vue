<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!--    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />-->
    <p>
      {{ news }}
    </p>
    <p>
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { useNewsStore } from "@/store/newsStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "HomeView",

  setup() {
    console.log("Enter: HomeView");

    const newsStore = useNewsStore();
    const { news, error } = storeToRefs(newsStore);

    onBeforeMount(() => {
      if (news.value.length == 0) {
        newsStore.fetchNews();
      }
    });

    return {
      news,
      error,
    };
  },
});
</script>