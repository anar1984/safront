
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//var urlGl = "https://app.sourcedagile.com/";
var urlGl = "http://localhost:8079/tsn3/";
//var urlGl = ""

function getToken() {
// return 'apdtok=eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0._t_n7Ep8wVySH1k4-boP2wtBPzxUsB5lSkr55j24-FfJVBU5PhEvPA.yXWyRiCj2gyprdu7og8mUA.JnNuOtsf0y1AWBoM61uNJf2zm40ym9p51sFnsVz_h6d7JU2PlwXjHExqWixBAG9XMPa9ji1oxbfIbzS00pVEp1Rh8dMsnZElqF0ImYYpkSaS0G2KTheZJbwr-jarlQpoj9XR3OPkjWamqcHAXSMlsp2NcDOYAU6QkbMvsALbd0Q.dwHL1cN7W_Xg98e-tmUYMg';
//        return '';
    //return document.cookie;
    
    return localStorage.getItem('tk');
}

