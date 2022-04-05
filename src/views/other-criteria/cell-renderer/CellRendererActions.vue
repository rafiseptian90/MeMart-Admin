<template>
    <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
      <feather-icon
        icon="Edit3Icon" 
        svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" 
        @click="editRecord" 
      />
      <feather-icon 
        icon="Trash2Icon" 
        svgClasses="h-5 w-5 hover:text-danger cursor-pointer" 
        @click="confirmDeleteRecord" 
      />
    </div>
</template>

<script>
export default {
  name: 'CellRendererActions',

  computed: {
    encryptedID () {
      return this.$secure.encrypt(this.params.data.id)
    }
  },

  methods: {
    editRecord () {
      this.params.editItem(this.params.data)
    },
    
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: `You are about to delete "${this.params.data.name}"`,
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },
    deleteRecord () {
      this.$store.dispatch("otherCriteriaManagement/destroyOtherCriteria", this.params.data.id)
                  .then(() => { this.showDeleteSuccess() })
                  .catch(err => { 
                    this.$vs.notify({
                      color: 'danger',
                      title: 'Failed to delete',
                      text: `The selected other criteria can't be deleted`
                    })
                  })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'Other Criteria Deleted',
        text: 'The selected other criteria was successfully deleted'
      })
    }
  }
}
</script>
