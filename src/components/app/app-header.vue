<style lang="less">
.app-header {
  color: rgba(49, 58, 70, 0.8);

  .h-autocomplete {
    line-height: 1.5;
    float: left;
    margin-top: 15px;
    margin-right: 20px;
    width: 120px;
    &-show,
    &-show:hover,
    &-show.focusing {
      outline: none;
      box-shadow: none;
      border-color: transparent;
      border-radius: 0;
    }
    &-show.focusing {
      border-bottom: 1px solid #eee;
    }
  }
  &-info &-icon-item {
    cursor: pointer;
    display: inline-block;
    float: left;
    padding: 0 15px;
    height: @layout-header-height;
    line-height: @layout-header-height;
    margin-right: 10px;
    &:hover {
      background: @hover-background-color;
    }
    i {
      font-size: 18px;
    }
    a {
      color: inherit;
    }
    .h-badge {
      margin: 20px 0;
      display: block;
    }
  }
  .h-dropdownmenu {
    float: left;
  }

  &-dropdown {
    float: right;
    margin-left: 10px;
    padding: 0 20px 0 15px;
    .h-icon-down {
      right: 20px;
    }
    cursor: pointer;
    &:hover,
    &.h-pop-trigger {
      background: @hover-background-color;
    }
    &-dropdown {
      padding: 5px 0;
      .h-dropdownmenu-item {
        padding: 8px 20px;
      }
    }
  }

  &-menus {
    display: inline-block;
    vertical-align: top;
    > div {
      display: inline-block;
      font-size: 15px;
      padding: 0 25px;
      color: @dark-color;
      &:hover {
        color: @primary-color;
      }
      + div {
        margin-left: 5px;
      }
      &.h-tab-selected {
        color: @white-color;
        background-color: @primary-color;
      }
    }
  }
}
</style>

<template>
  <div class="app-header">
    <div class="float-right app-header-info">
      <div class="app-header-icon-item">
        <a href="/admin">返回后台首页</a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['User']),
    siderCollapsed: {
      get() {
        return this.$store.state.siderCollapsed;
      },
      set(value) {
        this.$store.commit('updateSiderCollapse', value);
      }
    }
  },
  mounted() {
    this.listenResize();
  },
  methods: {
    listenResize() {
      let windowWidth = window.innerWidth;
      const resizeEvent = window.addEventListener('resize', () => {
        if (windowWidth == window.innerWidth) {
          return;
        }
        if (this.siderCollapsed && window.innerWidth > 900) {
          this.siderCollapsed = false;
        } else if (!this.siderCollapsed && window.innerWidth < 900) {
          this.siderCollapsed = true;
        }
        windowWidth = window.innerWidth;
      });
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', resizeEvent);
      });
      window.dispatchEvent(new Event('resize'));
    }
  }
};
</script>
