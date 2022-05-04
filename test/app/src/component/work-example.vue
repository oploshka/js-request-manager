<template>
  <div>

    <h2 class="mb-5">Examples of how this plugin works</h2>

    <!--<div class="row g-5">-->
    <!--  <div class="col-md-4">-->
    <!--    <h2>Alert</h2>-->
    <!--    <p>Alert examples</p>-->
    <!--    <ul class="icon-list">-->
    <!--      <li><a href="#" @click.stop="showAlertSuccess">Show alert success</a></li>-->
    <!--      <li><a href="#" @click.stop="showAlertWarning">Show alert warning</a></li>-->
    <!--      <li><a href="#" @click.stop="showAlertError">Show alert error</a></li>-->
    <!--      <li><a href="#" @click.stop="showAlertCountr3">Show 3 alert</a></li>-->
    <!--      &lt;!&ndash;<li class="text-muted">Bootstrap Parcel starter (coming soon!)</li>&ndash;&gt;-->
    <!--    </ul>-->
    <!--  </div>-->
    
    <!--  <div class="col-md-4">-->
    <!--    <h2>Confirm</h2>-->
    <!--    <p>It will be implemented in the following versions</p>-->
    <!--    <ul class="icon-list">-->
    <!--      <li><a href="#" @click.stop="showConfirmation">Show alert success</a></li>-->
    <!--    </ul>-->
    <!--  </div>-->
    
    <!--  <div class="col-md-4">-->
    <!--    <h2>Prompt</h2>-->
    <!--    <p>It will be implemented in the following versions</p>-->
    <!--    <ul class="icon-list">-->
    <!--      &lt;!&ndash;<li class="text-muted">Bootstrap Parcel starter (coming soon!)</li>&ndash;&gt;-->
    <!--    </ul>-->
    <!--  </div>-->
    
    <!--  <div class="col-md-4">-->
    <!--    <h2>Modal</h2>-->
    <!--    <p>It will be implemented in the following versions</p>-->
    <!--    <ul class="icon-list">-->
    <!--      &lt;!&ndash;<li class="text-muted">Bootstrap Parcel starter (coming soon!)</li>&ndash;&gt;-->
    <!--    </ul>-->
    <!--  </div>-->
    
    <!--</div>-->

  </div>
</template>

<script>

import axios from 'axios';
import {RequestManager} from 'js-request-manager';

global.axios = axios;


export default {
  name: 'work-example',
  // data() {
  //   return {};
  // },
  methods: {
  },
  
  mounted() {
    const rm = RequestManager({}, {});
    rm.getListener().on('REQUEST_PROMISE', (promise) => {
      console.warn('REQUEST_PROMISE_CALLBACK', promise)
    })
    rm.getListener().on('REQUEST_SUCCESS', (promise) => {
      console.warn('REQUEST_SUCCESS_CALLBACK', promise)
    })
    rm.getListener().on('REQUEST_ERROR', (promise) => {
      console.warn('REQUEST_ERROR_CALLBACK', promise)
    })
    console.log(rm);
    rm.send('GET', 'https://reqres.in/api/users', {})
        // .then(console.warn, console.error);
  }
};
</script>

<style scoped>
.icon-list {
  padding-left: 0;
  list-style: none;
}
.icon-list li {
  display: flex;
  align-items: flex-start;
  margin-bottom: .25rem;
}
.icon-list li::before {
  display: block;
  flex-shrink: 0;
  width: 1.5em;
  height: 1.5em;
  margin-right: .5rem;
  content: "";
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23212529' viewBox='0 0 16 16'%3E%3Cpath d='M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z'/%3E%3C/svg%3E") no-repeat center center / 100% auto;
}
</style>
