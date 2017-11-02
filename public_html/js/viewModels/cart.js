/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global parseFloat */

/**
 * cart module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'underscore', 'appController', 'viewModels/product', 'ojs/ojrouter', 'ojs/ojgauge',
    'ojs/ojtable', 'ojs/ojdialog', 'ojs/ojarraytabledatasource'],
        function (oj, ko, $, _, cVM, pVM) {
            /**
             * The view model for the main content view template
             */
            function cartContentViewModel() {
                var vm = this;

                vm.cartDataList = ko.observableArray();
                vm.cartTotal = ko.observable({
                    amt: ko.observable(),
                    cur: ''
                });
                vm.intTotalVal = ko.observable(0);

                var prodVM = pVM;
                var getUniqCartRecords = [];

                vm.cartDialogOKHandle = cartDialogOKHandle;
                vm.cartDialogCloseListner = cartDialogCloseListner;
                vm.updateCartDataSource = [];
                vm.incrementQty = incrementQty;
                vm.decrementQty = decrementQty;
                vm.productCounts = ko.observable("");

                //reset flags for product view
                prodVM.addedToCartFlag(false);

                //console.info('cartData length', cVM.cartData().length);

                if (cVM.cartData().length === 0) {
                    setTimeout(function () {
                        document.querySelector('#cartInfoDialog').open();
                    }, 0);
                }else{
                    setTimeout(function () {
                        $('#cartContainer').css({display: 'block'});
                    }, 0);
                }


                if (cVM.cartData().length !== 0) {
                    
                    vm.productCounts(_.countBy(cVM.cartData(), function (obj) {
                        return obj.name;
                    }));

//                  console.info(cVM.cartData());

                    getUniqCartRecords = _.uniq(cVM.cartData(), function (item, key, a) {
                        item['ratings'] = +(item['ratings']);
                        item['price'] = parseFloat(item['price']).toFixed(2);
                        item['qty'] = ko.observable(vm.productCounts()[item.name]);
                        item['subTotal'] = ko.observable(item.price);
                        return item.id;
                    });

//                    console.info(getUniqCartRecords);

                    //update cart data list
                    vm.cartDataList(getUniqCartRecords);

                    //update cart count based on number of items in cart
                    cVM.cartCount(getUniqCartRecords.length);

                    //calculate cart total
                    vm.cartTotal = ko.computed(function () {
                        var totalPrice = 0, displayTotal = {};

                        getUniqCartRecords.forEach(function (obj, indx) {
                            totalPrice += +(parseFloat(getUniqCartRecords[indx]['price']).toFixed(2));
                        });

                        console.log('cart data', cVM.cartData()[0]);

                        displayTotal = {
                            amt: ko.observable(totalPrice.toFixed(2)),
                            cur: '$' //cVM.cartData()[0].currency_symbol
                        };

                        return displayTotal;
                    });

                }

                function incrementQty(curData) {

                    //increment qty value
                    curData.qty(curData.qty() + 1);

                    //add currentRecord to root cartData object if qty incremented
                    cVM.cartData.push(curData);

                    console.log(cVM.cartData());

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
                        
                        console.info(curData);
                        
                        curData.qty(curData.qty() - 1);
                        
                        cVM.cartData().pop();
                        
                        //Removing cartData if product qty decremented but it should remove one item per decreement not all
                        //need to fix this - Jat - 27-10-17
//                        cVM.cartData(_.without(cVM.cartData(), _.findWhere(cVM.cartData(), {
//                            id: curData['id']
//                        })));

                        //decrement product count 
                        vm.productCounts()[curData['name']] = curData.qty();


                        console.log(cVM.cartData());

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

                function cartDialogOKHandle() {
                    document.querySelector('#cartInfoDialog').close();
                    cVM.cartCount(0);
                }

                function cartDialogCloseListner() {
                    cVM.router.go('product');
                }

            }

            return cartContentViewModel;
        });
