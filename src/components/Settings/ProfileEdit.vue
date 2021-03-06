<template>
  <div
    class="edit-box"
    :class="{ changed: hasChanged }"
  >
    <form @submit.prevent="save">
      <q-field
        icon="fas fa-star"
        :label="$t('USERDETAIL.DISPLAY_NAME')"
        :error="hasError('displayName')"
        :error-label="firstError('displayName')"
      >
        <q-input v-model="edit.displayName"/>
      </q-field>

      <q-field
        icon="info"
        :label="$t('USERDETAIL.DESCRIPTION')"
        :error="hasError('description')"
        :error-label="firstError('description')"
      >
        <MarkdownInput :value="edit.description">
          <q-input
            v-model="edit.description"
            type="textarea"
            rows="1"
            @keyup.ctrl.enter="save"
          />
        </MarkdownInput>
      </q-field>

      <q-field
        icon="fas fa-phone"
        :label="$t('USERDATA.MOBILE_NUMBER')"
        :error="hasError('mobileNumber')"
        :error-label="firstError('mobileNumber')"
      >
        <q-input
          type="tel"
          v-model="edit.mobileNumber"
        />
      </q-field>

      <q-field
        icon="fas fa-map-marker"
        :label="$t('USERDATA.WHERE_FROM')"
        :error="hasAddressError"
        :error-label="addressError"
      >
        <AddressPicker
          v-model="edit"
          color="positive"
          font-icon="fas fa-user"
        />
      </q-field>

      <div
        v-if="hasNonFieldError"
        class="text-negative"
      >
        {{ firstNonFieldError }}
      </div>

      <div class="actionButtons">
        <q-btn
          type="submit"
          color="primary"
          :disable="!hasChanged"
          :loading="isPending"
        >
          {{ $t('BUTTON.SAVE_CHANGES') }}
        </q-btn>

        <q-btn
          type="button"
          @click="reset"
          :disable="!hasChanged"
        >
          {{ $t('BUTTON.RESET') }}
        </q-btn>
      </div>
    </form>
  </div>
</template>

<script>
import { QDatetime, QField, QSlider, QInput, QBtn, QSelect } from 'quasar'
import AddressPicker from '@/components/Address/AddressPicker'
import MarkdownInput from '@/components/MarkdownInput'
import editMixin from '@/mixins/editMixin'
import statusMixin from '@/mixins/statusMixin'

export default {
  components: {
    QDatetime, QField, QSlider, QInput, QBtn, QSelect, AddressPicker, MarkdownInput,
  },
  mixins: [statusMixin, editMixin],
  computed: {
    hasAddressError () {
      return !!this.addressError
    },
    addressError () {
      for (let field of ['address', 'latitude', 'longitude']) {
        if (this.hasError(field)) return this.firstError(field)
      }
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~editbox'

.q-field
  margin 3em 0
</style>
