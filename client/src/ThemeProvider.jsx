/* 폰트 사이즈 */
const size={
    XS: '10px', // 웹 상에서 적용되어 있는 가장 작은 글씨체 입니다.
    S:  '12px', // 따르릉의 기본 폰트 사이즈 입니다. 
    M: '14px',  // 서브 타이틀 사용시 사용할 사이즈 입니다.
    L:  '16px', // 메뉴바 혹은 페이지 내 타이틀 작성 시 사용할 사이즈 입니다.
    XL:  '30px' // h1태그를 사용할 때 사용 해주세요.(ex:로그인, 회원가입 페이지 제목)
};

/* 폰트 굵기 */
const weight={     // Reg 300 -> 400 변경
    Reg: '400', // 폰트의 기본 굵기 입니다. 400 이하는 글자가 희미하게 보임으로. 가급적 사용을 권장하지 않습니다.
    Md: '500',  // 서브 타이틀 혹은 fontSize M 사이즈 사용 시 사용해주세요.
    B:'600',    // 메뉴바 혹은  fontSize L 사이즈 사용 시 사용해주세요.
    EB: '800'   // h1 태그 및 XL 사이즈 사용 시 사용해주세요.
};

/* 색상 */
const color ={
    BG:'#98D6F6',    // 기본 배경 색상입니다.
    Main:'#228AE6',  // 메인 컬러입니다. 포인트를 줄 때 사용해주세요.
    gray:'#7e7e7e',
    grayD:'#535353', //gray-Dark 약자로 기본 회색 글자 색상 입니다. 
    grayL: '#d5d5d5',//gray-Light 약자 
    grayEL:'#f6f3f2' // gray-ExLight 약자로 검정색 바탕에 글자 입력시 사용하는 색상입니다.
    
};

/* MediaQuery */
const deviceSizes = {
  mobile: '640px',
  };
  
  const device = {
    mobile: `(max-width: ${deviceSizes.mobile})`,
  };
  

const theme ={size, weight, color, device}

export default theme;