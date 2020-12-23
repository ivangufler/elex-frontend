<template>

<div class="flex flex-wrap">
    <div ref="btnRef" v-on:mouseenter="toggleTooltip()" v-on:mouseleave="toggleTooltip()">
      <slot></slot>
      
    </div>
  </div>

  <div ref="tooltipRef" v-bind:class="{'hidden': !tooltipShow, 'block': tooltipShow}" class="bg-primary border-0 mb-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg">
        <div>
          
          <div class="text-white p-2">
            {{tipText}}
          </div>
        </div>
      </div>
</template>

<script>
import Popper from "popper.js";
export default {
  name: "HoverTip",
  created() {},
  data() {
    return {
      tooltip: false,
      tooltipShow: false
      
    };
  },
  props: {
    tipText: String,
  },
  methods: {
    toggleTooltip: function(){
      if(this.tooltipShow){
        this.tooltipShow = false;
      } else {
        this.tooltipShow = true;
        new Popper(this.$refs.btnRef, this.$refs.tooltipRef, {
          placement: "top"
       });
      }
    }
  },
};
</script>