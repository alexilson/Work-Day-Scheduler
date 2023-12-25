$(function () {
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

  // create 9 timeblocks starting with the selected start time
  const createTimeBlocks = function() {
    containerEl.empty(); // Clear out any pre-existing timeblocks
    let startTime = dayjs().hour(selectpickerEl.val()).minute(0); // Set the start time to the value of the selection in the dropdown
    for (i = 0; i < 9; ++i) {
      
      // define variables
      let blockTime = startTime.add(i, 'h');  // add hours to the start time equal to the # time block it's on
      let blockTimeText = blockTime.format('hh:mm A'); // create dayjs object with the correct time for this timeblock
      let blockTimeNum = parseInt(selectpickerEl.val()) + i; // set the number for the timeblock
      
      // create timeblock element
      let timeBlockEl = $('<div>');
      timeBlockEl.addClass('row time-block');  // add timeblock class

      // assign class based on past/present/future when compared to current hour
      now = dayjs().format('H');
      if (now < blockTimeNum) {
        timeBlockEl.addClass('future');
      }
      else if (now > blockTimeNum) {
        timeBlockEl.addClass('past');
      }
      else {
        timeBlockEl.addClass('present');
      }

       // assigns number to each timeblock up to 31 for 7am to ensure the logic can identify it as a future timeblock without using a date
      timeBlockEl.attr('id', 'hour-' + (parseInt(selectpickerEl.val())+ i))
      containerEl.append(timeBlockEl);

      // create element for hour text label and assign class and append
      let hourTextEl = $('<div>');
      hourTextEl.addClass('col-2 col-md-1 hour text-center py-3');
      hourTextEl.text(blockTimeText);
      timeBlockEl.append(hourTextEl);

      // create element for text input area, assign class and append
      let descriptionEl = $('<textarea>');
      descriptionEl.addClass('col-8 col-md-10 description'); 
      descriptionEl.attr('rows', '3');
      // if timeblock has saved text in local storage, populate it
      if (localStorage.getItem(timeBlockEl.attr('id'))) {
        descriptionEl.text(localStorage.getItem(timeBlockEl.attr('id')))
      }
      timeBlockEl.append(descriptionEl);

      // create element for button, assign class and append
      let buttonEl = $('<button>');
      buttonEl.addClass('btn saveBtn col-2 col-md-1');
      buttonEl.attr('aria-label', 'save');
      timeBlockEl.append(buttonEl);

      // create element for button overlay, assign class and append
      let iEl = $('<i>');
      iEl.addClass('fas fa-save');
      iEl.attr('aria-hidden', 'true');
      buttonEl.append(iEl);
    }
  }

  // display name of the current day at top of page along with the month, day, and year.
  currentDayEl.text(dayjs().format('dddd[,] MMMM D[,] YYYY'));

  // event handler for when the user changes their selection in the dropdown
  selectpickerEl.change(function() {
    createTimeBlocks();
  })

  // when user clicks save button on a time block
  containerEl.on('click', '.saveBtn', function() {
    // save the user input
    // event delegation code sourced from Xpert and altered
    let btnParent = $(this).parent();
    let desc = btnParent.find('.description');
    let descText = desc.val();
    let descID = btnParent.attr('id')
    localStorage.setItem(descID, descText);
  });

  // run functions to create dropdown and create initial timeblocks based on default value
  createStartTimePicker();
  createTimeBlocks();

});