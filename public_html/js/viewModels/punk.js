/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * giphy module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'underscore', 'services/punkService',
    'ojs/ojmasonrylayout', 'ojs/ojprogress', 'ojs/ojinputtext', 'ojs/ojdialog'],
        function (oj, ko, $, _, punkService) {
            /**
             * The view model for the main content view template
             */
            function punkContentViewModel() {

                var vm = this;
                var bArray = null;
                
                // Service invoke               
                var pServiceInstance = new punkService();
                
                vm.promiseFailed = ko.observable(false);
                vm.loaderFlag = ko.observable(true);
                
                vm.beers = ko.observableArray();
                vm.progressValue = ko.observable(0);
                vm.searchValue = ko.observable('');
                vm.handleOKClose = handleOKClose;
                vm.openBeerDetailView = openBeerDetailView;
                vm.beerDetails = ko.observable("");


                var loaderInterval = setInterval(function () {
                    vm.progressValue(vm.progressValue() + 5);
                }, 30);

                
        
                //service request to fetch the punk data                
                pServiceInstance.fetchBeers.then(function (data) {
                    console.log('promise resolved');
                    clearInterval(loaderInterval);
                    vm.progressValue(100);
                    vm.loaderFlag(false);
                    vm.promiseFailed(false);
                    
                    if (data) {
                        
                        console.log(data);
                        
                        bArray = data;
                        
                        vm.beers(bArray);

                        //console.log(bArray);
                    }

                }).fail(function(err){
                                        
                    vm.loaderFlag(false);
                    vm.promiseFailed(true);

                    if (err.responseJSON) {

                        var respVal = err.responseJSON;                        
                        var errorText = 'API ERROR : Status Code ' + respVal.statusCode + ' >> ' + respVal.error + ' >> ' + respVal.message;
                        
                        //Bind the value to view
                        $('#promiseFailedText').text(errorText);
                    }   
                });

                //define search method
                function performSearch(value) {
                    
                    //console.clear();

                    //console.log('bArray data', bArray);
                    //console.log('current val', value);
                        
                    if(value.length > 0){
                        
                        //Empty the current beers list and fill it with value found in the root data
                        vm.beers([]);                        
                        
                        //console.log('if length greater than 2');
                        //console.clear();
                        //console.log('value ',value);
                        
                        var notFoundBeer = false;
                        
                        for (var x in bArray) {

                            console.log(bArray[x].name.toLowerCase().indexOf(value.toLowerCase()));
                            
                            if (bArray[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
//                                console.log('Beer found!',bArray[x]);

                                vm.beers.push(bArray[x]);                                
                            }
                            else{
                                notFoundBeer = true;
                            }
                        }
                        
                        // Need flag setting in loop causes functionaility breaks                        
                        if(notFoundBeer) {
//                            console.log('Beer not found!');
                            //If beer not found in search list push dummy beer object                                
                            vm.beers.push(pServiceInstance.dummyBeerObj);
                            return false;
                        }
                        
                        
                    }else{
                        //console.log('inside else ', bArray);
                        vm.beers(bArray);
                    }
                }

                //we subscribe on searchValue whenenver it changed and update our beers list again 
                vm.searchValue.subscribe(performSearch);
                
                //Detail view definiation to show detail                
                function openBeerDetailView(curItem){
                    console.log(curItem);
                    vm.beerDetails(curItem);
                    document.querySelector('#punkDetailDialog').open();
                }
                
                function handleOKClose() {
                    document.querySelector("#punkDetailDialog").close();
                };
            }

            return punkContentViewModel;
        });
