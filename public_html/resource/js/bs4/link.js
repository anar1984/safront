
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


  var urlGl = "https://app.sourcedagile.com/"; 
//var urlGl = "http://test.sourcedagile.com/";     
//
//  var urlGl = "http://localhost:8079/tsn3/";
//var urlGl = ""

function getToken() {
   
    return localStorage.getItem('tk');
}

function initZadShey(projectId){
//  alert('hole hole hoel')
    $('#kelbetin2').after($('<script>').attr('src',urlGl+'api/get/script/js/'+global_var.current_domain +"/"+projectId+'.js'))
   $('#kelbetin').after($('<link>')
           .attr('rel','stylesheet')
           .attr('href',urlGl+'api/get/script/css/'+global_var.current_domain+"/"+projectId+'.css'))
  
}
 
  

