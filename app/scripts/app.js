/*
 Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

(function(document) {
    'use strict';

    // Grab a reference to our auto-binding template
    // and give it some initial binding values
    // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
    var app = document.querySelector('#app');

    app.displayInstalledToast = function() {
        // Check to make sure caching is actually enabled—it won't be in the dev environment.
        if (!document.querySelector('platinum-sw-cache').disabled) {
            document.querySelector('#caching-complete').show();
        }
    };

    // Listen for template bound event to know when bindings
    // have resolved and content has been stamped to the page
    app.addEventListener('dom-change', function() {
        //console.log('Our app is ready to rock!');
        app.refreshGroup();
    });

    app.refreshGroup = function () {
        document.querySelector("menu-group-list").refresh();
        document.querySelector("group-list").refresh();
        document.querySelector("coworker-list").refresh();
        document.querySelector("hot-list").refresh();
        document.querySelector("message-list").refresh();
    }

    // See https://github.com/Polymer/polymer/issues/1381
    window.addEventListener('WebComponentsReady', function() {
        var cookie = document.querySelector('#cookie');

        if (cookie.value == null) {
            //TODO rediriger vers la page Login
            window.location.href = window.location.origin + "index";
            //document.querySelector("#logInOutMenuButtonText").innerHTML = "Login";
        } else {
            //TODO transformer le bouton Login en Logout
            //document.querySelector("#logInOutMenuButtonText").innerHTML = "Logout";
            document.querySelector("user-info-bar").performRequest();
            document.querySelector("menu-group-list").refresh();
        }
    });

    app.logoutDataRouteClick = function() {
        app.updateMenuBar();
        app.onDataRouteClick();
        app.logout();
    };

    app.updateMenuBar = function() {

    };

    app.isLoggedIn = function() {
        var cookie = document.querySelector('#cookie');
        return cookie.value != null;
    };

    app.login = function(user) {
        var cookie = document.querySelector('#cookie');

        cookie.value = user._id;
        cookie.expires = new Date() + 2;
    };

    app.logout = function() {
        var cookie = document.querySelector('#cookie');

        cookie.deleteCookie();
    };

    // Close drawer after menu item is selected if drawerPanel is narrow
    app.onDataRouteClick = function() {
        var drawerPanel = document.querySelector('#paperDrawerPanel');
        if (drawerPanel.narrow) {
            drawerPanel.closeDrawer();
        }
    };

    app.onRefresh = function() {
        var refreshButton = document.querySelector('#refreshButton');

        refreshButton.style.transform = 'rotate(360deg)';
        refreshButton.style.webkitTransform = 'rotate(360deg)';
        refreshButton.style.mozTransform = 'rotate(360deg)';
        refreshButton.style.msTransform = 'rotate(360deg)';
        refreshButton.style.oTransform = 'rotate(360deg)';

        doPullRequest();
        //setTimeout(doPullRequest, 150);
    };

    function doPullRequest() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                location.reload();
            }
        };
        if(window.location.hostname == "project.oversimplified.io") {
            xhttp.open("GET", "http://api.oversimplified.io/pushprod", true);
        } else {
            xhttp.open("GET", "http://api.oversimplified.io/pushbeta", true);
        }
        xhttp.send();
    }

    // Scroll page to top and expand header
    app.scrollPageToTop = function() {
        document.getElementById('mainContainer').scrollTop = 0;
    };

    //User Managment
    app.getUserId = function() {
        var cookie = document.querySelector('#cookie');
        //console.log("Mon id est : " + cookie.value);
        return cookie.value;
    };

    app.goToGroupById = function(id) {
        page('/groups/' + id);
        document.querySelector('#postListGroup').group = id;
        document.querySelector('#postListGroup').refresh();
    };

})(document);
