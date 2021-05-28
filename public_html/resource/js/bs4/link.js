/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var urlGl = "https://app.sourcedagile.com/";
//var urlGl = "http://localhost:8079/tsn3/";
//var urlGl = ""

function getToken() {
    return 'apdtok=eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.EtwuKXsxNVkHa56cCfkfMERozcB3fWLkOUVx0KDIlMyR97dwqdk0-g.vD_M5i_FUTOVHmn1_JuPdw.W6SjYbBdOqmdszM2SbntBooqD5gCWH0HbQ0uAHAnw8LypuLLKnXgr4mqvAt0he4eGOTQBbRBJtDScZjEwZp_EVcmooC8bV0xzQSIPF9yc8XYOev8bDgaDlG5J63pHjeK9ANX-LSfcNuNQvm8RHvLOySIDj9PElmJOkPYwZGxGpY.zEgZBTS92yD4RbMBQVmu_g';
//        return '';
    //return document.cookie;
    
    return localStorage.getItem('tk');
}
