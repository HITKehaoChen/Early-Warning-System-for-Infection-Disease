const Axios = require('axios');
var qs = require('qs');
Axios.post('http://localhost:8080/personalDiagnosis/recommendHospital.do', qs.stringify({
  patient_id: 54100
})).then(({data})=>console.log(data)).catch(console.error);