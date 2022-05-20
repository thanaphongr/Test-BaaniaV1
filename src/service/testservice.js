/* eslint-disable */
import Axios from 'axios'
const url = window.localStorage.getItem("resUrl")

export default {
  onGet_list(parm,sucess){
    let _resUrl = url != null ? url : window.localStorage.getItem("resUrl"); // parm.skip + parm.take
    let urlGet = _resUrl + '/home?skip=0&take=999999';
    Axios.get(urlGet).then((response) =>{
      sucess(response)
    }).catch((response) =>{
      sucess(response)
    })
  },
  onPostCreate(parm,sucess){
    let _resUrl = url != null ? url : window.localStorage.getItem("resUrl");
    let urlGet = _resUrl + '/home';
    Axios.post(urlGet, parm).then((response) =>{
      sucess({
        status: true
      })
    }).catch((response) =>{
      sucess({
        status: false
      })
    })
  },
  onPatch_list(parm, sucess){
    let _resUrl = url != null ? url : window.localStorage.getItem("resUrl");
    let urlGet = _resUrl + '/home/' + parm.id;
    Axios.patch(urlGet, parm).then((response) =>{
      sucess({
        status: true
      })
    }).catch((response) =>{
      sucess({
        status: false
      })
    })
  },
  onDelete_list(parm, sucess){
    let _resUrl = url != null ? url : window.localStorage.getItem("resUrl");
    let urlGet = _resUrl + '/home/' + parm.id;
    Axios.delete(urlGet).then((response) =>{
      sucess({
        status: true
      })
    }).catch((response) =>{
      sucess({
        status: false
      })
    })
  },
  onGet_PostCode(parm,sucess){
    let _resUrl = url != null ? url : window.localStorage.getItem("resUrl");
    let urlGet = _resUrl + '/postCode';
    Axios.get(urlGet).then((response) =>{
      sucess(response)
    }).catch((response) =>{
      sucess(response)
    })
  },
  onGet_PostCodeDetail(parm,sucess){
    let _resUrl = url != null ? url : window.localStorage.getItem("resUrl");
    let urlGet = _resUrl + '/postCode/' + parm.id;
    Axios.get(urlGet).then((response) =>{
      sucess(response)
    }).catch((response) =>{
      sucess(response)
    })
  },
}