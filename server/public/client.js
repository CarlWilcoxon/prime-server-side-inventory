$(document).ready(onReady);

function addItem(event) {
  event.preventDefault(); //so the page doesn't reload

  //get item inputs
  let name = $('#name-in').val();
  let description = $('#description-in').val();
  let item = {
    name,
    description
  }

  submitItem(item);
}

function onReady() {
  console.log('DOM is ready');

  //setup handlers for click events
  $('#add-btn').on('click', addItem);
  
  //render the initial inventory
  updateInventory();
}

function submitItem(item) {
  console.log('item is:', item);
  $.ajax({
    type: 'POST',
    url: '/add-item',
    data: item
  }).then(function (res) {
    console.log('Item added!');
    updateInventory();
  }).catch(function (res) {
    alert('Error, invalid input!');
  })
}

function updateInventory() {
    //using jQuery selectors, use Ajax to send a GET request for the /inventory url
    $.ajax({
        type: 'GET',
        url: '/inventory'
        //then, when you get a response, append a table row to the DOM with the info you received
    }).then(function (response) {
        for (let i = 0; i < response.length; i++) {
            let item = response[i];
            $('#inventory').append(`
                <tr>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                </tr>
            `);
        }
    });

}