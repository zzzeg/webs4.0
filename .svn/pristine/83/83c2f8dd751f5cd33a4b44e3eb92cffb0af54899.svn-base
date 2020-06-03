<template>
  <div class="vue-editor">
    <quill-editor v-model="content"
                  ref="myQuillEditor"
                  :options="editorOption">
    </quill-editor>
    <div v-html="content"></div>{{ content }}
  </div>
</template>
<script>
  import { quillEditor } from 'vue-quill-editor'
  export default {
    data () {
      return {
        content: 'hello',
        editorOption: {}
      }
    },
    components: {
      quillEditor: quillEditor
    },
    methods: {
      onEditorChange ({ editor, html, text }) {
        this.content = html
        console.log(this.content)
      },
      submit () {
        console.log(this.content)
        this.$message.success('提交成功！')
      }
    },
    computed: {
      editor () {
        return this.$refs.myQuillEditor.quill
      }
    }
  }
</script>
<style>
  .ql-editor{
    height: 200px !important;
  }
  img{
    width: 100px;
  }
</style>
