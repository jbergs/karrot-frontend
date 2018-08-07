<script>
import { connect } from 'vuex-connect'
import ApplicationChatUI from '@/components/Applications/ApplicationChatUI'

export default connect({
  gettersToProps: {
    application: 'groupApplications/currentApplication',
  },
})('ApplicationChat', ApplicationChatUI)
</script>
