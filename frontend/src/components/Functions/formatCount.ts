
const formatCount : (count : number) => string = (count) => {
    let factor = 0
    let temp = count;
    let suffix = ""

    while(temp >= 10) {
      factor++;
      temp = temp / 10
    }

    if(factor < 6)
      suffix="K"
    else if(factor < 9)
      suffix="M"
    else if(factor < 12)
      suffix="B"
    else {
      suffix="T"
    }

    if(count < 1000) {
        return count.toString();
    }
    else{
      let result = (count / 10**(factor - (factor % 3))).toFixed(1)
      if(result.charAt(result.length-1) == '0')
        return (count / 10**(factor - (factor % 3))).toFixed(0) + suffix;
      return (count / 10**(factor - (factor % 3))).toFixed(1) + suffix;
    }
  }

  export default formatCount;