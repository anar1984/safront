
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var urlGl = "https://app.sourcedagile.com/";
//var urlGl = "http://localhost:8079/tsn3/";
//var urlGl = ""

function getToken() {
//return 'eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.ZEezhayRZ43Rtw_2zG2kd44Gv7WLGsXPt-eiKB674tnkYnJpqjBflg.7tA4jpsp00fajIykpkpyRg.73TpvT8dB3B-akgPRJWppCmyCd7N8zH4jiq0blmfU09swuYG3V4g4yKnBiv8a6AuaLa_eXVZfJatIeT5u6GlaWG4EhAiYcuFYBKTezv6vPk_a1xTOg3XXyps6kATTe2LjnOXV594HCkYuFghhnwU8XKBm62r7AzidCvLUMm3aUM.dY8NoNwnNOqbYcAj4IFhFQ';
//        return '';
    //return document.cookie;    
   return localStorage.getItem('tk');
}

