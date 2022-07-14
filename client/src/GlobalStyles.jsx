/**
 * @filename: GlobalStyles.js
 * @description: 전역으로 적용될 기본 스타일시트
 * @author: 천경재
 */


/** 패키지 참조 */
import { createGlobalStyle } from "styled-components";


/**
 * 전역 스타일 시트를 정의한 객체, reset.css 적용
 * @type {GlobalStyleComponent<{}, DefaultTheme>}
 */
const GlobalStyles = createGlobalStyle`

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
*{
	font-family: 'SCoreDream';
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
	//Mediaquery 적용
}
ol, ul, li {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}
*{
	font-family: 'SCoreDream';
}

Link,
a{
	text-decoration: none;
}

button{
	cursor: pointer;
}
.Btn{
	background-color: white;
	border: none;
	width: 25px;
	height: 25px;
}
// 화면상의 요소 사라지게하기
.blind{
    overflow: hidden;
    display: inline-block;
    position: relative;
    z-index: -1;
    border: 0;
    width: 1px;
    height: 1px;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
}

// 화면상의 글자 사라지게하기
.textBlind{
    text-indent: -9999px;
}

// 화면 사이즈 규격
.containerSize{
	width: 640px;
 	margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

//Mediaquery 적용
.media{
	@media ${props => props.theme.device.mobile} {
    width: 100%;
	padding:0;
  }
}
.inside{
	@media ${props => props.theme.device.mobile} {
    width: 100%;
	padding:0 20px;
	box-sizing: border-box;
  }
}

// 회원가입, 로그인 페이지 제목에만 사용해주세요!!!
h1{
	font-size: ${props => props.theme.size.XL};
	font-weight: ${props => props.theme.weight.EB};
}

h2{
	font-size: ${props => props.theme.size.L};
	font-weight: ${props => props.theme.weight.B};
}

h3{
	font-size: ${props => props.theme.size.M};
	font-weight: ${props => props.theme.weight.Md};
}
h4{
	font-size: ${props => props.theme.size.S};
	font-weight: ${props => props.theme.weight.Md};
}

strong {
	font-size: ${props => props.theme.size.M};
	font-weight: ${props => props.theme.weight.Md};
}

p,
span,
div{
	font-size: ${props => props.theme.size.S};
	font-weight: ${props => props.theme.weight.M};
}

.input {	// input -> .input 변경
	font-size: ${props => props.theme.size.M};	// size.S -> size.M 변경
	font-weight: ${props => props.theme.weight.Reg};
	color: ${props => props.theme.color.grayD};
}
.iconImg{
	width: 25px;
	height: 25px;
	cursor: pointer;
}
.userImg{
	width: 25px;
	height: 25px;
}
.moreBtn{
	cursor: pointer;
}
`;

export default GlobalStyles;
