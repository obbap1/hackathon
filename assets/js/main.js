/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function collectFormData(e){
    for(var t=new FormData,a=0;a<e.length;a++)
    {
        var n=$(e[a]);
        if("file"===n.attr("type"))
        {
            var i=$("input[type=file]")[0].files[0];
            t.append(n.attr("name"),i);
        }
        else t.append(n.attr("name"),n.val());
    }
    return t;
}
