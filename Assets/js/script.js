// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  const currentDayEl = $('#current-day');
  const saveButtonEl = $('.saveBtn');
  const selectpickerEl = $('.selectpicker');
  const containerEl = $('.container-fluid');

  // creates a dropdown with every hour of the day in it
  const createStartTimePicker = function (){
    for (i = 0; i < 24; ++i) {
      let optionTime = dayjs().hour(i).minute(0);
      let optionEl = $('<option>').val(i).text(optionTime.format('hh:mm A'));
      selectpickerEl.append(optionEl);
    }
    selectpickerEl.val('9'); // Set the default value to "9" (from Xpert)
  }

  const next9Hours = function() {
    containerEl.empty(); // Clear out any pre-existing timeblocks
    let startTime = dayjs().hour(selectpickerEl.val()).minute(0);
    for (i = 0; i < 9; ++i) {
      
      let blockTime = startTime.add(i, 'h');
      console.log(blockTime.format('hh:mm A'));
      
      let timeBlockEl = $('<div>');
      timeBlock = 
      timeBlockEl.text("Hello World")
      containerEl.append(timeBlockEl)
      // timeBlockEl.attr('id', 'hour-' + blockTime.format('H'))
      // timeBlockEl.attr('id', 'hour-')
      // timeBlockEl.addClass('row time-block future')

      // let hourTextEl = $('<div>');
      // hourTextEl.addClass('col-2 col-md-1 hour text-center py-3');
      // hourTextEl.text(blockTime.format('hh:mm A'))
      // timeBlockEl.append(hourTextEl);

    }
  }

  // display name of the current day at top of page
  currentDayEl.text(dayjs().format('dddd'));

  // event handler for when the user changes their selection in the dropdown
  selectpickerEl.change(function() {
    next9Hours();
  })

  createStartTimePicker();
  next9Hours();

  //create first div element with id "hour-" + i and class "row time-block" + timeCategory
  // where if i is in the past, it uses past, if its the present hour it's present, and
  // if its in the future it uses future.
  // Then append it to the container

  
  //create another div element with all the default stuff <div class="col-2 col-md-1 hour text-center py-3">x</div>
  // but the text content is the blockTime
  // append it to the previous element

  //create textarea element and use the same values each time, append to previous element
  //create button element and use the same values each time, append to previous element
  //create i element and use the same values each time, append to previous element

  // so there's 3 variables, one is the hour in the id, the next one is the past/present/future
  // the last one is the text content

  // Event listener for save button click
  saveButtonEl.on('click', function() {
  });

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});