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
            parentEl: $wrapper,  // Will now position inside this wrapper
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
            $wrapper.find('.selected-date').text(picker.startDate.format('DD/MM/YYYY'));
        });

        $input.on('cancel.daterangepicker', function (e, picker) {
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
        "new-post": {
            icon: "upload",
            title: "New Post",
            description: "Post Your Cause—Reach Generous Donors Today!"
        },
        "post-history": {
            icon: "upload",
            title: "New Post",
            description: "Post Your Cause—Reach Generous Donors Today!"
        },
        "saved-post": {
            icon: "upload",
            title: "New Post",
            description: "Post Your Cause—Reach Generous Donors Today!"
        }
    };

    // Click event for tabs
    $('.tab-btn-ngo').click(function () {

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
        $('.preview-popup, .view-popup').addClass('hidden').removeClass("flex");

        if (popupType === 'preview') {
            $('.preview-popup').removeClass('hidden').addClass('flex');
        } else if (popupType === 'view') {
            $('.view-popup').removeClass('hidden').addClass('flex');
        }
    });

    // Close popup on close button click
    $(document).on('click', '.close-popup', function () {
        $(this).closest('.popup').addClass('hidden').removeClass("flex");
    });

    // Close popup on outside click
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.preview-popup, .download-popup, [data-popup]').length) {
            $('.preview-popup, .download-popup').addClass('hidden').removeClass("flex");
        }
    });

    const availableTags = [
        "JavaScript",
        "jQuery",
        "HTML",
        "CSS",
        "React",
        "Vue",
        "Angular",
        "Node.js",
        "Express",
        "MongoDB"
    ];

    let tags = [];
    const maxTags = 8;

    // Render all selected tags
    function renderTags() {
        $('#tag-input-container').children('.tag-chip').remove();

        tags.forEach((tag, index) => {
            const tagEl = $(`
      <div class="tag-chip inline-flex items-center bg-input-tag text-jet-black px-2 py-0.5 rounded-[6px] text-xs font-medium">
        ${tag}
        <button type="button" class="ml-2 text-jet-black text-lg hover:text-red-600" data-index="${index}">&times;</button>
      </div>
    `);
            $('#tag-input').before(tagEl);
        });

        validateForm();
    }

    // Show suggestions while typing
    $('#tag-input').on('input', function () {
        const query = $(this).val().trim().toLowerCase();

        if (!query) {
            $('#tag-suggestions').empty().css('visibility', 'hidden');
            return;
        }

        const suggestions = availableTags
            .filter(tag =>
                tag.toLowerCase().includes(query) && !tags.includes(tag)
            )
            .slice(0, 3);

        if (suggestions.length === 0) {
            $('#tag-suggestions').empty().css('visibility', 'hidden');
            return;
        }

        const html = suggestions    
            .map(tag => `
            <div class="flex items-center bg-input-tag text-jet-black px-3 py-1 rounded-[6px] text-sm font-medium cursor-pointer" data-tag="${tag}">
              ${tag}
            </div>
          `)
            .join('');

        $('#tag-suggestions')
            .html(html)
            .css('visibility', 'visible');
    });

    // Handle suggestion click
    $('#tag-suggestions').on('click', '[data-tag]', function () {
        const selectedTag = $(this).data('tag');
        if (tags.length < maxTags && !tags.includes(selectedTag)) {
            tags.push(selectedTag);
            renderTags();
            $('#tag-input').val('');
            $('#tag-suggestions').empty().css('visibility', 'hidden');
        } else if (tags.includes(selectedTag)) {
            window.showToaster?.('error', 'Tag already selected.');
        } else {
            window.showToaster?.('error', 'Only 8 tags can be selected.');
        }
    });

    // Handle Enter press for custom tags
    $('#tag-input').on('keypress', function (e) {
        if (e.which === 13) {
            e.preventDefault();
            const newTag = $(this).val().trim();
            if (newTag && !tags.includes(newTag)) {
                if (tags.length < maxTags) {
                    tags.push(newTag);
                    renderTags();
                    $(this).val('');
                    $('#tag-suggestions').empty().css('visibility', 'hidden');
                } else {
                    window.showToaster?.('error', 'Only 8 tags can be selected.');
                }
            } else {
                $('#tag-suggestions').empty().css('visibility', 'hidden');
            }
        }
    });

    // Delete tag button
    $('#tag-input-container').on('click', 'button', function () {
        const index = $(this).data('index');
        tags.splice(index, 1);
        renderTags();
      });

    // Hide suggestions when clicking outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('#tag-input, #tag-suggestions').length) {
            $('#tag-suggestions').empty().css('visibility', 'hidden');
        }
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

        // Validate if file is uploaded
        const hasFile = $('.upload-input')[0].files.length > 0;
        if (!hasFile) {
            isValid = false;
        }

        if (tags.length === 0) {
            isValid = false;
        }

        // Enable or disable the Post button
        const $postBtn = $('.post-btn');
        if (isValid) {
            $postBtn
                .removeClass('bg-inactive-blue cursor-not-allowed')
                .addClass('bg-violet-sky cursor-pointer')
                .prop('disabled', false);
        } else {
            $postBtn
                .removeClass('bg-violet-sky cursor-pointer')
                .addClass('bg-inactive-blue cursor-not-allowed')
                .prop('disabled', true);
        }
    }

    // Bind events
    $(document).on('input change', '.required-field, .upload-input', function () {
        validateForm();
    });

    // Initial check
    validateForm();

    $('.post-btn').on('click', function () {
        $('.post-uploaded-popup').removeClass('hidden').addClass('flex');
    })

    $('.post-close').on('click', function () {
        $('.post-uploaded-popup').removeClass('flex').addClass('hidden');
    })

    // Status Dropdown
    $('.statusDropdown').each(function () {
        const $dropdown = $(this);
        const $selected = $dropdown.find('.selectedStatus');
        const $options = $dropdown.find('.statusOptions');
        const $label = $dropdown.find('.status-label');

        // Toggle dropdown on click
        $selected.on('click', function () {
            // Hide all others first
            $('.statusOptions').not($options).hide();
            $options.toggle();
        });

        // Handle option selection
        $options.find('div').on('click', function () {
            const selectedText = $(this).text();
            const bgClass = $(this).attr('class').match(/bg-[^\s]+/)[0];
            const textClass = $(this).attr('class').match(/text-[^\s]+/)[0];

            // Update text and classes for this dropdown only
            $label.text(selectedText);
            $selected
                .removeClass(function (i, className) {
                    return (className.match(/(bg|text)-[^\s]+/g) || []).join(' ');
                })
                .addClass(`${bgClass} ${textClass}`);

            $options.hide();
        });
    });

    // Hide any open dropdowns if clicking outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.statusDropdown').length) {
            $('.statusOptions').hide();
        }
    });

    // saved icon
    $('.saved-icon').on('click', function () {
        $(this).toggleClass('material-filled text-violet-sky');
    });

    $('.statusDropdown').each(function () {
        const $dropdown = $(this);
        const $selected = $dropdown.find('.selectedStatus');
        const $options = $dropdown.find('.statusOptions');
        const $label = $dropdown.find('.status-label');

        // Toggle dropdown on click
        $selected.on('click', function () {
            console.log("click")
            // Hide all others first
            $('.statusOptions').not($options).hide();
            $options.toggle();
        });

        // Handle option selection
        $options.find('div').on('click', function () {
            const selectedText = $(this).text();
            const bgClass = $(this).attr('class').match(/bg-[^\s]+/)[0];
            const textClass = $(this).attr('class').match(/text-[^\s]+/)[0];

            // Update text and classes for this dropdown only
            $label.text(selectedText);
            $selected
                .removeClass(function (i, className) {
                    return (className.match(/(bg|text)-[^\s]+/g) || []).join(' ');
                })
                .addClass(`${bgClass} ${textClass}`);

            $options.hide();
        });
    });

    // Hide any open dropdowns if clicking outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.statusDropdown').length) {
            $('.statusOptions').hide();
        }
    });
    
    //Donation Popup 
    $('.donation-receipt-view').on('click', function () {
        $('.donation-receipt-modal').removeClass('hidden').addClass('flex');
    });

    $('.close-donation-receipt').on('click', function (e) {
        e.stopPropagation()
        $('.donation-receipt-modal').removeClass('flex').addClass('hidden');
    });
});
