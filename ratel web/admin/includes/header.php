<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport">
  <title>RatelPlus - Admin Dashboard</title>
  <!-- General CSS Files -->
  <link rel="stylesheet" href="assets/css/app.min.css">
  <!-- Template CSS -->
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/components.css">
  <!-- Custom style CSS -->
  <link rel="stylesheet" href="assets/css/custom.css">
  <link rel='shortcut icon' type='image/x-icon' href='assets/img/favicon.ico' />
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <script type="text/javascript">
   // $(document).ready(function(){
   //  var updateInterval = 2000000;
   //  setInterval(updatePlayerCount, updateInterval);
   //   function updatePlayerCount() {
    
     
    
    $.ajax({//Airtime Payment
        url: "actions/airtime_payment.php",
        method: "post",
        data: {displayAmount:4},
         
         success: function(data){
          $("#airtime2").html(data);
        }
      })


     
     $.ajax({//Email Counter read
        url: "actions/email_reg_counter_read.php",
        method: "post",
        data: {displayAmount:7},
         
         success: function(data){
          $("#email_reg_read").html(data);
          //$("#email_reg2_read").html(data);
        }
      }) 
     $.ajax({//Email Counter Reject
        url: "actions/email_reg_counter_reject.php",
        method: "post",
        data: {displayAmount:8},
         
         success: function(data){
          $("#email_reg_reject").html(data);
          //$("#email_reg2_read").html(data);
        }
      }) 

 var updateInterval = 2500;
    setInterval(updatePlayerCount, updateInterval);
     function updatePlayerCount() {
  
  $.ajax({//Email Counter inbox
        url: "actions/email_reg_counter_inbox.php",
        method: "post",
        data: {displayAmount:6},
         
         success: function(data){
          $("#email_reg").html(data);
          $("#email_reg2").html(data);
          $("#email_reg3").html(data);
        }
      })
 

  $(document).ready(function(){
     $.ajax({//Airtime_payment_Data
        url: "actions/notification_table.php",
        method: "post",
        data: {displayAmount:14},
         
         success: function(data){
          $("#notifi").html(data);
           
        }
      }) 
   });
       
  $.ajax({//Live Calls
        url: "actions/live_calls_table.php",
        method: "post",
        data: {displayAmount:14},
         
         success: function(data){
          $("#livecall").html(data);
           
        }
      })
     }
//}///No interval Function


     
   //    $(document).ready(function(){
   //   $.ajax({//Airtime_payment_Data
   //      url: "actions/airtime_payment_table.php",
   //      method: "post",
   //      data: {displayAmount:13},
         
   //       success: function(data){
   //        $("#airtime_payment").html(data);
           
   //      }
   //    }) 
   // });
      
    // });
   
</script>
</head>