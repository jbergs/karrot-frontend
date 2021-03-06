<template>
  <div>
    <UnsupportedBrowserWarning
      class="fixed-bottom"
      style="z-index: 9999"
    />

    <template v-if="routeError.hasError">
      <RouteError>
        <p
          v-if="routeError.message"
          class="caption text-center"
        >
          <span
            v-if="routeError.message.translation"
            v-t="routeError.message.translation"
          />
        </p>
      </RouteError>
    </template>

    <div
      v-else
      class="background mainLayoutDesktop"
    >
      <q-layout :view="layoutView">
        <q-layout-header reveal>
          <KTopbar
            v-if="isLoggedIn"
            @toggleSidenav="toggleSidenav"
          >
            <q-btn
              flat
              @click="toggleSidenav"
              class="mobile-only"
            >
              <i class="fas fa-bars" />
            </q-btn>
          </KTopbar>
          <KTopbarLoggedOut v-if="!isLoggedIn" />
        </q-layout-header>

        <!-- mobile sidenav -->
        <q-layout-drawer
          v-if="$q.platform.is.mobile"
          side="left"
          :width="sidenavWidth"
          :breakpoint="Number.MAX_SAFE_INTEGER"
          :value="showSidenav"
          :overlay="false"
          @click.native="toggleSidenav"
        >
          <router-view name="sidenav" />
          <MobileSidenav/>
        </q-layout-drawer>

        <!-- desktop sidenav -->
        <q-layout-drawer
          v-else-if="isLoggedIn && hasSidenavComponent && !disableDesktopSidenav"
          side="left"
          :width="sidenavWidth"
          :breakpoint="0"
          :value="true"
          :overlay="false"
          @click.native="toggleSidenav"
        >
          <router-view name="sidenav" />
        </q-layout-drawer>

        <q-page-container>
          <Banners />
          <router-view name="fullPage"/>
          <div class="mainContent row justify-between no-wrap">
            <div class="mainContent-page">
              <router-view />
            </div>
          </div>
          <KFooter v-if="$q.platform.is.mobile && !isLoggedIn" />
        </q-page-container>
        <q-layout-drawer
          v-if="!$q.platform.is.mobile"
          side="right"
          :width="400"
          :overlay="false"
          :breakpoint="0"
          :value="showSidenavRight"
        >
          <Detail @close="clearDetail"/>
        </q-layout-drawer>
        <q-layout-footer>
          <UnsupportedBrowserWarning
            v-if="$q.platform.is.mobile && !$keyboard.is.open"
          />
          <KFooter v-if="!$q.platform.is.mobile" />
        </q-layout-footer>
        <q-window-resize-observable @resize="onResize" />
      </q-layout>
    </div>
  </div>
</template>

<script>
import KTopbar from '@/components/Layout/KTopbar'
import KTopbarLoggedOut from '@/components/Layout/LoggedOut/KTopbar'
import KFooter from '@/components/Layout/KFooter'
import MobileSidenav from '@/components/Sidenav/MobileSidenav'
import Banners from '@/components/Layout/Banners'
import RouteError from '@/components/RouteError'
import UnsupportedBrowserWarning from '@/components/UnsupportedBrowserWarning'
import Detail from '@/components/General/Detail'
import { mapGetters, mapActions } from 'vuex'
import {
  dom,
  QLayout,
  QLayoutHeader,
  QLayoutDrawer,
  QLayoutFooter,
  QPageContainer,
  QWindowResizeObservable,
  QBtn,
} from 'quasar'

const { width } = dom

export default {
  components: {
    Detail,
    KTopbar,
    KTopbarLoggedOut,
    KFooter,
    MobileSidenav,
    QLayout,
    QLayoutHeader,
    QLayoutDrawer,
    QLayoutFooter,
    QPageContainer,
    QWindowResizeObservable,
    QBtn,
    Banners,
    RouteError,
    UnsupportedBrowserWarning,
  },
  data () {
    return {
      showSidenav: false,
      windowWidth: width(window),
    }
  },
  methods: {
    ...mapActions({
      clearDetail: 'detail/clear',
    }),
    toggleSidenav () {
      this.showSidenav = !this.showSidenav
    },
    onResize ({ width }) {
      this.windowWidth = width
    },
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
      routeError: 'routeError/status',
      showSidenavRight: 'detail/isActive',
      disableDesktopSidenav: 'route/disableDesktopSidenav',
    }),
    layoutView () {
      if (this.$q.platform.is.mobile) {
        return 'hHh LpR fFf'
      }
      return 'hHh LpR lfr'
    },
    sidenavWidth () {
      if (this.$q.platform.is.mobile) {
        return Math.min(380, this.windowWidth)
      }
      return this.windowWidth > 1000 ? 380 : 280
    },
    routerComponents () {
      const components = {}
      for (const m of this.$route.matched) {
        for (const name of Object.keys(m.components)) {
          components[name] = true
        }
      }
      return components
    },
    hasSidenavComponent () {
      return Boolean(this.routerComponents.sidenav)
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~variables'
.mainContent-page
  width 100%
.sidenav-desktop
  width 30%
  min-width 250px
  max-width 30em
  margin-left auto
  margin-right .4em
body.desktop .mainContent
  max-width 1500px
  margin auto
  .mainContent-page
    min-width 350px
    max-width: 57em
    margin-bottom 4.5em
    margin-left auto
    margin-right auto
.background
  background-image url('../assets/repeating_grey.jpg')
  background-size: 600px
  background-attachment:fixed
.q-layout-footer
  box-shadow none
</style>

<style lang="stylus">
@import '~variables'

@media screen and (max-width: $breakpoint-lg)
  .sidenav-desktop > .q-card
    margin 5px 0
</style>
