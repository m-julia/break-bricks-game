 const showRulesBtn = document.getElementById('rules-btn');
 const closeRulesBtn = document.getElementById("close-btn");
 const rules = document.getElementById("rules");


// Show and close rules event handler
showRulesBtn.addEventListener('click', () => rules.classList.add('show'));

closeRulesBtn.addEventListener('click', () => rules.classList.remove('show'));