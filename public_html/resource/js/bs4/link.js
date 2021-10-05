
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var urlGl = "https://app.sourcedagile.com/";     

//var urlGl = "http://192.168.1.3:8080/tsn3/";
//var urlGl = ""

function getToken() { 
    //return document.cookie;    
    return localStorage.getItem('tk');
}

