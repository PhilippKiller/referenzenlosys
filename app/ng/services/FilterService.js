
    app.factory('FilterService', function () {

        return {
                activeFilters:{}
                ,searchString:''
                ,arbeitsgattung:null
                ,baujahr:{
                    von:null
                    ,bis:null
                }
        };
    });