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

//dataBind make it simple to populate forms or ui elements with a json object
$i("#user-form").dataBind( {first_name:'Mark',last_name:'Higbee',active:'Y',gender:'M'}  );

// get ajax call works like butter combine with dataBind 
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
