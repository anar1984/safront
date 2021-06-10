/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function showGuiInputList4DebugView(){
    var ls = SADebug.Lines;
    for (var i=0;i<ls.length;i++){
        var obj = SADebug.Lines[i];
        if (obj.active==='1'){
            console.log('zad');
        }
    }
}
