function AjaxClient(){}
AjaxClient.prototype.async = true;
AjaxClient.prototype.timeout = 3000; // time in milliseconds
AjaxClient.prototype.debug = false;

AjaxClient.prototype.get = function( url, callback )
{
        let self = this;
        let oReq = new XMLHttpRequest();
        oReq.timeout = this.timeout;
        oReq.open("get", url, this.async );
       
        oReq.onload = function () {
                if (oReq.readyState === oReq.DONE)
                {
                        if (oReq.status === 200)
                        {
                                if( self.debug ) { console.log(oReq.responseText) };
                                callback( oReq.responseText );
                        }
                }
        };

        oReq.send();
};

AjaxClient.prototype.getJSON = function( url, callback )
{
        let self = this;
        let oReq = new XMLHttpRequest();
        oReq.timeout = this.timeout;
        oReq.open("get", url, this.async );

        oReq.onload = function () {
                if (oReq.readyState === oReq.DONE)
                {
                        if (oReq.status === 200)
                        {
                                if( self.debug ) { console.log(oReq.responseText) };
                                callback(JSON.parse(oReq.responseText));
                        }
                }
        };

        oReq.send();
};

AjaxClient.prototype.post = function( url, content, callback )
{
        let self = this;
        let oReq = new XMLHttpRequest();
        oReq.timeout = this.timeout;
        oReq.open("post", url, this.async );

        oReq.onload = function () {
                if (oReq.readyState === oReq.DONE)
                {
                        if (oReq.status === 200)
                        {
                                if( self.debug ) { console.log(oReq.responseText) };
                                callback(JSON.parse(oReq.responseText));
                        }
                }
        };

        oReq.send(content);
};

AjaxClient.prototype.setDebug = function(debug)
{
	AjaxClient.prototype.debug = debug;
};

function Igniter( selector )
{
	this.selector = selector;
	AjaxClient.call(this);	
}

Igniter.prototype = Object.create(AjaxClient.prototype);
Igniter.prototype.constructor = Igniter;   

Igniter.prototype.hide = function()
{
	let target = this.selector;
	
	if( target.match(/^#/) )
        {
                let element = document.querySelector(target);
                element.style.display = 'none';
                return;
        }

	let matches = document.querySelectorAll(target);
	
	for(var i =0; i < matches.length; i++ )
	{
		matches[i].style.display = 'none';
	}
};

Igniter.prototype.show = function()
{
	let target = this.selector;

	if( target.match(/^#/) )
	{
		let element = document.querySelector(target);
		element.style.display = 'inline';
		return;
	}

        let matches = document.querySelectorAll(target);       
        for(var i =0; i < matches.length; i++ )
        {
                matches[i].style.display = 'inline';
        }
};

Igniter.prototype.toggle = function()
{      
	let target = this.selector;
 
        if( target.match(/^#/) )
        {       
                let element = document.querySelector(target);
                
		if( element.style.display == 'none' ||  element.style.display == '' )
		{
			 element.style.display = 'inline';
		}
		else
		{
			element.style.display = 'none';
		}
                
		return;
        }
        
        let matches = document.querySelectorAll(target);
        for(let i =0; i < matches.length; i++ )
        {       
		if( matches[i].style.display == 'none' ||  element.style.display == '' )
                {
                         matches[i].style.display  = 'inline';
                }
                else
                {
                        matches[i].style.display = 'none';
                }
	}
};

Igniter.prototype.css = function( prop, value )
{	
	let target = this.selector;

        if( target.match(/^#/) )
        {
                let element = document.querySelector(target);
                element.style.setProperty(prop, value);
                return;
        }

        let matches = document.querySelectorAll(target);
        for(var i =0; i < matches.length; i++ )
        {
                matches[i].style.setProperty(prop, value);
        }
};

Igniter.prototype.attr = function( name, value )
{
	let target = this.selector;
	
	if( target.match(/^#/) )
        {
                let element = document.querySelector(target);
                element.setAttribute(name, value);
                return;
        }

        let matches = document.querySelectorAll(target);
        for(let i =0; i < matches.length; i++ )
        {
                matches[i].setAttribute(name, value);
        }
};

Igniter.prototype.html = function( html )
{       
        let target = this.selector;
        
        if( target.match(/^#/) )
        {       
                document.querySelector(target).innerHTML = html;
                return;
        }
        
        let matches = document.querySelectorAll(target);
        for(let i =0; i < matches.length; i++ )
        {       
                matches[i].innerHTML = html;
        }
};

Igniter.prototype.append = function( html )
{       
        let target = this.selector;
        
        if( target.match(/^#/) )
        {       
                document.querySelector(target).innerHTML += html;
                return;
        }

        let matches = document.querySelectorAll(target);
        for(var i =0; i < matches.length; i++ )
        {
                matches[i].innerHTML += html;
        }
};

Igniter.prototype.click = function( callback )
{
	let target = this.selector;

	if( target.match(/^#/) )
        {
                document.querySelector(target).addEventListener("click", callback);
                return;
        }

	let matches = document.querySelectorAll(target);
        for(let i =0; i < matches.length; i++ )
        {
                matches[i].addEventListener("click", callback);
        }
};

Igniter.prototype.listen = function( event, callback )
{
        let target = this.selector;

        if( target.match(/^#/) )
        {
                document.querySelector(target).addEventListener(event, callback);
                return;
        }

        let matches = document.querySelectorAll(target);
        for(let i =0; i < matches.length; i++ )
        {
                matches[i].addEventListener(event, callback);
        }
};

Igniter.prototype.renderTemplate = function ( templateid, hash )
{
    let template = document.getElementById(templateid);
    let templateHtml = template.innerHTML;

    for( var key in hash )
    {
            let regex = '{{'+key+'}}';
            let re = new RegExp(regex,"g");
            templateHtml = templateHtml.replace( re, hash[key]);
    }

    return templateHtml;
};

// works with simple name value paired objects...
// binds to elements with same id as name
Igniter.prototype.dataBind = function ( data )
{
	let target = this.selector;
	if( !target ){ target = document; }
	else{ target = document.querySelector(target); }	
	
	if( !target ){ target = document; }

        for( let name in data )
        {
                if( target.querySelector("#"+name).type === 'checkbox' )
                {
			let checkbox = target.querySelector("#"+name);
                        let curr = checkbox.value;

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
}

Igniter.prototype.openWindow = function( WinName, width, height)
{
        let myWindow = window.open(WinName, 'newWin', 'resizable=yes ,scrollbars=no,status=0,width=' + width + ',height=' + height );
        myWindow.focus();

        if (!myWindow.opener) myWindow.opener = "main";
};

Igniter.prototype.serialize = function( obj ) {
  return '?'+Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
};

Igniter.prototype.clearForm = function()
{
	let target = this.selector;
	let frm = document.querySelector(target);

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

// got this from devloper.mozilla.org
// <form action="" method="post" onsubmit="$i(this).ajaxSubmit(callback); return false;">
// 	OR 
//	$i("#submitbutton").click(function(){ 
//		$i("#formId").ajaxSubmit(callback);	
//	});
//
Igniter.prototype.ajaxSubmit = function(callback) {

	let target = this.selector;
	let oFormElement;	

	if( typeof target === 'string' )
	{
		oFormElement = document.querySelector(target);
	}
	else
	{
		oFormElement = target;
	}

if (oFormElement.action === undefined) { return; }
  let oReq = new XMLHttpRequest();
  oReq.onload = function()
        {
                callback(oReq.responseText);
        };
  if (oFormElement.method.toLowerCase() === "post") {
    oReq.open("post", oFormElement.action);
    oReq.send(new FormData(oFormElement));
  } else {
    let oField, sFieldType, nFile, sSearch = "";
    for (let nItem = 0; nItem < oFormElement.elements.length; nItem++) {
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
}
//-----------------------------------------------------------------------------------------------
// looks for data attributes...
// data-required="true" data-error-message="The requried field was empty"
//
//   $i("#form1").validateForm(function(data){
//      
//              $i("#formId").ajaxSubmit(callback);
//
//       },function(data){
//
//              alert(data.errorMsg);
//     
//      });
//
//   <form onsubmit="return $i(this).validateForm();">
//   <button onclick=return $i("#form1").validateForm();">
//----------------------------------------------------------------------------------------------
Igniter.prototype.validateForm = function(callback, errorCallback) {

        let target = this.selector;
        let frm = document.querySelector(target);
        let errorMsg = '';

        for (let i = 0; i < frm.elements.length; i++)
        {
                if( frm.elements[i].dataset.required )
                {
                        if( frm.elements[i].value === '' )
                        {
                                if( frm.elements[i].dataset.errorMessage )
                                {
                                         errorMsg += frm.elements[i].dataset.errorMessage + "\n";
                                }
                                else
                                {
                                        errorMsg += "The required field " + frm.elements[i].name + " was left empty\n";
                                }
                        }
                }
        }

        let result = {};
        result.errorMsg = errorMsg;

        if( errorMsg ){ result.valid = false; }
        else{ result.valid = true; }

        if( !result.valid )
        {
                if( errorCallback ){ errorCallback(result); }
                else { alert( errorMsg ); }
        }
        else if( callback ) { callback(result); }
        return result.valid;
};
	
let $i = function( selector ){ return new Igniter( selector ) };
		
// alias non selector calls so you don't have to call them with $i().get
$i.get = function( url, callback ) { return $i().get( url, callback )};
$i.getJSON = function( url, callback ) { return $i().getJSON( url, callback )};
$i.post = function( url, content, callback ) { return $i().post( url, content, callback )};
$i.openWindow = function( WinName, width, height ){ return $i().openWindow( WinName, width, height )}; 
$i.serialize = function( obj ){ return $i().serialize( obj )};
$i.setDebug = function(debug) {return $i().setDebug( debug )};
