/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'underscore',
    'ojs/ojknockout',
    'ojs/ojlistview',
    'ojs/ojbutton',
    'ojs/ojgauge',
    'ojs/ojarraytabledatasource'],
        function (oj, ko, $, _) {

            function ProductViewModel(params) {
                
                //console.log(new cart().cartDataList());
                
                var vm = this;
                var rootVM = ko.dataFor(document.getElementById('pageContent'));

                vm.addedToCartFlag = ko.observable(false);
                vm.dataSource = ko.observable();
                vm.goToProductList = goToProductList;
                vm.goToProductDetail = goToProductDetail;
                vm.productDetailContent = ko.observable("");
                vm.addToCart = addToCart;
                vm.slideViewUp = slideViewUp;


                $.getJSON("jsonData/products.json", function (data) {

                    vm.dataSource(new oj.ArrayTableDataSource(data, {idAttribute: "id"}));

                });

                function goToProductList(event) {
//                   console.log(event);
                    vm.slideViewUp();

//                   $( "#productListView" ).ojListView({
//                       ready: function(event, ui){
//                           $( "#productListView" ).ojListView("refresh");
//                       }
//                   });

                    //console.log('back hit');

//                   if( $( "#productListView").is(':visible')){
//
//                        $( "#productListView #listview" ).on("ojready",function(){
//                            console.log('ojready hit');
//
//                            $( "#productListView #listview" ).ojListView({
//                                "selection": []
//                            });        
//
//                            $( "#productListView #listview" ).ojListView("refresh");
//
//                        });
//                   }
                }

                function goToProductDetail(data) {
                    //if binding done in via knockout click binding
                    if (data !== null) {
                        
                        //Converting string value to integer;
                        data['ratings' ]= +(data.ratings);

                        vm.productDetailContent(data);
//                        console.log('currect product selected', vm.productDetailContent());

                        vm.slideViewUp();
                    }

//                    If binding done via on-change-item on list view component
//                    if(event.detail.value != null){
//                        
//                        var  curRecord = vm.dataSource().data[event.detail.value-1];
//                                               
//                        vm.productDetailContent(curRecord);
//                                        
//                        console.log('currect product selected', vm.productDetailContent());
//                        
//                        vm.slideViewUp();
//                    }
                }

                function addToCart(event) {

                    var cartCountDefaultVal = rootVM.cartCount();


//                    console.log(rootVM.cartCount());
                    //Increment cart value
                    rootVM.cartCount(rootVM.cartCount());

                    //add current item to cart
                    rootVM.cartData.push(vm.productDetailContent());

                    //Toggle the button
                    vm.addedToCartFlag(true);

//                    console.log(vm.productDetailContent().id);

//                    console.log(_.contains(vm.productDetailContent().id, "2"));
                }

                function slideViewUp() {
                    $('#productListView').toggleClass('oj-md-hide oj-sm-hide');
                    $('#producDetailView').toggleClass('oj-md-hide oj-sm-hide');
                }
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new ProductViewModel();
        }
);
