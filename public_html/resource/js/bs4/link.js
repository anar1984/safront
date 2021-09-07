
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//var urlGl = "https://app.sourcedagile.com/";
var urlGl = "http://localhost:8079/tsn3/";
//var urlGl = ""

function getToken() {
//return 'eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.Pl8Rcsh8pzTN6OWDXaPwykjTYfpnG3qYc0U1jWQQUXVmiPDQO4HbWA.ES4QFcAsw8nrtszIvgmmZw.m2fwlu22GYOEiV-ZMiHFUnvqPiUaSNqSXNZNG-SYrXi8n2G1-GBTelOf5DTqoGIuFnE_Rk2NUBnC6LgrnFpjF8n8lcW__x2Or7aiiyRSi22EymZnQCeujB1d82AkVPVMQpFGx8aUtK99_ac4bksbNvj67jXjSp9MG2AeZ0bnLGg.OOr_OYTjGcQWyDOn4BxcAg';
//        return '';
    //return document.cookie;    
    return localStorage.getItem('tk');
}

