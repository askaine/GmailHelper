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

	if(modalStateContainer) {
		sdk.Widgets.showModalView({
			title: 'Quick Filters',
			el: modalStateContainer
		});
		return;
	}

	modalStateContainer = document.createElement('div');


	modalStateContainer.innerHTML = `
    <div class="ez-filter-section">
        <label class="ez-filter-label"></label>
        
        <div class="ez-chip-group">
            
            <!-- Simple Filters -->
            <button class="ez-filter-chip" data-query="is:unread">📩 Unread</button>
            
            <button class="ez-filter-chip" data-query="has:attachment">📎 Has Attachment
                <span class="info-icon" aria-label="Information">i
                    <span class="tooltip-text">
                        Find emails that include:<br>
                        • Attachments<br>
                        • Inline images<br>
                        • Google Drive/Docs links
                    </span>
                </span>
            </button>

            <!-- Complex Filters -->
            <div class="ez-complex-filter">
                <button class="ez-filter-chip" data-prefix="newer_than:" data-suffix="d" data-default="7" data-target="#newer_than_days">📅 Last X Days
                    <span class="info-icon" aria-label="Information">i
                        <span class="tooltip-text">Search for emails newer than a time period.</span>
                    </span>
                </button>
                <div class="ez-input-container" style="display: none;">
                    <input type="number" class="ez-input" id="newer_than_days" placeholder="Days (default 7)">
                </div>
            </div>

            <div class="ez-complex-filter">
                <button class="ez-filter-chip" data-prefix="from:" data-suffix="" data-default="example@example.com" data-target="#from">👤 From
                    <span class="info-icon" aria-label="Information">i
                        <span class="tooltip-text">Find emails sent from a specific person.</span>
                    </span>
                </button>
                <div class="ez-input-container" style="display: none;">
                    <input type="text" class="ez-input" id="from" placeholder="Sender (e.g. bob@gmail.com)">
                </div>
            </div>

            <div class="ez-complex-filter">
                <button class="ez-filter-chip" data-prefix="to:" data-suffix="" data-default="example@example.com" data-target="#to">🎯 To
                    <span class="info-icon" aria-label="Information">i
                        <span class="tooltip-text">Find emails sent to a specific person.</span>
                    </span>
                </button>
                <div class="ez-input-container" style="display: none;">
                    <input type="text" class="ez-input" id="to" placeholder="Recipient">
                </div>
            </div>

            <div class="ez-complex-filter">
                <button class="ez-filter-chip" data-prefix="subject:" data-suffix="" data-default="" data-target="#subject">🏷️ Subject
                    <span class="info-icon" aria-label="Information">i
                        <span class="tooltip-text">Find emails by a word or phrase in the subject.</span>
                    </span>
                </button>
                <div class="ez-input-container" style="display: none;">
                    <input type="text" class="ez-input" id="subject" placeholder="Keyword (e.g. invoice)">
                </div>
            </div>

        </div>

        <div class="ez-action-footer">
            <button class="ez-reset-filters-btn">Clear</button>
            <button class="ez-apply-filters-btn">Apply Filters</button>
        </div>
    </div>
`;
	
	const chips = modalStateContainer.querySelectorAll('.ez-filter-chip');	
	chips.forEach(chip =>{
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

				if (prefix&&targetSelector) {
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

		modalStateContainer.querySelectorAll('input').forEach(input => {
			input.value = '';
		});

		sdk.Router.goto(sdk.Router.NativeRouteIDs.INBOX);

	});

	sdk.Widgets.showModalView({
		title: 'Quick Filters',
		el: modalStateContainer
	});
	

}