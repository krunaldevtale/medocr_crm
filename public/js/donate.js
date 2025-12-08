const cards = document.querySelectorAll(".donation-card");

const detailsBox = document.querySelector(".donation-details-box");
const tabsSection = document.querySelector(".tabs-section");
const searchFilterSection = document.querySelector(".search-filter-section");
const paginationSections = document.querySelectorAll(".pagination-section");

// Handle card expand functionality
cards.forEach((card) => {
  const triggers = card.querySelectorAll(".toggle-expand");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      // Hide other cards
      cards.forEach((other) => {
        if (other !== card) other.style.display = "none";
      });

      const cardContainer = document.querySelector(".card-container");

      // Remove grid layout when expanding
      cardContainer.classList.remove(
        "grid",
        "grid-cols-1",
        "md:grid-cols-2",
        "gap-4",
        "justify-items-center"
      );

      // Elements to modify
      const defaultHeading = card.querySelector(".default-heading");
      const expandedHeading = card.querySelector(".expanded-heading");
      const expandedPara = card.querySelector(".expanded-para");
      const donateWrapper = card.querySelector(".donate-button-wrapper");
      const topSection = card.querySelector(".top-section");
      const locationLine = card.querySelector(".location-line");

      // Get the specific elements we need to hide and show
      const donationAmount = card.querySelector(".donation-amount");
      const donateBtnContainer = card.querySelector(".donate-btn-container");
      const expandedButtons = card.querySelector(".expanded-buttons");

      // Show expanded content
      defaultHeading.classList.add("hidden");
      expandedHeading.classList.remove("hidden");
      expandedPara.classList.remove("hidden");
      detailsBox.classList.remove("hidden");
      closeBtn.classList.remove("hidden");

      // Hide donation amount and donate button
      donationAmount.classList.add("hidden");
      donateBtnContainer.classList.add("hidden");

      // Show visit website and pay buttons
      expandedButtons.classList.remove("hidden");

      // Adjust layout for expanded view
      topSection.classList.remove("flex");
      topSection.classList.add("block");

      donateWrapper.classList.remove(
        "ml-4",
        "mt-0",
        "flex-col",
        "items-center"
      );
      donateWrapper.classList.add("mt-4", "w-full", "flex", "justify-end");

      locationLine.classList.remove("mt-2");
      locationLine.classList.add("mt-4");

      // Make card fullscreen for expanded view
      card.classList.add(
        "fixed",
        "inset-0",
        "z-50",
        "h-screen",
        "w-screen",
        "overflow-y-auto",
        "rounded-none"
      );
      card.classList.remove("m-4", "rounded-lg");

      // Hide UI sections
      tabsSection?.classList.add("hidden");
      searchFilterSection?.classList.add("hidden");
      paginationSections.forEach((pagination) =>
        pagination.classList.add("hidden")
      );
    });
  });

  // Handle "Read More"
  const readMoreBtn = card.querySelector(".read-more-btn");
  const expandedPara = card.querySelector(".expanded-para");

  readMoreBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    expandedPara?.classList.remove("hidden");
    readMoreBtn?.classList.add("hidden");

    // Get the specific elements we need to hide and show
    const donationAmount = card.querySelector(".donation-amount");
    const donateBtnContainer = card.querySelector(".donate-btn-container");
    const expandedButtons = card.querySelector(".expanded-buttons");
    const donateWrapper = card.querySelector(".donate-button-wrapper");

    // Hide donation amount and donate button
    donationAmount.classList.add("hidden");
    donateBtnContainer.classList.add("hidden");

    // Show visit website and pay buttons
    expandedButtons.classList.remove("hidden");

    // Adjust donation wrapper layout
    donateWrapper.classList.remove("ml-4", "mt-0", "flex-col", "items-center");
    donateWrapper.classList.add("mt-4", "w-full", "flex", "justify-end");

    tabsSection?.classList.add("hidden");
    searchFilterSection?.classList.add("hidden");
    paginationSections.forEach((pagination) =>
      pagination.classList.add("hidden")
    );
  });
});

// Close button functionality
// closeBtn.addEventListener('click', () => {
//     cards.forEach(card => {
//         card.style.display = 'block';

//         const defaultHeading = card.querySelector('.default-heading');
//         const expandedHeading = card.querySelector('.expanded-heading');
//         const expandedPara = card.querySelector('.expanded-para');
//         const donateWrapper = card.querySelector('.donate-button-wrapper');
//         const topSection = card.querySelector('.top-section');
//         const locationLine = card.querySelector('.location-line');
//         const readMoreBtn = card.querySelector('.read-more-btn');

//         // Get elements for donation functionality
//         const donationAmount = card.querySelector('.donation-amount');
//         const donateBtnContainer = card.querySelector('.donate-btn-container');
//         const expandedButtons = card.querySelector('.expanded-buttons');

//         defaultHeading?.classList.remove('hidden');
//         expandedHeading?.classList.add('hidden');
//         expandedPara?.classList.add('hidden');
//         readMoreBtn?.classList.remove('hidden');

//         // Show donation amount and donate button
//         donationAmount?.classList.remove('hidden');
//         donateBtnContainer?.classList.remove('hidden');

//         // Hide visit website and pay buttons
//         expandedButtons?.classList.add('hidden');

//         topSection?.classList.add('flex');
//         topSection?.classList.remove('block');

//         donateWrapper?.classList.remove('mt-4', 'w-full', 'flex', 'justify-end');
//         donateWrapper?.classList.add('ml-4', 'mt-0', 'flex-col', 'items-center');

//         locationLine?.classList.remove('mt-4');
//         locationLine?.classList.add('mt-2');

//         card.classList.remove('fixed', 'inset-0', 'z-50', 'h-screen', 'w-screen', 'overflow-y-auto', 'rounded-none');
//         card.classList.add('m-4', 'rounded-lg');
//     });

//     tabsSection?.classList.remove('hidden');
//     searchFilterSection?.classList.remove('hidden');
//     paginationSections.forEach(pagination => pagination.classList.remove('hidden'));

//     detailsBox.classList.add('hidden');
//     closeBtn.classList.add('hidden');
// });

function openPopup() {
  document.querySelector(".assignmentPopup").classList.remove("hidden");
}

function closePopup() {
  document.querySelector(".assignmentPopup").classList.add("hidden");
}

function openPopupDonation() {
  document.querySelector(".donationPopup").classList.remove("hidden");
}

function closePopupDonation() {
  document.querySelector(".donationPopup").classList.add("hidden");
}
console.log("Popup");

$(".filter-toggle-btn").on("click", function (e) {
  e.stopPropagation();
  $(".filter-popup").not($(this).siblings(".filter-popup")).addClass("hidden");
  $(this).siblings(".filter-popup").toggleClass("hidden");
});

$(document).on("click", function () {
  $(".filter-popup").addClass("hidden");
});

// Open the nested share popup
$(".openSharePopup").click(function () {
  $(".sharePopup").removeClass("hidden");
});

// Close the nested share popup
$(".closeSharePopup").click(function () {
  $(".sharePopup").addClass("hidden");
});

//Bookmark filled
document.querySelectorAll(".bookmark-donate-client").forEach((icon) => {
  icon.addEventListener("click", function () {
    this.classList.toggle("active");
    // Toggle the filled state
    this.style.fontVariationSettings = this.classList.contains("active")
      ? "'FILL' 1"
      : "'FILL' 0";
  });
});

document.querySelectorAll(".bookmark-donate-advertiser").forEach((icon) => {
  icon.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});

document.querySelectorAll(".bookmark-donate-pharmacy").forEach((icon) => {
  icon.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});




// View button highlight
function toggleViewButton(button) {
  // Toggle active state on button
  button.classList.toggle("active");

  // Show the popup (remove 'hidden' class)
  const popup = document.querySelector(".viewPopup");
  popup.classList.remove("hidden");
}

 const toggleBtn = document.querySelector('.toggle-expand-btn');
  const closeBtn = document.querySelector('.close-expanded-btn');
  const expandedContent = document.querySelector('.expanded-content');
  const expandedButtons = document.querySelector('.expanded-buttons');
  
  toggleBtn.addEventListener('click', function() {
    expandedContent.classList.toggle('hidden');
    expandedButtons.classList.toggle('hidden');
    
    if (expandedContent.classList.contains('hidden')) {
      toggleBtn.innerHTML = 'Read More';
    } else {
      toggleBtn.innerHTML = '<span class="material-symbols-outlined mr-1">close</span>Close';
    }
  });
  
  closeBtn.addEventListener('click', function() {
    expandedContent.classList.add('hidden');
    expandedButtons.classList.add('hidden');
    toggleBtn.innerHTML = 'Read More';
  });

  
