(function (){
    'use strict';
//parser: only for Id
function $( id ){
    return document.getElementById( id );
}

var calculate = $( 'calculate' ), //button
    height = $( "height" ),
    weight = $( "weight" ),
    bmi = $( "BMI" ),
    h, //height
    w, //weight
    index, //BMI result
    object = {}; //for save parameters (for possible calculations in future)

//helper object with action, calculate, check, cleanSheets, highlight and saveResults methods
var helper = {

    action: function(){

        this.cleanSheets();

        this.check( height );

        if( h ){
            this.check( weight );
        }

        if ( h && w ){
            this.calculate();

            bmi.innerHTML = index;

            //highlight table raw
            this.highlight();

            //for possible calculations in future
            this.saveResults( object );
        }
    },

    regExp: /^[0-9]{1,3}$/,

    check: function( parameter ){

        if( this.regExp.test(parameter.value) ){
            if( parameter.name === "height" ){
                h = parameter.value / 100; //converting to meters
            }
            if ( parameter.name === "weight" ){
                w = parameter.value;
            }

        } else {
            parameter.nextElementSibling.style.display = "block";
            parameter.value = '';
            parameter.style.borderColor = "rgba(255,56,0,0.8";
            parameter.focus();
        }
    },

    calculate: function(){
        index = parseFloat( ( w / ( h * h ) ).toFixed( 2 ) );
    },

    cleanSheets: function(){
        height.style.borderColor = 'inherit';//clean styles in case of success
        weight.style.borderColor = 'inherit';
        height.nextElementSibling.style.display = "none";
        weight.nextElementSibling.style.display = "none";
        for( var i in this.rangeElm ){
            this.rangeElm[ i ].style.backgroundColor = 'rgba(255,255,255, 0.5)';
        }
    },

    highlight: function(){
        if( index < 18.5 ){
            this.rangeElm.less18.style.backgroundColor = '#96d3ea';
        } else if ( index < 25 ){
            this.rangeElm.over18less25.style.backgroundColor = '#a1ffca';
        } else if( index < 30 ){
            this.rangeElm.over25less30.style.backgroundColor = '#dfc8b5';
        } else if ( index < 35 ){
            this.rangeElm.over30less35.style.backgroundColor = '#ffb90f';
        } else if ( index < 40 ){
            this.rangeElm.over35less40.style.backgroundColor = '#ffb66c';
        } else {
            this.rangeElm.over40.style.backgroundColor = '#ff3800';
        }
    },

    rangeElm: {
        less18: $( 'js-less18' ),
        over18less25: $( 'js-18to25' ),
        over25less30: $( 'js-25to30' ),
        over30less35: $( 'js-30to35' ),
        over35less40: $( 'js-35to40' ),
        over40: $( 'js-over40' )
    },

    saveResults: function( obj ){
        obj.height = h;
        obj.weight = parseInt( w );
        obj.bmi = index;
    }
};


calculate.onclick = function() {
    helper.action();
};
    //you can press enterKey in input#weight - it will also work
weight.onkeydown = function(event){
        if(event == undefined){
            event = window.event;
        }
        if (event.keyCode == 13){
            helper.action();
        }

    }
})();