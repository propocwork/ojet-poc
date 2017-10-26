/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * punkService module
 */
define(['ojs/ojcore', 'knockout'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function punkServiceContentViewModel() {
        var vm = this;
        
        vm.fetchBeers = $.ajax({
            url: 'https://api.punkapi.com/v2/beers',
            success: function (resp) {                    
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
    
    return punkServiceContentViewModel;
});
