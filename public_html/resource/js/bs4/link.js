
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

function initZadShey(){
//  alert('hole hole hoel')
    $('#kelbetin2').after($('<script>').attr('src',urlGl+'api/get/script/js/'+'48edh' +"/"+'210102102810037910965'+'.js'))
   $('#kelbetin').after($('<script>').attr('src',urlGl+'api/get/script/css/'+'48edh'+"/"+'210102102810037910965'+'.css'))
  
}
initZadShey();

  

