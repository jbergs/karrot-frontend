<template>
  <q-card>
    THIS IS WHERE THE CHAT WILL BE!
  </q-card>
</template>

<script>
import { QCard } from 'quasar'

export default {
  components: {
    QCard,
  },
  props: {
    application: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped lang="stylus">
</style>
