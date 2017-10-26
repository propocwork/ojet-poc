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
        
        vm.dummyBeerObj = {
            id:0,
            name:"No result",
            tagline:"OOPS",
            first_brewed:"00/0000",
            description:"Try something else!",
            food_pairing: ['None'],
            image_url:"http://media.gettyimages.com/photos/closeup-of-dirty-beer-bottle-against-trees-picture-id562901869",
            abv:0,
            ibu:0,
            target_fg:0000,
            target_og:0000,
            ebc:0,
            srm:0,
            ph:0,
            attenuation_level:0,
            volume:{value:0,unit:"liters"},
            boil_volume:{value:0,unit:"liters"},
            contributed_by:"None"
        };
        
        var getLocalPunkData = window.localStorage.getItem('punkData') !== null ? JSON.parse(window.localStorage.getItem('punkData')) : null;
                
        if(getLocalPunkData === undefined || getLocalPunkData === null){
            console.log('Local data not found, fetching it from server ');

            vm.fetchBeers = $.ajax({
                url: 'https://api.punkapi.com/v2/beers?page=2&per_page=3',
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
