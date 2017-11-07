
function Decimal2Binary(number,digits){
	if(typeof number != 'number'){
		throw new Error("A number is needed");
	};
	if(typeof digits == 'undefined'){
		digits = 16;
	};
	var sign = number > 0 ? '' : '-';
	number = Math.abs(number);
	var seed = 2;
	var result = [];
	var arr = number.toString().split('.');

	if(typeof arr[1] != 'undefined'){
		var nominator = parseInt(arr[1]);
		var denominator = Math.pow(10,arr[1].length);
		while(result.length < digits && nominator > 0){
			if(nominator*seed >= denominator){
				nominator = nominator*seed - denominator;
				denominator *= seed;
				seed *= 2;
				result.push('1');
			}
			else{
				seed *= 2;
				result.push('0');
			}
		};
		if(nominator > 0){
			result.push('...');
		}
	};
	return sign + Int2Binary(parseInt(arr[0])) + '.' + result.join('');
};

function Int2Binary(number){
	if(typeof number != 'number' || Math.floor(number) !== number){
		throw new Error("An int number is needed");
	};
	if(number === 0){
		return 0;
	};
	var i = 0;
	var temp = number;
	var result = [];
	while(Math.floor(temp) > 0){
		temp /= 2;
		i++;
	};
	for(;i>0;i--){
		if(number >= Math.pow(2,i-1)){
			number -= Math.pow(2,i-1);
			result.push('1')
		}
		else{
			result.push('0');
		}
	};
	return result.join('');
};
