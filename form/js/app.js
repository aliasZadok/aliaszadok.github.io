//variables
const $colorOption = $('#color option');
const $checkBox = $('input[type="checkbox"]');
const $checkboxLabel = $('.activities label');
const $paypal = $('#paypal-option');
const $bitcoin = $('#bitcoin-option');
const $creditcard = $('#credit-card');
const $colorDropDown = $('#colors-js-puns');

//selecting inputs
const $input = $('input');
const $emailInput = $('#mail');
const $ccNumInput = $('#cc-num');
const $zipInput = $('#zip');
const $cvvInput = $('#cvv');
const $name = $('#name');
const $otherJobInput = $('#other-title');

var amount = 0; //cost counter

//hiding elements
$paypal.hide();
$bitcoin.hide();
$otherJobInput.hide();
$colorDropDown.hide();

//set focus on name input field
$name.focus();

//t-shirt design option
$('#design').on('click', (e)=>{
  if (e.target.value === 'js puns') {
    $colorDropDown.show();
    //setting defalut value of js puns
    $('#color').val('cornflowerblue');
    for (var i = 3; i < 6; i++) {
      //hiding heart js options
      $colorOption.eq(i).hide();
    }
    for (var i = 0; i < 3; i++) {
      //showing js puns options
      $colorOption.eq(i).show();
    }
  } else if (e.target.value === 'heart js') {
    $colorDropDown.show();
    //setting defalut value of heart js
    $('#color').val('tomato');
    for (var i = 0; i < 3; i++) {
      //hiding js puns options
      $colorOption.eq(i).hide();
    }
    for (var i = 3; i < 6; i++) {
      //showing heart js options
      $colorOption.eq(i).show();
    }
  }
});

//other job role drop down
$('#title').on('click', (e)=>{
  if (e.target.value === 'other') {
    $otherJobInput.show(); //shows 'your job role' input
  } else {
    $otherJobInput.hide(); //hides input when other options are selected
  }
});

//registration for activities checkboxes
$checkBox.on('click', (e)=>{
  //if target is checked
  if (e.target.checked) {
    if (e.target.name === 'all') {
      amount += 200;
    } else if (e.target.name === 'js-frameworks') {
      amount += 100;
      $checkBox.eq(3).attr('disabled', true); //disables checkbox with name='express'
      $checkboxLabel.eq(3).css('color', 'grey'); //turns label text grey
    } else if (e.target.name === 'js-libs') {
      amount += 100;
      $checkBox.eq(4).attr('disabled', true); //disables checkbox with name='node'
      $checkboxLabel.eq(4).css('color', 'grey');
    } else if (e.target.name === 'express') {
      amount += 100;
      $checkBox.eq(1).attr('disabled', true); //disables checkbox with name='js-frameworks'
      $checkboxLabel.eq(1).css('color', 'grey');
    } else if (e.target.name === 'node') {
      amount += 100;
      $checkBox.eq(2).attr('disabled', true); //disables checkbox with name='js-libs'
      $checkboxLabel.eq(2).css('color', 'grey');
    } else if (e.target.name === 'build-tools') {
      amount += 100;
    } else if (e.target.name === 'npm') {
      amount += 100;
    }

  } else {//if target is unchecked

    if (e.target.name === 'all') {
      amount -=200;
    } else if (e.target.name === 'js-frameworks') {
      amount -=100;
      $checkBox.eq(3).attr('disabled', false); //turns checkbox with name='express' state to default
      $checkboxLabel.eq(3).css('color', '#000'); //turns label text color to its default black color
    } else if (e.target.name === 'js-libs') {
      amount -=100;
      $checkBox.eq(4).attr('disabled', false); //turns checkbox with name='node' state to default
      $checkboxLabel.eq(4).css('color', '#000');
    } else if (e.target.name === 'express') {
      amount -=100;
      $checkBox.eq(1).attr('disabled', false); //turns checkbox with name='js-frameworks' state to default
      $checkboxLabel.eq(1).css('color', '#000');
    } else if (e.target.name === 'node') {
      amount -=100;
      $checkBox.eq(2).attr('disabled', false); //turns checkbox with name='js-libs' state to default
      $checkboxLabel.eq(2).css('color', '#000');
    } else if (e.target.name === 'build-tools') {
      amount -=100;
    } else if (e.target.name === 'npm') {
      amount -=100;
    }

  }

  /*
    removes <p> element with id="total"
    so that a new element isn't appended
    each time checkbox is clicked
  */
  $('#total').remove();
  //cost total
  const $totalAmount = $(`<p id="total">Total: ${amount}</p>`);
  $('.activities').append($totalAmount); //append $totalAmount

  if (amount === 0) {
  $('#total').remove();
  }

});

//payment information
$('#payment').on('click', (e)=>{
  switch (e.target.value) {
    case 'paypal':
    /*
      hides bitcoin info,
      hides credit card payment info,
      and shows paypal info
    */
      $bitcoin.hide();
      $creditcard.hide();
      $paypal.show();
      /*
        Though the credit card info is hidden, it still exists.
        This makes sure it atleast has a dummy value.
      */
      if ($creditcard.is(':hidden')){
          $ccNumInput.val('0000000000000');
          $zipInput.val('00000');
          $cvvInput.val('000');
        }
      break;
    case 'bitcoin':
    /*
      hides paypal info,
      hides credit card payment info,
      and shows bitcoin info
    */
      $paypal.hide();
      $creditcard.hide();
      $bitcoin.show();

      if ($creditcard.is(':hidden')){
          $ccNumInput.val('0000000000000');
          $zipInput.val('00000');
          $cvvInput.val('000');
        }
      break;
    case 'credit card':
    /*
      hides paypal info,
      hides bitcoin info,
      and shows credit card payment info
    */
      $paypal.hide();
      $bitcoin.hide();
      $creditcard.show();
      break;
  }
});

//validation functions
function isValidEmail(email) {
  //checks for a vail email id with regex
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

function isValidCCardNum(ccard) {
  //checks for a valid credit card number between 13 to 16
  return /^\d{13,16}$/.test(ccard);
}

function isValidZip(zip) {
  //checks for a valid 5 digit zip code
  return /^\d{5}$/.test(zip);
}

function isValidCVV(cvv) {
  //checks for a valid 3 digit CVV
  return /^\d{3}$/.test(cvv);
}

function showOrHideWarningMsg(show, element) {
  // show element when show is true, hide when false
  if (show) {
    element.style.display = "inherit"; //unhides the span warning message
    $(event.target).css('border', '2px solid #8B0000'); //changes input border color to red
  } else {
    element.style.display = "none"; //hides back the span warning message
    $(event.target).css('border', '2px solid #5e97b0'); //changes input border color back to default
  }
}

//event listeners
function createListener(validator) {
  return e => {
    const text = e.target.value;
    const valid = validator(text);
    const showWarning = text !== "" && !valid;
    const message = e.target.nextElementSibling;
    showOrHideWarningMsg(showWarning, message);
  };
}

$emailInput.on('input', createListener(isValidEmail));

$emailInput.on('input', (e)=>{
  const secondSpan = $(`<span id="second-span">An Email ID is required!</span>`);
  if (e.target.value.length === 0) {
    secondSpan.insertAfter($(e.target.nextElementSibling));
    e.target.nextElementSibling.nextElementSibling.style.display = "inherit";
    $(e.target).css('border', '2px solid #8B0000');
  } else {
    $('#second-span').remove();
  }
});

$ccNumInput.on('input', createListener(isValidCCardNum));

$zipInput.on('input', createListener(isValidZip));

$cvvInput.on('input', createListener(isValidCVV));




//form submition
$('form').submit((e)=> {
  
  e.preventDefault(e);

  const empty_name_input = $.trim($name.val()) === "";
  const empty_email_input = $.trim($emailInput.val()) === "";
  const empty_cc_num_input = $.trim($ccNumInput.val()) === "";
  const empty_zip_input = $.trim($zipInput.val()) === "";
  const empty_cvv_input = $.trim($cvvInput.val()) === "";
  const checkbox_checked_false = $checkBox.is(':checked') === false;

  //checks for empty input field
  if (empty_name_input || empty_email_input || empty_cc_num_input || empty_zip_input
    || empty_cvv_input || checkbox_checked_false) {
    //cancels form from submitting iv value is empty
    e.preventDefault();

    if (empty_name_input) {
      $name.prev().css('color', '#8B0000');  //turns input label text color to red
      $name.css('border', '2px solid #8B0000'); //input field/border turns red if input value is empty
    }
    if (empty_email_input) {
      $emailInput.prev().css('color', '#8B0000');
      $emailInput.css('border', '2px solid #8B0000');
    }
    if (empty_cc_num_input) {
      $ccNumInput.prev().css('color', '#8B0000');
      $ccNumInput.css('border', '2px solid #8B0000');
    }
    if (empty_zip_input) {
      $zipInput.prev().css('color', '#8B0000');
      $zipInput.css('border', '2px solid #8B0000');
    }
    if (empty_cvv_input) {
      $cvvInput.prev().css('color', '#8B0000');
      $cvvInput.css('border', '2px solid #8B0000');
    }
    if (checkbox_checked_false) {
      $('.activities legend').css('color', '#8B0000'); //activities legend turns red
    }
  }

  $input.on('input', (e)=>{
    $(e.target).prev().css('color', '#000'); //turns input label text color to black
    $('.activities legend').css('color', '#184f68');
  });
  $name.on('input', ()=>{
    $name.css('border', '2px solid #5e97b0');
  });
});
