function AjaxClient(){}
AjaxClient.prototype.async = true;
AjaxClient.prototype.timeout = 3000; // time in milliseconds

AjaxClient.prototype.get = function( url, callback )
{
        var oReq = new XMLHttpRequest();
        oReq.timeout = this.timeout;
        oReq.open("get", url, this.async );

        oReq.onload = function () {
                if (oReq.readyState === oReq.DONE)
                {
                        if (oReq.status === 200)
                        {
                                console.log(oReq.responseText);
                                callback( oReq.responseText );
                        }
                }
        };

        oReq.send();
};

AjaxClient.prototype.getJSON = function( url, callback )
{
        var oReq = new XMLHttpRequest();
        oReq.timeout = this.timeout;
        oReq.open("get", url, this.async );

        oReq.onload = function () {
                if (oReq.readyState === oReq.DONE)
                {
                        if (oReq.status === 200)
                        {
                                console.log(oReq.responseText);
                                callback(JSON.parse(oReq.responseText));
                        }
                }
        };

        oReq.send();
};
AjaxClient.prototype.post = function( url, content, callback )
{
        var oReq = new XMLHttpRequest();
        oReq.timeout = this.timeout;
        oReq.open("post", url, this.async );

        oReq.onload = function () {
                if (oReq.readyState === oReq.DONE)
                {
                        if (oReq.status === 200)
                        {
                                console.log(oReq.responseText);
                                callback(JSON.parse(oReq.responseText));
                        }
                }
        };

        oReq.send(content);
};
function Igniter( selector )
{
        AjaxClient.call(this);
        this.selector = selector;
}
Igniter.prototype = Object.create(AjaxClient.prototype);
Igniter.prototype.constructor = Igniter;

Igniter.prototype.hide = function()
{
        var target = this.selector;
        if( target.match(/^#/) )
        {
                var element = document.querySelector(target);
                element.style.display = 'none';
                return;
        }

        var matches = document.querySelectorAll(target);

        for(var i =0; i < matches.length; i++ )
        {
                matches[i].style.display = 'none';
        }
};

Igniter.prototype.show = function()
{
        var target = this.selector;

        if( target.match(/^#/) )
        {
                var element = document.querySelector(target);
                element.style.display = 'block';
                return;
        }

        var matches = document.querySelectorAll(target);
        for(var i =0; i < matches.length; i++ )
        {
                matches[i].style.display = 'block';
        }
};gniter.prototype.toggle = function()
{ 

        var target = this.selector;

        if( target.match(/^#/) )
        {
                var element = document.querySelector(target);

                if( element.style.display == 'none' )
                {
                         element.style.display = 'block';
                }
                else
                {
                        element.style.display = 'none';
                }

                return;
        }

        var matches = document.querySelectorAll(target);
        for(var i =0; i < matches.length; i++ )
        {
                if( matches[i].style.display == 'none' )
                {
                         matches[i].style.display  = 'block';
                }
                else
                {
                        matches[i].style.display = 'none';
                }
        }
};

Igniter.prototype.css = function( prop, value )
{ 
        var target = this.selector;

        if( target.match(/^#/) )
        {
                var element = document.querySelector(target);
                element.style.setProperty(prop, value);
                return;
        }

        var matches = document.querySelectorAll(target);
        for(var i =0; i < matches.length; i++ )
        {
                matches[i].style.setProperty(prop, value);
        }
};

Igniter.prototype.attr = function( name, value )
{
        var target = this.selector;

        if( target.match(/^#/) )
        {
                var element = document.querySelector(target);
                element.setAttribute(name, value);
                return;
        }

        var matches = document.querySelectorAll(target);
        for(var i =0; i < matches.length; i++ )
        {
                matches[i].setAttribute(name, value);
        }
};

Igniter.prototype.click = function( callback )
{
        var target = this.selector;

        if( target.match(/^#/) )
        {
                document.querySelector(target).addEventListener("click", callback);
                return;
        }

        var matches = document.querySelectorAll(target);
        for(var i =0; i < matches.length; i++ )
        {
                matches[i].addEventListener("click", callback);
        }
};

Igniter.prototype.listen = function( event, callback )
{
        var target = this.selector;

        if( target.match(/^#/) )
        {
                document.querySelector(target).addEventListener(event, callback);
                return;
        }

        var matches = document.querySelectorAll(target);
        for(var i =0; i < matches.length; i++ )
        {
                matches[i].addEventListener(event, callback);
        }
};

Igniter.prototype.renderTemplate = function ( templateid, hash )
{
    var template = document.getElementById(templateid);
    var templateHtml = template.innerHTML;

    for( var key in hash )
    {
            var regex = '{{'+key+'}}';
            var re = new RegExp(regex,"g");
            templateHtml = templateHtml.replace( re, hash[key]);
    }

    return templateHtml;
};

// works with simple name value paired objects...
// binds to elements with same id as name
Igniter.prototype.dataBind = function ( data )
{
        var target = this.selector;
        if( !target ){ target = document; }
        else{ target = document.querySelector(target); }

        if( !target ){ target = document; }

        for( var name in data )
        {
                if( target.querySelector("#"+name).type === 'checkbox' )
                {
                        var checkbox = target.querySelector("#"+name);
                        var curr = checkbox.value;

                        if( curr == data[name] )
                        {
                                 checkbox.checked = true;
                        }

                }
                else
                {
                        target.querySelector("#"+name).value = data[name];
                }
        }
};

Igniter.prototype.openWindow = function( WinName, width, height)
{
        var myWindow = window.open(WinName, 'newWin', 'resizable=yes ,scrollbars=no,status=0,width=' + width + ',height=' + height );
        myWindow.focus();

        if (!myWindow.opener) myWindow.opener = "main";
};

Igniter.prototype.serialize = function( obj ) {
  return '?'+Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
};

Igniter.prototype.clearForm = function()
{
        var target = this.selector;
        var frm = document.querySelector(target);

        for (i = 0; i < frm.elements.length; i++)
        {
                field_type = frm.elements[i].type.toLowerCase();
                switch (field_type)
                {
                        //don't clear hidden fields this will mess up cmd values
                        case "hidden":
                        break;
                        case "text":
                        case "password":
                        case "textarea":
                        frm.elements[i].value = "";
                        break;
                        case "radio":
                        case "checkbox":
                        if (frm.elements[i].checked)
                        {
                                frm.elements[i].checked = false;
                        }
                        break;
                        case "select-one":
                        case "select-multi":
                        frm.elements[i].selectedIndex = -1;
                        break;
                        default:
                        break;
                }
        }
}
/ got this from devloper.mozilla.org
// <form action="" method="post" onsubmit="$i(this).ajaxSubmit(callback); return false;">
//      OR 
//      $i("#submitbutton").click(function(){ 
//              $i("#formId").ajaxSubmit(callback);     
//      });
//
Igniter.prototype.ajaxSubmit = function(callback) {

        var target = this.selector;
        var oFormElement;

        if( typeof target === 'string' )
        {
                oFormElement = document.querySelector(target);
        }
        else
        {
                oFormElement = target;
        }

if (oFormElement.action === undefined) { return; }
  var oReq = new XMLHttpRequest();
  oReq.onload = function()
        {
                callback(oReq.responseText);
        };
  if (oFormElement.method.toLowerCase() === "post") {
    oReq.open("post", oFormElement.action);
    oReq.send(new FormData(oFormElement));
  } else {
    var oField, sFieldType, nFile, sSearch = "";
    for (var nItem = 0; nItem < oFormElement.elements.length; nItem++) {
      oField = oFormElement.elements[nItem];
      if (!oField.hasAttribute("name")) { continue; }
      sFieldType = oField.nodeName.toUpperCase() === "INPUT" ?
          oField.getAttribute("type").toUpperCase() : "TEXT";
      if (sFieldType === "FILE") {
        for (nFile = 0; nFile < oField.files.length;
            sSearch += "&" + escape(oField.name) + "=" + escape(oField.files[nFile++].name));
      } else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || oField.checked) {
        sSearch += "&" + escape(oField.name) + "=" + escape(oField.value);
      }
    }
    oReq.open("get", oFormElement.action.replace(/(?:\?.*)?$/, sSearch.replace(/^&/, "?")), true);
    oReq.send(null);
  }
 return false;
};

var $i = function( selector ){ return new Igniter( selector ) };

// alias non selector calls so you don't have to call them with $i().get
$i.get = function( url, callback ) { return $i().get( url, callback )};
$i.getJSON = function( url, callback ) { return $i().getJSON( url, callback )};
$i.post = function( url, content, callback ) { return $i().post( url, content, callback )};
$i.openWindow = function( WinName, width, height ){ return $i().openWindow( WinName, width, height )};
$i.serialize = function( obj ){ return $i().serialize( obj )};





