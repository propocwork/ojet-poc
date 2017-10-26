/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * punkService module
 */
define(['ojs/ojcore', 'knockout', 'jquery',
], function (oj, ko, $) {
    /**
     * The view model for the main content view template
     */
    function punkServiceContentViewModel() {
        var vm = this;
        
        var getLocalPunkData = window.localStorage.getItem('punkData') !== null ? JSON.parse(window.localStorage.getItem('punkData')) : null;
                
        if(getLocalPunkData === undefined || getLocalPunkData === null){
            console.log('Local data not found, fetching it from server ');

            vm.fetchBeers = $.ajax({
                url: 'https://api.punkapi.com/v2/beers',
                success: function (resp) {     
                    window.localStorage.setItem('punkData', JSON.stringify(resp));
                    return resp;
                },
                error: function(err){
                    if(err.responseJSON){
                        var respVal = err.responseJSON;                        
                        return 'API ERROR : Status Code ' + respVal.statusCode + ' >> ' + respVal.error + ' >> ' + respVal.message;
                    }
                }
            });
        }
        else{
            console.log('Local data found');
            var defer = $.Deferred();
            vm.fetchBeers = getLocalPunkData !== null ? defer.resolve(getLocalPunkData) : defer.reject(getLocalPunkData);

        }
        
        
        
    }
    
    return punkServiceContentViewModel;
});
