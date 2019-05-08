(function() {
    var tabs, currentTab;
    var getTabs = function() {
        var tabs = []; //['userDetailsSectionHeader','personalDataSectionHeader','organisationSectionHeader','informationSectionHeader'];
        var tabcontainers = document.querySelectorAll(".register-steps");
        if (typeof tabcontainers == 'undefined' || tabcontainers.length == 0) {
            return tabs;
        }
        var tabcontainer = tabcontainers[0];
        var childnodes = tabcontainer.childNodes;
        for (var max = childnodes.length, i = 0; i < max; i++) {
            if (childnodes[i].nodeType == 1) {
                var n = childnodes[i];
                //store it's id
                tabs.push({
                    id: n.id,
                    node: n
                });
            }
        }
        return tabs;
    };

    var getCurrentTab = function() {
        for (var max = tabs.length, i = 0; i < max; i++) {
            if (tabs[i].node.classList.contains("current-tab")) {
                return tabs[i].id;
            }
        }
    };

    var manageEvent = function(e) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'register_step_click',
            'tab_clicked': currentTab
        });
        //wait 1 second and see if page has changed
        setTimeout(function(e) {
            var pageNow = getCurrentTab();
            if (pageNow !== currentTab) {
                window.dataLayer.push({
                    'event': 'register_step_view',
                    'register_page': pageNow
                });
                currentTab = pageNow;
            }
        }, 1000);
    };

    var setupTabClicks = function() {
        for (var max = tabs.length, i = 0; i < max; i++) {
            tabs[i].node.addEventListener('click', manageEvent);
        }
    };

    tabs = getTabs();
    setupTabClicks();
    currentTab = getCurrentTab();
    document.querySelector("#registration_nextButton").addEventListener('click', manageEvent);
    document.querySelector("#nextbtn").addEventListener('click', manageEvent);
    document.querySelector("#registration_backButton").addEventListener('click', manageEvent);
    document.querySelector("#previousbtn").addEventListener('click', manageEvent);
    window.dataLayer.push({
        'event': 'register_step_view',
        'register_page': currentTab
    });
})();