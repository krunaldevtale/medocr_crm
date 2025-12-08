$(document).ready(function () {
    // Toggle dropdown on input click
    $(document).on('click', '.dropdown-input, .material-symbols-outlined:contains("keyboard_arrow_down")', function (e) {
        e.stopPropagation(); // Prevent triggering document click
        const $wrapper = $(this).closest('.dropdown-wrapper');
        $('.dropdown-list').not($wrapper.find('.dropdown-list')).hide(); // Hide other dropdowns
        $wrapper.find('.dropdown-list').toggle();
    });

    // Select option
    $(document).on('click', '.dropdown-list div', function (e) {
        e.stopPropagation();
        const $wrapper = $(this).closest('.dropdown-wrapper');
        const selectedText = $(this).text();
        $wrapper.find('.dropdown-input').val(selectedText);
        $wrapper.find('.dropdown-list').hide();
    });

    // Hide dropdown on outside click
    $(document).on('click', function () {
        $('.dropdown-list').hide();
    });


    // Calendar
    let selectedDate = null;

    $('.custom-date-trigger').on('click', function () {
        var $wrapper = $(this).closest('.calendar-wrapper');
        var $input = $wrapper.find('.custom-date-range');

        // Destroy any previous instance
        if ($input.data('daterangepicker')) {
            $input.data('daterangepicker').remove();
        }

        // Initialize daterangepicker correctly inside the wrapper
        $input.daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            autoUpdateInput: false,
            parentEl: $wrapper,  
            drops: 'up',
            opens: 'center',
            locale: {
                format: 'DD/MM/YYYY',
                cancelLabel: 'Clear'
            }
        });

        // Open the picker safely
        $input.trigger('click');

        // Clean and re-bind
        $input.off('apply.daterangepicker cancel.daterangepicker');

        $input.on('apply.daterangepicker', function (e, picker) {
            const formattedDate = picker.startDate.format('DD/MM/YYYY');
            selectedDate = formattedDate;
            $wrapper.find('.selected-date').text(formattedDate);
            console.log("Selected Date:", selectedDate); 
        });

        $input.on('cancel.daterangepicker', function (e, picker) {
            selectedDate = null;
            $wrapper.find('.selected-date').text('DD/MM/YY');
        });
    });

    // 1. Upload area click to trigger file input
    $('.upload-area').on('click', function (e) {
        const previewVisible = $(this).find('.upload-preview').is(':visible');
        if (
            !previewVisible &&
            !$(e.target).is('input[type="file"]') &&
            !$(e.target).hasClass('cancel-upload')
        ) {
            $(this).find('input[type="file"]').trigger('click');
        }
    });

    // 2. Drag and drop handling
    $('.upload-area').on('dragover', function (e) {
        e.preventDefault();
    });

    $('.upload-area').on('dragleave', function (e) {
        e.preventDefault();
    });

    $('.upload-area').on('drop', function (e) {
        e.preventDefault();
        const file = e.originalEvent.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const fileInput = $(this).find('input[type="file"]')[0];
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInput.files = dataTransfer.files;
            $(fileInput).trigger('change');
        }
    });

    // 3. Change image
    $('.upload-area').on('click', '.change-image-btn', function (e) {
        e.stopPropagation();
        const area = $(this).closest('.upload-area');
        area.find('input[type="file"]').trigger('click');
    });

    // 4. File input change handler
    $('.upload-input').on('change', function () {
        const file = this.files[0];
        const area = $(this).closest('.upload-area');
        const preview = area.find('.upload-preview');
        const placeholder = area.find('.upload-placeholder');

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                preview.find('.uploaded-img').attr('src', e.target.result);
                placeholder.addClass('hidden');
                preview.removeClass('hidden').addClass("flex");
            };
            reader.readAsDataURL(file);
        }
    });

    // 5. Cancel upload
    $('.upload-area').on('click', '.cancel-upload', function (e) {
        e.stopPropagation(); // Prevent triggering upload
        const area = $(this).closest('.upload-area');
        const input = area.find('input[type="file"]');
        const preview = area.find('.upload-preview');
        const placeholder = area.find('.upload-placeholder');

        // Reset
        input.val('');
        preview.addClass('hidden').removeClass("flex");
        placeholder.removeClass('hidden');
    });

    // Title and Description Change

    const tabData = {
        "new-coupon": {
            icon: "upload",
            title: "Coupons",
            description: "Boost Your Sales—Post New Coupons for Users!"
        },
        "coupon-history": {
            icon: "upload",
            title: "Coupons",
            description: "Boost Your Sales—Post New Coupons for Users!"
        },
        "saved-coupon": {
            icon: "upload",
            title: "Coupons",
            description: "Boost Your Sales—Post New Coupons for Users!"
        }
    };

    // Click event for tabs
    $('.tab-btn-adv').click(function () {

        // Get data-tab
        const tabKey = $(this).data('tab');

        // Update icon, title, description
        if (tabData[tabKey]) {
            $('.tab-icon').text(tabData[tabKey].icon);
            $('.tab-title').text(tabData[tabKey].title);
            $('.tab-description').text(tabData[tabKey].description);
        }
    });

    // Open popup on icon click
    $(document).on('click', '[data-popup]', function (e) {
        e.stopPropagation();
        var popupType = $(this).data('popup');

        // Always hide all popups first
        $('.download-popup').addClass('hidden').removeClass("flex");

        if (popupType === 'preview') {
            $('.download-popup').removeClass('hidden').addClass('flex');
        }
    });

    // Close popup on close button click
    $(document).on('click', '.close-popup', function () {
        $(this).closest('.popup').addClass('hidden').removeClass("flex");
    });

    // Close popup on outside click
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.download-popup, [data-popup]').length) {
            $('.download-popup').addClass('hidden').removeClass("flex");
        }
    });

    const exportBtn = $('.export-btn');

    exportBtn.on('click', function () {
        $('.preview-popup').removeClass('hidden').addClass('flex');
    })

    $('.saved-icon').on('click', function () {
        $(this).toggleClass('material-filled text-living-coral');
    });

    function validateForm() {
        let isValid = true;

        // Validate required fields (text, textarea)
        $('.required-field').each(function () {
            if ($(this).is('input[type="text"], textarea')) {
                if ($.trim($(this).val()) === '' || $(this).val() === 'Select') {
                    isValid = false;
                }
            }
        });

        const startDateValue = $('.start-date-range').closest('.calendar-wrapper').find('.selected-date').text().trim();
        const endDateValue = $('.end-date-range').closest('.calendar-wrapper').find('.selected-date').text().trim();

        if (!startDateValue || startDateValue === 'DD/MM/YY') {
            isValid = false;
        }

        if (!endDateValue || endDateValue === 'DD/MM/YY') {
            isValid = false;
        }

        // Validate if file is uploaded
        const hasFile = $('.upload-input')[0].files.length > 0;
        if (!hasFile) {
            isValid = false;
        }


        // Enable or disable the Post button
        const $payBtn = $('.pay-btn');
        if (isValid) {
            $payBtn
                .removeClass('bg-living-coral-border cursor-not-allowed')
                .addClass('bg-living-coral cursor-pointer')
                .prop('disabled', false);
        } else {
            $payBtn
                .removeClass('living-coral cursor-pointer')
                .addClass('bg-living-coral-border cursor-not-allowed')
                .prop('disabled', true);
        }
    }

    // Bind events
    $(document).on('input change', '.required-field, .upload-input, .start-date-range, .end-date-range', function () {
        validateForm();
    });

    // Initial check
    validateForm();

    $('.pay-btn').click(function(){
        $('.coupon').hide();
        $('.coupon-pay').show();
    })
    $('.cancel-pay-btn').click(function(){
        $('.coupon').show();
        $('.coupon-pay').hide();
    })

    //Platform bill Popup

    $('.platform-bill-view').on('click', function () {
        $('.platform-bill-modal').removeClass('hidden').addClass('flex');
    });

    $('.close-platform-bill').on('click', function () {
        $('.platform-bill-modal').removeClass('flex').addClass('hidden');
    });
});
