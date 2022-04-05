<!-- =========================================================================================
  File Name: UserList.vue
  Description: User List page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-parent-completness-list">
    <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
            >
              <span class="mr-2"
                >{{
                  currentPage * paginationPageSize - (paginationPageSize - 1)
                }}
                -
                {{
                  parentCompletnessData.length - currentPage * paginationPageSize > 0
                    ? currentPage * paginationPageSize
                    : parentCompletnessData.length
                }}
                of {{ parentCompletnessData.length }}</span
              >
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
            <vs-dropdown-menu>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(25)">
                <span>25</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(30)">
                <span>30</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
        <vs-input
          class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4"
          v-model="searchQuery"
          @input="updateSearchQuery"
          placeholder="Search..."
        />
        <!-- <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button> -->
        <div
          @click="popup = true"
          class="p-3 shadow-drop rounded-lg d-theme-dark-light-bg cursor-pointer flex items-end justify-center text-lg font-medium w-32 text-primary"
        >
          <span class="mr-2 leading-none">Add</span>
          <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
        </div>
      </div>

      <!-- AgGrid Table -->
      <ag-grid-vue
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="parentCompletnessData"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="false"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl"
      >
      </ag-grid-vue>

      <vs-pagination :total="totalPages" :max="7" v-model="currentPage" />
    </div>

    <!-- Popup -->
    <div class="centerx">
      <vs-popup class="holamundo" :title="popupTitle" :active.sync="popup">
        <div class="vx-row">
          <div class="vx-col w-full mb-4">
            <span class="block mb-2">Type</span>
            <vs-input name="type" class="w-full" v-model="payload.type" />
          </div>

          <div class="vx-col w-full">
            <div class="centerx">
              <span class="block mb-2">Score : <strong>{{ payload.score }}</strong></span>
              <vs-slider color="primary" :min="1" :max="10" v-model="payload.score" />
            </div>
          </div>
        </div>

        <div class="vx-row mt-base">
          <div class="vx-col w-full">
            <vs-button icon-pack="feather" icon="icon-save" @click="storeItem"
              >Save</vs-button
            >
          </div>
        </div>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import "@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss";

// Store Module
import moduleParentCompletnessManagement from "@/store/parent-completness-management/moduleParentCompletnessManagement.js";

// Cell Renderer
import CellRendererActions from "./cell-renderer/CellRendererActions.vue";

export default {
  metaInfo: {
    title: "Parent Completnesses",
    titleTemplate: "%s - MeMart",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
  components: {
    AgGridVue,

    // Cell Renderer
    CellRendererActions,
  },

  data() {
    return {
      payload: {},
      popup: false,

      // agGrid settings
      searchQuery: "",
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true,
      },
      columnDefs: [
        {
          headerName: "Type",
          field: "type",
        },
        {
          headerName: "Score",
          field: "score",
        },
        {
          headerName: "Actions",
          field: "transactions",
          cellRendererFramework: "CellRendererActions",
          cellRendererParams: {
            getData: this.getData.bind(this),
            editItem: this.editItem.bind(this),
          },
        },
      ],

      // Cell Renderer Components
      components: {
        CellRendererActions,
      },
    };
  },

  watch: {
    popup(popup) {
      if (!popup) {
        this.payload = {};
      }
    },
  },

  computed: {
    popupTitle() {
      if (!Object.hasOwn(this.payload, "itemID")) return "Add Parent Completness";

      return "Edit Parent Completness";
    },
    parentCompletnessData() {
      return this.$store.state.parentCompletnessManagement.parent_completnesses;
    },
    paginationPageSize() {
      if (this.gridApi) return this.gridApi.paginationGetPageSize();
      else return 10;
    },
    totalPages() {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages();
      else return 0;
    },
    currentPage: {
      get() {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1;
        else return 1;
      },
      set(val) {
        this.gridApi.paginationGoToPage(val - 1);
      },
    },
  },
  methods: {
    setColumnFilter(column, val) {
      const filter = this.gridApi.getFilterInstance(column);
      let modelObj = null;

      if (val !== "all") {
        modelObj = { type: "equals", filter: val };
      }

      filter.setModel(modelObj);
      this.gridApi.onFilterChanged();
    },
    resetColFilters() {
      // Reset Grid Filter
      this.gridApi.setFilterModel(null);
      this.gridApi.onFilterChanged();

      // Reset Filter Options
      this.roleFilter =
        this.statusFilter =
        this.isVerifiedFilter =
        this.departmentFilter =
          { label: "All", value: "all" };

      this.$refs.filterCard.removeRefreshAnimation();
    },
    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val);
    },

    getData() {
      this.$vs.loading({
        type: "sound",
      });

      this.$store
        .dispatch("parentCompletnessManagement/fetchParentCompletnesses")
        .catch((err) => console.error(err))
        .finally(() => {
          this.$vs.loading.close();
        });
    },

    editItem(item) {
      this.payload = {
        itemID: item.id,
        type: item.type,
        score: item.score,
      };
      this.popup = true;
    },

    storeItem() {
      // Store Item
      if (!Object.hasOwn(this.payload, "itemID")) {
        this.$store
          .dispatch("parentCompletnessManagement/storeParentCompletness", this.payload)
          .then(({ data: res }) => {
            this.$vs.notify({
              title: "Successful",
              text: res.msg_status,
              color: "success",
            });

            this.getData();
            this.payload = {};
            this.popup = false;
          })
          .catch((err) => console.error(err));
      }
      // Update Item
      else {
        const payload = Object.assign(this.payload, { _method: "PUT" });
        const itemID = payload.itemID;
        delete payload.itemID;

        this.$store
          .dispatch("parentCompletnessManagement/updateParentCompletness", {
            id: itemID,
            body: payload,
          })
          .then(({ data: res }) => {
            this.$vs.notify({
              title: "Successful",
              text: res.msg_status,
              color: "success",
            });

            this.getData();
            this.payload = {};
            this.popup = false;
          })
          .catch((err) => console.error(err));
      }
    },
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridApi.sizeColumnsToFit();

    /* =================================================================
      NOTE:
      Header is not aligned properly in RTL version of agGrid table.
      However, we given fix to this issue. If you want more robust solution please contact them at gitHub
    ================================================================= */
    if (this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector(
        ".ag-header-container"
      );
      header.style.left = `-${String(
        Number(header.style.transform.slice(11, -3)) + 9
      )}px`;
    }
  },
  created() {
    if (!moduleParentCompletnessManagement.isRegistered) {
      this.$store.registerModule(
        "parentCompletnessManagement",
        moduleParentCompletnessManagement
      );
      moduleParentCompletnessManagement.isRegistered = true;
    }

    this.getData();
  },
};
</script>

<style lang="scss">
#page-parent-completness-list {
  .brand-list-filters {
    .vs__actions {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-58%);
    }
  }
}
</style>
