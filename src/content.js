import * as InboxSDK from '@inboxsdk/core';

InboxSDK.load(2, process.env.INBOX_SDK_KEY).then((sdk) => {
    console.log("NPM InboxSDK loaded successfully!");

    const safeIconUrl = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>';

    sdk.Toolbars.addToolbarButtonForApp({
        title: 'Easy Filters',
        iconUrl: safeIconUrl,
        onClick: (event) => {
            openEasyFiltersModal(sdk);
        }
	});

});

let modalStateContainer = null;

function openEasyFiltersModal(sdk) {

	if(modalStateContainer) {
		sdk.Widgets.showModalView({
			title: '✨ Smart Filters',
			el: modalStateContainer
		});
		return;
	}

	modalStateContainer = document.createElement('div');


	modalStateContainer.innerHTML = `
		<div class="ez-filter-section">
			<label class="ez-filter-label">Quick Filters</label>
			<div class="ez-chip-group">
				<button class="ez-filter-chip" data-query="is:unread">📩 Unread</button>
				<button class="ez-filter-chip" data-query="has:attachment">📎 Has Attachment</button>

				<div class="ez-complex-filter">
					<button class="ez-filter-chip" data-prefix="newer_than:" data-suffix="d" data-default="7" data-target="#newer_than_days">📅 Last X Days</button>
					<div class="ez-input-container" style="display: none; margin-top: 5px;">
                        <input type="number" id="newer_than_days" placeholder="Days (default 7)" min="1" style="width: 120px; padding: 5px; border-radius: 4px; border: 1px solid #ccc;">
                    </div>
				</div>
			</div>
			<button class="ez-apply-filters-btn">Apply Filters</button>
			<button class="ez-reset-filters-btn">Reset Filters</button>
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
		title: '✨ Smart Filters',
		el: modalStateContainer
	});
	

}