import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "../components/Dashboard";
import IndividualStock from "../components/IndividualStock";
import Multi from "../components/Multi";
import SelfSelect from "../components/SelfSelect";
import checkbox from "../components/checkbox";
import GoldInfo from "../components/GoldInfo";
import NationalInfo from "../components/NationalInfo"
import InternationalInfo from "../components/InternationalInfo";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/IndividualStock',
        name: 'IndividualStock',
        component: IndividualStock
    },
    {
        path: '/checkbox',
        name: 'checkbox',
        component: checkbox
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
    },{
        path: '/GoldInfo',
        name: 'GoldInfo',
        component: GoldInfo
    },
    {
        path: '/NationalInfo',
        name: 'NationalInfo',
        component: NationalInfo
    },
    {
        path: '/InternationalInfo',
        name: 'InternationalInfo',
        component: InternationalInfo
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router
