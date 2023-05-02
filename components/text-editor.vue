<template>
  <div class="mb-12">
    <QuillEditor v-model:content="content" contentType="html" theme="snow" />
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  components: {
    QuillEditor,
  },
  props: ["data"],
  data() {
    return {
      content: "",
    };
  },
  watch: {
    content: {
      handler(r) {
        this.$emit("content", r);
      },
    },
    data: {
      handler(r) {
        this.content = r;
      },
    },
  },
};
</script>


<style>
.ql-container {
  min-height: 10rem;
  height: "200px";
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
