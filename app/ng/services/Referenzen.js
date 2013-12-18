
    app.factory('Referenzen', ['$resource',function($resource){

        var transformXMLResponse = function(data) {
            var objekte;

            // convert the data to JSON and provide
            // it to the success function below
            var x2js = new X2JS();
            var json = x2js.xml_str2json( data );

            objekte = json.referenzdaten.objekte.objekt;

            // make sure objects which can contain one object or an array of objects are always
            // stored as arrays in object tree
            // correct "problem fields" manually here

            // transform structure: arbeitsgattung -> [arbeitsgattung]
            for (k in objekte) {
                //console.log(objekte[k]);

                if (typeof(objekte[k])!=='undefined' && typeof(objekte[k].arbeitsgattungen)!=='undefined') {
                    var ag = objekte[k].arbeitsgattungen;
                    if (typeof(ag.arbeitsgattung)!=='undefined') {
                        //console.log('*'+typeof(ag.arbeitsgattung));

                        // transform structure: arbeitsgattung -> [arbeitsgattung]
                        if (typeof(ag.arbeitsgattung)!=='object') {
                            //console.log(ag);
                            ag.arbeitsgattung = [ag.arbeitsgattung];
                            //console.log(ag.arbeitsgattung);
                        }
                    }

                }
            }

            // transform structure: bild -> [bild]
            //  bilder.objektbilder.bild
            for (k in objekte) {
                //console.log(objekte[k]);

                if (typeof(objekte[k])!=='undefined' && typeof(objekte[k].bilder)!=='undefined') {
                    var ag = objekte[k].bilder;
                    if (typeof(ag.objektbilder)!=='undefined' && typeof(ag.objektbilder.bild)!=='undefined') {
                        //console.log('*'+typeof(ag.objektbilder.bild));

                        // transform structure: bild -> [bild]
                        if (!(ag.objektbilder.bild instanceof Array)) {//not an array, only 1 object exists -> put it in an array
                            //console.log(ag.objektbilder.bild);
                            ag.objektbilder.bild = [ag.objektbilder.bild];
                        }
                    }

                }
            }
            //console.log(objekte[k]);


            //
            // get all filter options
            //
            json.filters = {
                kanton: []
                ,arbeitsgattung: []
                ,bauart:[]
                ,bautyp:[]
                ,baujahr:[]
            };
            // kantone
            for (k in objekte) {
                if (typeof(objekte[k].kanton)==='string'
                    && json.filters.kanton.indexOf(objekte[k].kanton) === -1) {
                    json.filters.kanton.push(objekte[k].kanton);
                }
            }
            json.filters.kanton.sort();
            // arbeitsgattungen
            for (k in objekte) {
                if (typeof(objekte[k].arbeitsgattungen.arbeitsgattung)==='object') {
                    for (k2 in objekte[k].arbeitsgattungen.arbeitsgattung) {
                        if (json.filters.arbeitsgattung.indexOf(objekte[k].arbeitsgattungen.arbeitsgattung[k2]) === -1) {
                            json.filters.arbeitsgattung.push(objekte[k].arbeitsgattungen.arbeitsgattung[k2]);
                        }
                    }
                }
            }
            json.filters.arbeitsgattung.sort();
            // bauart
            for (k in objekte) {
                if (typeof(objekte[k].bauart)==='string'
                    && json.filters.bauart.indexOf(objekte[k].bauart) === -1) {
                    json.filters.bauart.push(objekte[k].bauart);
                }
            }
            json.filters.bauart.sort();
            // bautyp
            for (k in objekte) {
                if (typeof(objekte[k].bautyp)==='string'
                    && json.filters.bautyp.indexOf(objekte[k].bautyp) === -1) {
                    json.filters.bautyp.push(objekte[k].bautyp);
                }
            }
            json.filters.bautyp.sort();
            // baujahr
            for (k in objekte) {
                if (typeof(objekte[k].baujahr)==='string'
                    && json.filters.baujahr.indexOf(objekte[k].baujahr) === -1) {
                    json.filters.baujahr.push(objekte[k].baujahr);
                }
            }
            json.filters.baujahr.sort();


            return json;
        }

        return function (initObj) {
            return  $resource(initObj.urlBase+':urlAddon'
                ,{  }
                ,{ query:{method:'GET', cache: true, transformResponse:transformXMLResponse} }
            );
        }

    }]);