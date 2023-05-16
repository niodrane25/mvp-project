// Wait for the DOM to be fully loaded
$(document).ready(function() {
    // Code to execute when the DOM is ready
  
    // Example: Handle a button click event
    $('#myButton').click(function() {
      // Perform an AJAX request to the server
      $.ajax({
        url: '/api/data',
        method: 'GET',
        success: function(response) {
          // Update the UI with the response data
          $('#result').text(response.data);
        },
        error: function(error) {
          console.log('An error occurred:', error);
        }
      });
    });
  });
  