/**
 * @file: NameEmailPwdInput.jsx
 * @description: Modal - 이름, 이메일 확인 및 새 비밀번호를 입력해주세요
 * @author: 천경재
 */

import React, { memo } from 'react';
import '../../assets/scss/okModal.scss'

const NameEmailPwdInput = memo(({modal, setModal}) => {
    const onModalClose = React.useCallback(() => {
        setModal(false);
    },[setModal]);
    
    return (
        <>
            {modal && 
                <div className="modalWrap">
                <div className="modalInner">
                    <div className="textWrap">
                        <p>이름, 이메일 확인 및 새 비밀번호를 입력해주세요.</p>
                    </div>
                    <button onClick={onModalClose}>확인</button>
                </div>
            </div>
            }
        </>
    );
});
 
export default NameEmailPwdInput;