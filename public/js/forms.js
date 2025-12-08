$(document).ready(function () {
  // Edit icon
  $(".editIcon").on("click", function () {
    $(".edit-details").removeClass("hidden");
    $(".account-detail").hide();
    $(".tabs").hide();
    $(".edit-toggle").hide();
    $(".tabs-menu").hide();
  });

  // Cancel button
  $(".cancel-btn").on("click", function (e) {
    e.preventDefault();
    $(".edit-details").addClass("hidden");
    $(".toggle-section").addClass("hidden");
    $(".account-detail").show();
    $(".tabs").show();
    $(".setting-header").show();
    $(".edit-toggle").show();
    $(".tabs-menu").show();
  });

  // Form submit for edit details
  $("#editForm").on("submit", function (e) {
    e.preventDefault();

    // Clear previous errors
    $(".error").text("").addClass("hidden");

    let hasError = false;

    // Get field values
    const pharmacyName = $("#pharmacyName").val().trim();
    const adminName = $("#adminName").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const address = $("#address").val().trim();
    const license = $("#license").val().trim();
    const countryCode = $("#countryCodes option:selected").text().trim();

    // Validation
    if (pharmacyName === "") {
      $(".pharmacyNameError")
        .text("Please enter Pharmacy Name")
        .removeClass("hidden");
      hasError = true;
    }

    if (adminName === "") {
      $(".adminNameError")
        .text("Please enter Admin/Owner Name")
        .removeClass("hidden");
      hasError = true;
    }

    if (email === "") {
      $(".emailError").text("Please enter Email Address").removeClass("hidden");
      hasError = true;
    }

    if (phone === "") {
      $(".phoneError").text("Please enter Phone Number").removeClass("hidden");
      hasError = true;
    }

    if (address === "") {
      $(".addressError").text("Please enter Address").removeClass("hidden");
      hasError = true;
    }

    if (license === "") {
      $(".licenseError")
        .text("Please enter License Number")
        .removeClass("hidden");
      hasError = true;
    }

    if (hasError) return; // Stop form if validation fails

    // Update display
    const grayTexts = $("#account-details").find("p.text-medium-gray");
    grayTexts.eq(0).text(pharmacyName);
    grayTexts.eq(1).text(adminName);
    grayTexts.eq(2).text(email);
    grayTexts.eq(3).text(countryCode);
    grayTexts.eq(4).text(phone);
    grayTexts.eq(5).text(address);
    grayTexts.eq(6).text(license);

    // Hide form
    $(".edit-details").addClass("hidden");
    $(".account-detail").show();
    $(".tabs").show();
  });

  // Input validation clearing for edit form
  $("#pharmacyName").on("input", function () {
    if ($(this).val().trim() !== "") {
      $(".pharmacyNameError").text("").addClass("hidden");
    }
  });

  $("#adminName").on("input", function () {
    if ($(this).val().trim() !== "") {
      $(".adminNameError").text("").addClass("hidden");
    }
  });

  $("#email").on("input", function () {
    if ($(this).val().trim() !== "") {
      $(".emailError").text("").addClass("hidden");
    }
  });

  $("#phone").on("input", function () {
    if ($(this).val().trim() !== "") {
      $(".phoneError").text("").addClass("hidden");
    }
  });

  $("#address").on("input", function () {
    if ($(this).val().trim() !== "") {
      $(".addressError").text("").addClass("hidden");
    }
  });

  $("#license").on("input", function () {
    if ($(this).val().trim() !== "") {
      $(".licenseError").text("").addClass("hidden");
    }
  });

  function handleTabSwitch(tabTarget) {
    $(".tab-btn").removeClass(
      "border-b-2 text-light-sea-green text-vivid-orange text-dark-blue text-living-coral text-violet-sky"
    );
    $("#" + tabTarget).removeClass("hidden");
    let activeClass = "border-b-2 text-light-sea-green";

    if ($(".tabs").hasClass("vivid-orange-tabs")) {
      activeClass = "border-b-2 text-vivid-orange";
    } else if ($(".tabs").hasClass("dark-blue-tabs")) {
      activeClass = "border-b-2 text-dark-blue font-semibold";
    } else if ($(".tabs").hasClass("living-coral-tabs")) {
      activeClass = "border-b-2 text-living-coral font-semibold";
    } else if ($(".tabs").hasClass("violet-sky-tabs")) {
      activeClass = "border-b-2 text-violet-sky font-semibold";
    }
    $(`.tab-btn[data-tab="${tabTarget}"]`).addClass(activeClass);
    if (tabTarget === "account-details") {
      $(".edit-toggle").removeClass("hidden");
      $(".lastEditMsg").show();
      $(".editIcon").show();
      $(".docInfo").addClass("hidden");
    } else if (tabTarget === "documents") {
      $(".edit-toggle").removeClass("hidden");
      $(".lastEditMsg").show();
      $(".editIcon").hide();
      $(".docInfo").removeClass("hidden");
    } else {
      $(".edit-toggle").addClass("hidden");
    }
  }

  // Event binding
  $(".tab-btn").on("click", function () {
    const tabTarget = $(this).data("tab");
    handleTabSwitch(tabTarget);
  });

  // Change Password toggle
  $(".toggle-trigger").on("click", function () {
    const target = $(this).data("target");

    $(".edit-toggle").hide();
    $(".editIcon").addClass("hidden");
    $(".edit-details").addClass("hidden");
    $(".toggle-section").addClass("hidden");
    $(".setting-header").hide(); // Hide the settings header
    $(".account-detail").hide();
    $(".tabs").hide();
    $(`.toggle-section[data-section="${target}"]`).removeClass("hidden");
    $(".tabs-menu").hide();
  });

  // Form submit for password change
  $("#editChangePassword").on("submit", function (e) {
    e.preventDefault();

    // Clear previous errors
    $(this).find(".error").text("").addClass("hidden");

    let hasError = false;

    // Get field values
    const currentPassword = $(this).find("input:eq(0)").val().trim();
    const newPassword = $(this).find("input:eq(1)").val().trim();
    const confirmPassword = $(this).find("input:eq(2)").val().trim();

    // Validation
    if (currentPassword === "") {
      $(this)
        .find(".error:eq(0)")
        .text("Please enter current password")
        .removeClass("hidden");
      hasError = true;
    }

    if (newPassword === "") {
      $(this)
        .find(".error:eq(1)")
        .text("Please enter new password")
        .removeClass("hidden");
      hasError = true;
    } else if (newPassword.length < 8) {
      $(this)
        .find(".error:eq(1)")
        .text("Password must be at least 8 characters")
        .removeClass("hidden");
      hasError = true;
    }

    if (confirmPassword === "") {
      $(this)
        .find(".error:eq(2)")
        .text("Please confirm new password")
        .removeClass("hidden");
      hasError = true;
    } else if (confirmPassword !== newPassword) {
      $(this)
        .find(".error:eq(2)")
        .text("Passwords don't match")
        .removeClass("hidden");
      hasError = true;
    }

    if (hasError) return;

    // Here you would typically make an AJAX call to update the password
    // Example:
    /*
    $.ajax({
      url: '/change-password',
      method: 'POST',
      data: {
        currentPassword: currentPassword,
        newPassword: newPassword
      },
      success: function(response) {
        // Hide form after successful submission
        $(".toggle-section").addClass("hidden");
        $(".account-detail").show();
        $(".tabs").show();
        
        // Show success message
        alert("Password changed successfully");
      },
      error: function(xhr) {
        // Show error message
        alert("Error changing password: " + xhr.responseText);
      }
    });
    */

    // For demo purposes, we'll just hide the form
    $(".toggle-section").addClass("hidden");
    $(".account-detail").show();
    $(".tabs").show();

    // Show success message
    window.showToaster("success", "Password changed successfully!");
  });

  // Input validation clearing for password fields
  $("#editChangePassword input").on("input", function () {
    const index = $(this).index();
    $(this).siblings(".error").eq(index).text("").addClass("hidden");
  });

  // Initialize with account details tab
  handleTabSwitch("account-details");

  $(".toggleDropdown").on("click", function (e) {
    e.stopPropagation();
    const $container = $(this).closest(".dropdown-container");
    // Hide other dropdown menus except this one
    $(".dropdown-menu").not($container.find(".dropdown-menu")).hide();
    // Toggle this dropdown menu
    $container.find(".dropdown-menu").toggle();
  });

  $(".dropdown-option").on("click", function () {
    const selectedText = $(this).text().trim();
    const $container = $(this).closest(".dropdown-container");
    const $input = $container.find(".dropdown-input");

    if (selectedText.toLowerCase().startsWith("custom")) {
      $input.val("");
    } else {
      $input.val(selectedText);
    }
    $container.find(".dropdown-menu").hide();
    $input.focus();
  });

  // Clicking outside closes dropdowns
  $(document).on("click", function () {
    $(".dropdown-menu").hide();
  });

  $(".view-icon").on("click", function () {
    // Show modal
    $("#viewModal").removeClass("hidden");
    $(".all-content").hide();
  });

  // Close modal when clicking the close button
  $("#closeModal").on("click", function () {
    $("#viewModal").addClass("hidden");
    $(".all-content").show();
  });

  // Also close modal when clicking outside modal content
  $("#viewModal").on("click", function (e) {
    if (e.target.id === "viewModal") {
      $("#viewModal").addClass("hidden");
      $(".all-content").show();
    }
  });

  $(".submitBtn").on("click", function () {
    $("#deleteAccountPopup").addClass("hidden");
    $("#successPopup").removeClass("hidden");
  });

  const $bellIcon = $("#bell-icon");
  const $popup = $("#popup");
  const $closePopup = $("#close-popup");
  // const $viewDetailsDropdown = $("#viewDetailsDropdown");
  // const $openViewDetails = $(".openViewDetails");
  // const $closeViewDetailsDropdown = $(".closeViewDetailsDropdown");
  $bellIcon.on("click", function (e) {
    e.stopPropagation();
    $popup.toggleClass("hidden");
    // $viewDetailsDropdown.addClass("hidden");
  });
  $closePopup.on("click", function () {
    $popup.addClass("hidden");
  });
  // $openViewDetails.on("click", function (e) {
  //   e.stopPropagation();
  //   $popup.addClass("hidden");
  //   $viewDetailsDropdown.removeClass("hidden");
  // });
  // $closeViewDetailsDropdown.on("click", function () {
  //   $viewDetailsDropdown.addClass("hidden");
  //   $popup.removeClass("hidden");
  // });
  $(document).on("click", function (e) {
    const $target = $(e.target);

    if (!$target.closest("#popup").length && !$target.is("#bell-icon")) {
      $popup.addClass("hidden");
    }

    if (
      !$target.closest("#viewDetailsDropdown").length &&
      !$target.closest(".openViewDetails").length
    ) {
      // $viewDetailsDropdown.addClass("hidden");
    }
  });

  $(".issue-type-wrapper").on("click", function (e) {
    e.stopPropagation();
    $(".issue-type-dropdown").not($(this).find(".issue-type-dropdown")).hide();
    $(this).find(".issue-type-dropdown").toggle();
  });

  // Stop closing when clicking inside dropdown
  $(".issue-type-dropdown").on("click", function (e) {
    e.stopPropagation();
  });

  // Single-select + price input logic
  $(".issue-checkbox").on("change", function () {
    const $wrapper = $(this).closest(".issue-type-wrapper");
    const $input = $wrapper.find(".issue-type-input");

    if ($(this).is(":checked")) {
      // Uncheck others & reset prices
      $wrapper.find(".issue-checkbox").not(this).prop("checked", false);
      $wrapper.find(".price-input").addClass("hidden").val("");

      // Show current price input
      $(this).siblings(".price-input").removeClass("hidden").focus();
    } else {
      $(this).siblings(".price-input").addClass("hidden").val("");
    }

    updateSelected($wrapper);
  });

  // Update main input when typing price
  $(".price-input").on("input", function () {
    const $wrapper = $(this).closest(".issue-type-wrapper");
    updateSelected($wrapper);
  });

  // Close on outside click
  $(document).on("click", function () {
    $(".issue-type-dropdown").hide();
  });

  // Helper function
  function updateSelected($wrapper) {
    const $input = $wrapper.find(".issue-type-input");

    const selected = $wrapper
      .find(".issue-checkbox:checked")
      .map(function () {
        const label = $(this).closest("li").find("span").first().text();
        const price = $(this).siblings(".price-input").val();
        return price ? `${label} - ₹${price}` : label;
      })
      .get()
      .join(", ");

    $input.val(selected);
  }
  // Custom input typing logic (if you're using "Type..." input)
  $(".custom-type-input").on("click", function () {
    const $wrapper = $(this).closest(".issue-type-wrapper");
    const $input = $wrapper.find(".issue-type-input");

    // 1. Uncheck all checkboxes
    $wrapper.find(".issue-checkbox").prop("checked", false);

    // 2. Clear the input value
    $input.val("");

    // 3. Make input editable and focus it
    $input.prop("readonly", false).focus();
    $(".issue-type-dropdown").hide();
    // 4. Optional: make it readonly again on blur
    $input.on("blur", function () {
      $(this).prop("readonly", true);
    });
  });

  // Close on outside click
  $(document).on("click", function () {
    $(".issue-type-dropdown").hide();
  });
  $(".upload-trigger").on("click", function () {
    $(this).siblings(".file-input").click();
  });

  $(".file-input").on("change", function () {
    // File selected, you can add upload logic here if needed
    const file = this.files[0];
    if (file) {
      console.log("File ready to upload:", file.name);
      // Optional: Upload to server via AJAX
    }
  });

  $(document).on("input", ".phone-input", function () {
    const phoneValue = $(this).val().trim();
    const targetId = $(this).data("target");
    const $btn = $(`.send-otp-btn[data-target="${targetId}"]`);

    const activeColor = $btn.data("color-active");
    const inactiveColor = $btn.data("color-inactive");

    // Remove existing color classes dynamically
    $btn.removeClass(activeColor).removeClass(inactiveColor);

    if (/^\d{10}$/.test(phoneValue)) {
      $btn
        .addClass(activeColor)
        .removeClass("cursor-not-allowed")
        .addClass("cursor-pointer")
        .prop("disabled", false);
    } else {
      $btn
        .addClass(inactiveColor)
        .removeClass("cursor-pointer")
        .addClass("cursor-not-allowed")
        .prop("disabled", true);
    }
  });

  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints;

  if (isTouch) {
    $("#editIcon").on("touchstart", function () {
      const $tooltip = $("#editTooltip");
      $tooltip.removeClass("opacity-0");
      setTimeout(() => {
        $tooltip.addClass("opacity-0");
      }, 3000); // tooltip visible for 1 second
    });
  }

  // Edit Button Documents Section
  $(document).on("click", ".edit-doc-info", function () {
    const $container = $(this).closest(".doc-container");
    const $text = $container.find(".doc-info");
    if ($text.length === 0) return;
    const currentValue = $text.text().trim();
    const $input = $(`
    <input type="text"
    class="editable-doc-id text-base text-deep-muted-gray border border-slate-gray rounded px-2 py-1 w-[18.75rem] h-10 focus:outline-none focus:ring-0 focus:ring-offset-0 uppercase" />`);
    $input.val(currentValue.toUpperCase());
    $input.data("original", currentValue.toUpperCase());
    $text.replaceWith($input);
    $input.focus();
    // uppercase
    $input.on("input", function () {
      this.value = this.value.toUpperCase();
    });
    $container.find(".buttons-container").removeClass("hidden");
    $container.find(".edit-doc-info").hide();
  });

  //  Save Button
  $(document).on("click", ".save-btn-doc", function () {
    const $container = $(this).closest(".doc-container");
    const $input = $container.find(".editable-doc-id");
    if ($input.length === 0) return;
    const newValue = $input.val().trim().toUpperCase();
    const $newP = $(
      `<p class="doc-info font-normal text-base text-medium-gray">${newValue}</p>`
    );
    $input.replaceWith($newP);
    $container.find(".buttons-container").addClass("hidden");
    $container.find(".edit-doc-info").show();
  });

  // Cancel Button
  $(document).on("click", ".cancel-btn-doc", function () {
    const $container = $(this).closest(".doc-container");
    const $input = $container.find(".editable-doc-id");
    if ($input.length === 0) return;
    const fallback = $input.data("original") || "U8110MH2022PTC123456";
    const $newP = $(
      `<p class="doc-info font-normal text-base text-medium-gray">${fallback}</p>`
    );
    $input.replaceWith($newP);
    $container.find(".buttons-container").addClass("hidden");
    $container.find(".edit-doc-info").show();
  });
  $(".main-tab").on("click", function () {
    let tabId = $(this).data("tab");
    $(".main-tab").removeClass("active-tab-main");
    $(this).addClass("active-tab-main");
    $(".mainTab-content").addClass("hidden");
    $("#" + tabId).removeClass("hidden");
  });


   $(".main-tab-pharmacy").on("click", function () {
    let tabId = $(this).data("tab");
    $(".main-tab-pharmacy").removeClass("active-tab-main-pharmacy");
    $(this).addClass("active-tab-main-pharmacy");
    $(".mainTab-content").addClass("hidden");
    $("#" + tabId).removeClass("hidden");
  });

  // Chart rendering
  const hospitalChart = initChart("hospitalChart", {
    type: "line",
    data: {
      labels: ["0", "1", "2", "3", "4", "5", "6", "7"],
      datasets: [
        {
          label: "Referral",
          data: [600, 400, 590, 650, 800, 400, 160, 570],
          borderColor: "#5182E3",
          borderWidth: 2,
          tension: 0,
          yAxisID: "yLeft",
          pointRadius: 3,
          pointBackgroundColor: "#FFFFFF",
          pointBorderColor: "#5182E3",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#FFFFFF",
          pointHoverBorderColor: "#5182E3",
        },
        {
          label: "Appointment",
          data: [600, 700, 300, 250, 200, 600, 180, 700],
          borderColor: "#28A745",
          borderWidth: 2,
          tension: 0,
          yAxisID: "yRight",
          pointRadius: 3,
          pointBackgroundColor: "#FFFFFF",
          pointBorderColor: "#28A745",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#FFFFFF",
          pointHoverBorderColor: "#28A745",
        },
        {
          label: "Donation",
          data: [0, 580, 170, 560, 410, 401, 70, 160],
          borderColor: "#3AAFA9",
          borderWidth: 2,
          tension: 0,
          yAxisID: "yRight",
          pointRadius: 3,
          pointBackgroundColor: "#FFFFFF",
          pointBorderColor: "#3AAFA9",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#FFFFFF",
          pointHoverBorderColor: "#3AAFA9",
        },
      ],
    },
    options: getChartOptions(),
  });

  // Legend toggle
  const charts = [{ chart: hospitalChart, legendId: "#hospitalCustomLegend" }];
  charts.forEach(({ chart, legendId, tabsId }) => {
    $(`${legendId} .legend-checkbox`).on("change", function () {
      const datasetIndex = $(this).data("index");
      const visible = $(this).is(":checked");
      chart.setDatasetVisibility(datasetIndex, visible);
      chart.update();
    });
  });

  setupPagination({
    containerId: "featured-rewards",
    cardClass: "reward-card",
    prevBtnId: "prevPage1",
    nextBtnId: "nextPage1",
    paginationContainerId: "pagination-numbers1",
    cardsPerPage: 3,
  });

  setupPagination({
    containerId: "popular-coupons",
    cardClass: "coupon-card",
    prevBtnId: "prevPage2",
    nextBtnId: "nextPage2",
    paginationContainerId: "pagination-numbers2",
    cardsPerPage: 3,
  });

  $("#percentageCheck, #fixedCheck").on("change", function () {
    if ($(this).attr("id") === "percentageCheck" && $(this).is(":checked")) {
      $("#fixedCheck").prop("checked", false);
    } else if ($(this).attr("id") === "fixedCheck" && $(this).is(":checked")) {
      $("#percentageCheck").prop("checked", false);
    }
    toggleSymbol();
  });

  $(".calendar-wrapper").each(function () {
    const $wrapper = $(this);
    const $input = $wrapper.find(".start-date-range");
    const $label = $wrapper.find(".selected-date");
    const $trigger = $wrapper.find(".custom-date-trigger");

    $input.datepicker({
      dateFormat: "dd/mm/yy",
      changeYear: true,
      changeMonth: true,
      yearRange: "2015:" + new Date().getFullYear(),
      onSelect: function (dateText) {
        $label.text(dateText);
      },
    });

    $trigger.on("click", function () {
      $input.datepicker("show");
    });
  });
  $(".popup-btn").on("click", function () {
    let popupId = $(this).data("popup");
    $("." + popupId)
      .removeClass("hidden")
      .addClass("flex");
  });

  // Close popup
  $(".close-popup").on("click", function () {
    let popupId = $(this).data("popup");
    $(this)
      .closest("." + popupId)
      .addClass("hidden")
      .removeClass("flex");
  });

  $(".pay-now-btn").on("click", function () {
    $(".paymentDetailsPopup").addClass("hidden");
    $(".paymentSuccessPopup").removeClass("hidden");
    $(".free-plan-section").addClass("hidden");
    $(".premium-plan-section").removeClass("hidden");
  });

  $(".close-payment-success-popup").on("click", function () {
    $(".paymentSuccessPopup").addClass("hidden");
  });

  $(".end-subs-btn").on("click", function () {
    $(".cancelSubscriptionPopup").addClass("hidden");
    $(".free-plan-section").removeClass("hidden");
    $(".premium-plan-section").addClass("hidden");
  });

  $(".close-insufficient-balance-popup").on("click", function () {
    $(".insufficientBalancePopup").addClass("hidden");
  });

  $(".close-payment-failed-popup").on("click", function () {
    $(".paymentFailedPopup").addClass("hidden");
  });

  $('.try-again-btn').on('click',function(){
    $('.paymentFailedPopup').addClass('hidden')
    $('.paymentDetailsPopup').removeClass('hidden')
  })

   if ($(window).width() > 768) {
        $('.info-container').hover(
            function() {
                $(this).find('.info-section').removeClass('hidden');
            },
            function() {
                $(this).find('.info-section').addClass('hidden');
            }
        );
    } else {
        // For mobile/small screens: toggle on click
        $('.info-icon-subscription').on('click', function(e) {
            e.stopPropagation();
            $(this).siblings('.info-section').toggleClass('hidden');
        });
        
        // Close when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.info-container').length) {
                $('.info-section').addClass('hidden');
            }
        });
    }
    
    // Handle window resize
    $(window).on('resize', function() {
        $('.info-section').addClass('hidden');
    });
});
function openPopup(id) {
  document.getElementById(id).classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closePopup(id) {
  document.getElementById(id).classList.add("hidden");
  document.body.style.overflow = "auto";
}

function clearSearchHistory() {
  // Perform action here
  window.showToaster("success", "Search history cleared!");
  closePopup("searchHistoryPopup");
}

function clearSavedData() {
  // Perform action here
  window.showToaster("success", "Saved data cleared!");
  closePopup("savedDataPopup");
}

function deleteAccount() {
  // Perform action here
  window.showToaster("success", "Account deleted!");
  closePopup("deleteAccountPopup");
}

// Common chart options function
function getChartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        yAlign: "bottom",
        backgroundColor: "#3AAFA9",
        displayColors: true,
        callbacks: {
          title: () => "",
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: { title: { display: false } },
      yLeft: {
        type: "linear",
        position: "left",
        beginAtZero: true,
        min: 0,
        max: 800,
        ticks: { stepSize: 200 },
      },
      yRight: {
        type: "linear",
        position: "right",
        beginAtZero: true,
        min: 0,
        max: 800,
        ticks: { display: false },
        grid: { drawOnChartArea: false },
      },
    },
  };
}

// Initialize chart helper
function initChart(canvasId, config) {
  const canvas = document.getElementById(canvasId);
  if (canvas) {
    return new Chart(canvas.getContext("2d"), config);
  }
  return null;
}

function setupPagination({
  containerId,
  cardClass,
  prevBtnId,
  nextBtnId,
  paginationContainerId,
  cardsPerPage = 3,
}) {
  let currentPage = 1;

  function showPage(page) {
    const $cards = $(`#${containerId} .${cardClass}`);
    const totalPages = Math.ceil($cards.length / cardsPerPage);

    $cards.hide();
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    $cards.slice(start, end).show();

    $(`#${prevBtnId}`).prop("disabled", page === 1);
    $(`#${nextBtnId}`).prop("disabled", page === totalPages);

    updatePaginationNumbers(totalPages, page);
  }

  function updatePaginationNumbers(totalPages, activePage) {
    const $container = $(`#${paginationContainerId}`);
    $container.empty();

    for (let i = 1; i <= totalPages; i++) {
      $("<button></button>")
        .text(i)
        .addClass("px-3 py-2 rounded-lg cursor-pointer font-normal text-xs")
        .addClass(
          i === activePage
            ? `bg-dodger-blue text-white`
            : "bg-pagination text-jet-black"
        )
        .on("click", function () {
          currentPage = i;
          showPage(currentPage);
        })
        .appendTo($container);
    }
  }

  $(`#${prevBtnId}`).on("click", function () {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });

  $(`#${nextBtnId}`).on("click", function () {
    const totalPages = Math.ceil(
      $(`#${containerId} .${cardClass}`).length / cardsPerPage
    );
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

  showPage(currentPage);
}

function toggleSymbol() {
  if ($("#percentageCheck").is(":checked")) {
    $("#percentSymbol").show();
  } else {
    $("#percentSymbol").hide();
  }
}
toggleSymbol();
