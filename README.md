# Igniter.js

Igniter.js gives you the power to get thing done in a very small package... Just include the file and you're ready to start coding..

 ```
<script src="..js/igniter.js"></script>

<script>

  //event listeners are simple replace click with the listener you need
  $i("#toggleBtn").listen("click", function(){    
      $i("#div").toggle();
  });

// you could use the method listen like the above example, clicks events are used so much, 
// I made an event listener just for click
$i("#clearBtn").click( function(){     
    $i("#user-form").clearForm();
});

// dataBind makes it simple to populate forms or ui elements with a json object.
// dataBind maps simple name value paired objects by id 
// <input type="text" name="first_name" id="first_name">
// <input type="text" name="last_name" id="last_name">
// <input type="checkbox" name="active" value="Y" id="active">

$i("#user-form").dataBind( {first_name:'Mark',last_name:'Higbee',active:'Y',gender:'M'}  );

// the get ajax call works like butter, combine with dataBind or renderTemplate 
$i.get("?cmd=getSomeData",function(data){
    var result = JSON.parse( data );
    
    if( result.status == "Success"){
         $i("#user-form").dataBind(result);                                
    }
    else{ alert("error getting some Data");
 });

// getJSON ajax call works like butter and converts the text to json for you. 
$i.getJSON("?cmd=getSomeData",function(data){
    
    if( result.status == "Success"){
         $i("#user-form").dataBind(result);                                
    }
    else{ alert("error getting some Data");
 });

</script>

```

## Templates
Templates uses mustache merge tags 

```
<script id="contactTemplate" type="text/template">
<p>contactid: {{contactid}}</p>
<p>first name: {{firstName}}</p>
</script>

<script>

// get a contact...
$i.getJSON("?cmd=getContact",function(data){

    if( result.status == "Success"){
       var html = $i("#contactTemplate").renderTemplate(data);
       $i("#contactView").html( html );
    }
    else{ alert("error getting some Data");
 });

</script>

<div id="contactView"></div>
```

## Forms
Send forms really easy with ajaxSubmit

```
<form action="" method="post" onsubmit="$i(this).ajaxSubmit(callback); return false;">      
     OR 
      $i("#submitbutton").click(function(){ 
              $i("#formId").ajaxSubmit(callback); 
      });

```
