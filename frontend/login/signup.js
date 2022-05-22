// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  console.log("인증 번호 전송");

  // 1. 입력한 휴대폰번호 가져오기
  const myphone1 = document.getElementById("PhoneNumber01").value;
  const myphone2 = document.getElementById("PhoneNumber02").value;
  const myphone3 = document.getElementById("PhoneNumber03").value;
  const myphone = myphone1 + myphone2 + myphone3;
  console.log("나의 핸드폰 번호: ", myphone);

  // 2. 해당 휴대폰번호로 인증번호 API 요청하기
  axios.post("http://localhost:3000/tokens/phone", {
    phone: myphone,
  });
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  console.log("인증 토큰 전송!!");
  // 입력 번호, 토큰 가져오기
  const token = document.getElementById("TokenInput").value;
  const myphone1 = document.getElementById("PhoneNumber01").value;
  const myphone2 = document.getElementById("PhoneNumber02").value;
  const myphone3 = document.getElementById("PhoneNumber03").value;
  const phone = myphone1 + myphone2 + myphone3;
  console.log(phone, token);

  // 토큰 인증 api 요청
  axios.patch("http://localhost:3000/tokens/phone", {
    phone,
    token,
  });
};

// 회원 가입 API 요청
const submitSignup = async () => {
  console.log("회원 가입 이메일 전송");
  // 입력 정보 가져오기
  const name = document.getElementById("SignupName").value;
  const registrationNumber1 = document.getElementById("SignupPersonal1").value;
  const registrationNumber2 = document.getElementById("SignupPersonal2").value;
  const personal = `${registrationNumber1}-${registrationNumber2}`;
  const myphone1 = document.getElementById("PhoneNumber01").value;
  const myphone2 = document.getElementById("PhoneNumber02").value;
  const myphone3 = document.getElementById("PhoneNumber03").value;
  const phone = myphone1 + myphone2 + myphone3;
  const prefer = document.getElementById("SignupPrefer").value;
  const email = document.getElementById("SignupEmail").value;
  const pwd = document.getElementById("SignupPwd").value;

  axios.post("http://localhost:3000/user", {
    name,
    email,
    personal,
    prefer,
    pwd,
    phone,
  });
};
