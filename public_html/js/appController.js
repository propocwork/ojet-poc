/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource'],
        function (oj, ko) {
            function ControllerViewModel(params) {
                var self = this;
                                
                // Router setup
                self.router = oj.Router.rootInstance;
                self.router.configure({
                    'punk': {label: 'Punk'},
                    'product': {label: 'Product'},
                    'about': {label: 'About'},
                    'cart': {label: 'Cart'},
                    'dashboard': {label: 'Dashboard',isDefault: true}
                });
                oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

                //Add to Cart Obseravable
                self.cartCount = ko.observable(0);
                self.cartData = ko.observableArray();
                self.navigateToView = navigateToView;

                function navigateToView(url){                    
                    if(url) {
                        //reset nav item selection
                        $( "#navList" )[0].selection = '';
                        
                        //redirecto to route
                        self.router.go(url);
                    }
                }
                
                // Footer
                function footerLink(name, id, linkTarget) {
                    this.name = name;
                    this.linkId = id;
                    this.linkTarget = linkTarget;
                }
                self.footerLinks = ko.observableArray([
//        new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
//       new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),

                ]);
            }

            return new ControllerViewModel();
        }
);
