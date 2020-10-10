import Vue from 'vue'
import CxltToastr from 'cxlt-vue2-toastr'

var toastrConfigs = {
    position: 'top right',
    showDuration: 5000
}


Vue.use(CxltToastr, toastrConfigs)