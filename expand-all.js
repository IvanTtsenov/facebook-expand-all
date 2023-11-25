// ==UserScript==
// @name         Facebook Customization
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Customize Facebook
// @author       Ivan Tsenov
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

(function () {
        document.addEventListener('scrollend', getComments);
        function getComments() {
                //if you click on a separate post as a new page
                let postsPage = window.location.href.includes('posts');

                if (postsPage) {
                        let singlePageComment = document.querySelector('.xe0p6wg > div:nth-child(1)');
                        singlePageComment.click();
                        let optionsMenu = document.querySelector('[role="menu"]')
                        if (optionsMenu !== null) {
                                let options = optionsMenu.querySelectorAll('[role="menuitem"]');
                                options.forEach(option => {
                                        //Case where all comments are missing form the menu
                                        let missingAll = true;
                                        if (option.textContent.includes('All comments')) {
                                                missingAll = false;
                                                option.click();
                                                document.removeEventListener('scrollend', getComments);
                                                return;
                                        } else if (option.textContent.includes('Oldest') && missingAll) {
                                                option.click();
                                                document.removeEventListener('scrollend', getComments);
                                                return;
                                        }
                                });
                        }
                        return;
                }
                //Normal page comments
                let viewComments = document.querySelectorAll('.xzueoph [role="button"]');
                for (let i = 0; i < viewComments.length - 1; i++) {
                        let comment = viewComments[i];
                        comment.addEventListener("click", function () {
                                //Timeouts for the popups to load
                                setTimeout(() => {
                                        let commentsPopUp = document.querySelector('.x1n2onr6.x1ja2u2z.x1afcbsf[role="dialog"]');
                                        let moreComments = commentsPopUp.querySelector('.xe0p6wg > div:nth-child(1)')
                                        moreComments.click();
                                        let optionsMenu = document.querySelector('[role="menu"]')
                                        if (optionsMenu !== null) {
                                                let options = optionsMenu.querySelectorAll('[role="menuitem"]');
                                                options.forEach(option => {
                                                        //Case where all comments are missing form the menu
                                                        let missingAll = true;
                                                        if (option.textContent.includes('All comments')) {
                                                                missingAll = false;
                                                                option.click();
                                                                return;
                                                        } else if (option.textContent.includes('Oldest') && missingAll) {
                                                                option.click();
                                                                return;
                                                        }
                                                });
                                        }
                                }, 1000);
                                return;
                        });
                };
        }
})();