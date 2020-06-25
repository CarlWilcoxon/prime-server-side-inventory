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

function clearAllInputs(event) {
  event.preventDefault(); //so the page doesn't reload

  $('#name-in').val('');
  $('#description-in').val('');
  $('#search-in').val('');
}

function onReady() {
  console.log('DOM is ready');

  //setup handlers for click events
  $('#add-btn').on('click', addItem);
  $('#search-btn').on('click', searchForItem);
  $('#clear-btn').on('click', clearAllInputs);
  
  //render the initial inventory
  updateInventory();
}

function searchForItem() {
  event.preventDefault(); //so the page doesn't reload
  
  let substring = { bird: $('#search-in').val()};
  console.log('searching for:', substring);

  $.ajax({
    type: 'POST',
    url: '/search',
    data: substring
  }).then(function (res) {
    console.log('Item found!');
    updateSearchResults(res);
  }).catch(function (res) {
    alert('Error, invalid input!');
  })
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
    alert('Error, invalid input?');
  })
}

function updateInventory() {
    //using jQuery selectors, use Ajax to send a GET request for the /inventory url
    $.ajax({
        type: 'GET',
        url: '/inventory'
        //then, when you get a response, append a table row to the DOM with the info you received
    }).then(function (response) {
      $('#inventory').empty();  
      for (let i = 0; i < response.length; i++) {
            let item = response[i];
            $('#inventory').append(`
                <tr>
                    <td class="item-name">${item.name}</td>
                    <td>${item.description}</td>
                </tr>
            `);
        }
    });

}

function updateSearchResults(res) {
  $('#inventory').empty();  //empty out the table
  //render the search results
  //TODO add a fail handler
  for (let i = 0; i < res.length; i++) {
    let item = res[i];
    $('#inventory').append(`
        <tr>
            <td class="item-name">${item.name}</td>
            <td>${item.description}</td>
        </tr>
    `);
}
}