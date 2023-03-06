function solution(n) {
  var answer = [1, 1];
  for (i = 2; i < n; i++) {
    answer[i] = answer[i - 1] + answer[i - 2];
  }
  return answer[n - 1];
}

console.log(solution(6));
