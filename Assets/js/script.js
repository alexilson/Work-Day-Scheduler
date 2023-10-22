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

  const createTimeBlocks = function() {
    containerEl.empty(); // Clear out any pre-existing timeblocks
    let startTime = dayjs().hour(selectpickerEl.val()).minute(0);
    for (i = 0; i < 9; ++i) {
       
      let blockTime = startTime.add(i, 'h');
      let blockTimeText = blockTime.format('hh:mm A');
      let blockTimeNum = parseInt(selectpickerEl.val())+ i;
      
      let timeBlockEl = $('<div>');
      timeBlockEl.addClass('row time-block');

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

      timeBlockEl.attr('id', 'hour-' + (parseInt(selectpickerEl.val())+ i)) // assigns number to each timeblock up to 31 for 7am to ensure the logic can identify it as a future timeblock without using a date
      // timeBlockEl.attr('id', 'hour-' + blockTimeNum) // easier way to assign hour number values but impossible to determine if times past midnight are in the future or past due to lack of a date
      // timeBlockEl.text(blockTimeText);
      containerEl.append(timeBlockEl);

      let hourTextEl = $('<div>');
      hourTextEl.addClass('col-2 col-md-1 hour text-center py-3');
      hourTextEl.text(blockTimeText);
      timeBlockEl.append(hourTextEl);

      let descriptionEl = $('<textarea>');
      descriptionEl.addClass('col-8 col-md-10 description'); 
      descriptionEl.attr('rows', '3');
      if (localStorage.getItem(timeBlockEl.attr('id'))) {
        descriptionEl.text(localStorage.getItem(timeBlockEl.attr('id')))
      }
      timeBlockEl.append(descriptionEl);

      let buttonEl = $('<button>');
      buttonEl.addClass('btn saveBtn col-2 col-md-1');
      buttonEl.attr('aria-label', 'save');
      timeBlockEl.append(buttonEl);

      let iEl = $('<i>');
      iEl.addClass('fas fa-save');
      iEl.attr('aria-hidden', 'true');
      buttonEl.append(iEl);
    }
  }

  // display name of the current day at top of page
  currentDayEl.text(dayjs().format('dddd'));

  // event handler for when the user changes their selection in the dropdown
  selectpickerEl.change(function() {
    createTimeBlocks();
  })

  // when user clicks save button on a time block
  containerEl.on('click', '.saveBtn', function() {
    // save the user input
    // event delegation code from Xpert and altered
    let btnParent = $(this).parent();
    let desc = btnParent.find('.description');
    let descText = desc.val();
    let descID = btnParent.attr('id')
    localStorage.setItem(descID, descText);
  });

  createStartTimePicker();
  createTimeBlocks();

});