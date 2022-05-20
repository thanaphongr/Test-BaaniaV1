<template>
  <div class="hello">
    <div class="container">
      <b-row class="clearfix">
        <b-col lg="12" style="background: #F4F7FC;">
          <b-card-body>
            <b-row align-h="start">
              <b-col lg="5">
                <b-row>
                  <b-col lg="12" class="p-2 font-weight-bold text-left">URL</b-col>
                  <b-col lg="12">
                    <b-input type="text" placeholder="http://localhost" v-model="m_connect.url"></b-input>
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="5">
                <b-row>
                  <b-col lg="12" class="p-2 font-weight-bold text-left">PORT</b-col>
                  <b-col lg="12">
                    <b-input type="text" placeholder="8000" v-model="m_connect.port"></b-input>
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="2">
                <b-row>
                  <b-col lg="12" class="p-2 font-weight-bold text-left">&nbsp;</b-col>
                  <b-col lg="12">
                    <b-button variant="primary" style="width: 120px" @click="onConnect()">CONNECT</b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card-body>
        </b-col>
        <b-col lg="12">
          <b-card-body>
            <b-row align-h="start">
              <b-col lg="10">
                <h5 class="text-left">
                  <b>HOUSE LIST</b>
                </h5>
              </b-col>
              <b-col lg="2">
                <b-button variant="success" style="width: 120px" @click="onCreate()">CREATE</b-button>
              </b-col>
            </b-row>
            <b-row align-h="start">
              <b-col lg="12" class="pt-4">
                <div class="table-responsive">
                  <b-table 
                    show-empty
                    thead-tr-class='THtable'
                    tbody-tr-class='TDtable'
                    :fields="headers"
                    :items="items"
                    :current-page="pagination.currentPage"
                    :per-page="pagination.perPage">
                    <template v-slot:cell(action)="data">
                      <b-button pill class="btn custom-view" @click="onView(data.item)">VIEW DETAIL</b-button>&nbsp;
                      <b-button pill class="btn custom-delete" @click="onDelete(data.item)">DELETE</b-button>
                    </template>
                    <template v-slot:empty>
                      <div style="text-align:center">No Data</div>
                    </template>
                  </b-table>
                </div>
              </b-col>
            </b-row>
            <b-row align-h="start" class="p-2">
              <b-col lg="6" class="text-left"></b-col>
              <b-col lg="4" class="text-right">
                <label>Rows per page: </label>&nbsp;
                <b-form-select
                  style="width:70px;"
                  v-model="pagination.perPage"
                  :options="pagination.PageOption"
                  @change="onChangePageSize"
                ></b-form-select>&nbsp;
                <label>{{onCal()}} of {{ pagination.totalRows }}</label>
              </b-col>
              <b-col lg="2" class="text-left">
                <b-pagination
                  v-model="pagination.currentPage"
                  @change="onChangePageNo"
                  :total-rows="pagination.totalRows"
                  :per-page="pagination.perPage"
                  limit="1"
                  align="fill" size="sm" class="my-0">
                </b-pagination>
              </b-col>
            </b-row>
          </b-card-body>
        </b-col>
        <b-col lg="12" style="background: #F4F7FC; margin-bottom: 5%">
          <b-card-body>
            <b-row align="center">
              <b-col lg="4"></b-col>
              <b-col lg="4">
                <basic-select
                  :options="ddlPostCode"
                  :selected-option="ddlPostCodeSel"
                  option-text="post_code"
                  placeholder="select item"
                  @select="onSelect"
                ></basic-select>
                <div class="text-left" style="color: #007bff" v-if="flagview">
                  <label class="mt-2">Average: {{m_detailPostcode.average}}</label><br>
                  <label class="mt-2">Median: {{m_detailPostcode.median}}</label>
                </div>
              </b-col>
              <b-col lg="4"></b-col>
            </b-row>
          </b-card-body>
        </b-col>
      </b-row>
      <b-modal size="lg" id="create" ref="create" title="Create" title-class="title-modal" hide-footer centered no-close-on-esc no-close-on-backdrop hide-header-close>
        <b-row class="mb-2">
          <b-col lg="6">
            <div class="card" style="padding: 0px 10px 0px 10px">
              <md-field>
                <span class="md-helper-text">Name</span>
                <md-input v-model="m_data.name"></md-input>
              </md-field>
            </div>
          </b-col>
          <b-col lg="3">
            <div class="card" style="padding: 0px 10px 0px 10px">
              <md-field>
                <span class="md-helper-text">Post Code</span>
                <md-input v-model="m_data.post_code"></md-input>
              </md-field>
            </div>
          </b-col>
          <b-col lg="3">
            <div class="card" style="padding: 0px 10px 0px 10px">
              <md-field>
                <span class="md-helper-text">Price</span>
                <md-input v-model="m_data.price"></md-input>
              </md-field>
            </div>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col lg="12">
            <md-field>
              <label>Description</label>
              <md-textarea v-model="m_data.desc"></md-textarea>
            </md-field>
          </b-col>
        </b-row>
        <b-row align="center" class="mb-2">
          <b-col lg="12">
            <b-button variant="outline-secondary" style="width: 120px" @click="$bvModal.hide('create')">CANCEL</b-button>&nbsp;
            <b-button variant="success" style="width: 120px" @click="onCreateSave()">CREATE</b-button>
          </b-col>
        </b-row>
      </b-modal>
      <b-modal size="lg" id="update" ref="update" :title="m_data.title" title-class="title-modal" hide-footer centered no-close-on-esc no-close-on-backdrop hide-header-close>
        <b-row class="mb-2">
          <b-col lg="6">
            <div class="card" style="padding: 0px 10px 0px 10px">
              <md-field>
                <span class="md-helper-text">Name</span>
                <md-input v-model="m_data.name"></md-input>
              </md-field>
            </div>
          </b-col>
          <b-col lg="3">
            <div class="card" style="padding: 0px 10px 0px 10px">
              <md-field>
                <span class="md-helper-text">Post Code</span>
                <md-input v-model="m_data.post_code"></md-input>
              </md-field>
            </div>
          </b-col>
          <b-col lg="3">
            <div class="card" style="padding: 0px 10px 0px 10px">
              <md-field>
                <span class="md-helper-text">Price</span>
                <md-input v-model="m_data.price"></md-input>
              </md-field>
            </div>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col lg="12">
            <md-field>
              <label>Description</label>
              <md-textarea v-model="m_data.desc"></md-textarea>
            </md-field>
          </b-col>
        </b-row>
        <b-row align="center" class="mb-2">
          <b-col lg="12">
            <b-button variant="outline-secondary" style="width: 120px" @click="$bvModal.hide('update')">CANCEL</b-button>&nbsp;
            <b-button class="btn custom-update" style="width: 120px" @click="onUpdateSave()">UPDATE</b-button>
          </b-col>
        </b-row>
      </b-modal>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import tservice from '../service/testservice'
import { MultiSelect, ModelListSelect, BasicSelect } from 'vue-search-select'
export default {
  name: 'TestGetlist',
  components: {
    BasicSelect
  },
  data() {
    return {
      headers: [
        { label: 'ID', key: 'id', thStyle: { 'width': '10%' } },
        { label: 'Name', key: 'name', thStyle: { 'width': '30%' } },
        { label: 'Post Code', key: 'post_code', thStyle: { 'width': '20%' } },
        { label: 'Price', key: 'price', thStyle: { 'width': '20%' } },
        { label: 'Action', key: 'action', thStyle: { 'width': '20%' } },
      ],
      items: [],
      pagination: {
        currentPage: 1,
        totalRows: 0,
        perPage: 5,
        PageOption: [5, 10, 20, 50, 100]
      },
      m_connect: {
        url: '',
        port: ''
      },
      m_data: {
        title: '',
        id: '',
        name: '',
        post_code: '',
        price: '',
        desc: '',
      },
      ddlPostCode: [],
      ddlPostCodeSel: {
        value: '',
        text: ''
      },
      m_detailPostcode:{
        average: "",
        median: ""
      },
      flagview: false,

      users: {
        mdCount: null,
        mdPage: null,
        mdData: []
      },
      rowsPerPage: 3,
    }
  },
  methods: {
    onConnect () {
      let vConnect = this.m_connect.port == '' ? this.m_connect.url : `${this.m_connect.url}:${this.m_connect.port}`;
      window.localStorage.setItem('resUrl', vConnect);
      window.localStorage.setItem('url', this.m_connect.url);
      window.localStorage.setItem('port', this.m_connect.port);
      this.onGetList();
      this.onGetPostCode();
    },
    onGetList() {
      if(checkUrl()) {
        let setbody = {
          skip: this.pagination.currentPage - 1,
          take: this.pagination.perPage
        }
        tservice.onGet_list(setbody, response => {
          this.items = response.data.payload
          this.pagination.totalRows = response.data.count
        });
      } else {
        this.onGetList();
      }

      function checkUrl() {
        let _url = window.localStorage.getItem('resUrl')
        return _url != null && _url != '' && _url != undefined
      }
    },
    onCreate() {
      this.m_data.name = '';
      this.m_data.post_code = '';
      this.m_data.price = '';
      this.m_data.desc = '';
      this.$refs["create"].show();
    },
    onCreateSave() {
      this.$refs["create"].hide();
      let setbody = {
        name: this.m_data.name,
        post_code: this.m_data.post_code,
        price: parseFloat(this.m_data.price),
        desc: this.m_data.desc,
      }
      tservice.onPostCreate(setbody, response => {
        if (response.status) {
          swal({
            title: "Success",
            text: "Create a Successful!",
            icon: "success",
            buttons: {
              confirm: {
                text: "CONTINUE",
                value: true,
                visible: true,
                className: "custom-continue",
                closeModal: true,
              },
            },
            closeOnClickOutside: false,
          })
          .then(() => {
            this.items = [];
            this.onGetList();
          });
        } else {
          swal({
            title: "Fail",
            text: "Let's try one more again",
            icon: "error",
            buttons: {
              confirm: {
                text: "TRY AGAIN",
                value: true,
                visible: true,
                className: "custom-continue",
                closeModal: true,
              },
            },
            closeOnClickOutside: false,
          })
          .then(() => {
            this.items = [];
            this.onGetList();
          });
        }
      });
    },
    onView(data) {
      this.m_data.title = 'Item Detail - ' + data.id;
      this.m_data.id = data.id;
      this.m_data.name = data.name;
      this.m_data.post_code = data.post_code;
      this.m_data.price = data.price;
      this.m_data.desc = data.desc;
      this.$refs["update"].show();
    },
    onUpdateSave() {
      this.$refs["update"].hide();
      let setbody = {
        id: this.m_data.id,
        name: this.m_data.name,
        post_code: this.m_data.post_code,
        price: parseFloat(this.m_data.price),
        desc: this.m_data.desc,
      }
      tservice.onPatch_list(setbody, response => {
        if (response.status) {
          swal({
            title: "Success",
            text: "Create a Successful!",
            icon: "success",
            buttons: {
              confirm: {
                text: "CONTINUE",
                value: true,
                visible: true,
                className: "custom-continue",
                closeModal: true,
              },
            },
            closeOnClickOutside: false,
          })
          .then(() => {
            this.items = [];
            this.onGetList();
          });
        } else {
          swal({
            title: "Fail",
            text: "Let's try one more again",
            icon: "error",
            buttons: {
              confirm: {
                text: "TRY AGAIN",
                value: true,
                visible: true,
                className: "custom-continue",
                closeModal: true,
              },
            },
            closeOnClickOutside: false,
          })
          .then(() => {
            this.items = [];
            this.onGetList();
          });
        }
      });
    },
    onDelete(data) {
      let setbody = {
        id: data.id,
      }
      tservice.onDelete_list(setbody, response => {
        if (response.status) {
          swal({
            title: "Success",
            text: "Create a Successful!",
            icon: "success",
            buttons: {
              confirm: {
                text: "CONTINUE",
                value: true,
                visible: true,
                className: "custom-continue",
                closeModal: true,
              },
            },
            closeOnClickOutside: false,
          })
          .then(() => {
            this.items = [];
            this.onGetList();
          });
        } else {
          swal({
            title: "Fail",
            text: "Let's try one more again",
            icon: "error",
            buttons: {
              confirm: {
                text: "TRY AGAIN",
                value: true,
                visible: true,
                className: "custom-continue",
                closeModal: true,
              },
            },
            closeOnClickOutside: false,
          })
          .then(() => {
            this.items = [];
            this.onGetList();
          });
        }
      });
    },
    onGetPostCode() {
      if(checkUrl()) {
        this.ddlPostCode = []
        tservice.onGet_PostCode('', response => {
          if (response.data.count > 0) {
            response.data.payload.forEach(e => {
              this.ddlPostCode.push({
                value: e.post_code,
                text: e.post_code
              })
            });
          }
        });
      } else {
        this.onGetPostCode();
      }

      function checkUrl() {
        let _url = window.localStorage.getItem('resUrl')
        return _url != null && _url != '' && _url != undefined
      }
    },
    onGetPostCodeDetail(pid) {
      if(checkUrl()) {
        let setbody = {
          id: pid
        }
        tservice.onGet_PostCodeDetail(setbody, response => {
          this.m_detailPostcode = {
            average: response.data.payload.average,
            median: response.data.payload.median
          }
        });
      } else {
        this.onGetPostCodeDetail();
      }

      function checkUrl() {
        let _url = window.localStorage.getItem('resUrl')
        return _url != null && _url != '' && _url != undefined
      }
    },
    onSelect (item) {
      this.ddlPostCodeSel = item;
      if (!this.isNullOrEmpty(item.value)) {
        this.onGetPostCodeDetail(item.value);
        this.flagview = true
      } else {
        this.flagview = false
      }
    },
    onChangePageSize(e) {
      this.pagination.perPage = e;
      // this.items = [];
      // this.onGetList();
    },
    onChangePageNo(e) {
      this.pagination.currentPage = e;
      // this.items = [];
      // this.onGetList();
    },
    onCal() {
      let c_page = this.pagination.currentPage;
      let p_page = this.pagination.perPage;
      let bNum = p_page * c_page;
      let fNum = bNum + 1;
      let txt = (fNum >= bNum ? (fNum - p_page) : fNum) + ' - ' + bNum;
      return txt
    },
    isNullOrEmpty (val) {
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    },
  },
  mounted() {
    let _url = window.localStorage.getItem('url') != null
    if (_url) {
      this.m_connect.url = window.localStorage.getItem('url') != null ? window.localStorage.getItem('url') : '';
      this.m_connect.port = window.localStorage.getItem('port') != null ? window.localStorage.getItem('port') : '';
      this.onGetList();
      this.onGetPostCode();
    }
  },
}
</script>

<style>
.font-weight-bold {
  font-weight: 700 !important;
}
.text-left {
  text-align: left !important;
}
.md-table + .md-table {
  margin-top: 16px
}
</style>
