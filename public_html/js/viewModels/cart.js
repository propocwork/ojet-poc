/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global parseFloat */

/**
 * cart module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'underscore', 'ojs/ojrouter', 'ojs/ojgauge',
    'ojs/ojtable',
    'ojs/ojarraytabledatasource'],
        function (oj, ko, $, _) {
            /**
             * The view model for the main content view template
             */
            function cartContentViewModel() {
                var vm = this;

                var rootVM = ko.dataFor(document.getElementById('pageContent'));

                vm.cartDataList = ko.observableArray();
                vm.cartTotal = ko.observable({
                    amt: ko.observable(),
                    cur: ''
                });
                vm.intTotalVal = ko.observable(0);

                //If page refereshed re-directed back to product page and element not found or null
                if (document.getElementById('productPageContent') === null) {
                    rootVM.router.go('/');
                } else {

                    var prodVM = ko.dataFor(document.getElementById('productPageContent'));
                    var getUniqCartRecords = [];


                    vm.updateCartDataSource = [];
                    vm.incrementQty = incrementQty;
                    vm.decrementQty = decrementQty;
                    vm.productCounts = ko.observable("");

                    //reset flags for product view
                    prodVM.addedToCartFlag(false);

                    if (rootVM.cartData().length !== 0) {

                        vm.productCounts(_.countBy(rootVM.cartData(), function (obj) {
                            return obj.name;
                        }));

                        console.info(rootVM.cartData());
//                        console.info(vm.productCounts());

//                console.log('updated cartData Records',rootVM.cartData());                    

                        getUniqCartRecords = _.uniq(rootVM.cartData(), function (item, key, a) {
                            item['ratings'] = +(item['ratings']);
                            item['price'] = parseFloat(item['price']).toFixed(2);
                            item['qty'] = ko.observable(vm.productCounts()[item.name]);
                            item['subTotal'] = ko.observable(item.price);
                            return item.id;
                        });

                        console.info(getUniqCartRecords);

                        //update cart data list
                        vm.cartDataList(getUniqCartRecords);

                        //update cart count based on number of items in cart
                        rootVM.cartCount(getUniqCartRecords.length);

                        //calculate cart total
                        vm.cartTotal = ko.computed(function () {
                            var totalPrice = 0, displayTotal = {};

                            getUniqCartRecords.forEach(function (obj, indx) {
                                totalPrice += +(parseFloat(getUniqCartRecords[indx]['price']).toFixed(2));
                            });

                            console.log('total price value', totalPrice);

                            displayTotal = {
                                amt: ko.observable(totalPrice.toFixed(2)),
                                cur: rootVM.cartData()[0].currency_symbol
                            };

                            return displayTotal;
                        });

                    }

                    function incrementQty(curData) {
                        
                        //increment qty value
                        curData.qty(curData.qty() + 1);
                        
                        //add currentRecord to root cartData object if qty incremented
                        rootVM.cartData.push(curData);
                        
                        console.log(rootVM.cartData());
                        
                        //prepare subtotal based on quantity added
                        var subTotalVal = curData.qty() * curData.price;
                        curData.subTotal(subTotalVal.toFixed(2));

                        var totalVal = 0;
                        getUniqCartRecords.forEach(function (obj, indx) {
                            totalVal += +obj.subTotal();
                        });

                        //assign back total value
                        vm.cartTotal().amt(totalVal.toFixed(2));

                    }

                    function decrementQty(curData) {
                        if (curData.qty() > 1) {
                            curData.qty(curData.qty() - 1);
                          
                            //Removing cartData if product qty decremented
                            rootVM.cartData(_.without(rootVM.cartData(), _.findWhere(rootVM.cartData(), {
                                id: curData['id']
                            })));
                            
                            //decrement product count 
                            vm.productCounts()[curData['name']] = curData.qty();
                            
                            
                            console.log(rootVM.cartData());

                            //re-calculating subtotal value
                            var subTotalVal = curData.qty() * curData.price;
                            curData.subTotal(subTotalVal.toFixed(2));
                            
                            //re-calculating total value
                            var totalVal = 0;
                            getUniqCartRecords.forEach(function (obj, indx) {
                                totalVal += +obj.subTotal();
                            });

                            //finally assigning back to cart total
                            vm.cartTotal().amt(totalVal.toFixed(2));
                        }
                    }


                }

            }

            return cartContentViewModel;
        });
