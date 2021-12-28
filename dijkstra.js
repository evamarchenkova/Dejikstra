let fs = require('fs');
let arg = process.argv;
let data = fs.readFileSync(arg[2]).toString();
let stack = new Array();
let res = "";
priority = {'(' : 0, ')' : 1, '+' : 2, '-' : 2, '*' : 3, '/' : 3, '^' : 4};

for (let i = 0; i < data.length; i++) {
    if (data.charAt(i) != ' ') {
        if ((data.charAt(i) >= '0' && data.charAt(i) <= '9')) {
            res += " ";
            while ((data.charAt(i) >= '0' && data.charAt(i) <= '9') || (data.charAt(i) == '.') || (data.charAt(i) == ',')) {
                res += data.charAt(i);
                i++;
            }
            i--;
            res += " ";
        }
        else if (data.charAt(i) == '(') {
			stack.push('(');
			}
        else if (data.charAt(i) == ')') {
            while (stack[stack.length - 1] != '('){
                res += stack.pop();
            }
            if (stack[stack.length - 1] == '('){
				stack.pop();
			}
        }
        else if (priority[(data.charAt(i))] > priority[(stack[stack.length - 1])]){
			stack.push(data.charAt(i));
		}
        else {
            while (priority[(data.charAt(i))] <= priority[(stack[stack.length - 1])]) {
                res += stack.pop();
			}
            stack.push(data.charAt(i));
        }
    }
}
while (stack.length > 0){
    res += stack.pop();
}
stack = new Array();
for (let i = 0; i < res.length; i++) {
    if (res.charAt(i) == " ") {
        i++;
        let t = '';
        while ((res.charAt(i) != " ")) {
            t += res.charAt(i);
            i++;
        }
        stack.push(t);
    }
    else {
        let second = stack.pop();
        let first = stack.pop();
        if (res.charAt(i) != '^'){
			var ans = first + res.charAt(i) + second;
		}
        else {
			ans = Math.pow(first, second);
		}
        stack.push(eval(ans));
    }
}
res = res.replace(' ','');
for (let i=0; i < data.length;i++) {
	data = data.replace('^', '**');
}
console.log(res);
console.log(stack.pop());