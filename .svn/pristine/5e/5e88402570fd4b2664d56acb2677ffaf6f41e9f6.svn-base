// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueContextMenu from 'vue-contextmenu'
// import vueQuillEditor from 'vue-quill-editor'
import vueQuillEditor from 'vue-quill-editor' // 引入富文本工具
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import '@/common/css/reset.css'
import '@/common/css/font-bootstrap.css'
import '@/common/css/Zstyle.css'
import '@/common/css/style.css'
import axios from 'axios'
import store from './store'

// email邮件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


// 横七竖八的字符
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import 'echarts-wordcloud/dist/echarts-wordcloud'
import 'echarts-wordcloud/dist/echarts-wordcloud.min'
// cytoscape图
import cytoscape from 'cytoscape';
// import cytoscape from '@/common/cosjs/cytoscape.min.js'
Vue.prototype.$cytoscape = cytoscape;

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueContextMenu)
Vue.use(vueQuillEditor)
Vue.use(vueQuillEditor)//email
    // axios过滤器
axios.interceptors.request.use(function(config) {
    // Do something before request is sent
    // config.headers['authtoken'] = 'FFEB73A5636444EEB2E2AF5786D463C9'
    if (localStorage.getItem('userInfo')) {
        config.headers['token'] = JSON.parse(localStorage.getItem('authtoken'))
    }
    return config
}, function(error) {
    // Do something with request error
    return Promise.reject(error)
})
axios.interceptors.response.use(function(response) {
    // Do something with response data
    if (response.data.code === '1005' || response.data.code === '1008' || response.data.message === "用户未登录") {
        // window.location.reload()
        localStorage.clear()
        router.push({
            path: '/'
        })
    }
    return response
}, function(error) {
    // Do something with response error
    return Promise.reject(error)
})

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面meta */
    if (to.meta.content) {
        let head = document.getElementsByTagName('head')
        let meta = document.createElement('meta')
        meta.content = to.meta.content
        meta.name = to.meta.name
        head[0].appendChild(meta)
    } else {
        let head = document.getElementsByTagName('head')[0],
            nodes = head.childNodes,
            node, i = 0
        while (node = nodes[i++]) {
            if (node.nodeType === 1 && node.tagName.toLowerCase() === 'meta' && node.getAttribute("name") === 'viewport') {
                head.removeChild(node)
            }
        }
    }
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next()
})

// 格式化数据字典类型数据
Vue.filter('formatType', function(type) {
        let dictionary = JSON.parse(localStorage.getItem('dictionary'))
        return dictionary[type]
    })
    // 输入框自动完成组件
Vue.component('my-item-zh', {
        functional: true,
        render: function(h, ctx) {
            var item = ctx.props.item
            return h('li', ctx.data, [
                h('img', { attrs: { class: 'img', src: item.picture } }),
                h('div', { attrs: { class: 'name' } }, [item.name]),
                h('span', { attrs: { class: 'addr' } }, [item.standard])
            ])
        },
        props: {
            item: { type: Object, required: true }
        }
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})