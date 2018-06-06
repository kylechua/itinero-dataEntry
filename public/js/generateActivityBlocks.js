$("#btnAddActivity").click(function () {
    var n = document.getElementById("activityNumber").value;
    document.getElementById("activityNumber").value = parseInt(n)+1;
    $(".activityBlock").each(function(i) {
        $(this).addClass("inactive");
    });
    generateActivityBlock(n);
  });
  
  function generateActivityBlock(n) {
      var officialActivityNumber = parseInt(n) + 1;
    
      $('#activities').append('<legend>Activity ' + officialActivityNumber + '</legend><div class="activityBlock" id="activity' + n + '"> </div>');

      var activityBlock = $('#activity' + n);
      $(activityBlock).append('<div class="form-group"> <label for="recreationName'+n+'">Activity Name</label> <input required type="text" class="form-control" name="recreationName'+n+'"> </div> <div class="form-group"> <div class="row"> <div class="col-6"> <label>Duration (minutes):</label> </div> <div class="col-3"> <input required class="form-control" type="minDuration'+n+'" placeholder="Min"> </div> <div class="col-3"> <input required class="form-control" type="maxDuration'+n+'" placeholder="Max"> </div> </div> </div> <div class="form-group"> <div class="row"> <div class="col-6"> <label>Cost ($):</label> </div> <div class="col-3"> <input required class="form-control" type="minCost'+n+'" placeholder="Min"> </div> <div class="col-3"> <input required class="form-control" type="maxCost'+n+'" placeholder="Max"> </div> </div> </div> <div class="form-group"> <div class="row"> <div class="col-6"> <label>Participants ($):</label> </div> <div class="col-3"> <input required class="form-control" type="minParticipants'+n+'" placeholder="Min"> </div> <div class="col-3"> <input required class="form-control" type="maxParticipants'+n+'" placeholder="Max"> </div> </div> </div>');

      $(activityBlock).append('<div class="form-group"> <label for="recreationLast'+n+'">Recreation last? </label> <div class="btn-group btn-group-toggle" data-toggle="buttons"> <label class="btn btn-yes">Yes <input required type="radio" name="recreationLast'+n+'" value="1" /> </label> <label class="btn btn-no"> <input required type="radio" name="recreationLast'+n+'" value="0" />No </label> </div> </div> <div class="form-group"> <label for="reservation'+n+'">Reservation required? </label> <div class="btn-group btn-group-toggle" data-toggle="buttons"> <label class="btn btn-yes">Yes <input required type="radio" name="reservation'+n+'" value="1" /> </label> <label class="btn btn-no"> <input required type="radio" name="reservation'+n+'" value="0" />No </label> </div> </div> <div class="form-group"> <label for="21andUp'+n+'">21 and over? </label> <div class="btn-group btn-group-toggle" data-toggle="buttons"> <label class="btn btn-yes">Yes <input required type="radio" name="21andUp'+n+'" value="1" /> </label> <label class="btn btn-no"> <input required type="radio" name="21andUp0" value="0" />No </label> </div> </div>');

      $(activityBlock).append('<div class="form-group"> <div class="row"> <div class="col-6"> <label>Adventure Level (0-9)</label> </div> <div class="col-6"> <div class="form-group"> <input class="form-control" required name="adventureScalar'+n+'" type="range" min="0" max="9" value="0" onchange="this.form.adventure'+n+'.value = this.value" /> <input class="form-control" required name="adventure'+n+'" type="number" min="0" max="9" value="0" onchange="this.form.adventureScalar'+n+'.value = this.value" /> </div> </div> </div> </div> <div class="form-group"> <div class="row"> <div class="col-6"> <label>Outdoors Level (0-9)</label> </div> <div class="col-6"> <div class="form-group"> <input class="form-control" required name="outdoorScalar'+n+'" type="range" min="0" max="9" value="0" onchange="this.form.outdoor'+n+'.value = this.value" /> <input class="form-control" required name="outdoor'+n+'" type="number" min="0" max="9" value="0" onchange="this.form.outdoorScalar'+n+'.value = this.value" /> </div> </div> </div> </div> <div class="form-group"> <div class="row"> <div class="col-6"> <label>Laidback Level (0-9)</label> </div> <div class="col-6"> <div class="form-group"> <input class="form-control" required name="laidbackScalar'+n+'" type="range" min="0" max="9" value="0" onchange="this.form.laidback'+n+'.value = this.value" /> <input class="form-control" required name="laidback'+n+'" type="number" min="0" max="9" value="0" onchange="this.form.laidbackScalar'+n+'.value = this.value" /> </div> </div> </div> </div> <div class="form-group"> <div class="row"> <div class="col-6"> <label>Romantic Level (0-9)</label> </div> <div class="col-6"> <div class="form-group"> <input class="form-control" required name="romanticScalar'+n+'" type="range" min="0" max="9" value="0" onchange="this.form.romantic'+n+'.value = this.value" /> <input class="form-control" required name="romantic'+n+'" type="number" min="0" max="9" value="0" onchange="this.form.romanticScalar'+n+'.value = this.value" /> </div> </div> </div> </div> <div class="form-group"> <div class="row"> <div class="col-6"> <label>Kid Friendly Level (0-9)</label> </div> <div class="col-6"> <div class="form-group"> <input class="form-control" required name="kidFriendlyScalar'+n+'" type="range" min="0" max="9" value="0" onchange="this.form.kidFriendly'+n+'.value = this.value" /> <input class="form-control" required name="kidFriendly'+n+'" type="number" min="0" max="9" value="0" onchange="this.form.kidFriendlyScalar'+n+'.value = this.value" /> </div> </div> </div> </div> <div class="form-group"> <div class="row"> <div class="col-6"> <label>Cultural Level (0-9)</label> </div> <div class="col-6"> <div class="form-group"> <input class="form-control" required name="cuturalScalar'+n+'" type="range" min="0" max="9" value="0" onchange="this.form.cutural'+n+'.value = this.value" /> <input class="form-control" required name="cutural'+n+'" type="number" min="0" max="9" value="0" onchange="this.form.cuturalScalar'+n+'.value = this.value" /> </div> </div> </div> </div>');

      $(activityBlock).append('<div class="form-group"> <div class="row"> <div class="col-6"> <label>Time contraints (24-hr time) (optional):</label> </div> <div class="col-3"> <input required class="form-control" type="activityStartTime'+n+'" placeholder="Start"> </div> <div class="col-3"> <input required class="form-control" type="activityEndTime'+n+'" placeholder="End"> </div> </div> </div> <div class="form-group"> <div class="row"> <div class="col-6"> <label>Days open:</label> </div> <div class="col-6"> <div class="form-check"> <input class="form-check-input" type="checkbox" value="1" name="monday'+n+'" checked> <label class="form-check-label" for="monday'+n+'">Monday</label> </div> <div class="form-check"> <input class="form-check-input" type="checkbox" value="1" name="tuesday'+n+'" checked> <label class="form-check-label" for="tuesday'+n+'">Tuesday</label> </div> <div class="form-check"> <input class="form-check-input" type="checkbox" value="1" name="wednesday'+n+'" checked> <label class="form-check-label" for="wednesday'+n+'">Wednesday</label> </div> <div class="form-check"> <input class="form-check-input" type="checkbox" value="1" name="thursday'+n+'" checked> <label class="form-check-label" for="thursday'+n+'">Thursday</label> </div> <div class="form-check"> <input class="form-check-input" type="checkbox" value="1" name="friday'+n+'" checked> <label class="form-check-label" for="friday'+n+'">Friday</label> </div> <div class="form-check"> <input class="form-check-input" type="checkbox" value="1" name="saturday'+n+'" checked> <label class="form-check-label" for="saturday'+n+'">Saturday</label> </div> <div class="form-check"> <input class="form-check-input" type="checkbox" value="1" name="sunday'+n+'" checked> <label class="form-check-label" for="sunday'+n+'">Sunday</label> </div> </div> </div> </div> <div class="form-group"> <div class="row"> <div class="col-6"> <label for="weatherValidity'+n+'">Weather Validity:</label> </div> <div class="col-6"> <select required class="form-control" name="weatherValidity'+n+'"> <option value="0">All Weather</option> <option value="1">Cold okay but not raining</option> <option value="2">Cloudly okay but not cold</option> <option value="3">Warm and sunny only</option> </select> </div> </div> </div> <div class="form-group"> <div class="row"> <div class="col-6"> <label>Seasonal Validity:</label> </div> <div class="col-6"> <div class="form-check"> <input class="form-check-input" type="checkbox" value="1" name="winter'+n+'" checked> <label class="form-check-label" for="winter'+n+'">Winter</label> </div> <div class="form-check"> <input class="form-check-input" type="checkbox" value="1" name="spring'+n+'" checked> <label class="form-check-label" for="spring'+n+'">Spring</label> </div> <div class="form-check"> <input class="form-check-input" type="checkbox" value="1" name="summer'+n+'" checked> <label class="form-check-label" for="summer'+n+'">Summer</label> </div> <div class="form-check"> <input class="form-check-input" type="checkbox" value="1" name="fall'+n+'" checked> <label class="form-check-label" for="fall'+n+'">Fall</label> </div> </div> </div> </div>');

      $(activityBlock).append('<div class="form-group"> <div class="row"> <div class="col-6"> <label>Activity Intensity (1-5)</label> </div> <div class="col-6"> <input class="form-control" required name="activityLevelScalar'+n+'" type="range" min="1" max="5" value="1" onchange="this.form.activityLevel'+n+'.value = this.value" /> <input class="form-control" required name="activityLevel'+n+'" type="number" min="1" max="5" value="1" onchange="this.form.activityLevelScalar'+n+'.value = this.value" /> </div> </div> </div> <div class="form-group"> <label for="activityShortDescription'+n+'">Short Description</label> <input required type="text" class="form-control" name="activityShortDescription'+n+'" /> </div> <div class="form-group"> <label for="activityFullDescription'+n+'">Full Description</label> <textarea required class="form-control" rows="3" name="activityFullDescription'+n+'"></textarea> </div> <div class="form-group"> <label for="activityImageURL'+n+'">Image URL</label> <input required type="text" class="form-control" name="activityImageURL'+n+'" /> </div>');
  }