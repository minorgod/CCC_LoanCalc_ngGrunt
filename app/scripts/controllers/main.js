'use strict';

/**
 * @ngdoc function
 * @name cccLoanCalcNgGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cccLoanCalcNgGruntApp
 */
angular.module('cccLoanCalcNgGruntApp')
  .controller('MainCtrl', function ($scope) {

    $scope.data = {
    	principal: parseFloat("1000"),
    	principalText: "",
    	rate: parseFloat("1"),
    	termLength: parseInt("1"),
    	termLengthType: "years",
    	monthlyPayment: parseFloat(""),
    	totalInterest: 0,
    	grandTotal: 0
    }; 

    //$scope.data.principalText = $filter('currency')($scope.data.principal);

    /*$scope.principal = parseFloat("1000");
    $scope.rate = parseFloat("100");
    $scope.termLength =  parseInt("10");
    $scope.termLengthType = "years";
	*/	
    $scope.calculate = function(){

    	//The following formulas were taken from
    	//http://mathforum.org/dr.math/faq/faq.interest.html

    	/*
    		Then the monthly payment M is given by:
    		P = principal
    		i= interest rate as a fraction (eg: 1% = .01)
			n = number of years
			q = number of periods per year (12 for monthly)


			M = Pi/[q(1-[1+(i/q)]^-nq)]

			The amount of principal that can be paid off in n years is
			P = M(1-[1+(i/q)]^-nq)q/i.

			The number of years needed to pay off the loan is
			n = -log(1-[Pi/(Mq)])/(q log[1+(i/q)]).

			The total amount paid by the borrower is Mnq

			total amount of interest paid is
			I = Mnq - P.
    	*/

    	$scope.data.principal = $scope.cleanNumber(String($scope.data.principal),2);

    	$scope.data.rate = $scope.cleanNumber(String($scope.data.rate),4);

    	var M = 0;
    	var P = $scope.data.principal;
    	var i = $scope.data.rate / 100;
    	var n = $scope.data.termLength;
    	var q = 12;

    	if($scope.data.termLengthType==="months"){
    		n = n/12;
    		q = 12;
    	}

    	var pow = -1 * n * q; 
    	$scope.data.monthlyPayment = M = (P * i) / (q * (1 - Math.pow( 1+(i/q), pow) ) );
    	
    	$scope.data.totalInterest = $scope.calculateTotalInterest(M,P,n,q);
    	
    	$scope.data.grandTotal = $scope.calculateGrandTotal(M,n,q);

    };


    $scope.calculateTotalInterest = function(M,P,n,q){
    		//Total amount of interest paid is
			//I = Mnq - P
			//var M = $scope.data.monthlyPayment;
			//var P = $scope.data.principal;
	    	//var n = $scope.data.termLength;
	    	//var q = 12;

	    	return (M * n * q) - P;

    };

    $scope.calculateGrandTotal = function(M,n,q){
    		//Total amount paid with interest
			//T = Mnq
			//var M = $scope.data.monthlyPayment;
	    	//var n = $scope.data.termLength;
	    	//var q = 12;

	    	return (M * n * q);

    };

    $scope.cleanNumber = function(val, digits){

    	//regex which will validate commas and decimals...
    	//^((\d+)|(\d{1,3})(\,\d{3}|)*)(\.\d{2}|)$


    	//strip anything other than digits and decimal
    	val = val.replace(/[^\d.]/g,"");

    	//split the number on decimal. If it has more than 2 parts, it's invalid.
    	var numberParts = val.split(".");
    	if(numberParts.length > 2){
    		window.alert("You have too many decimals!");
    		return parseFloat(numberParts[0] + "." + numberParts[1]);    	
    	}

    	//if there's a decimal part and it's greater than zero, parseFloat it to the preferred precision.
    	if(numberParts.length === 2 && numberParts[1].length > digits){
    		window.alert("You can only specify up to " + digits +" decimal places.");
    		return parseFloat(numberParts[0] + "." + numberParts[1].substr(0,digits));
    		//return parseFloat(val).toFixed(digits);
    	}

    	return val;
    	
    };

  });
