import React, { memo } from "react";
import styled from "styled-components";
//깃 아이콘을 위한 import
import icon from "../assets/img/github.png";

const FooterContainer = styled.div`
    height: 60px;
    display: flex;

    background-color: ${(props) => props.theme.color.BG};
    span {
        margin: auto;
        color: ${(props) => props.theme.color.Main};
        display: flex;
        flex-direction: row;

        .footerIcon {
            width: 20px;
            height: 20px;
            padding-right: 5px;
        }
        a {
            text-decoration: none;
            margin-top: 5px;
            font-weight: 500;
            font-size: 12px;
            &:visited {
                color: ${(props) => props.theme.color.Main};
            }
        }
    }
`;

const Footer = memo(() => {
    return (
        <div>
            <FooterContainer className="containerSize media">
                <span>
                    <img src={icon} alt="gitIcon" className="footerIcon" />
                    <a href="https://github.com/dodoisfree/TinkleCycle">
                        {" "}
                        https://github.com/dodoisfree/TinkleCycle
                    </a>
                </span>
            </FooterContainer>
        </div>
    );
});

export default Footer;
