import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "../components/Dashboard";
import IndividualStock from "../components/IndividualStock";
import Multi from "../components/Multi";
import SelfSelect from "../components/SelfSelect";
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/IndividualStock',
        name: 'Browse',
        component: IndividualStock
    },
    {
        path: '/MyChoose',
        name: 'Browse',
        component: IndividualStock
    },
    {
        path: '/SingleStock',
        name: 'SingleStock',
        component: IndividualStock
    },
    {
        path: '/SelfSelect',
        name: 'SelfSelect',
        component: SelfSelect
    },
    {
        path: '/Multi',
        name: 'Multi',
        component: Multi
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router
