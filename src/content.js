import * as InboxSDK from '@inboxsdk/core';

InboxSDK.load(2, process.env.INBOX_SDK_KEY).then((sdk) => {
    console.log("NPM InboxSDK loaded successfully!");
    injectFloatingButton(sdk);
});

function injectFloatingButton(sdk) {
    if (document.getElementById('ez-quick-filters-button')) return;

    const btn = document.createElement('button');
    btn.id = 'ez-quick-filters-button';
    btn.className = 'ez-floating-btn';

    btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>
        Smart Filters
    `;

    btn.addEventListener('click', () => {
        openEasyFiltersModal(sdk);
    });

    document.body.appendChild(btn);
}

let modalStateContainer = null;

function openEasyFiltersModal(sdk) {

    if (modalStateContainer) {
        sdk.Widgets.showModalView({
            title: 'Quick Filters',
            el: modalStateContainer
        });
        return;
    }

    modalStateContainer = document.createElement('div');


    modalStateContainer.innerHTML = `
    <div class="ez-filter-section" dir="ltr">
        <div class="ez-scroll-container">
            
            <!-- ================= STATUS & LOCATION ================= -->
            <label class="ez-filter-label"><b>Status & Location</b></label>
            <div class="ez-chip-group">
                <button class="ez-filter-chip" data-query="is:unread">📩 Unread
                    <span class="info-icon">i<span class="tooltip-text">Search for emails by their status: Unread.</span></span>
                </button>
                <button class="ez-filter-chip" data-query="is:read">📖 Read
                    <span class="info-icon">i<span class="tooltip-text">Search for emails by their status: Read.</span></span>
                </button>
                <button class="ez-filter-chip" data-query="is:starred">⭐ Starred
                    <span class="info-icon">i<span class="tooltip-text">Search for emails by their status: Starred.</span></span>
                </button>
                <button class="ez-filter-chip" data-query="is:important">🔥 Important
                    <span class="info-icon">i<span class="tooltip-text">Search for emails by their status: Important.</span></span>
                </button>
                <button class="ez-filter-chip" data-query="is:muted">🔇 Muted
                    <span class="info-icon">i<span class="tooltip-text">Find emails that you muted.</span></span>
                </button>
                <button class="ez-filter-chip" data-query="in:anywhere">🌐 Anywhere
                    <span class="info-icon">i<span class="tooltip-text">Find emails across Gmail. This includes emails in Spam and Trash.</span></span>
                </button>
                <button class="ez-filter-chip" data-query="in:archive">📦 Archive
                    <span class="info-icon">i<span class="tooltip-text">Search for archived messages.</span></span>
                </button>
                <button class="ez-filter-chip" data-query="in:snoozed">💤 Snoozed
                    <span class="info-icon">i<span class="tooltip-text">Find emails that you snoozed.</span></span>
                </button>
                <button class="ez-filter-chip" data-query="has:userlabels">🏷️ Has Labels
                    <span class="info-icon">i<span class="tooltip-text">Find emails that have a label.</span></span>
                </button>
                <button class="ez-filter-chip" data-query="has:nouserlabels">🏷️ No Labels
                    <span class="info-icon">i<span class="tooltip-text">Find emails that don't have a label.</span></span>
                </button>
                <button class="ez-filter-chip" data-query="label:encryptedmail">🔒 Encrypted
                    <span class="info-icon">i<span class="tooltip-text">Find emails sent with Client-side encryption.</span></span>
                </button>
            </div>

            <!-- ================= PEOPLE & CONTENT ================= -->
            <label class="ez-filter-label" style="margin-top: 15px; display: block;"><b>People & Content</b></label>
            <div class="ez-chip-group">
                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="from:" data-suffix="" data-default="" data-target="#from">👤 From
                        <span class="info-icon">i<span class="tooltip-text">Find emails sent from a specific person.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="from" placeholder="e.g. amy@example.com or me"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="to:" data-suffix="" data-default="" data-target="#to">🎯 To
                        <span class="info-icon">i<span class="tooltip-text">Find emails sent to a specific person.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="to" placeholder="e.g. john@example.com or me"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="cc:" data-suffix="" data-default="" data-target="#cc">👥 CC
                        <span class="info-icon">i<span class="tooltip-text">Find emails that include specific people in the "Cc" field.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="cc" placeholder="e.g. john@example.com"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="bcc:" data-suffix="" data-default="" data-target="#bcc">👤🔒 BCC
                        <span class="info-icon">i<span class="tooltip-text">Find emails that include specific people in the "Bcc" field.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="bcc" placeholder="e.g. david@example.com"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="subject:" data-suffix="" data-default="" data-target="#subject">🏷️ Subject
                        <span class="info-icon">i<span class="tooltip-text">Find emails by a word or phrase in the subject line.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="subject" placeholder="Keyword (e.g. dinner)"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="list:" data-suffix="" data-default="" data-target="#list">📋 Mailing List
                        <span class="info-icon">i<span class="tooltip-text">Find emails from a mailing list.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="list" placeholder="info@example.com"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="deliveredto:" data-suffix="" data-default="" data-target="#deliveredto">📫 Delivered To
                        <span class="info-icon">i<span class="tooltip-text">Find emails delivered to a specific email address.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="deliveredto" placeholder="username@example.com"></div>
                </div>
            </div>

            <!-- ================= DATES & TIME ================= -->
            <label class="ez-filter-label" style="margin-top: 15px; display: block;"><b>Dates & Time</b></label>
            <div class="ez-chip-group">
                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="after:" data-suffix="" data-default="" data-target="#after_date">📆 After Date
                        <span class="info-icon">i<span class="tooltip-text">Search for emails received during a certain time period (After).</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="after_date" placeholder="2004/04/16"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="before:" data-suffix="" data-default="" data-target="#before_date">📆 Before Date
                        <span class="info-icon">i<span class="tooltip-text">Search for emails received during a certain time period (Before).</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="before_date" placeholder="2004/04/18"></div>
                </div>
                
                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="newer:" data-suffix="" data-default="" data-target="#newer">📆 Newer Date
                        <span class="info-icon">i<span class="tooltip-text">Search for emails received during a certain time period (Newer).</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="newer" placeholder="2004/04/16"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="older:" data-suffix="" data-default="" data-target="#older">📆 Older Date
                        <span class="info-icon">i<span class="tooltip-text">Search for emails received during a certain time period (Older).</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="older" placeholder="2004/04/16"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="newer_than:" data-suffix="" data-default="7d" data-target="#newer_than">⏳ Newer Than
                        <span class="info-icon">i<span class="tooltip-text">Search for emails newer than a time period. Use d (day), m (month), or y (year).</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="newer_than" placeholder="e.g. 7d or 2m"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="older_than:" data-suffix="" data-default="" data-target="#older_than">⏳ Older Than
                        <span class="info-icon">i<span class="tooltip-text">Search for emails older than a time period. Use d (day), m (month), or y (year).</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="older_than" placeholder="e.g. 1y"></div>
                </div>
            </div>

            <!-- ================= ATTACHMENTS & MEDIA ================= -->
            <label class="ez-filter-label" style="margin-top: 15px; display: block;"><b>Attachments & Media</b></label>
            <div class="ez-chip-group">
                <button class="ez-filter-chip" data-query="has:attachment">📎 Attachments
                    <span class="info-icon">i<span class="tooltip-text">Find emails that include Attachments.</span></span>
                </button>
                <button class="ez-filter-chip" data-query="has:youtube">▶️ YouTube
                    <span class="info-icon">i<span class="tooltip-text">Find emails that include YouTube videos.</span></span>
                </button>
                <button class="ez-filter-chip" data-query="has:drive">🗂️ Drive Files
                    <span class="info-icon">i<span class="tooltip-text">Find emails that include Drive files.</span></span>
                </button>
                <button class="ez-filter-chip" data-query="has:document">📄 Google Docs
                    <span class="info-icon">i<span class="tooltip-text">Find emails that include Google Docs.</span></span>
                </button>
                <button class="ez-filter-chip" data-query="has:spreadsheet">📊 Google Sheets
                    <span class="info-icon">i<span class="tooltip-text">Find emails that include Google Sheets.</span></span>
                </button>
                <button class="ez-filter-chip" data-query="has:presentation">📽️ Google Slides
                    <span class="info-icon">i<span class="tooltip-text">Find emails that include Google Slides.</span></span>
                </button>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="filename:" data-suffix="" data-default="" data-target="#filename">📎 Filename/Type
                        <span class="info-icon">i<span class="tooltip-text">Find emails that have attachments with a certain name or file type.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="filename" placeholder="e.g. pdf or homework.txt"></div>
                </div>
            </div>

            <!-- ================= LABELS & CATEGORIES ================= -->
            <label class="ez-filter-label" style="margin-top: 15px; display: block;"><b>Labels & Categories</b></label>
            <div class="ez-chip-group">
                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="label:" data-suffix="" data-default="" data-target="#custom_label">🏷️ Custom Label
                        <span class="info-icon">i<span class="tooltip-text">Find emails under one of your labels.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="custom_label" placeholder="e.g. friends or important"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="category:" data-suffix="" data-default="primary" data-target="#category">📂 Category
                        <span class="info-icon">i<span class="tooltip-text">If you use inbox categories, find emails under one of the categories.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;">
                        <select class="ez-select" id="category">
                            <option value="primary">Primary</option>
                            <option value="social">Social</option>
                            <option value="promotions">Promotions</option>
                            <option value="updates">Updates</option>
                            <option value="forums">Forums</option>
                            <option value="reservations">Reservations</option>
                            <option value="purchases">Purchases</option>
                        </select>
                    </div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="has:" data-suffix="" data-default="" data-target="#star_color">⭐ Star Options
                        <span class="info-icon">i<span class="tooltip-text">If you set up different star options, you can search for emails under a star option.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;">
                        <select class="ez-select" id="star_color">
                            <option value="yellow-star">Yellow Star</option>
                            <option value="orange-star">Orange Star</option>
                            <option value="red-star">Red Star</option>
                            <option value="purple-star">Purple Star</option>
                            <option value="blue-star">Blue Star</option>
                            <option value="green-star">Green Star</option>
                            <option value="red-bang">Red Bang</option>
                            <option value="orange-guillemet">Orange Guillemet</option>
                            <option value="yellow-bang">Yellow Bang</option>
                            <option value="green-check">Green Check</option>
                            <option value="blue-info">Blue Info</option>
                            <option value="purple-question">Purple Question</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- ================= SIZES & TECHNICAL ================= -->
            <label class="ez-filter-label" style="margin-top: 15px; display: block;"><b>Sizes & Technical</b></label>
            <div class="ez-chip-group">
                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="size:" data-suffix="" data-default="" data-target="#size">📦 Exact Size
                        <span class="info-icon">i<span class="tooltip-text">Find emails by their exact size. E.g. 1000000.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="size" placeholder="Bytes"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="larger:" data-suffix="" data-default="" data-target="#larger">📈 Larger Than
                        <span class="info-icon">i<span class="tooltip-text">Find emails larger than their size. E.g. 10M.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="larger" placeholder="e.g. 10M"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="smaller:" data-suffix="" data-default="" data-target="#smaller">📉 Smaller Than
                        <span class="info-icon">i<span class="tooltip-text">Find emails smaller than their size.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="smaller" placeholder="e.g. 5M"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="rfc822msgid:" data-suffix="" data-default="" data-target="#msgid">🆔 Message ID
                        <span class="info-icon">i<span class="tooltip-text">Find emails with a specific message-id header.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="msgid" placeholder="200503292@example.com"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="header:" data-suffix="" data-default="" data-target="#header">⚙️ Custom Header
                        <span class="info-icon">i<span class="tooltip-text">Search for emails with a specific custom header or header value.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="header" placeholder="Header value"></div>
                </div>
            </div>

            <!-- ================= ADVANCED QUERY OPERATORS ================= -->
            <label class="ez-filter-label" style="margin-top: 15px; display: block;"><b>Advanced Query Operators</b></label>
            <div class="ez-chip-group">
                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="{" data-suffix="}" data-default="" data-target="#or_operator">🔀 OR Operator
                        <span class="info-icon">i<span class="tooltip-text">Find emails that match one or more of your search criteria. Type: from:amy from:david</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="or_operator" placeholder="from:amy from:david"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="" data-suffix="" data-default="" data-target="#and_operator">🔗 AND Operator
                        <span class="info-icon">i<span class="tooltip-text">Find emails that match all of your search criteria. Type: from:amy AND to:david</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="and_operator" placeholder="from:amy AND to:david"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="-" data-suffix="" data-default="" data-target="#exclude_operator">❌ Exclude (-)
                        <span class="info-icon">i<span class="tooltip-text">Exclude emails from your search criteria.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="exclude_operator" placeholder="movie"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="" data-suffix="" data-default="" data-target="#around_operator">📍 AROUND
                        <span class="info-icon">i<span class="tooltip-text">Find emails with words near each other. Use the number to say how many words apart the words can be.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="around_operator" placeholder="holiday AROUND 10 vacation"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix='"' data-suffix='"' data-default="" data-target="#exact_phrase_operator">"" Exact Phrase
                        <span class="info-icon">i<span class="tooltip-text">Search for emails with an exact word or phrase.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="exact_phrase_operator" placeholder="dinner and movie tonight"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="(" data-suffix=")" data-default="" data-target="#group_operator">() Group
                        <span class="info-icon">i<span class="tooltip-text">Group multiple search terms together.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="group_operator" placeholder="dinner movie"></div>
                </div>

                <div class="ez-complex-filter">
                    <button class="ez-filter-chip" data-prefix="+" data-suffix="" data-default="" data-target="#exact_word_operator">+ Exact Word
                        <span class="info-icon">i<span class="tooltip-text">Find emails that match a word exactly.</span></span>
                    </button>
                    <div class="ez-input-container" style="display: none;"><input type="text" class="ez-input" id="exact_word_operator" placeholder="unicorn"></div>
                </div>
            </div>

        </div> <!-- End Scroll Container -->

        <div class="ez-action-footer">
            <button class="ez-reset-filters-btn">Clear</button>
            <button class="ez-apply-filters-btn">Apply Filters</button>
        </div>
    </div>
    `;

    const chips = modalStateContainer.querySelectorAll('.ez-filter-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chip.classList.toggle('active');
            const targetSelector = chip.getAttribute('data-target');
            if (targetSelector) {
                const targetInput = modalStateContainer.querySelector(targetSelector);

                if (targetInput && targetInput.parentElement) {
                    targetInput.parentElement.style.display = chip.classList.contains('active') ? 'block' : 'none';
                }
            }
        });
    });

    const applyBtn = modalStateContainer.querySelector('.ez-apply-filters-btn');
    applyBtn.addEventListener('click', () => {
        const activeQueries = Array.from(modalStateContainer.querySelectorAll('.ez-filter-chip.active'))
            .map(chip => {
                const simpleQuery = chip.getAttribute('data-query');
                if (simpleQuery) return simpleQuery;

                const prefix = chip.getAttribute('data-prefix');
                const suffix = chip.getAttribute('data-suffix');
                const targetSelector = chip.getAttribute('data-target');
                const defaultValue = chip.getAttribute('data-default');

                if (prefix !== null && targetSelector) {
                    const inputElement = modalStateContainer.querySelector(targetSelector);
                    const userValue = inputElement.value.trim();

                    const finalValue = userValue ? userValue : defaultValue;

                    if (finalValue) {
                        return `${prefix}${finalValue}${suffix}`;
                    }
                }
                return null;
            }).filter(query => query !== null);

        if (activeQueries.length > 0) {
            const combinedQuery = activeQueries.join(' ');
            sdk.Router.goto(sdk.Router.NativeRouteIDs.SEARCH, { query: combinedQuery });
        }
        else {
            sdk.Router.goto(sdk.Router.NativeRouteIDs.INBOX);
        }
    });

    const resetBtn = modalStateContainer.querySelector('.ez-reset-filters-btn');
    resetBtn.addEventListener('click', () => {
        chips.forEach(chip => {
            chip.classList.remove('active');
        });

        modalStateContainer.querySelectorAll('.ez-input-container').forEach(container => {
            container.style.display = 'none';
        });

        modalStateContainer.querySelectorAll('input, select').forEach(input => {
            if (input.tagName === 'SELECT') {
                input.selectedIndex = 0;
            } else {
                input.value = '';
            }
        });

        sdk.Router.goto(sdk.Router.NativeRouteIDs.INBOX);
    });

    sdk.Widgets.showModalView({
        title: 'Quick Filters',
        el: modalStateContainer
    });
}