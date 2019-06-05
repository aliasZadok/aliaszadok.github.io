$.ajax({
  //fetching 12 random users from english speaking nations
  url: 'https://randomuser.me/api/?results=12&nat=gb,us,nz,nl,au,ca,ie',
  dataType: 'json',
  success: function(data) {
    //search form template literal
    var search =
    `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;

    //adding the search form to the 'search container' <div>
    $('.search-container').html(search);

    //search is performed when the form is submited by hitting enter or clicking the search submit button
    $('form').on('submit', function(e) {
      e.preventDefault(); //preventing the page from refreshing
      var inputValue = $('#search-input').val().toLowerCase(); //the search input value
      //filtering the cards
      $('.card').filter(function(){
        //hides card if its text doesn't exist in inputValue
        $(this).toggle($(this).text().toLowerCase().indexOf(inputValue) > -1);
      });
    });

    var cardHTML = ``;
    //dynamically creating a card for each employee using a for loop and template literal
    for (var i = 0; i < data.results.length; i++) {
      cardHTML +=
      `<div class="card">
          <div class="card-img-container">
              <img class="card-img" src="${data.results[i].picture.large}" alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>
              <p class="card-text">${data.results[i].email}</p>
              <p class="card-text cap">${data.results[i].location.city}, ${data.results[i].location.state}</p>
          </div>
      </div>`;
    }
    //adding the collection of cards to the 'gallery' <div>
    $('#gallery').html(cardHTML);

    $('.card').on('click', function() {
      var cardIndex = $('.card').index(this); //index of the clicked card
      var modalWindow =
        `<div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    ${info(cardIndex)}
                </div>
            </div>

            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`;
      //appending the 'modal container' <div> to <body>
      $('body').append(modalWindow);

      //removes the 'modal container' when the 'close button' with an 'x' symbol is clicked
      $('#modal-close-btn').on('click', function() {
        $('.modal-container').remove();
      });

      /*
      * empties the 'modal info' and supplies the modal window with the data
      * of the next employee when the 'next' button is clicked
      */
      $('#modal-next').on('click', function() {
        if (cardIndex + 1 < $('.card').length) {
          cardIndex += 1;
          $('.modal-info-container').empty();
          $('.modal-info-container').html(info(cardIndex));
        }
      });

      /*
      * empties the 'modal info' and supplies the modal window with the data
      * of the previous employee when the 'prev' button is clicked
      */
      $('#modal-prev').on('click', function() {
        if (cardIndex - 1 >= 0) {
          cardIndex -= 1;
          $('.modal-info-container').empty();
          $('.modal-info-container').html(info(cardIndex));
        }
      });
    });
    //a function for returning the info for the modal window
    function info (index) {
      return `<img class="modal-img" src="${data.results[index].picture.large}" alt="profile picture">
      <h3 id="name" class="modal-name cap">${data.results[index].name.first}</h3>
      <p class="modal-text">${data.results[index].email}</p>
      <p class="modal-text cap">${data.results[index].location.city}</p>
      <hr>
      <p class="modal-text">${data.results[index].cell}</p>
      <p class="modal-text">${data.results[index].location.street}, ${data.results[index].location.city}, OR ${data.results[index].location.postcode}</p>
      <p class="modal-text">Birthday: ${data.results[index].dob.date.slice(0,10).replace(/-/g, '').replace(/(\d{4})(\d{2})(\d{2})/, "$3/$2/$1")}</p>`;
    }
  }
});
