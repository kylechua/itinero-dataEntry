var venueCategories = ["Restaurant", "Night Life", "Snack Shop",
                       "Activity Venue", "Rental Agency", "Public Place", "Museum"];

var restaurantCategories = ["Mexican", "Middle Eastern", "Mediterranean", "Authentic Chinese",
                               "Japanese", "South East Asian", "American Chinese", "Classic American",
                               "Italian", "Israeli", "Seafood", "Indian", "Caribbean", "African",
                               "Modern American", "Northern European", "Vegan", "South American", "Korean","Other"];

var nightLifeCategories = ["Bar", "Brewery", "Pub", "Sports Bar", "Nightclub",
                              "College Bar", "Lounge", "Hookah Lounge", "Dive Bar",
                              "Cigar Bar", "Tavern", "Speakeasy", "Jazz Bar",
                              "Live Music", "Other"];

var snackshopCategories = ["Ice Cream", "Donuts", "Coffee Shop", "Pastry Shop", "Bakery", "Other"];

var activityVenueCategories = ["Escape Room", "Go Karting", "Ice Skating", "Bowling", "Cinema", "Climbing",
                              "Fair", "Market", "Zoo", "Festival", "Guided Adventure Sport", "Shooting sport",
                              "Class-interest", "Class-health", "Karaoke", "Spa", "Theatre", "Trampoline House",
                              "Other"];

var rentalAgencyCategories = ["Bike", "Water Sport", "Horse", "Motor Scooter", "Other"];

var publicPlaceCategories = ["Park", "Point of Interest", "Monument", "Beach", "Playscape", "Other"];

var museumCategories = ["Modern Art", "Classical Art", "Historical", "Cultural", "Scientific", "Other"];

$(document).ready(function(){
    populateCategories();
    populateSubcategories();
});

$("#venueCategory").change(function () {
  console.log("change")
       populateSubcategories();
   });

function populateCategories() {
  var categorySelect = document.getElementById("venueCategory");
  for(var i = 0; i < venueCategories.length; i++) {
      var opt = venueCategories[i];
      var el = document.createElement("option");
      el.text = opt;
      el.value = opt;
      categorySelect.appendChild(el);
    }
}

function populateSubcategories() {
  var subcategorySelect = document.getElementById("venueSubcategory");
  subcategorySelect.options.length = 0;

  var e = document.getElementById("venueCategory");
  var category = e.options[e.selectedIndex].value;

  var subcategories;
  switch (category) {
    case "Restaurant":
      subcategories = restaurantCategories;
      break;
    case "Night Life":
      subcategories = nightLifeCategories;
      break;
    case "Snack Shop":
      subcategories = snackshopCategories;
      break;
    case "Activity Venue":
      subcategories = activityVenueCategories;
      break;
    case "Rental Agency":
      subcategories = rentalAgencyCategories;
      break;
    case "Public Place":
      subcategories = publicPlaceCategories;
      break;
    case "Museum":
      subcategories = museumCategories;
      break;
  }

  for(var i = 0; i < subcategories.length; i++) {
      var opt = subcategories[i];
      var el = document.createElement("option");
      el.text = opt;
      el.value = opt;
      subcategorySelect.appendChild(el);
    }

}