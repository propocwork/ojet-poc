/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * header module
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojoffcanvas', 'ojs/ojnavigationlist', 'ojs/ojbutton', 'ojs/ojarraytabledatasource'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function headerContentViewModel() {
        var self = this;
        var rootVM = ko.dataFor(document.getElementById('pageContent'));

        self.cartItemsCount = ko.observable(rootVM.cartCount());

        self.cartItemsCount = ko.computed(function () {
            return rootVM.cartCount();
        });

        // Media queries for repsonsive layouts
        var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
        self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
        var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
        self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

        // Drawer
        // Close offcanvas on medium and larger screens
        self.mdScreen.subscribe(function () {
            oj.OffcanvasUtils.close(self.drawerParams);
        });
        self.drawerParams = {
            displayMode: 'push',
            selector: '#navDrawer',
            content: '#pageContent'
        };
        // Called by navigation drawer toggle button and after selection of nav drawer item
        self.toggleDrawer = function () {
            return oj.OffcanvasUtils.toggle(self.drawerParams);
        };

//      self.goToDefaultPage = function(){
//            console.log(self);
//            self.router.go('/');
//      };

        // Add a close listener so we can move focus back to the toggle button when the drawer closes
        $("#navDrawer").on("ojclose", function () {
            $('#drawerToggleButton').focus();
        });

        // Header
        // Application Name used in Branding Area
        self.appName = ko.observable("Experience Implementations");
        // User Info used in Global Navigation area
        self.userLogin = ko.observable("john.hancock@oracle.com");

        // Navigation setup
        var navData = [
            {name: 'Punk beer', id: 'punk', iconClass: 'oj-navigationlist-item-icon'},
            {name: 'Apparels', id: 'product', iconClass: 'oj-navigationlist-item-icon'},
            {name: 'About', id: 'about', iconClass: 'oj-navigationlist-item-icon'}
        ];
        self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});


    }

    return headerContentViewModel;
});
