function tab(tabId) {
  const $tab = document.getElementById(tabId);
  const $tabBtnList = $tab.querySelectorAll('.js-tabTrigger');
  const tabArrayList = [...$tabBtnList];

  //initialize tab focus
  const $activeTab = $tab.querySelector('[aria-selected="true"]');
  const indexNum = tabArrayList.indexOf($activeTab);
  let focusIndex = indexNum;

  const switchTab = (e) => {
    //a pushed button
    const $eventTarget = e.currentTarget;
    //a pannel id you wanna active
    const targetPanelId = $eventTarget.getAttribute('aria-controls');

    //current active items
    const $activeTab = $tab.querySelector('[aria-selected="true"]');
    const activeContent = $tab.querySelector('[aria-hidden="false"]');

    $activeTab.setAttribute('aria-selected', 'false');
    $activeTab.setAttribute('tabindex', '-1');
    $eventTarget.setAttribute('aria-selected', 'true');
    $eventTarget.setAttribute('tabindex', '0');

    //switch constents area
    activeContent.setAttribute('aria-hidden', 'true');
    $tab.querySelector(`#${targetPanelId}`).setAttribute('aria-hidden', 'false');
  }
  $tabBtnList.forEach(el => el.addEventListener('click', switchTab));

  const changeFocus = (e) => {
    if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
      // Reset tabindex
      $tabBtnList[focusIndex].setAttribute('tabindex', '-1');
      
      if(e.code === 'ArrowRight') {
        focusIndex += 1
      }
      if(e.code === 'ArrowLeft') {
        focusIndex -= 1;
      }
      // If you are at the end, go back to the start
      if (focusIndex >= $tabBtnList.length) {
        focusIndex = 0;
      }
      // If you are at the start, move to the end
      if (focusIndex < 0) {
        focusIndex = $tabBtnList.length - 1;
      }
    }

    // Change tabindex
    const nextFocusTab = $tabBtnList[focusIndex];
    nextFocusTab.setAttribute('tabindex', '0');
    nextFocusTab.focus();
  }
  $tabBtnList.forEach(el => el.addEventListener('keydown', changeFocus))
}

tab('js-tab01');