$(document).ready(function() {
    $('body').on('click', '.searchSelect .btn', function(){
        var option = $(this).attr("value");
        if (option === "Venue") {
            $('#tblVenues').show();
            $('#tblActivities').hide();
            $('#whichResult').html("Venue");
        } else if (option === "Activity") {
            $('#tblVenues').hide();
            $('#tblActivities').show();
            $('#whichResult').html("Activity");
        }
    })
    var activitySize = $('#tblActivities').attr("value");
    var venueSize = $('#tblVenues').attr("value");
    if (activitySize > venueSize) {
        $('#tblVenues').hide();
        $('#tblActivities').show();
        $('#whichResult').html("Activity");
        $('#searchActivities').addClass("active");
        $('#searchActivities input').prop("checked");
        $('#searchVenues').removeClass("active");
    }
});